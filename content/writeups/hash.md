---
title: "What is a cryptographic hash function?"
author: "Simran Tinani"
date: 2022-02-01
categories: ["Cryptography"]
#tags: ["decidability", "complexity", "np-complete", "p-vs-np"]
draft: false
math: true
weight: 4
summary: "An explanation of hash functions, their mathematical properties, and their role in cryptography."
---

In one oversimplifying, loose line, ‘hashing’ means compression. Most of us are familiar with writing summaries encapsulating information into its essential components, thereby reducing the space used to store it, and the time needed to retrieve and use it. Similarly, when one wants to compress data of arbitrarily large size to a fixed, predefined size for efficient storage and further use, one uses a function called a hash function.

Let  $A$ denote the alphabet, i.e. the set of symbols from which messages are built (we say that messages are strings/words in  $A$). For example, if every message is an English sentence, then **A** is the set of all English alphabets, the space symbol, and all punctuation symbols. Let $n$ be some positive number. Denote by $A^\star$ the set of strings/words in $A$ with arbitrary length and by $A^n$ the set of strings of length fixed to be $n$. ($A^\star$ is the union of $A^r$ for all $r \geq 1$). Denote words on $A$ as $b_1b_2\ldots b_k$, for $b_1, b_2, \ldots, b_k \in A$.

A hash function $h$ is then formally defined as a mathematical function:

$$
h: A^* \rightarrow A^n
$$

In other words, $h$ unambiguously maps arbitrarily large words on $A$ to words of fixed length $n$. An important observation is that if the alphabet $A$ is finite, then $h$ is never injective, i.e. there are always two different words $w, v \in A^*$ that have the same image $h(w) = h(v)$. This follows from the pigeonhole principle, i.e. the fact that a larger finite set can never be in bijection with a smaller one. (If the alphabet is countably infinite then in fact one can have an injective $h$ for $n = 1$ since then both $A^\star$ and $A$ are in bijection with the natural numbers.)

An easy example of a hash function for $A = \{0,1\}^*$, $n = 1$, is the function sending the string $b_1 \ldots b_k$ of zeroes and ones to 1 if the number of ones is odd and 0 if it is even (so 1 maps to 1, 11 maps to 0, 1101 maps to 1, etc.).

One quickly realizes that constructing such functions in a mathematical sense is not hard, and that examples are plenty. However, for practical applicability, we need to enforce certain other conditions. Foremost, $h$ must be “easy” to compute. More precisely, the amount of time to compute $h(x)$ must be “small” when compared to the (bit-) size $|x|$ of $x$, where small here is specified by being polynomial size, or mathematically, the time is $O(f(\log |x|))$ where $f$ is a polynomial (see [https://en.wikipedia.org/wiki/Big_O_notation](https://en.wikipedia.org/wiki/Big_O_notation) for a description of the $O$ notation).

Another property that $h$ must have is _pre-image resistance_, _inversion resistance_, or _one-wayness_, i.e. given any fixed-length $n$ string $s$, it must be _computationally infeasible_ to compute a string $x$ such that $h(x) = s$. Strictly, a one-way function requires that **any** algorithm to compute such an $x$ must be inefficient: exponential in time or space (i.e. $O(|s|^r)$ for some positive integer $r$). However, no such function is known. Practically, one adopts the criterion that every **known** algorithm for this purpose is inefficient. An example of a function widely considered classically pre-image resistant is the exponentiation function over the field $\{0,1,\ldots,p-1\}$ of residues modulo a prime.

A _collision_ of $h$ is a pair of distinct strings $(x, x')$ (of any length) over the alphabet such that $h(x) = h(x')$. Since we are only interested in the case with finite alphabets for cryptography, the hash function is never injective, and a collision always exists. The hash function $h$ is called _strong collision-resistant_ if it is infeasible to compute a collision of $h$. On the other hand, if given a fixed string $x$, it is infeasible to compute another $x'$ such that $(x,x')$ is a collision, then $h$ is called _second pre-image resistant_, or _weak collision-resistant_. Clearly, strong collision resistance implies weak collision resistance; but it does not necessarily imply pre-image resistance.

A _cryptographic hash function_ is a hash function which is pre-image resistant, second pre-image resistant and strong collision-resistant. These are typically constructed starting with a block cipher. Some examples are the well-known MD, SHA and Whirlpool hash functions.

Hash functions have several important cryptographic applications. They are used to verify the integrity of messages and files and to detect malicious changes made to them. The hash function of a message may be stored in a trusted site, such as the originating one, prior to sending it over an insecure channel. By comparing this with the hash of the received file, the receiver can verify that the received file was not corrupted. Hash functions are also used for password storage and verification: instead of storing passwords as cleartexts, servers store the hashed values, thereby reducing the risk of a security breach if the password file is compromised. Digital signatures are also typically applied to messages after they are hashed.
