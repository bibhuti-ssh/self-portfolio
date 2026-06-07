---
title: RV32I Out-of-Order CPU Simulato
description: A cycle-accurate C++ microarchitecture simulator for bare-metal RISC-V RV32I workloads.
techStack:
  - systems , C / C++
url: ''
repo: https://github.com/bibhuti-ssh/rv32i-ooo-simulator
featured: false
date: 2026-04-01
status: in-progress
---

- Built a cycle-accurate RV32I out-of-order CPU simulator in C++17, modeling fetch, decode, rename,

issue, execute, and in-order commit with ROB, issue queue, and physical register renaming.

- Implemented configurable microarchitecture components including ALU/load-store/branch units,

gshare/bimodal branch predictor, BTB, and L1/L2 cache hierarchy with LRU/PLRU replacement

policies.

- Added bare-metal RV32I ELF workload support, JSON-based simulator configuration, detailed

per-instruction and aggregate performance statistics, and unit tests for pipeline, cache, predictor, ROB, and
