---
title: "On Building Fast"
date: "2026-03-15"
tags: ["engineering", "performance", "philosophy"]
description: "Speed isn't about optimization. It's about not doing unnecessary things."
---

There's a common misconception that making software fast requires exotic optimization techniques. Profile-guided compilation. SIMD instructions. Cache-line alignment.

Sometimes. Usually not.

Most slow software is slow because it does things it doesn't need to do. It loads libraries it doesn't use. It renders components that aren't visible. It queries data it already has. It abstracts things that don't need abstracting.

> The fastest code is the code that doesn't run.

This isn't laziness. It's discipline. Every dependency is a bet that the benefit outweighs the cost. Every abstraction is a bet that the indirection pays for itself. Most of these bets lose.

## What Actually Matters

1. **Fewer dependencies.** Each one is a supply chain risk, a build-time cost, and a bundle-size hit. Use the platform.
2. **Fewer abstractions.** Three similar functions are better than a premature generic one. You can always abstract later. You can rarely de-abstract.
3. **Fewer round trips.** Batch your I/O. Colocate your data. Reduce the number of times you cross a boundary.

The best performance optimization is architectural. Get the shape right and the details often take care of themselves.
