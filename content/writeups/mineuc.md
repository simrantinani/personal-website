---
title: "Minimum Sum Euclidean Decompositions of Integers"
author: "Simran Tinani"
date: 2023-01-01
categories: ["Mathematics"]
#tags: ["mathematics", "number theory", "algorithms"]
draft: false
math: true
summary: "A short note exploring Euclidean decompositions of integers that minimize the sum of their components."
---


Given a positive integer $n$, consider expressions of the form

$$
n = x \cdot y + z
$$

where $x, y, z \in \mathbb{N}$, with constraints $0 < x, y \leq n$ and $0 \leq z < x$. Such a triple $(x, y, z)$ is called a **Euclidean decomposition** of $n$. These decompositions arise naturally from the division algorithm and can be interpreted geometrically as lattice-based representations of $n$ in the first quadrant.

The central question addressed in this note is:

> Among all such Euclidean decompositions of $n$, which one minimizes the quantity $x + y + z$?

This total sum can be viewed as a proxy for the *simplicity* or *efficiency* of the decomposition. While the constraints allow many representations for each $n$, the goal is to identify the one where the combined cost of $x$, $y$, and $z$ is as small as possible.

The note develops this idea formally, proving several lemmas that characterize the behavior of such minimal decompositions. These include:

- Bounding $x$ and $y$ in terms of $n$
- Showing structural patterns in optimal decompositions
- Reducing the search space for efficient computation

Combining these observations leads to an algorithm with time complexity $O(n^{3/8})$, significantly improving over a naive brute-force approach.

📄 [Download the full PDF](/pdf/minimum_sum_euclidean.pdf)
