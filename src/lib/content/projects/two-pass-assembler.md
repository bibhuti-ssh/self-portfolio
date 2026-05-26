---
title: "Two-Pass Assembler"
description: "C++ RISC assembler and emulator pipeline with first-pass error handling and step-wise register and memory execution."
techStack: ["C++", "Assembler", "Emulator", "Systems"]
url: ""
repo: ""
featured: false
date: "2024-11-01"
status: "archived"
---

This was a systems project under Prof. Jimson Mathew: a two-pass assembler that converts assembly into machine code and feeds an emulator for execution.

The first pass focuses on symbol resolution and error handling. The second pass generates machine code compatible with the emulator. The emulator then exposes step-wise register and memory updates, making the execution model visible instead of magical.
