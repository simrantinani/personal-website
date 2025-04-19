---
title: "Explaining Pseudorandomness—Part 2: Stream Ciphers, PRFs, and Block Ciphers"
author: "Simran Tinani"
date: 2023-02-01
categories: ["Cryptography"]
#tags: ["pseudorandomness", "prg", "prf", "stream-cipher", "block-cipher"]
draft: false
math: true
summary: "An explanation of stream ciphers, pseudorandom functions (PRFs), and block ciphers, and how they implement pseudorandomness in practical cryptographic systems."
---


In cryptography, pseudorandomness forms the foundation of secure communication protocols. While pseudorandom generators (PRGs) provide a basis for generating random-like sequences, their applications extend far beyond standalone utility. In **_Part 1_**, we laid the groundwork by exploring pseudorandom generators (PRGs) and their role in computational randomness. This post examines the intricate interplay of pseudorandomness with **stream ciphers**, **block ciphers**, and **pseudorandom functions (PRFs)**.

## **Stream Ciphers: Continuous Encryption**

A **stream cipher** is generally defined as an encryption algorithm that generates a pseudorandom keystream bit-by-bit or block-by-block, which is then XORed with plaintext to produce ciphertext. Stream ciphers are cryptographic constructs designed to produce pseudorandom outputs **incrementally**, providing flexibility for applications requiring variable-length or on-demand randomness. This dynamic nature distinguishes stream ciphers from traditional PRGs, which typically have a fixed expansion factor, making them particularly suited for real-time and resource-constrained environments.

Stream ciphers can be defined in several ways, each focusing on different aspects of their design and use. The most common definition, used in practical cryptography, views a stream cipher as a **stateful system** consisting of an initialization function and a keystream generator.

### Stateful Stream Ciphers

A stream cipher is formally defined as a pair of deterministic algorithms, `Init` and `GetBits`.

Stream ciphers use their internal state to generate pseudorandom outputs dynamically. This iterative mechanism allows the cipher to output random bits on demand, an essential property in many real-world cryptographic scenarios.

#### Construction of pseudorandom output bits

Given a stream cipher $(Init, GetBits)$ where $\text{GetBits}$ returns a single bit, and an expansion factor $l$, one may construct an algorithm $G_l$ as follows. For a given seed $s$ and initialization vector $IV$, the algorithm $G_l$ generates an output sequence $y_1, \ldots, y_l$ of length $l$ as follows:

1. The cipher initializes its state with $s_0 = \mathrm{Init}(s, IV)$.
2. For $i = 1, \ldots, l$, it iteratively computes: $(y_i, s_t) = \mathrm{GetBits}(s_{t-1})$.

The resulting sequence $(y_1, \ldots, y_l)$ serves as the **pseudorandom output**. The algorithm $G_l$ takes an input seed of length $n$ and outputs a random string of length $l(n)$. If the construction does not use an IV, and if for any polynomial $l$ with $l(n) > n$, the algorithm $G_l$ is a *pseudorandom generator* with expansion factor $l$, then this construction is said to be **secure**.

The parameter $l$ represents the **length of the pseudorandom output** that the stream cipher is expected to produce. In other words, stream cipher security depends on the **unpredictability** of the **keystream $(y_1, \ldots, y_l)$**, which must be **indistinguishable from a truly random sequence**.

The absence of an initialization vector (IV) implies that the generator relies solely on the seed $s$ without additional randomness, simplifying the security model to focus entirely on the pseudorandomness derived from the seed. This makes the construction secure only if the seed is unique and never reused. The condition $l(n) > n$ ensures the generator expands randomness, and the polynomial growth of $l(n)$ ensures both efficiency and sufficient randomness.

Note that practical implementations usually require IVs or nonces to prevent keystream reuse and ensure uniqueness across sessions. For example, ChaCha20 uses a nonce (equivalent to an IV) to produce unique outputs for each session, and AES-CTR combines an IV with a counter to ensure different encryption blocks generate distinct keystreams.

### PRG-Based Stream Ciphers

Another definition treats stream ciphers as extensions of pseudorandom generators (PRGs), where the cipher directly uses a PRG to expand a short seed into a long pseudorandom sequence. This approach simplifies the analysis by focusing on the PRG’s properties but lacks flexibility in handling state updates or IVs. There are also hybrid definitions that combine the PRG model with state transitions, ensuring practical usability while retaining theoretical security guarantees.

In this approach, a stream cipher is defined as a **pseudorandom generator (PRG)** that expands a short seed $s$ into a long pseudorandom sequence $G(s)$. The keystream is directly derived from the PRG output, without explicitly modeling an internal state or iterative process. The stream cipher encrypts plaintext by XORing it with chunks of the PRG output.

### **Other Common Definitions**

Other common definitions of stream ciphers focus on different priorities, ranging from practical cryptography to hardware optimization. A standard practical definition describes a stream cipher as a keyed pseudorandom keystream generator that uses a secret key **and** an initialization vector (IV) or nonce to ensure unique keystreams for each encryption session.

The cipher maintains and updates an internal state to generate a continuous stream of pseudorandom bits, which is XORed with plaintext to produce ciphertext. This definition *explicitly incorporates IVs* to avoid keystream reuse, a critical requirement in real-world systems.

In cryptographic theory, stream ciphers are sometimes modeled as functions that produce pseudorandom sequences based solely on a key, IV, and the required output length, abstracting away implementation details to focus on theoretical guarantees such as keystream indistinguishability.

For hardware implementations, stream ciphers often use mechanisms like **Linear Feedback Shift Registers (LFSRs)** to produce fixed-length keystreams while minimizing resource consumption.

Linear Feedback Shift Registers (LFSRs) are a foundational example of pseudorandom sequence generators used in cryptographic systems. An LFSR consists of a shift register of size $m$, which holds $m$ bits of state. These bits are updated in a linear manner based on a feedback function.

Each bit in the shift register is indexed, starting from $s_0$ (the least significant bit) to $s_{m-1}$ (the most significant bit). The output sequence $s_i$ is generated iteratively as follows:

$$
s_{t+m} = \sum_{j=0}^{m-1} p_j \cdot s_{t+j} \mod 2
$$

The feedback coefficients $p_j$ define the characteristic polynomial of the LFSR, which governs its behavior. If the polynomial is primitive, the LFSR achieves its maximum sequence length of $2^m - 1$, meaning it can produce a pseudorandom sequence of that length before repeating.

The linear nature of the feedback function also means the entire sequence can be predicted if enough consecutive bits of the output are known. Specifically, if $2m$ bits of the output sequence are observed, an attacker can solve for the feedback coefficients $p_j$ and reconstruct the entire LFSR state. Because of this predictability, LFSRs by themselves are not suitable for cryptographic applications unless they are combined with nonlinear transformations to obscure their structure.


## **Pseudorandom Functions (PRFs)**

Stream ciphers are powerful tools for generating random-looking sequences that enable secure encryption against probabilistic, polynomial-time adversaries. This raises an intriguing question: can we generalize the idea of pseudorandomness beyond random-looking strings to functions themselves? **Pseudorandom Functions (PRFs)** explore this concept, forming the backbone of many cryptographic constructs.

### **Understanding Random Functions**

A **random function** from $\{0,1\}^m$ to $\{0,1\}^n$ assigns an output in $\{0,1\}^n$ to each input in $\{0,1\}^m$. When one talks of a random function, one means any one of the possibilities for such functions, picked uniformly and at random. As for individual strings, the notion of **randomness** *applies not to an individual function but to a set of functions.*

Such a function can be thought of as a lookup table mapping $2^m$ inputs to $2^m$ outputs. To represent such a function explicitly, $2^m \cdot n$ bits are needed. For instance, if $m = 10$ and $n = 10$, the function would require about 1.2 KB of storage, which becomes impractical for cryptographic purposes.

Random functions thus pose a significant problem: their explicit representation is inefficient and impractical for communication or computation. Furthermore, cryptographic applications often require invertibility, turning a random function into a **random permutation** — a bijective function from $\{0,1\}^n$ to $\{0,1\}^n$.

The challenge is thus: can we design efficient mechanisms that provide function-like randomness without requiring “pure” functional randomness? Under certain cryptographic assumptions, it is possible to design functions that emulate randomness efficiently. These include **Pseudorandom Functions (PRFs)** and **Pseudorandom Permutations (PRPs)**.

A PRF extends the concept of a PRG by mapping inputs of arbitrary length to outputs that appear random. A PRF is a **deterministic**, keyed function $F_k(x)$ that, for a uniformly random key $k$, is computationally indistinguishable from a truly random function $R(x)$. This means no probabilistic, polynomial-time adversary can distinguish between $F_k$ and $R$ with significant advantage.

A PRP is a specialized PRF that is bijective (invertible). For a given key $k$, the PRP function $F_k$ maps $\{0,1\}^n$ to $\{0,1\}^n$ such that every input has a unique output, and the inverse function $F_k^{-1}$ is also efficiently computable. In practice, block ciphers such as AES implement PRPs, acting as keyed permutations on fixed-size blocks of data. Note, however, that not all block ciphers are guaranteed to behave as secure PRPs unless they meet specific design criteria. Their security must be established through rigorous analysis or provable reductions to well-studied hardness assumptions.


### **Formal Definitions**

A **Pseudorandom Function (PRF)** is a deterministic, efficiently computable, keyed function:
$$
F: \{0,1\}^k \times \{0,1\}^m \to \{0,1\}^n
$$

Where:

1. The function is parameterized by a secret key in $\{0,1\}^k$.
2. For any fixed key $k$, $F_k$ behaves like a deterministic function mapping $m$-bit inputs to $n$-bit outputs.
3. For a randomly chosen key $k$, $F_k$ is **computationally indistinguishable** from a truly random function $R : \{0,1\}^m \to \{0,1\}^n$.

In other words, without the key $k$, the output of $F$ is indistinguishable from a random function.

A PRF $F_k$ is **secure** if no probabilistic, polynomial-time adversary $D$ can distinguish between access to $F_k(x)$ for a randomly chosen key $k$, and access to a truly random function $R(x)$. Formally, for a security parameter $n$, the PRF $F_k$ satisfies:
$$
\left| \Pr[D(F_k(x)) = 1] - \Pr[D(R(x)) = 1] \right| \leq \epsilon(n)
$$
Where $\epsilon(n)$ is a negligible function of $n$.

---

A **keyed permutation** is a function:
$$
F: \{0,1\}^k \times \{0,1\}^n \to \{0,1\}^n
$$
(denoted $F(k, m) = F_k(m)$) such that:

1. For every fixed key $k$, the function $F_k$ is a permutation on $\{0,1\}^n$. That is, $F_k$ is bijective.
2. Both $F_k$ and its inverse $F_k^{-1}$ are efficiently (i.e., polynomial-time) computable.

Such a keyed permutation only covers a tiny fraction of all possible permutations on $\{0,1\}^n$ (there are $2^{n!} \approx 2^{(2^n \log 2^n)}$ total permutations). If an adversary is also given access to the inverse function (a decryption oracle), we say the permutation satisfies the stronger definition of a **strong pseudorandom permutation**.

A **keyed permutation is a PRP** if it is indistinguishable from a truly random permutation by any efficient adversary — even with oracle access to both encryption and decryption.

### **Construction of PRFs**

Unlike Pseudorandom Generators (PRGs), which expand a short seed into a long pseudorandom sequence, PRFs map fixed-size inputs to fixed-size outputs under the control of a secret key. Their construction typically relies on strong cryptographic assumptions and secure primitives.

#### **Block Cipher-Based PRFs**

The most widely used method for constructing a PRF is through a secure block cipher such as AES. A block cipher is a keyed, deterministic function that takes a fixed-size input and transforms it into a fixed-size output. When treated as a keyed function, the block cipher acts as a PRF.

The essential property of a PRF—that its output is indistinguishable from that of a truly random function—aligns with the design goals of block ciphers. Block ciphers like AES are rigorously analyzed and optimized for both security and performance, making them ideal for constructing PRFs.

#### **Hash-Based PRFs**

Hash-based constructions also provide an effective way to construct PRFs, particularly in scenarios where efficiency and simplicity are critical. One prominent example is **HMAC** (Hash-based Message Authentication Code), which combines a cryptographic hash function (e.g., SHA-256) with a secret key to produce deterministic, pseudorandom outputs.

HMAC is provably secure as a PRF under standard assumptions about the underlying hash function, such as **collision resistance** and **preimage resistance**. These properties ensure that the outputs are indistinguishable from those of a random function. HMAC-based PRFs are widely deployed in cryptographic protocols.

Another important theoretical construction is the GGM (Goldreich-Goldwasser-Micali) construction, which shows how to build a PRF from any secure PRG. This result is foundational: it demonstrates that, under minimal assumptions, PRFs can be derived from simpler primitives, further highlighting the central role of PRGs in cryptography.

#### **Lattice-Based PRFs (Post-Quantum)**

In the realm of post-quantum cryptography, **lattice-based constructions** have gained prominence as a method for building PRFs. These constructions often rely on the hardness of the **Learning With Errors (LWE)** problem, which involves distinguishing noisy linear equations from uniformly random values.

The LWE-based PRF generates outputs by applying a secret key and noise vector to an input, ensuring that the result is computationally indistinguishable from random. These PRFs are particularly significant because they remain secure against **quantum adversaries**, making them essential for cryptographic systems designed to withstand the advent of quantum computing.


We have seen that a PRF is a **deterministic, keyed function** that maps inputs to outputs such that the outputs appear as if they were generated using a random function. For a randomly chosen key $k$, the PRF $F_k$ is not inherently random—it always produces the same output $y$ for a given input $x$. However, to any efficient adversary, $F_k(x)$ is computationally indistinguishable from the output of a truly random function $R(x)$, where $R(x)$ can be any of the functions from the input space to the output space, assigning a uniformly random output to **every** input.

Similarly, a block cipher is a **keyed transformation** of fixed-size blocks of input data to output blocks, designed to be *indistinguishable from a random permutation to any adversary*. For a given key, both a PRF and a block cipher behave as deterministic functions, ensuring the same input produces the same output. The key property of PRFs—that their output for a random key is computationally indistinguishable from that of a true random function—is mirrored in the security guarantees of block ciphers like AES. This ensures that an **adversary cannot differentiate** between ciphertexts produced by the block cipher and those produced by a theoretical random permutation.

To ensure cryptographic robustness, secure block ciphers implement **strong pseudorandom permutations**. This means they maintain indistinguishability even when an adversary has access to both an encryption oracle (queries to encrypt chosen plaintexts) and a decryption oracle (queries to decrypt ciphertexts). Such access models, including chosen plaintext attacks (CPA) and chosen ciphertext attacks (CCA), significantly increase the adversary's power — making strong PRPs a critical requirement. Block ciphers such as AES are designed to meet these stringent criteria.

Therefore, **block ciphers are practical instantiations of pseudorandom permutations (PRPs)**, operating on fixed-size blocks of data and using a secret key to produce outputs that are indistinguishable from random permutations.

---

Analogously, **Pseudorandom Generators (PRGs)** are closely related to **stream ciphers**: both generate long pseudorandom sequences from a compact input. A PRG takes a short seed and expands it into a longer output that appears random to any efficient adversary. Likewise, a stream cipher generates a keystream for encryption, typically starting from a secret key and optionally an IV. The essential function of a stream cipher—to produce a pseudorandom sequence dynamically—mirrors the **randomness expansion** performed by a PRG. Thus, stream ciphers can be viewed as practical, real-time implementations of PRGs, with added mechanisms like IVs to ensure uniqueness.

### **Stream Cipher from a Block Cipher**

Block ciphers or PRFs can also be used to construct stream ciphers or PRGs. A simple method is to evaluate a PRF $F$ on sequential inputs. Given a secret key $s$, define the generator:
$$
G(s) = F_s(1) \, || \, F_s(2) \, || \, \dots \, || \, F_s(l)
$$
where $||$ denotes concatenation and $l$ is the desired output length. Each invocation of $F$ produces a unique block, efficiently expanding a short key into a long pseudorandom sequence — effectively building a PRG.

We can define a stream cipher using a PRF $F$ as a pair of algorithms $(\mathrm{Init}, \mathrm{GetBits})$:

- $\mathrm{Init}$ takes a secret key $s \in \{0,1\}^n$ and IV $IV \in \{0,1\}^n$ and outputs the initial state $s_0 = (s, IV)$.
- $\mathrm{GetBits}$, given state $s_t = (s', IV')$, computes $y = F_s(IV')$ and updates the state as $s_{t+1} = (s', IV'+1)$.

This guarantees that each PRF invocation uses a unique input and outputs a distinct keystream block.

## **Relationship Between PRGs, PRFs, and Practical Cryptographic Ciphers**

**Pseudorandom generators (PRGs)** and **pseudorandom functions (PRFs)** are theoretical constructs that form the foundation for defining pseudorandomness in cryptographic systems. However, their existence hinges on **unproven assumptions** about the hardness of certain mathematical problems (like factoring large integers or computing discrete logarithms). These models are idealized — no one knows for sure if true PRGs and PRFs exist as perfect objects.

In contrast, **stream ciphers** and **block ciphers** are **practical cryptographic primitives** designed to approximate the behavior of PRGs and PRFs, respectively.

- A **PRG** is an algorithm that takes a short, fixed-length seed and expands it into a much longer output that appears indistinguishable from true randomness.
- A **stream cipher** similarly takes a short secret key (and optionally an initialization vector, IV) and produces a pseudorandom keystream for encryption.

Thus, stream ciphers can be viewed as **real-world implementations of PRGs**, allowing efficient encryption of arbitrary-length plaintexts.

Likewise:

- A **PRF** is a deterministic, keyed function that maps inputs to outputs in such a way that the output is indistinguishable from that of a truly random function.
- A **block cipher**, like AES, behaves in the same way: it maps fixed-size input blocks to fixed-size output blocks under a secret key.

While block ciphers are **deterministic**, they're specifically designed so that — to any efficient adversary — the mapping looks like a **random permutation** over the input space. If the block cipher is also bijective (i.e. invertible), it satisfies the stronger condition of being a **pseudorandom permutation (PRP)**.

The distinction is subtle but critical:

- **PRGs and PRFs** are defined in terms of **indistinguishability**: their output should *look* random, even though it's generated deterministically from an algorithm.
- **Block and stream ciphers** strive to implement those theoretical ideals in practical, efficient ways — ensuring real-world security under those same indistinguishability guarantees.
