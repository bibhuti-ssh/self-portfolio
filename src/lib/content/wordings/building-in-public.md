---
title: 'The Kernel Whisperer: How I Learned to Stop Worrying and Love eBPF'
date: 2026-04-10
tags:
  - distributed-systems
description: Rabitthole
---

A week ago, I was debugging something at 2 AM. I’d been building a distributed system - services talking to each other, network stuff happening that I needed to understand deeply. But I was seeing behavior that didn’t make sense. Mysterious connections that weren’t showing up in my logs. Prometheus showed… lines going up, I guess? I’m still learning what half those metrics mean.

I asked on a Discord server, and someone said “just use eBPF.” I laughed. “That’s kernel hacker stuff.”

They sent me a 4-line bpftrace script that showed exactly which process was making those calls. It took 30 seconds to run.

I spent the next week going down the rabbit hole. It was fun .

What I found changed how I think about distributed systems.

### The Thing Nobody Tells You About Distributed Systems

We’ve gotten really good at building complex systems. I’ve been learning by doing : containers in pods, pods in deployments, services talking to services. Reading papers about classical MapReduce , Raft and Paxos, building implementations, watching everything fall apart in interesting ways. It’s beautiful in the way spaghetti code is beautiful before the deadline.

And when something breaks? We’re basically reading tea leaves.

When I was building… let’s call it a “network-intensive distributed thing,” it would randomly drop connections. My logs showed “connection timeout.” Okay, to what? Docker stats showed CPU spike. Cool, doing what? I had no idea. I spent days adding print statements in different places before I found the issue.

The problem is that all our observability runs in userspace, three abstraction layers away from where the work actually happens. We’re asking politely, “Hey kernel, whatcha doing?” and the kernel has to stop, context switch, package up an answer, send it back. Do this across all your containers and you’ve created a monitoring system that slows down the thing it’s monitoring.

There’s a better way. But first, let me tell you about the debugging session that almost made me quit.

### The Bug That Sent Me Down This Path

I was working on something that needed rock-solid network behavior. Distributed services, real-time-ish requirements, the kind of thing where you can’t just throw Retry-Until-It-Works at the problem and call it a day.

One component would occasionally freeze for exactly 30 seconds, then recover. Not crash- freeze. Totally random. No pattern I could see. This is what I tried:

- Added more logging → The logs said everything was fine right up until it wasn’t
- Increased memory limits → No difference
- Blamed Docker → (That usually works on Stack Overflow, right?)
- Rewrote parts thinking I had a deadlock → Nope
- Asked on Reddit → Got told to “use strace”

But strace on a containerized app? I barely understood how to use strace on a normal program, and now I’m supposed to attach it to a container? Plus, I’d read that it slows things down massively.

That’s when someone in a systems Discord mentioned eBPF. Specifically, that you could write a program that sits in the kernel and watches syscalls without the overhead of strace.

I found an eBPF script that traced syscalls with latency. Ran it. Found that my service was calling getaddrinfo() which was timing out after… 30 seconds. It was trying to resolve a hostname I’d hardcoded during development that didn’t exist anymore. The DNS lookup was failing silently, retrying with a 30-second timeout.

The library I was using didn’t log it. My application didn’t know. Docker logs showed nothing. But eBPF saw it because it was watching at the syscall boundary.

That’s when I got hooked.

### So What Actually Is eBPF?

eBPF started in 1993 as BPF ; Berkeley Packet Filter. It was this clever hack that let you write tiny programs to filter network packets without moving them from kernel space to userspace and back. tcpdump still uses it.

In 2014, someone (Alexei Starovoitov, if you’re keeping score) had a thought: “What if we made this work for more than just packets?” That “what if” turned into eBPF: Extended BPF.

Modern eBPF lets you run small, safe programs in kernel space that can hook into almost anything: syscalls, network events, file operations, you name it. Think of it as being able to install carefully vetted sensors throughout your operating system.

The key word is “safe.” You can’t just run arbitrary code in the kernel (well, you can with kernel modules, but that’s a one-way ticket to kernel panic town). eBPF programs go through a verifier that mathematically proves your program won’t crash the kernel, won’t loop forever, won’t access invalid memory.

The verifier is paranoid. Beautifully, necessarily paranoid.

### My First Program (And Why It Didn’t Work)

I wanted something simple: show me every time someone runs a command. Just basic process monitoring.

There’s a syscall called `execve` that gets called every time a program starts. There's also a convenient tracepoint for it: `sys_enter_execve`. I found an example online and modified it:

```plain
SEC("tp/syscalls/sys_enter_execve")
int trace_execve(struct trace_event_raw_sys_enter *ctx)
{
    char filename[256];  // Surely 256 bytes is enough
    char *ptr = (char *)ctx->args[0];
    
    // Just copy the filename, how hard can it be?
    for(int i = 0; i < 256; i++) {
        filename[i] = ptr[i];
        if(ptr[i] == 0) break;
    }
    
    bpf_trace_printk("Executed: %s", filename);
    return 0;
}
```

The verifier hated it. Like, really hated it. Error messages that looked like line noise:

```plain
invalid read from stack off -256+0 size 256
R1 type=fp expected=ctx, pkt, pkt_meta, map_key, map_value, mem, ringbuf_mem, buf, trusted_ptr_
```

What?

Here’s what I learned the hard way:

**Problem 1: You can’t just dereference pointers from userspace.**

`ctx->args[0]` is a pointer to a string in userspace memory. I'm in kernel space. The verifier sees me trying to read from an untrusted pointer and says "absolutely not, that could be garbage."

The fix: use `bpf_probe_read_user_str()`, which safely reads from userspace even if the pointer is nonsense:

```plain
bpf_probe_read_user_str(filename, sizeof(filename), (void *)ctx->args[0]);
```

**Problem 2: Stack size matters.**

256 bytes doesn’t sound like much, but eBPF programs have a maximum stack size of 512 bytes. Allocate a 256-byte buffer and you’ve used half your stack. Add a few more local variables and you’re done.

**Problem 3: That loop.**

The verifier saw an unbounded loop and rejected it. “How do I know this loop terminates?” it asked. “What if ptr never contains a null byte? Now your program runs forever and the kernel is hung. No thanks.”

Here’s the working version:

```plain
SEC("tp/syscalls/sys_enter_execve")
int trace_execve(struct trace_event_raw_sys_enter *ctx)
{
    char filename[64];  // Smaller stack footprint
    
    // Use the safe helper - verifier knows this terminates
    bpf_probe_read_user_str(filename, sizeof(filename), (void *)ctx->args[0]);
    
    // Send to userspace via ring buffer
    bpf_ringbuf_output(&events, &filename, sizeof(filename), 0);
    
    return 0;
}
```

When I finally got this working and saw every command execution on my system in real-time, I understood. This wasn’t instrumentation. This was awareness.

### The Verifier Is Your Frenemy

Let me be real: you will hate the verifier. You’ll hate it at 2 AM when it rejects your perfectly reasonable code with error messages that read like they were written by a committee of adversarial compilers.

But the verifier is the reason eBPF works in production.

It’s checking your homework with the energy of a professor who’s seen every possible way students try to cheat. It tracks the type and range of every register at every instruction. It simulates every possible execution path. It proves — mathematically proves — that your program is safe.

Some things that will make the verifier reject your code:

**Unbounded loops:**

```plain
// This will fail
while(buf[i] != '\n') {  // How long is this going to run?
    i++;
}
```

```plain
// This will pass
for(int i = 0; i < 128; i++) {  // Guaranteed to terminate
    if(buf[i] == '\n') break;
}
```

**Pointer arithmetic without bounds checking:**

```plain
// This will fail
char *p = buf + offset;  // What if offset is huge?
char c = *p;
```

```plain
// This will pass
if(offset < 64) {
    char c = buf[offset];
}
```

**Accessing map values without null checking:**

```plain
// This will fail
u64 *val = bpf_map_lookup_elem(&mymap, &key);
u64 count = *val + 1;  // What if the key doesn't exist?
```

```plain
// This will pass
u64 *val = bpf_map_lookup_elem(&mymap, &key);
if(val) {  // Always check for null
    u64 count = *val + 1;
}
```

The verifier’s complexity has grown because the attack surface has grown. As of recent kernels, it’s over 400 functions and has been responsible for most eBPF CVEs. But that complexity exists to protect your kernel from your mistakes — and from actual malicious programs.

After a few weeks of fighting it, you start to internalize the rules. You write code that passes verification on the first try. Your loops have fixed bounds. Your memory accesses are checked. Your pointers are validated.

You become a better programmer, because the verifier doesn’t let you cut corners.

### Maps: How to Remember Things Between Events

Here’s a real problem I had to solve: track file reads, but only for files that were opened by a specific process.

Two separate events:

1. Process A opens `/etc/passwd`, gets back file descriptor 3
2. Process A reads from fd 3

How do you connect these? The `open` syscall happens. Your eBPF program runs. Then it's done—the program doesn't keep running. When the `read` syscall happens later, you've got a fresh invocation with no memory of the earlier `open`.

This is where maps come in. They’re persistent data structures in kernel space that live between program invocations.

Here’s the pattern:

```plain
// Define a map to track interesting file descriptors
struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 10240);
    __type(key, u64);    // PID
    __type(value, u32);  // FD
} tracked_fds SEC(".maps");
```

```plain
// On open exit: if this is /etc/passwd, remember the fd
SEC("tracepoint/syscalls/sys_exit_openat")
int trace_open_exit(struct trace_event_raw_sys_exit *ctx)
{
    // Did the open succeed?
    long fd = ctx->ret;
    if(fd < 0) return 0;
    
    u64 pid = bpf_get_current_pid_tgid() >> 32;
    
    // Check if we marked this process during open entry
    // (You'd set that mark in sys_enter_openat when you see /etc/passwd)
    u32 *marked = bpf_map_lookup_elem(&marked_pids, &pid);
    if(marked) {
        u32 fd_u32 = (u32)fd;
        bpf_map_update_elem(&tracked_fds, &pid, &fd_u32, BPF_ANY);
        bpf_map_delete_elem(&marked_pids, &pid);
    }
    
    return 0;
}
```

```plain
// On read: check if this is a tracked fd
SEC("tracepoint/syscalls/sys_enter_read")
int trace_read(struct trace_event_raw_sys_enter *ctx)
{
    u64 pid = bpf_get_current_pid_tgid() >> 32;
    u32 fd = (u32)ctx->args[0];
    
    u32 *tracked_fd = bpf_map_lookup_elem(&tracked_fds, &pid);
    if(tracked_fd && *tracked_fd == fd) {
        // This is a read from /etc/passwd!
        // Log it, send event, whatever you need
    }
    
    return 0;
}
```

Multiple programs, same maps, coordinating across syscalls. This is the eBPF programming model: small programs at specific hook points, sharing state through maps.

### The Memory Model Will Hurt Your Brain

Here’s something that took me way too long to understand: kernel memory vs. userspace memory, and how pointers cross that boundary.

When you’re in an eBPF program attached to a syscall, you’re in kernel context. The structs you’re reading from are in kernel memory. But the data they _point to_ might be in userspace.

Example from tracking network sends:

```plain
SEC("kprobe/tcp_sendmsg")
int trace_tcp_send(struct pt_regs *ctx)
{
    struct msghdr *msg = (struct msghdr*)PT_REGS_PARM2(ctx);
    struct iov_iter iter;
    
    // msg is in kernel memory - safe to read directly
    bpf_probe_read_kernel(&iter, sizeof(iter), &msg->msg_iter);
    
    // But iter.__ubuf_iovec.iov_base points to userspace
    // It's the application's buffer, not kernel memory
    char buf[128];
    struct iovec iov = iter.__ubuf_iovec;
    
    // This must be bpf_probe_read_user, not _kernel
    bpf_probe_read_user(buf, sizeof(buf), iov.iov_base);
    
    return 0;
}
```

The `msghdr` struct lives in kernel memory—it's a kernel structure. But `iov_base` is a pointer that came from userspace originally. It points to the buffer the application allocated. So even though we read `iov` from a kernel struct, we need `bpf_probe_read_user()` to safely access what it points to.

Get this wrong and the verifier will reject you. Get it past the verifier somehow and your program will read garbage or crash.

### Real-World Example: Watching Network Traffic

Let me show you something I built for fun. I wanted to see what my containers were actually sending over the network. Not by running Wireshark (too much noise), and not by modifying my applications (where’s the fun in that?).

Instead, I watched the `tcp_sendmsg` kernel function. Every time any process sends data over TCP, this function gets called:

```plain
SEC("kprobe/tcp_sendmsg")
int catch_api_keys(struct pt_regs *ctx)
{
    struct msghdr *msg = (struct msghdr*)PT_REGS_PARM2(ctx);
    struct iov_iter iter;
    char buf[256];
    
    // Get the message buffer
    bpf_probe_read_kernel(&iter, sizeof(iter), &msg->msg_iter);
    struct iovec iov = iter.__ubuf_iovec;
    bpf_probe_read_user(buf, sizeof(buf), iov.iov_base);
    
    // Look for Authorization headers
    #pragma unroll
    for(int i = 0; i < 240; i++) {
        // Check for "Authorization: Bearer "
        if(buf[i] == 'A' && buf[i+1] == 'u' && buf[i+2] == 't' &&
           buf[i+3] == 'h' && buf[i+13] == ':' && buf[i+14] == ' ' &&
           buf[i+15] == 'B' && buf[i+16] == 'e') {
            
            // Found it - extract the token
            char token[64] = {0};
            int token_start = i + 22;  // After "Authorization: Bearer "
            
            #pragma unroll
            for(int j = 0; j < 63; j++) {
                char c = buf[token_start + j];
                if(c == '\r' || c == '\n' || c == ' ' || c == 0) break;
                token[j] = c;
            }
            
            // Log it with process info
            u64 pid_tgid = bpf_get_current_pid_tgid();
            u32 pid = pid_tgid >> 32;
            
            struct event_t evt = {
                .pid = pid,
            };
            __builtin_memcpy(evt.token, token, 64);
            
            bpf_ringbuf_output(&events, &evt, sizeof(evt), 0);
            break;
        }
    }
    
    return 0;
}
```

Notice the `#pragma unroll` directives? That's a hint to the compiler to unroll the loop. The verifier can then see that the loop is bounded at compile time. Without it, the verifier might reject the loop as potentially unbounded.

This program runs on every TCP send with negligible overhead. You’re not parsing pcap. You’re not adding latency. You’re just watching at the kernel level.

When I first got this working and saw HTTP requests flowing through my local Kubernetes cluster in real-time, I felt like I’d unlocked a superpower. You can see everything that’s happening at the network layer without touching application code. (Also a bit scary when you realize how much plaintext goes over the wire, but that’s a different blog post.)

### Why This Matters for My Kubernetes Learning

When I first started playing with Kubernetes, I treated it like any other tool. Deploy some YAML, watch it work (or not), debug when it breaks.

But Kubernetes is different. Pods are ephemeral. They come and go. They talk to each other through multiple layers of abstraction. When I was learning service meshes, I added Istio to my cluster. Now every pod had a sidecar container just to observe the first container. My 512MB pod became a 1GB pod.

eBPF changed my mental model completely. The eBPF programs run at the node level, in the kernel. When a pod starts, the programs are already there, watching. No sidecar. No agent to install. No extra container eating my laptop’s RAM.

Projects like Cilium replace your entire CNI (Container Network Interface) with eBPF:

- Packet routing? eBPF program.
- Network policies? eBPF program.
- Load balancing? eBPF program.
- DNS? eBPF program.

Everything at the kernel level, at native speed. When a pod makes a network request, the eBPF program handles it directly without bouncing up to userspace and back.

For learning distributed systems, this is incredible. You can see _everything_:

- Every connection attempt
- Every DNS lookup
- Every packet drop
- Every policy violation

And because it’s in the kernel, you see it with microsecond precision. No sampling, no guessing, no “well it probably happened around this time.”

### The Performance Story Nobody Talks About

Here’s something that surprised me when I started actually measuring things: the overhead of running eBPF programs is usually measured in nanoseconds.

When I first set up Prometheus on my Kubernetes cluster, I didn’t think much about it. Then I noticed my builds were slower. My laptop fan was louder. I checked: the monitoring stack (Prometheus, node-exporter, kube-state-metrics) was using 10–15% of my total CPU just to… observe things.

Traditional monitoring uses polling. Every few seconds, wake up, make syscalls, ask the kernel for stats, process the data, ship it somewhere. Each poll involves:

- Context switching from userspace to kernel
- Kernel gathering the requested data
- Copying data from kernel to userspace
- Context switching back
- Userspace processing

eBPF programs run in the kernel. No context switch unless there’s actually something to report. They only do work when the event they’re watching happens. If a syscall fires and your eBPF program has nothing to say about it, the overhead is typically under 100 nanoseconds — a few dozen CPU cycles.

I read a Netflix case study where they monitor TCP flows across their entire fleet with eBPF at under 1% CPU overhead per instance. Their previous solution used 5–8% CPU.

For my little homelab? The difference meant I could actually run a full monitoring stack without my laptop sounding like it’s about to take off.

### The Learning Curve Is Real (But Not As Bad As You Think)

I’m not going to lie: eBPF is hard. The verifier will reject your code for reasons that seem arbitrary until you understand the safety model. You’ll spend hours debugging why a pointer access fails verification. You’ll hit instruction limits and have to refactor your program into multiple pieces connected by tail calls.

The kernel structures you need to understand aren’t well documented. You’ll be reading kernel source code in C, trying to figure out what fields exist in `struct sock` or `struct sk_buff`. The types change between kernel versions. What works on 5.4 might not compile on 5.10.

I’m self-taught, mostly working with higher-level languages like Go and Python. Jumping into C and kernel programming felt like going from riding a bike to flying a helicopter.

But here’s the thing: I went from “what is eBPF” to writing programs that solved real problems in about a week. Not because I’m some prodigy, but because when you _need_ to see what your system is doing at the kernel level, you find a way to push through the learning curve. The verifier errors start making sense. The memory model clicks. You internalize the patterns.

And now? I understand my infrastructure at a level I never did before. When something breaks in my distributed systems work, I can see it breaking. When performance degrades, I can measure where. When I’m curious about how things actually work under the hood, I can just… watch them.

Fighting with the verifier made me a better systems programmer. When your code has to be proven safe to run in the kernel, you think differently about bounds checking, memory safety, and termination conditions. These are good habits for any systems work, not just eBPF.

### Starting Points That Actually Work

If you want to try this yourself (and you should), here’s the path I took:

**Week 1: Play with bpftrace**

Don’t write C code yet. Get comfortable with bpftrace, which gives you a high-level scripting language. You can run these on your laptop or homelab:

```plain
# Count syscalls by process
sudo bpftrace -e 'tracepoint:syscalls:sys_enter_* { @[comm] = count(); }'
```

```plain
# Show processes opening files (great for debugging)
sudo bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("%s opened %s\n", comm, str(args->filename)); }'
```

```plain
# Network latency histogram (this one's cool)
sudo bpftrace -e 'kprobe:tcp_sendmsg { @start[tid] = nsecs; } kretprobe:tcp_sendmsg /@start[tid]/ { @latency = hist(nsecs - @start[tid]); delete(@start[tid]); }'
```

These give you immediate results and help you understand what events are available without writing any C.

**Week 2: BCC examples**

The BPF Compiler Collection has 100+ example tools written in Python with embedded C. Clone the repo, read the code, break it, fix it.

Start with the simple ones:

- `execsnoop` - see all program executions in real-time
- `tcpconnect` - watch TCP connections as they happen
- `biolatency` - disk I/O latency (surprisingly useful for finding why Docker builds are slow)

The Python wrapper handles all the boilerplate, so you can focus on understanding the eBPF C code.

**Week 3: Write something for your project**

Pick a real problem you’re having. Maybe you want to know:

- Why is my container making so many syscalls?
- What files is my Go application opening?
- Where is my network bandwidth going in my Kubernetes cluster?

Write an eBPF program to answer it. It’ll fail. You’ll debug. You’ll fix it. You’ll learn more than you would from any tutorial.

**Resources that helped me:**

- ebpf.io — official docs and ecosystem map
- ebpf.party — interactive eBPF examples you can run in your browser. Seriously underrated for getting the basics down fast.
- Cilium’s eBPF library (github.com/cilium/ebpf) — if you prefer Go to C (I do)
- The BPF and XDP Reference Guide — when you need the deep technical details
- r/eBPF and various Discord servers — helpful people who remember being confused too

**What you need:**

A Linux system with kernel 4.18+, but really you want 5.4 or newer. If you’re on Ubuntu 20.04+, you’re fine. Otherwise, spin up a VM. I use Multipass on my Mac for quick Ubuntu VMs.

Check your kernel: `uname -r`

If you’re below 5.x, get a newer kernel. Trust me, it matters.

**Real talk:** I went from zero to writing my own eBPF programs in about a week. Not because I’m special, but because once you get past the verifier’s initial hostility, the concepts click fast. The tools are good now. The documentation is better than it used to be. And when you need to understand what your system is actually doing, the motivation carries you through the learning curve.

### The Things I Got Wrong

Let me save you some pain by sharing my mistakes:

**Mistake 1: Using bpf_trace_printk() for everything**

This is the printf of eBPF. It writes to `/sys/kernel/debug/tracing/trace_pipe`. It's great for debugging, terrible for production. There's one global trace_pipe for the entire system. Multiple programs fighting over it is chaos.

Use ring buffers instead: `bpf_ringbuf_output()`. Each program gets its own buffer.

**Mistake 2: Not handling failed map lookups**

I assumed if I put something in a map, it would be there later. Wrong. Maps have a max size. When they fill up, inserts can fail. Other programs might delete entries. Always check for null:

```plain
u64 *val = bpf_map_lookup_elem(&map, &key);
if(!val) {
    // Handle the failure case
    return 0;
}
// Now you can use val
```

**Mistake 3: Ignoring kernel version compatibility**

I wrote code that worked great on my laptop (kernel 5.15). Deployed to production (kernel 4.18). Nothing worked. Struct definitions had changed. Helper functions didn’t exist.

Always check what kernel version you’re targeting and test on that version.

**Mistake 4: Making programs too complex**

eBPF programs have complexity limits enforced by the verifier. Too many instructions? Rejected. Too many nested branches? Rejected. Stack too large? Rejected.

The solution: break your program into multiple smaller programs that communicate via maps or tail calls. Don’t try to do everything in one program.

### The Real Question: Is This Worth Learning?

A week ago, I’d have said “only if you’re a kernel developer or working on low-level infrastructure stuff.”

Today? If you’re learning distributed systems, if you want to actually understand how Kubernetes works instead of just copying YAML from Stack Overflow(or classic “Claude make no mistakes”) , if you’re building projects and want to know _why_ they’re slow — yes, learn eBPF.

Not because you’ll write eBPF programs for every project. You probably won’t. But because understanding how the kernel works, how syscalls translate to actual operations, how networking really happens — this fundamentally changes how you think about systems.

When you read about Cilium in the Cloud Native landscape, you’ll understand what it means to “replace kube-proxy with eBPF” and why that matters.

When you’re debugging your microservices project and something’s slow, you’ll have tools to actually see where time is being spent at the syscall level.

When you read papers about distributed systems, the abstractions won’t feel as abstract anymore because you’ve seen the kernel implementation.

Plus, it’s genuinely fun to watch your system at this level. It’s like having x-ray vision into what your computer is actually doing.

### Where This Goes Next

The eBPF ecosystem is growing fast. Linux 5.x and 6.x kernels keep adding new hook points, new helper functions, new capabilities. The verifier is getting smarter (and more complex). The tooling is improving.

Cool stuff happening:

- Windows getting eBPF support (seriously, eBPF for Windows is a thing)
- More languages targeting eBPF (Rust, Go, Python)
- eBPF in security tools (even Microsoft Defender uses it now)
- Better debugging and development tools

As someone still learning systems programming, I’m excited because eBPF makes the kernel accessible in a way it never was before. You don’t need to be a kernel maintainer with 20 years of C experience to understand what’s happening at the kernel level anymore.

You just need curiosity and patience with the verifier.

### Final Thoughts

Is eBPF magic? No. But it feels like it sometimes.

But it’s not magic. It’s just really good engineering. It’s a carefully designed system that lets you safely extend the most critical part of your infrastructure.

And the verifier? That pedantic, frustrating, adversarial verifier that rejects your code at 2 AM when you’re trying to figure something out?

That’s what makes eBPF trustworthy. Because someone thought through all the ways your code could break the kernel, and built a system that won’t let you proceed until you’ve proven it won’t.

I went from knowing nothing about eBPF to using it to solve real problems in a week. I’m still learning — I still hit verifier errors I don’t understand, I still Google “eBPF invalid access to packet” and find Stack Overflow threads from 2018. But I’m understanding systems at a deeper level than I ever did before.

And that’s worth the struggle.

Now go forth and convince the verifier. It’s waiting.




_Questions? Confusions? Did I get something wrong? Hit me up. I’m figuring this out as I go, and I’ve definitely gotten things wrong. If you’re learning too, let’s compare notes._
