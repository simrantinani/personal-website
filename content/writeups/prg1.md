
---
title: "Explaining Pseudorandomness—Part 1: PRGs"
author: "Simran Tinani"
date: 2024-02-01
categories: ["Cryptography"]
draft: false
math: true
summary: "An explanation of pseudorandomness and pseudorandom generators, their construction and their role in cryptography."
---

**Randomness** is a fundamental concept across mathematics, computer science, and cryptography. It forms the backbone of secure communication, simulations, and probabilistic algorithms. Physical processes like radioactive decay or thermal noise are often described as **truly random** because their behavior cannot be predicted with certainty, even with complete knowledge of the system’s initial conditions. This unpredictability arises from fundamental principles of quantum mechanics and thermodynamics, not from computational limitations. However, **true randomness** is often impractical to generate and harness for computational systems. This limitation gives rise to **pseudorandomness**, which mimics true randomness using deterministic, algorithmic methods.

Pseudorandomness is the art of simulating randomness within deterministic frameworks. A **pseudorandom generator (PRG)** starts with a short, truly random seed and expands it into a long sequence that appears random to any efficient observer. The ability to generate “random-like” sequences from deterministic algorithms is a cornerstone of modern cryptography. The power of pseudorandomness lies in its dual nature: it is computationally indistinguishable from true randomness for most practical purposes while being entirely reproducible given the same seed. .

The study of pseudorandomness is deeply intertwined with computational complexity and security. **Cryptographic pseudorandom generators** must satisfy stringent criteria, ensuring that no efficient adversary can distinguish their output from truly random sequences. This notion connects pseudorandomness to theoretical constructs like one-way functions and NP-hard problems.

This post will delve into the mechanics of pseudorandom generators, their role in cryptography, methods for their construction, and the relationship between pseudorandomness and one-way functions, highlighting the theoretical and practical frameworks that enable secure, deterministic randomness in computing.

## 1\. **Generating True Randomness on Computers**

While computers are fundamentally deterministic machines, they can leverage physical processes to produce true randomness. These processes are rooted in natural phenomena that are acpepted as inherently unpredictable, making them ideal for generating high-quality random numbers. Computers rely on **entropy**—unpredictable input from the environment or hardware—to generate true randomness. Common sources include:

-   **Thermal Noise**: The random motion of electrons in a conductor, caused by thermal energy, generates electrical noise. Hardware components, such as resistors or diodes, measure this noise and digitize it into random bits.
-   **Radioactive Decay**: Quantum mechanics governs the decay of radioactive isotopes, making the exact moment of decay unpredictable. Hardware designed to detect and measure these decay events can produce random numbers.
-   **Photonic Noise**: Quantum fluctuations in light, such as the behavior of photons passing through a beam splitter, result in unpredictable outcomes. Quantum random number generators (QRNGs) often use this principle.
-   **Clock Drift and Timing Jitter**: Variations in the timing of clock cycles, caused by noise or imperfections in hardware, provide an additional source of entropy. This method is particularly useful for general-purpose computing.

Modern systems often include specialized components called hardware random number generators **(HRNGs)**. HRNGs measure physical phenomena, convert the results into digital random numbers, and provide a reliable source of entropy for secure applications. For e**xample**, Intel’s RDRAND instruction, available in many modern CPUs, accesses an onboard HRNG to supply true random numbers directly to software.

Despite their benefits, true random number generators come with limitations. Measuring physical processes takes time, making true random number generation **slower** compared to pseudorandom methods. Raw entropy from physical sources can be **biased** (e.g., generating more 0s than 1s). To address this, systems use algorithms like hashing or “whitening” to balance the output. HRNGs require specialized hardware, which may not be available on all devices. This can limit their practicality in resource-constrained environments.

To overcome the limitations of true randomness, most systems use a hybrid approach. A small amount of true randomness is combined with pseudorandom generators to produce large volumes of random numbers efficiently. Operating systems like Linux maintain **entropy pools,** collecting random data from various sources such as keyboard presses, mouse movements, and hardware noise. This entropy is used to seed pseudorandom number generators, ensuring high-quality randomness.

## **2\. The Foundations of Pseudorandomness: PRGs**

Pseudorandomness is the property of a sequence to **appear random** to any observer who lacks the initial “seed” or insight into the generator’s mechanics. While true randomness relies on unpredictable physical phenomena, pseudorandomness achieves a similar outcome through mathematical algorithms. These algorithms ensure that the output satisfies statistical tests for randomness, even though it is fully deterministic. For instance, a pseudorandom sequence might be indistinguishable from a truly random sequence when evaluated by efficient statistical tests.

### **Pseudorandom Generators (PRGs)**

At the heart of pseudorandomness lies the pseudorandom generator (PRG), a remarkable construct that allows deterministic systems to simulate randomness. A pseudorandom generator $G$ is a deterministic, polynomial-time algorithm that takes a short random seed $s \in {0,1}^n$ as input and produces a longer string $G(s) \in {0,1}^{\ell(n)}$, where $\ell(n) > n$. The key properties of a PRG are:

-Expansion: The length of the output $\ell(n)$ is greater than the length of the input $n$.

-Pseudorandomness: The output $G(s)$ is computationally indistinguishable from true randomness. No efficient adversary can distinguish $G(s)$ from a random string of the same length with significant advantage.

The seed $s$ serves as the starting point for generating pseudorandom sequences. It provides the necessary entropy, and its randomness determines the quality of the output. As an example on expansion, a PRG based on linear feedback shift registers (LFSRs) or cryptographic hash functions may use iterative transformations to produce the desired length.

A fundamental property of PRGs is that the _**same seed** will always produce the **same** pseudorandom **sequence**_, enabling **reproducibility** in simulations and experiments. For a pseudorandom generator to be effective, its output must “look random” under specific criteria. Depending on the context, the precise meaning of “looking” can vary greatly. For non-cryptographic applications, the sequence should pass standard statistical tests, such as uniformity or independence checks. For cryptographic uses, it usually means that the sequence must resist **all polynomial-time distinguishers**, ensuring that even adversaries with substantial computational resources cannot differentiate the output from true randomness.

As an example, consider a simple cryptographic construction: a seed $s \in \\{0,1\\}^{128}$ is processed through a series of hash functions, each generating a segment of the final output. For instance, one might define a generator $[G(s)=H(s∥1)∥H(s∥2)∥…∥H(s∥k)$, where $H$ is a cryptographic hash function. This gives as output a 1024-bit pseudorandom sequence $G(s)$. This process ensures that even though the transformation is deterministic, the resulting sequence **appears random**_ to anyone without knowledge of the seed.

#### Understanding “_Looks Random_” in Pseudorandom Generators

While a PRG is deterministic and therefore fundamentally incapable of generating true random sequences, its utility lies in how **indistinguishable** its output is from a truly random sequence.

Suppose we have a seed $s$ chosen randomly from the set $\\{0,1\\}^{n}$, where $n$ is the length of the seed. The PRG $G$ takes this seed and produces a longer string $G(s)\in \{0, 1\}^{l(n)}$, where $l(n)>n$. This expansion is achieved deterministically, based on the algorithm of $G$.

The key question becomes: can $G(s)$ pass for a **uniformly random string** of length $l(n)$? In other words, is $G(s)$ **indistinguishable** from a random string of the same length, at least to any computationally bounded observer? Even though $G(s)$ can “look random,” i**t cannot be truly uniform** due to the deterministic nature of its generation. The set of possible outputs $\{G(x) \mid x \in \{0,1\}^n\}$ is much smaller $2^n$ than the set of all possible strings of length $l(n)$, $2^{l(n)}$. This gap inherently means the distribution cannot be fully uniform. However, PRGs aim to ensure this distinction is **computationally infeasible** to detect.

The notion of “looking random” splits into two main domains: non-cryptographic and cryptographic applications. For non-cryptographic uses, such as simulations or randomized algorithms, it suffices that the output of the PRG passes certain **statistical tests.** These tests ensure that the distribution mimics the properties of a truly random source. For example, half of the output bits should be 1s, on average, the parity of the output should be evenly distributed between $0$ and $1$. Such statistical tests are often computationally simple and aim to validate properties like **uniformity and independence**. In cryptography, the stakes are significantly higher. The PRG’s output must pass all polynomial-time tests with very high probability. This requirement is necessary because adversaries, given enough computational power, might exploit subtle patterns in the output to break the cryptosystem.

With this, one may formulate a strong formal cryptographically relevant definition for a PRG as follows. A pseudorandom generator $G$ is a deterministic, polynomial-time algorithm that takes a short random seed $s \in {0,1}^n$ as input and produces a longer string $G(s) \in \\{0,1\\}^{l(n)} $, where $l(n) > n$. The key properties of a PRG are:

Apart from cryptography, PRGs find applications in **simulations** and **randomized algorithms.** Scientific modeling often requires vast quantities of randomness to replicate natural processes or test probabilistic systems. PRGs provide a practical alternative to true random sources, offering speed and reproducibility. **Randomized algorithms**, which rely on chance to improve efficiency or guarantee results, similarly depend on PRGs to inject controlled randomness into their operations.

Pseudorandom generators play a critical role in modern cryptography. They enable the generation of long cryptographic keys from short seeds, ensuring secure communication protocols without requiring continuous access to true randomness. **Stream ciphers**, widely used in encrypting data streams, rely on PRGs to generate pseudorandom keystreams.

## **3\. Pseudorandom Generators (PRGs) and Encryption**

A pseudorandom generator $G$ can be used to construct a semantically secure encryption scheme.

### **_Theorem: PRGs and Encryption_**

The encryption is defined as $\text{enc}(k, m) = G(k) \oplus m$, and decryption as $\text{dec}(k, c) = G(k) \oplus c$, where $k$ is the key, $m$ is the plaintext message, and $c$ is the ciphertext. This encryption scheme is _seminatically secure_ (CPA) under the assumption that $G$ is a cryptographically secure pseudorandom generator.

Before the proof, we define semantic security for the sake of completeness.

##### Definition: Semantic Security

An encryption scheme is **semantically secure** if no probabilistic polynomial-time adversary $A$ can distinguish between the encryptions of two chosen plaintexts with a non-negligible advantage. Formally, for any adversary $A$, given an encryption oracle $\text{enc}(k, \cdot)$ (where $k$ is a randomly chosen key), and any two plaintext messages $m_0$ and $m_1$, the following probability holds:

$$\left| \Pr[A(c) = b \mid b \in \{0, 1\}, c = \text{enc}(k, m_b)] - \frac{1}{2} \right| \leq \text{negl}(n)$$

where $c$ is the ciphertext generated by encrypting $m_b$ with the secret key $k$, $b$ is a randomly chosen bit ($b \in {0, 1}$), and $\text{negl}(n)$ is a negligible function in the security parameter $n$.

Semantic security ensures that an adversary, even with full control over which plaintexts are encrypted, cannot deduce any information about which plaintext corresponds to a given ciphertext. The encryption leaks no meaningful information about the original plaintext, apart from its length.

A cryptosystem is **CPA-secure** if it remains semantically secure even when the adversary can choose plaintexts and receive their corresponding ciphertexts from an encryption oracle. The formal definition ensures that an adversary cannot distinguish between the encryptions of two chosen plaintexts $m_0$ and $m_1$, as described earlier under semantic security.

A cryptosystem is **CCA-secure** if it remains semantically secure even when the adversary is granted **access to a decryption oracle that can decrypt any ciphertext _except the challenge ciphertext_**. Formally, a scheme is CCA-secure if for any probabilistic polynomial-time adversary $A$, given access to a decryption oracle $\text{dec}(k, \cdot)$ (where $k$ is the decryption key) and a challenge ciphertext $c^*$, the adversary cannot distinguish the underlying plaintexts with non-negligible advantage:

$$\left| \Pr A(c^*) = b \mid c^\star = \text{enc}(k, m_b) - \frac{1}{2} \right| \leq \text{negl}(n)$$



where the adversary is not allowed to query the oracle with $c^*$ itself.


### _Proof Sketch_

The proof relies on a reduction technique. Suppose there exists an adversary $A$ capable of distinguishing between the encryptions of two chosen plaintexts with a non-negligible advantage $\epsilon$. The goal is to use this hypothetical adversary to construct another adversary, $D$, that can distinguish the output of the pseudorandom generator $G$ from truly random strings. If $D$ succeeds, this would contradict the assumption that $G$ is cryptographically secure.

To accomplish this, the reduction works as follows. The adversary $D$ is given an input string $x$, which is either the output of $G$ or a truly random string. $D$ uses this input as if it were the key in the encryption scheme. Specifically, $D$ chooses a bit $b \in \{0,1\}$ and $m_b$, which is one of the challenge plaintexts $m_0, m_1$, and computes a ciphertext $c = x \oplus m_b$, then feeds $c$ to $A$.

The encryption adversary $A$ returns a bit $b'$, which is its guess for the index of the plaintext corresponding to $c$. If $b = b'$, i.e., if $A$'s guess was correct, $D$ guesses that $x$ is a pseudorandom output of $G$. If $b \neq b'$, i.e., $A$ guessed wrong, then $D$ guesses that $x$ is a truly random string, leading to $c$ not being a legitimate ciphertext of the encryption scheme.
Now, if the string $x$ is truly random, so is the ciphertext $c$, and the adversary $A$’s guess $b'$ for the bit $b$ is also random, having a probability $1/2$ of being correct. However, if the string is an output of the PRG $G$, then the encryption adversary $A$ has, as per the assumption, a probability $0.5 + \epsilon$ (advantage $\epsilon$) of guessing $b$ correctly. This lends $D$ the same advantage in guessing whether $x$ is truly random or pseudorandom.

Thus, if $A$ has a non-negligible advantage $\epsilon$ in breaking the encryption scheme, this advantage transfers to $D$, allowing it to break the pseudorandomness of $G$. This leads to a contradiction, as $G$ is assumed to be a secure pseudorandom generator. Therefore, no adversary can distinguish the ciphertexts from random noise with non-negligible probability, proving the semantic security of the encryption scheme.


### _Remarks_

In the proof, the adversary designed to break the PRG plays a dual role. This adversary effectively transforms into a challenger for the encryption adversary, creating a bridge between the two security notions. This transformation ensures that any adversary breaking the encryption scheme can also be used to distinguish the output of a PRG from true randomness.

One critical aspects of this construction is that all operations, including the PRG, encryption, and adversarial attacks**, occur within polynomial time**. This ensures the feasibility of both the security guarantees and the adversary simulations within realistic computational bounds.

The key takeaway from the result is that cryptographically secure PRGs guarantee computationally secure encryption schemes. This means that the broader problem of finding a secure encryption scheme can be simplified into finding a cryptographically secure PRG. If, at any point, the PRG is discovered to be insecure, it can be replaced with a new, secure PRG without requiring a complete overhaul of the encryption scheme. This modularity makes the construction resilient to potential breakthroughs in cryptanalysis or computational advancements.

A general principle emerges from this approach: given a secure system that requires a long secret key, we can replace the long key with a shorter one by using a PRG. The PRG expands the shorter key into a pseudorandom string that serves as a substitute for the longer key, maintaining the system’s security properties.

## **4\. Constructions of PRGs**

### PRGs from one-way functions

One of the foundational results in cryptography is that **a PRG can be constructed from any one-way function**. A one-way function is a mathematical function that is easy to compute but infeasible to invert. This theoretical result, developed by _HILL_ (Håstad, Impagliazzo, Levin, Luby), provides a robust framework for constructing PRGs.

The definition of **one-way functions** precisely corresponds to problems classified as $\text{NP} \setminus \text{P}$, for which finding a solution is computationally hard, but verifying a solution is computationally efficient. For instance, given $y = f(x)$, determining $x$ such that $f(x) = y$ should be infeasible in polynomial time, even though verifying $f(x) = y$ is straightforward. 

If $\text{P} = \text{NP}$, one-way functions cannot exist, as all problems in $\text{NP}$ would be solvable efficiently. While no function has been definitively proven to be one-way, candidates such as the integer factorization function $f(p, q) = p \cdot q$, where $p$ and $q$ are primes, provide strong conjectural support.


The HILL construction is considered elegant because it leverages the minimal assumption of one-way functions to derive pseudorandomness. However, the construction is often impractical due to inefficiencies in its transformation process. The proof is non-trivial and involves several steps that transform a one-way function into a PRG. It leverages the concept of **_hardcore predicates_**, which are bits of information about an input that are computationally indistinguishable from random given the OWF’s output.

The construction starts with a one-way function $f$, derives a hardcore predicate $b(x)$ using the **Goldreich-Levin theorem**, and iteratively applies $f$ to generate a sequence of pseudorandom bits. Each step extracts a hardcore bit while updating the input with $f(x)$ producing a pseudorandom output string longer than the initial seed. The security of this PRG is proven by contradiction: if an adversary could distinguish the PRG’s output from true randomness, it would imply either the ability to invert $f$ or predict the hardcore predicate, both of which contradict the assumptions.

Interestingly, the chain of implications works in reverse as well: *The existence of computationally secure encryption schemes implies the existence of one-way functions.* Assume we have a computationally secure encryption scheme $\Pi$ defined by $\text{Enc}(k, m)$ and $\text{Dec}(k, c)$, where $k$ is the key, $m$ is the plaintext, and $c$ is the ciphertext.


Assume we have a computationally secure encryption scheme $\Pi$ defined by $\text{Enc}(k, m)$ and $\text{Dec}(k, c)$, where $k$ is the key, $m$ is the plaintext, and $c$ is the ciphertext.

The encryption scheme satisfies semantic security, meaning that no polynomial-time adversary can distinguish between the ciphertexts of two plaintexts with non-negligible probability. 

To construct a one-way function $f(x)$ from this encryption scheme, consider defining:

$$
f(x) = \text{Enc}(x, 0)
$$

Here, $x$ plays the role of the encryption key, and the fixed plaintext $0$ is encrypted using $x$. The output $f(x)$ is the ciphertext produced by encrypting the plaintext $0$ with the key $x$.

One notable aspect of PRG constructions is their modularity. If a PRG is found to be insecure, it can often be replaced by a new PRG without re-engineering the entire cryptosystem. This modular design aligns with cryptography’s broader goals of flexibility and future-proofing against advancements in computational capabilities.

### Practical Pseudorandom Generator (PRG) Constructions

Pseudorandom Generators (PRGs) are indispensable tools in cryptography, providing secure, efficient ways to generate random-looking outputs for applications like key generation and secure communication. Unlike theoretical constructions, which focus on mathematical guarantees, practical implementations _emphasize computational efficiency_ while relying on **foundational hardness assumptions.**

One class of PRGs is based on number theory. These PRGs derive their security from problems such as integer factorization or discrete logarithms. A notable example is the **Blum–Blum–Shub (BBS)** generator, which produces pseudorandom outputs using **quadratic residues modulo a large composite number** $N = p \times q$. 

It uses two large primes $p$ and $q$ such that $p, q \equiv 3 \ (\text{mod } 4)$. The product $N = p \cdot q$ serves as the modulus. A seed $x_0$ is chosen such that $\text{gcd}(x_0, N) = 1$. The sequence is generated iteratively using the recurrence relation:

$$
x_{i+1} = x_i^2 \ (\text{mod } N)
$$

Output bits $b_i$ are derived from $x_i$, often as $b_i = x_i \ (\text{mod } 2)$. Alternatively, multiple bits may be extracted from $x_i$ for efficiency. The security of BBS is tied to the difficulty of factoring $N = p \times q$, making it extremely secure but computationally intensive. 

**RSA-based PRGs** also fall under this category, employing RSA moduli and cryptographic transformations.


Another approach leverages **symmetric key algorithms**. PRGs like AES in Counter Mode (AES-CTR) **_repurpose block ciphers to generate pseudorandom output_**. In AES-CTR, sequential counters are encrypted under a fixed key, yielding a stream of random-looking blocks. Similarly, HMAC-based PRGs use hash-based message authentication codes to expand a key into pseudorandom outputs. These constructions are widely used in secure communication protocols and random number generation due to their efficiency and security.

**Stream ciphers**, while not classical PRGs, are often used for pseudorandom bit generation. Lightweight designs like **Salsa20 and ChaCha** produce highly efficient, secure pseudorandom streams and are integral to modern encryption protocols, including TLS and VPNs. However, some older stream ciphers, such as RC4, have been deprecated due to discovered vulnerabilities.

**Hash function-based PRGs** utilize cryptographic hash functions like SHA-256 or SHA-3. These constructions rely on the preimage and collision resistance properties of the hash functions to ensure security. 

Iterative hashing schemes and HMAC-based key derivation functions (**HKDFs**) are typical examples, often used for entropy expansion or key derivation. In iterative hashing, a seed $s$ is repeatedly hashed:

$$
x_1 = H(s), \quad x_2 = H(x_1), \quad \dots
$$

producing a pseudorandom output sequence. In HMAC-based PRGs, a keyed hash function like HMAC-SHA-256 expands the seed into pseudorandom outputs suitable for cryptographic applications.

---

The **Linear Feedback Shift Register (LFSR)** is a pseudorandom generator defined using a recurrence relation. Its state is represented as a vector:

$$
S = (s_0, s_1, \dots, s_{m-1})
$$

where $m$ is the number of bits in the register. At each step, the state is updated by the recurrence:

$$
s_{i+m} = c_0 s_i \oplus c_1 s_{i+1} \oplus \dots \oplus c_{m-1} s_{i+m-1}
$$

where $\oplus$ denotes the XOR operation, and $c_j \in \{0,1\}$ are coefficients derived from a feedback polynomial.

A key feature of LFSRs is their **periodicity**. For a primitive polynomial, the sequence has the maximum possible period $2^m - 1$. However, LFSRs are **not cryptographically secure**; their deterministic output allows an adversary to reconstruct the internal state after observing a sufficient number of output bits.

Lastly, **lattice-based PRGs** draw from the hardness of problems like **Learning With Errors (LWE)**. These constructions, which are resistant to quantum attacks, are particularly relevant for **post-quantum cryptography**. They rely on the hardness of lattice problems, particularly the LWE problem.

The LWE problem involves solving a system of noisy linear equations. Specifically, given a matrix $A$, a secret vector $s$, and a noise vector $e$, the goal is to distinguish the vector:

$$
A \cdot s + e
$$

from uniformly random values. The difficulty of solving this problem underpins the security of LWE-based PRGs.

An LWE-based PRG typically starts with a secret seed $s$, which is used to generate pseudorandom bits by applying the LWE process iteratively. The pseudorandom outputs are indistinguishable from truly random strings under the assumption that the LWE problem is computationally intractable.


| **PRG** | **Foundation** | **Key Characteristics** | **Applications** |
| --- | --- | --- | --- |
| **Blum Blum Shub (BBS)** | Hardness of factoring large composite numbers | Based on quadratic residues in modular arithmetic; provably secure; computationally expensive. | Cryptographic protocols where theoretical security is prioritized over efficiency. |
| **Linear Feedback Shift Registers (LFSRs)** | Linear algebra and polynomials over finite fields | Produces sequences via shift-and-feedback mechanisms; lightweight but not secure unless enhanced. | Resource-constrained environments, lightweight cryptographic tasks, hardware implementations. |
| **AES in Counter Mode (AES-CTR)** | Security of the AES block cipher | Encrypts counter values with AES; highly efficient and secure as long as AES remains unbroken. | Secure random number generation, encryption protocols, secure communications. |
| **RC4 Stream Cipher** | Permutation-based key scheduling | Generates pseudorandom keystreams efficiently but has known vulnerabilities in certain implementations. | Previously used in SSL/TLS and WEP; replaced in modern cryptographic standards due to weaknesses. |
| **Hash-based PRGs** | Cryptographic hash functions (e.g., SHA-256, SHA-3) | Utilizes hash functions’ resistance to collisions and preimage attacks; simple and secure. | Key derivation functions, cryptographic randomness generation, and password hashing. |