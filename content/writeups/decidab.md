---
title: "Decision Problems — Decidability, Verifiability, and Complexity Classess"
author: "Simran Tinani"
date: 2025-02-01
categories: ["Theoretical Computer Science"]
#tags: ["decidability", "complexity", "np-complete", "p-vs-np"]
draft: false
math: true
summary: "An introduction to decision problems, algorithmic solvability, and complexity theory, with a focus on decidability, verifiability, and the P vs NP landscape."
---


While studying a course on formal methods in information security, I ended up spending a Saturday brushing up some concepts of theoretical computer science, and also refining and deepening my understanding of them. Indeed, having studied these many years ago as a mathematics undergrad, the same ideas are a lot more meaningful and fascinating now that I have a lot more context. They say the best way to learn is to teach; probably the second best way is to write things down trying to explain them to a stranger. So, I put together my important takeaways in this blog post, in which I cover the meaning of a problem, algorithm and program within computer science, the concepts of decidability, non-decidability, and verifiability of a problem, and finally, the description of the most well-known complexity classes. The last of these is something that I’ve read up on and subsequently forgotten about countless times, so hopefully I’ve been able to formulate it in a way that is easy to remember.

## Problems, algorithms and programs

A **problem** is simply a formal task to be performed, which can be described purely in terms of inputs and matching outputs, without any constraints on the method of the solution. Problems can be viewed as **functions** in the mathematical sense, since they deterministically map an input in a domain of values to a well-defined output in a range of values. Different instances (function paramateres/problem inuts) of the same problem might generate the same output, but any problem instance (fixed inputs) must always result in the same output every time the function is computed using that particular input. The term “answer to the problem” is used synonymously with the term “output of the function”. Further, true (resp. false) and yes (resp. no) answers are used interchangeably.

An **algorithm** is a process followed to solve a problem, which satisfies a certain set of properties. In general, an algorithm makes sense only in the context of its corresponding problem/function. Otherwise, by itself, every algorithm implements some function, since it maps every input to some output. Thus, an algorithm must firstly be correct, i.e. produce the intended output of its corrsponding problem/function. Secondly, an algorithm comprises a series of concrete steps, performable unambiguously by a machine, in a finite amount of time. Further, there should be a clear and unambiguous sequence in which these steps are performed, and the number of these steps should be finite. Finally, an algorithm must terminate, i.e. not go into an infinite loop. An algorithm-like entity that does terminate is called a procedure or process or computation specification. A procedure that doesn’t halt for certain inputs can be considered partial algorithms.

If the problem is viewed as a function, then an algorithm is a step-wise implementation for the function that transforms an input to the corresponding output. A problem can be solved by many different algorithms, but a given algorithm solves only one problem (i.e., computes a particular function).

A **computer program** is an instantiation (concrete representation) of an algorithm/procedure in some programming language. An algorithm can be implemented in many different computer languages, and so can be instantiated by many programs. By definition, an algorithm must provide sufficient detail that it can be converted into a program when needed. While the terms “algorithm” and “program” are often used interchangeably, not every program meets the technical definition of an algorithm, since not every program terminates.

A **decision problem** is a computational task that decides (deterministically) if its input possesses a certain property and accordingly outputs either “true” or “false”. In other words, in the terminology from above, a decision problem is a problem with a “true” or “false” output. As a function, its output range is the set of values “true” and “false”. $P$ and $NP$ are classes of decision problems.


An algorithm that produces the correct decision for a decision problem for **every** input is called a **decision procedure** for that problem. Given a decision problem, a corresponding decision procedure may or may not exist.

A **decidable** problem is a problem for which a (at least one) corresponding decision procedure exists. In other words, decidable problems are the problems for which we can always construct some algorithms to answer correctly. The mathematical function formulating a decidable problem is called a computable function. Decidable problems are a subset of solvable problems, which comprise the set of all problems whose solution can be implemented as an algorithm, which takes in their inputs and outputs the intended values.

Examples of decidable problems include checking whether a number is even or odd, checking whether a given string is a palindrome, checking whether a given graph is connected, verifying whether a given regular expression matches a string, checking if a number is a term of the Fibonacci sequence.

An undecidable problem is a problem for which no decision procedure exists. In other words, a problem $X$ is undecidable if there exists a _proof_ that it is impossible to construct an algorithm that **always** correctly outputs a “true” or “false” answer for $X$. Note that the “always” in the previous sentence is crucial to the definition. Indeed, there may exist a proper subset of possible inputs of an undecidable problem for which an algorithm can be constructed, which always produces the correct outputs on this subset. The important thing is that this algorithm does not work on all inputs.

Some undecidable problems possess a semidecision procedure, i.e. an algorithm that correctly outputs “true” but fails to terminate in cases where “false” should be output. Undecidable problems are a subset of unsolvable problems, which comprise the set of all problems problem $P$ for which a corresponding algorithm solving P does not exist.

### Halting Problem: An example of non-decidability

The Halting Problem is the problem of determining whether a computer program terminates on a given input.  As a function, the **halting problem** _halts_ takes two inputs: the description $D$ of an arbitrary [computer program](https://en.wikipedia.org/wiki/Computer_program), and its input $I_D$, and outputs “true” if the program terminates on the input $I_D$, and “false” if it continues to run forever.

The Halting problem is well known to be an undecidable problem. This means that there exists no general algorithm that solves the halting problem for all possible program–input pairs $(D, I_D)$. This may be proved by contradiction as follows. Assume that the Halting Problem is decidable, i.e. that the function $halts$ is computable by an algorithm that outputs the right answer for all possible inputs i and x. Consider the following program G with an empty input. If $Halts(G)$ (i.e. the output of Halts with input G) is false, G returns 0, and if it is true, G loops forever. 

Now, if $Halts(G)$ returns true, then $G$ will call loop forever and never halt, which is a contradiction. If $halts(g)$ returns false, then $g$ will halt with output $0$; this is also a contradiction. Overall, $G$ does the opposite of what Halts says $G$ should do, so $Halts(G)$ can not return a truth value that is consistent with whether $g$ halts. Therefore, the initial assumption that $Halts$ is a total computable function must be false.

This proof is a mere non-rigorous sketch, and has a number of issues, one of which is that the definition of $G$ is [self-referential](https://en.wikipedia.org/wiki/Self-referential), i.e. that $G$ is defined through the value of Halts(G). A rigorous proof addresses these issues but is outside the scope of this article.

## Verifiability

Above, we saw what it means for a problem to be decidable. Another important concept is that of verifiability. Let P be a decision problem and I be an instance of inputs to P. Suppose that the solution to this instance of P is “yes” and a proposed solution W is provided to attest to the validity of this “yes” (such a solution is called a witness or certificate). It is not yet known if W indeed provides such an attestation or not.

A **yes-verifier** for the instance I is an algorithm V which takes the ordered pair $(I, W)$ as input and returns “yes” if the witness $W$ indeed **proves** that the answer to $I$ is “yes”, and “no” if $W$ does not prove this. Given an instance $I$ and $P$, a witness $W$ and a verifier $V$ may or may not exist. When they do, this instance of the problem is said to be verifiable. If a fixed verifier algorithm $V$ exists for which each “yes” instance $I$ of $P$ has some witness $W$, then the problem $P$ is called verifiable.

In other words, a decision problem $P$ is said to be yes-verifiable if there exists an algorithm $$V$ (verifier) such that for every “yes” instance $I$ of $P$, there exists a witness $W$ such that $V(I,W)$ returns the output “yes”, and for every “no” instance $J$ of $P$ and every witness $W$, $V(J,W)$ returns the output “no”.

Note that the verifier only checks if the witness proves the output of P: if W does not prove the “yes” answer, the verifier does not say anything about whether the answer to P is yes or no.

No-verifiers are defined analogously.

## P, NP, NP-Hard and NP-Complete

Decidable problems can be further classified according to the efficiency of decision procedures existing for them. **Complexity** is a measure of the number of elementary operations (e.g., additions, bit operations) to decide (solve) a decidable problem. An algorithm is said to be efficient if it runs in polynomial-time. The formal definition of this is out of the scope of this article, but roughly speaking, it means that the time taken by the algorithm grows relatively slowly with respect to the size of the input.

The class _**P**_ comprises the decision problems that are **decidable** and for which an **efficient** algorithm exists to solve them. Since P only deals with decision problems, not all problems that can be solved in polynomial time are P.

The class **_NP_** comprises decision problems that are **decidable** and for which an efficient **yes-verifier** exists. As explained above, this means that NP is the [set](https://en.wikipedia.org/wiki/Set_(mathematics)) of decision problems for which the problem instances whose solution is “yes” have proofs that are verifiable in polynomial time.

Clearly, any problem in **_P_** is also in **_NP_**, i.e. **$P\subseteq NP$**. The reverse of this statement is an open problem, i.e. it is not known whether $P=NP$. It is strongly believed that this statement is false, i.e. that **$P≠NP$**.

For example, consider subset sum problem: given a set of weights of known weight, can you pick a set of weights that weighs exactly some amount k? It may not be straightforward to figure out if such a set of weights exists whose weights add up exactly to k. However, given a set of weights that claim to be a witness to a “yes” solution, i.e. a set of weights from the set that should add up to k, it is easy to verify whether or not they actually add up to k or not. Therefore, this problem is in NP but may not be in P.

The class of decidable problems with such verifiers for the “no”-answers is called **_co-NP._**

Suppose that a decision problem H is such that any problem in NP is reducible to H in polynomial time complexity. The class of **_NP-Hard_** problems comprises all such problems H. Thus, any NP-Hard problem is at least as difficult as any of the problems in NP. Note that NP-hard problems need not even be decidable. In fact, the undecidable Halting Problem described above is an example of an NP-hard problem.

Finally, the set of **NP-complete** problems comprises the set of all NP-Hard problems that also lie inside NP. That is, all problems that any other NP problem is reducible to in polynomial time, and whose solution is still verifiable in polynomial time.

Up to this point, all algorithms for solution and verification are automatically assumed to be deterministic, or, to run on a deterministic Turing machine. However, there also exists the concept of a nondeterministic Turing machine, which can use randomness to output different answers with different probabilities. A nondeterministic algorithm may use this source of non-determinism to make guesses of solutions and then using verification algorithms to check if they are indeed solutions. In fact, it can be proven that if solutions to a problem can be efficiently verified,  
then the problem can also be efficiently solved if nondeterminism may be used. It is therefore equivalent for a problem to be(efficiently) verifiable on a deterministic Turing machine and to be (efficiently) decidable on a non-deterministic Turing machine. It is important here to note two things. First, the argument in this present paragraph is simply a sketch of the concept, and nowhere near a rigorous proof. Second, the concept of Non Deterministic Turing Machine is purely theoretical and has no practical reality as of today.

## References

-   [https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/AnalPrelim.html#:~:text=To%20summarize%3A%20A%20problem%20is,algorithm%20in%20a%20programming%20language](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/AnalPrelim.html#:~:text=To%20summarize%3A%20A%20problem%20is,algorithm%20in%20a%20programming%20language).
-   [https://pncnmnp.github.io/blogs/P-NP-NP-Complete-NP-Hard.html](https://pncnmnp.github.io/blogs/P-NP-NP-Complete-NP-Hard.html)
-   [https://en.wikipedia.org/wiki/NP-hardness](https://en.wikipedia.org/wiki/NP-hardness)
-   [https://health.uconn.edu/bioinformatics/wp-content/uploads/sites/162/2017/11/Computation\_Complexity\_2016.pdf](https://health.uconn.edu/bioinformatics/wp-content/uploads/sites/162/2017/11/Computation_Complexity_2016.pdf)
-   [https://web.stanford.edu/class/archive/cs/cs103/cs103.1152/lectures/25/Small25.pdf](https://web.stanford.edu/class/archive/cs/cs103/cs103.1152/lectures/25/Small25.pdf)
-   [https://bjc.edc.org/bjc-r/cur/programming/5-algorithms/4-unsolvable-undecidable/2-halting-problem.html?topic=nyc\_bjc%2F5-algorithms.topic&course=bjc4nyc.html](https://bjc.edc.org/bjc-r/cur/programming/5-algorithms/4-unsolvable-undecidable/2-halting-problem.html?topic=nyc_bjc%2F5-algorithms.topic&course=bjc4nyc.html)