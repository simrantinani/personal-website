---
title: "Compilation, Interpretation, and Typing"
author: "Simran Tinani"
date: 2025-05-28
categories: ["Theoretical Computer Science"]
#tags: ["compilation", "interpretation", "typing", "language internals", "runtime"]
draft: false
math: true
summary: "A beginner's attempt at understanding code compilation, interpretation, and typing."
---
## Motivation

The motivation for exploring this topic came from a few recent, incidental encounters with programming language theory, and again more directly when I decided to learn some Java in my free time. While reading overviews of the language and trying to figure out how to get started, I ran into a cluster of unfamiliar terms: “statically-typed,” “compiled,” “hybrid execution model,” “bytecode,” “JVM,” “interpretation,” and “Just-in-Time (JIT) compilation.”

I’ve never really looked into the theory behind programming languages. I’ve mostly used them to get things done and moved on. The details of what happens between writing and running code, like compilation or typing, never seemed necessary to understand. But this time, the terminology caught my attention. What makes the code execution of Java different from Python, which is the language I usually reach for, but whose inner workings I don't quite understand either?

That was the starting point for a broader attempt to figure out how programming languages are actually executed, and what technical systems make that possible. Understanding how code actually runs involves grasping a number of ideas: compilation, assembling, linking, interpretation, bytecode, virtual machines, type systems, and likely a lot more. For someone new to this layer of detail, it can be hard to tell what each term means or how they relate. 

What does it mean for code to be compiled or interpreted? What role does a virtual machine play? What are types, when are they "checked", and why does it matter? This article follows a practical path through these concepts, starting from the fundamental question of how high-level code eventually results in actions performed by a computer.

## Compilation

Source code written in a high-level programming language cannot be executed directly by a CPU. It must first be translated into machine code by a compiler.

A **compiled language** is one in which programs are converted from source code into machine code before execution. This translation, which is done by a **compiler**, produces an executable file that can be run by the operating system without needing the original source code. Because the translation occurs ahead of time, execution is typically faster than in interpreted languages. Compile-time error checking also helps catch issues such as syntax errors and type mismatches early in the development process.

In compiled languages such as C or Rust, the process generally involves the following stages:

1. **Preprocessing** (if applicable): Handles macro expansion, file inclusion, and conditional compilation.
2. **Compilation (Front-End)**: Performs lexical analysis, parsing, and semantic analysis. The source code is translated into an intermediate representation (IR), a simplified, platform-independent code structure that is easier for the compiler to analyze and optimize.
3. **Optimization**: The compiler applies transformations to the IR to improve performance or reduce code size. This may include loop unrolling, inlining, constant folding, and other techniques.
4. **Assembly**: Converts the optimized IR into assembly code, which is then translated into machine code, resulting in object files.
5. **Linking**: Combines object files and resolves external references to produce a complete executable.
6. **Loading**: Performed by the operating system, this stage prepares the executable for execution by allocating memory and setting up the runtime environment.

Compiled languages offer strong performance, efficient use of system resources, and early error detection, which makes them suitable for applications where speed and reliability are critical.

## Interpretation

An **interpreted language** is one in which programs are typically executed line by line or in small chunks, without the need for prior compilation into a standalone executable. In interpreted languages, source code is not directly translated into machine code ahead of time. Instead, it is executed by an **interpreter**, which reads and processes the code at runtime. 
This allows for greater flexibility, easier debugging, and faster iteration during development. However, the trade-off is typically slower execution speed compared to compiled languages, since much of the work is done at runtime.

In interpreted languages such as Python or JavaScript, the execution process generally involves the following stages:

1. **Lexical Analysis**: The interpreter scans the source code and converts it into tokens.
2. **Parsing**: The token stream is analyzed to produce an abstract syntax tree (AST) representing the program’s structure.
3. **Semantic Analysis**: The AST is checked for type correctness and logical consistency.
4. **Interpretation or Bytecode Generation**:
   - In pure interpretation, the AST or source code is executed directly.
   - In hybrid systems, the source code is first compiled into bytecode, which is then executed by a virtual machine (e.g., the Python interpreter or JavaScript engine).
5. **Execution**: The interpreter executes the code, handling control flow, memory management, and runtime decisions on the fly.

In interpreted languages, the stages of execution may not be as visible to the user. For example, when running a Python script using `python script.py`, it may appear as if no compilation is taking place. However, internally, Python source code is first compiled into **bytecode**—a lower-level, platform-independent representation of the code. This bytecode is then executed by the **Python Virtual Machine (PVM)**. The PVM interprets bytecode by decoding and executing each instruction sequentially. Java follows a similar approach: source code is compiled into `.class` files containing bytecode, which are executed by the **Java Virtual Machine (JVM)**. The JVM starts by interpreting bytecode, but also includes a **Just-in-Time (JIT) compiler**.

The JIT compiler identifies frequently executed sections of code and compiles them into native machine code during runtime. This improves performance by reducing the overhead of repeated interpretation. Some systems also use **ahead-of-time (AOT) compilation**, where bytecode or source code is compiled into native code before execution begins. This can improve startup time and performance predictability at the cost of flexibility.


## Hybrid Execution Models

It is important to note that the classification of a language as "compiled" or "interpreted" often reflects its most common implementation strategy, not a fixed property of the language itself. For instance, Python is typically interpreted, but tools like **Cython**, **Nuitka**, or **PyInstaller** allow Python code to be compiled. Similarly, Java is both compiled (to bytecode) and interpreted or JIT-compiled at runtime.

Many modern language runtimes combine both interpretation and compilation to take advantage of the strengths of each approach. These include:

- **Java Virtual Machine (JVM)**: Initially interprets bytecode and uses Just-in-Time (JIT) compilation to convert frequently executed paths into native machine code for improved performance.
- **PyPy**: An alternative Python implementation that incorporates a JIT compiler to speed up Python programs by compiling hot code paths during execution.
- **JavaScript engines (e.g., V8, SpiderMonkey)**: Employ multiple tiers of execution, starting with fast interpretation for quick startup, followed by baseline compilation and optimizing JIT compilation for hot code paths.

These hybrid systems are designed to balance startup latency, memory usage, and execution speed. 

## Static and Dynamic Typing

**Type checking** is the process of verifying that operations in a program are applied to compatible data types. This can occur either before execution (static typing) or during execution (dynamic typing), depending on the language and its implementation. The enforcement of type rules can be handled in several places within a toolchain:

- Within a compiler front-end, as in statically typed compiled languages like Rust or C.  
- Within a runtime verifier, as in the JVM, which includes a bytecode verifier that ensures type safety before execution begins.  
- Within external tools, such as `mypy` or `pyright` for Python, which check type annotations according to user-specified rules.


- **Statically typed languages**, such as C, Java, or Rust, perform type checking at compile time. The compiler ensures that variables are used consistently according to their declared types. This allows many errors to be detected early and can enable optimizations that improve performance.
- **Dynamically typed languages**, such as Python or JavaScript, determine type information at runtime. Variables can hold values of any type, and type-related errors (e.g., adding a number to a string) are detected only when the code is executed.

Static typing can improve code safety, tooling support, and maintainability. It does not necessarily require compilation to native code. For example, **TypeScript** is statically typed but is compiled to JavaScript, a dynamically typed language that is interpreted or JIT-compiled. Even dynamically typed languages perform some type enforcement at runtime to ensure that invalid operations are detected and reported.

Static vs. dynamic typing and compiled vs. interpreted are separate dimensions of how programming languages are designed and implemented. Both are independent classifications, useful for understanding performance characteristics, error detection, and development ergonomics.

## Additional Considerations

Beyond compilation and typing, several other factors influence a language's practical behavior and design trade-offs:

- **Memory management**: Ranges from manual (C) to garbage-collected (Java) to borrow-checked (Rust).  
- **Concurrency models**: Includes threads, async/await, actor-based systems, and others.  
- **Tooling ecosystems**: Encompasses linters, build tools, language servers, and type checkers.  
- **Security guarantees**: May involve sandboxing, capability safety, or static verification.


## Conclusion

This article touched on the basic mechanisms behind how code is executed, focusing on the distinctions between compilation and interpretation, and between static and dynamic typing. Compiled languages typically translate source code into machine code ahead of time, enabling faster execution and early error detection. Interpreted languages, on the other hand, execute code at runtime, often offering more flexibility and easier debugging. In practice, many modern runtimes use a hybrid approach and often include Just-in-Time (JIT) compilers.

Typing systems also vary. Statically typed languages enforce type rules before execution, while dynamically typed languages perform these checks at runtime. Tools like TypeScript and type hinting in Python show that static and dynamic typing can coexist in the same ecosystem.

Overall, compilation, interpretation, and typing are not rigid categories but common patterns in how languages are implemented. Understanding them helps explain how code runs, and why different languages make different trade-offs.








