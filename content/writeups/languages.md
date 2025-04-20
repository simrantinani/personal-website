---
title: "Understanding the Hierarchy of Computer Languages"
author: "Simran Tinani"
date: 2024-02-01
categories: ["Systems, Applications, Security"]
#tags: ["perceptron", "pocket-algorithm", "linear-classification", "r-programming", "machine-learning", "from-scratch"]
draft: false
math: true
noNumbering: true
summary: "A breakdown of the hierarchy of programming languages, and of the roles of source code, bytecode, assembly, object files, and executables."
weight: 2

---


How do we, as humans, communicate our intent to a machine that only understands binary? The answer lies in programming languages—the translators between human logic and machine execution. Programming languages exist in various levels, each serving specific purposes, from high-level human-readable code to the raw binary instructions a computer executes. This artice explores these levels and how they work together to bridge the gap between us and our computers.


## **Levels of Programming Languages**

The **levels of programming languages** represent a hierarchy of abstraction that bridges the gap between human thinking and machine execution. Each level corresponds to a specific degree of abstraction and functionality, from high-level languages that prioritize human readability to low-level languages that directly interact with hardware. While high-level languages are abstract and focus on human readability and problem-solving, low-level languages represent instructions closer to the form in which they are to be instructed by the machine.

### **Level 1: Machine Code**

At the lowest level of programming lies **machine code**, the fundamental language of binary instructions (1s and 0s) that the CPU directly executes. These instructions dictate the operations performed by the processor, including arithmetic calculations, memory access, and hardware control. Machine code is the foundation upon which all other levels of programming languages are built, translating human logic into precise commands for the hardware.

Machine code is stored as sequences of binary digits, such as `10101000 00101100`, representing operations and data. Each instruction is tied to the specific architecture of the processor, such as x86 or ARM, and machine code written for one type of processor cannot run on another. This architecture-specific nature allows machine code to interact with hardware at an incredibly granular level, enabling maximum performance and efficiency. However, this also makes it challenging to write or read, as it provides no abstractions or human-readable features.

Machine code is indispensable in some fields. Firmware development, which requires precise control over hardware initialization, relies heavily on machine code. Embedded systems, where performance and resource constraints are critical, often involve direct interaction with machine code. Reverse engineering and security analysis frequently require manipulating machine code.

Machine code is rarely written by humans directly. Instead, compilers and assemblers generate it from higher-level languages like C or Python. For example, the C statement `int x = 10;` might ultimately be translated into machine instructions that move the value `10` into a specific memory address.

When an executable file is run, the CPU follows the **fetch-decode-execute** cycle. It first r**eads the file header**, to determine the file format, entry point, and memory layout. **Then, it loads the Code and Data** to Maps the machine code and other components into the computer’s memory. Then, it **links dependencies**, resolving references to external libraries or resources. Finally, it s**tarts Executio**n, directing the CPU to begin executing the machine code at the specified entry point. This seamless process allows complex programs to run effortlessly on modern systems.

#### ****Executable Files and Raw Binary Files****

While machine code lies at the heart of all computer programs, it rarely exists in isolation. Instead, it is encapsulated within files that make it manageable for the operating system and the user. Two primary forms of machine code storage are **executable files** (**`.exe`** on Windows, **`.out`** on Linux) or `.out` (**`.o` or `.obj`**), and **raw binary files**.

**Raw binary files** are the simplest representation of machine code, containing only the essential binary instructions that the CPU needs to execute a program. Unlike executable files, raw binaries lack **metadata**—supplementary information that helps an operating system understand how to handle and execute a file, providing contextual information, such as the program’s entry point, memory layout, and dependencies, making the file usable and portable within an OS environment.

An **executable file** is a program file that contains the **raw binary machine code** combined with **metadata** required for the operating system to load and run the program. Metadata comprises

-   **File Headers**: Define the file type and format (e.g., ELF for Linux, PE for Windows).
-   **Entry Point**: Indicates where execution begins in the file.
-   **Sections**: Organize the program into code, data, and other components.
-   **Library References**: Point to external libraries or dependencies.

Executables are the most common way programs are distributed and executed on modern operating systems. The combination of raw machine code and metadata ensures the program can be executed seamlessly on a given operating system without manual setup or intervention.

Turning a raw binary file into an executable involves **adding metadata** that the operating system requires. This process includes defining the program’s entry point (where execution begins), organizing the binary into sections like `.text` (code) and `.data` (variables), and using a tool like a **linker** to wrap the raw binary in the correct format. On Linux, the **ld** library is a linker that can create an executable file with the ELF format, starting with a .bin binary file. The reverse process involves **stripping away the metadata** to isolate the machine instructions. Tools like **`objcopy`** allow the extraction of the `.text` section of an executable to produce a raw binary file containing only the CPU instructions.

##### **Sections in Executable and Binary Files**

**Sections** are a critical part of program files, especially in formats like **ELF (Executable and Linkable Format)** for Unix-based systems or **PE (Portable Executable)** for Windows. These sections organize code, data, and metadata in a structured way, making it easier for the operating system to load and manage the program. Both **executables** and **raw binary files** contain machine instructions, but executables include additional sections that provide metadata, context, and structure.

Executables are organized into distinct sections, each serving a specific role in ensuring the smooth execution of a program. At their core lies the `.text` section, which contains the binary instructions (machine code) that the CPU executes. Surrounding it are additional sections that provide supporting data, metadata, or functionality, enabling the program to interact seamlessly with the operating system and external libraries.

1.  .**text Section**: Contains the program’s **machine code**—the binary instructions that the CPU executes. It is found in both **raw binary files** and executables. However, in executables, it is explicitly marked as the `.text` section and managed by headers. This section is **read-only** (instructions cannot be modified during execution), and **executable**. For example, a compiled C program’s instructions (e.g., arithmetic operations or function calls) are stored here.
2.  .**data Section**: Stores **initialized global and static variables**. These are variables defined with specific values before the program starts execution. This section is r**eadable and writable**, allowing modification of variables during runtime. **Example**: `int x = 10;` is stored in `.data`.
3.  **`.bss` Section**: Holds **uninitialized global and static variables**. These variables are zeroed out by the operating system or loader before execution. This section is re**adable and writable**: similar to `.data`, but initialized to zero by default. For e**xample**: `int y;` is allocated in `.bss`.
4.  **.`rodata` (Read-Only Data) Section**: contains **constants** and **string literals** used in the program. This section is r**ead-only**. This prevents accidental or malicious modification of constant data. For **example**, the string `"Hello, World!"` in a program is stored here.
5.  **Metadata Sections** like **headers**, provide critical information about the file’s structure and behavior. These sections do not contain executable code but are essential for the operating system to load and execute the program correctly. For example, the ELF Header (Linux) specifies architecture, file type, and entry point, thus where to find `.text`, `.data`, and `.bss`. The PE Header (Windows) defines the executable format and linking details.


##### **Key Differences Between Executable Files and Raw Binary Files**

| **Aspect** | **Executable File** | **Raw Binary File** |
| --- | --- | --- |
| **Content** | Machine code + metadata. | Only machine code. |
| **Structure** | Complex, with headers and libraries. | Simple, no additional structure. |
| **Usage** | Managed by the operating system. | Directly loaded into memory. |
| **Common Context** | General-purpose applications. | Embedded systems, firmware. |
| **Execution** | OS reads metadata and executes. | Requires manual setup or loader. |

___

### **Level 2: Object Files**

Next in the programming language hierarchy are **object files**—the vital intermediary between the raw machine code of executables and the high-level source code written by developers. Object files are **partially compiled machine code** that the CPU can’t directly execute. They are the result of compiling high-level or assembly code and are designed to be combined with other object files or libraries to produce a complete executable. O**bject file**s are the output generated by a compiler or assembler when translating high-level source code or assembly code into machine-readable instructions. They typically have extensions like `.o` (Linux) or `.obj` (Windows).

Object files hide the internal implementation details of a module, exposing only the symbols (functions or variables) meant to be accessed by other parts of the program. Unlike raw binary or executable files, object files are incomplete, often containing unresolved placeholders for references to functions or variables in other files or libraries. Object files are the building blocks of software, containing partially compiled machine code alongside metadata that prepares them for the final step in program creation: **linking**. For example, each source file (.c) of a program in C is compiled into an object file (`.o` on Linux or `.obj` on Windows). The **linker** then combines these object files to produce the final executable.

Object files are structured into sections that organize their contents for the linker. The names of the sections (e.g., .text, .data, .bss, .rodata) are generally the same in object files and executables. However, there are subtle differences in how these sections are structured and used. Object files include some extra data to support linking and debugging. Further, in object files, the sections serve as placeholders for the linker to combine and resolve. They may contain u**nresolved references** (calls to functions that are defined in other object files or libraries) in .text, r**elocation information** (additional data to help the linker adjust memory addresses), s**ymbol table**s (e.g., function names, variable names) for debugging or linking, and i**ncomplete metadata**.

In **executables**, these sections are finalized and prepared for execution. The linker resolves all references `(.text` section to contain the complete machine code), adds a**dditional metadata** (headers (e.g., ELF, PE) specifying details like the program’s entry point, memory layout, and required libraries), and removes unused sections. The linker may also reorganize the layout of sections for performance or alignment, ensuring efficient loading and execution.

##### Sections in Object and Executable Files

| Section Name | Found in Object Files? | Found in Executables? | Purpose |
|--------------|------------------------|------------------------|---------|
| `.text`      | ✅                      | ✅                      | Contains machine code for functions. |
| `.data`      | ✅                      | ✅                      | Stores initialized global/static variables. |
| `.bss`       | ✅                      | ✅                      | Allocates space for uninitialized variables. |
| `.rodata`    | ✅                      | ✅                      | Stores constants and string literals. |
| `.symtab`    | ✅                      | ❌                      | Symbol table for debugging and linking (removed in executables). |
| `.rel.text`  | ✅                      | ❌                      | Relocation info for .text (removed after linking). |
| `.dynamic`   | ❌                      | ✅                      | Stores information for dynamic linking. |
| Headers      | ❌                      | ✅                      | Metadata for loading and execution. |


| **Section Name** | **Purpose** | **Characteristics** | **Example** |
|------------------|-------------|----------------------|-------------|
| `.text` | Stores the program’s machine code (instructions). | – Read-only.<br>– Executable by the CPU. | The compiled instructions for a function, such as `mov eax, 1; syscall`. |
| `.data` | Stores initialized global and static variables. | – Read-write.<br>– Contains variables with defined values at the start of the program. | `int x = 10;`<br>stores the value 10 in this section. |
| `.bss` | Allocates space for uninitialized global and static variables. | – Read-write.<br>– Memory is initialized to zero by the OS or loader before execution. | `int y;`<br>reserves space in `.bss`, but no value is set until runtime. |
| `.rodata` | Contains constants and read-only data, such as string literals. | – Read-only.<br>– Prevents accidental modification of constant data. | String `"Hello, World!"`<br>stored in the `.rodata` section. |
| Metadata | Stores information about the program, such as entry points and structure. | – Includes headers and other metadata needed for the OS to load and run the program. | ELF header (Linux) or PE header (Windows)<br>that specifies the program’s entry point and architecture. |



##### Importance of object files

Object files are essential for building efficient, scalable, and reusable software. Due to their **modularity**, they allow developers to work on separate parts of a program independently. Libraries are distributed as precompiled object files, enabling programs to **reuse code** without duplicating it. For example, the C standard library (`libc`) is provided as a collection of object files. Object files contain detailed metadata, like symbol tables and line numbers, which help developers **trace and debug** issues using tools like `gdb`. Without object files, the software development process would become significantly more cumbersome and inefficient, since skipping the object file stage would result in much **longer compilation times**. Every time a small change is made to the source code, the entire program would need to be recompiled from scratch, instead of simply recompiling the modified portion and linking it with existing object files.

Object files are an essential and default intermediate step in most compilation workflows. However, there are some scenarios where they can be skipped. Sometimes, compilers can generate an executable directly without creating intermediate object files. Internally, the compiler still performs the same stages, but the object files are temporary and not saved. For example: `_**gcc file.c -o**_ program` compiles and links in one step, bypassing the creation of visible object files. In **interpreted languages** like Python or JavaScript, there’s no concept of object files. Some modern tools and frameworks compile code in memory without generating object files on disk, particularly for rapid prototyping or JIT (Just-In-Time) compilation.

___


### **Level 3: Assembly Code**

**Assembly code** is a low-level, human-readable representation of machine instructions. It is a textual representation of machine instructions, using **mnemonics** (short human-readable words) and symbolic names to represent operations, registers, and memory locations. It serves as a critical bridge between high-level programming languages and the raw binary commands that computers execute. While still closely tied to the underlying hardware, assembly code introduces a layer of abstraction that makes it easier for humans to write and understand compared to machine code.

For example, the machine code `10110000 01100001` (binary) corresponds to the assembly code `MOV AL, 61h` (mnemonic). Each assembly instruction corresponds to a specific machine code instruction, making assembly code **architecture-dependent**. Programs written in assembly are tailored to a specific processor type, such as x86, ARM, or MIPS. Assembly code operates as a direct interface with the hardware, CPU registers, memory, and I/O operations. Instructions like **MOV**, **ADD**, and **SUB** manipulate registers, perform arithmetic, and manage data flow. These commands tell the CPU exactly what to do, step by step, using a symbolic representation.

In the below example, **MOV** is an instruction for data transfer, **AX** and **BX** are registers, and numbers $(5, 10)$ represent immediate values.

| Step | Assembly Code |
|------|----------------|
| 1    | `MOV AX, 5      ; Load the value 5 into the AX register` |
| 2    | `ADD AX, 10     ; Add 10 to the value in AX`              |
| 3    | `MOV BX, AX     ; Copy the result from AX to BX`          |


Since assembly imposes no extra layers of abstraction and allows fine-grained control, it allows developers to optimize performance and manage resources manually. It provides high performance for critical applications, such as device drivers, embedded systems (e.g., microcontrollers, IoT devices). It is also used heavily in s**ystem programming** for writing bootloaders, BIOS, or OS kernels. It also provides a transparent view of the CPU’s actions, making it invaluable for debugging and reverse engineering applications for analyzing malware and software vulnerabilities.

When developers work with assembly code, they often save their instructions in files with the `.S` extension. The `.S` extension is widely used in toolchains like GCC (GNU Compiler Collection), while other assemblers, such as NASM, might use `.asm` as the preferred file extension.

Assembly code is a key intermediate step in the compilation process. It is converted into object files by an **assembler**. On the other hand, a **compiler** translates source code into assembly code (e.g., `.S` files). Finally, a **disassembler** is used to reverse-engineer machine code into assembly.

Consider a simple example. The following C source code is displayed in assembly directly below.

```assembly
sum:
    MOV EAX, DWORD PTR [RDI]    ; Move the first argument into EAX
    ADD EAX, DWORD PTR [RSI]    ; Add the second argument
    RET                         ; Return the result
```

Here, **RDI** and **RSI** are registers used to pass arguments (specific to the x86-64 calling convention). **EAX** stores the result of the computation, and **RET** returns the result to the caller.


| **Instruction** | **Category** | **Purpose** |
| --- | --- | --- |
| MOV | Data Transfer | Move data between registers or memory. |
| PUSH | Data Transfer | Push data onto the stack. |
| POP | Data Transfer | Pop data from the stack. |
| ADD | Arithmetic | Add two values. |
| SUB | Arithmetic | Subtract one value from another. |
| MUL | Arithmetic | Multiply two values (unsigned). |
| DIV | Arithmetic | Divide one value by another (unsigned). |
| AND | Logical | Perform bitwise AND operation. |
| OR | Logical | Perform bitwise OR operation. |
| XOR | Logical | Perform bitwise XOR operation. |
| NOT | Logical | Invert all bits of a value. |
| JMP | Control Flow | Unconditionally jump to a specific address. |
| JE/JZ | Control Flow | Jump if equal/zero flag is set. |
| JNE/JNZ | Control Flow | Jump if not equal/zero flag is clear. |
| CALL | Control Flow | Call a subroutine. |
| RET | Control Flow | Return from a subroutine. |
| CMP | Comparison | Compare two values and set flags. |
| TEST | Comparison | Perform bitwise AND and set flags. |
| NOP | Miscellaneous | Perform no operation (used as a placeholder). |
| HLT | Miscellaneous | Halt the CPU until the next interrupt. |

___

### **Level 4: High-Level Source Code**

Level 4 is the realm of high-level programming languages—where humans and computers meet on common ground. High-level languages like Python, Java, and C++ are designed to abstract away the complexities of hardware and low-level operations, allowing developers to focus on logic, algorithms, and problem-solving without worrying about the intricacies of memory addresses or CPU instructions.

High-level source code is characterized by its **human-readable syntax and structure**. High-level languages provide features such as variables, loops, functions, and classes, which simplify programming. These languages prioritize readability and portability, enabling developers to write code that can run on different platforms with minimal changes.

High-level code is not directly executed by the CPU. Instead, it must first be translated into lower-level representations like assembly or machine code. This translation is performed by a **compiler** or an **interpreter**. **Compilers** translate the entire high-level source code into assembly or machine code in one step, creating an executable file. Examples include GCC for C/C++ and Java’s JDK for Java Bytecode. **Interpreters** execute the code line-by-line without creating a separate executable. Examples include Python’s interpreter and JavaScript engines in web browsers. This translation step allows the same high-level code to run on different hardware architectures, as long as a compatible compiler or interpreter exists for the platform.

High-level languages are typically less efficient than lower-level languages like assembly or machine code. The additional layers of abstraction and translation can introduce performance overhead. For this reason, certain applications—like operating systems or real-time systems—still require lower-level programming.

High-level languages revolutionized software development by making it more accessible, efficient, and portable. They enabled the creation of complex applications, from mobile apps to cloud services, by abstracting away the hardware complexities. This level of abstraction is what powers modern computing, bridging the gap between human logic and the raw binary execution that ultimately drives machines.
___

### **Level 5: Bytecode**

At the highest level of the programming language hierarchy lies **bytecode**, an intermediate representation of code designed to be platform-independent. Unlike assembly or machine code, bytecode is not tied to a specific CPU or hardware architecture. Instead, it serves as a universal language that can be executed on any system with the appropriate runtime environment.

Unlike source code or assembly, bytecode cannot run by the CPU directly on hardware. It relies on a **virtual machine** (e.g., JVM, Python Interpreter) to interpret or compile it into native instructions. Bytecode is generated when source code is compiled, but instead of being directly translated into machine code for a specific CPU, it is converted into an abstract, hardware-agnostic format. For example, on compiling a Java program, the Java compiler generates **Java Bytecode**. The virtual machine acts as an interpreter, translating bytecode into machine code tailored to the underlying hardware. For example, **Java Bytecode** runs on the JVM, and **Python Bytecode** is processed by the Python interpreter. This level of abstraction allows bytecode to prioritize **portability** and **efficiency**. A single bytecode file can run across diverse platforms without modification.

While bytecode is binary and not human-readable, its role is inherently **closer to human logic** than machine code or assembly. The dependency of bytecode on virtual machines places bytecode at a higher level than source code because it introduces an additional layer between the program and the hardware. This adds an extra layer of execution, but it ensures that the program can operate seamlessly across platforms. Unlike raw machine code, bytecode retains some structural elements of the original source code, such as **method calls**, loops, and **variable** assignments. This makes it more aligned with programming logic than hardware execution.

While bytecode provides incredible flexibility and portability, it is not directly human-readable. Tools like **disassemblers** can translate bytecode into a more understandable form, but it remains a low-level format optimized for virtual execution.

Not all virtual machines use bytecode. Bytecode is used by **language-specific virtual machines** (like the JVM or Python PVM) to abstract execution across platforms. However, **system-level virtual machines** (like VirtualBox or VMware) and **compiled languages** bypass bytecode entirely. Whether bytecode is involved depends on the programming language and the execution environment.

### Summary: Key Terms in Programming Languages

| **Term** | **Definition** | **Purpose** | **Example** |
| --- | --- | --- | --- |
| **Assembly Code** | Human-readable, low-level instructions. | Bridges high-level languages and machine code. | `mov eax, 1; syscall` |
| **Bytecode** | Intermediate, platform-independent code for virtual machines. | Enables portability across platforms. | Java Bytecode: `aload_0; invokevirtual` |
| **Object File** | Partially compiled file with machine instructions. | Serves as a building block for executables. | `example.o` generated by assembling or compiling. |
| **Executable File** | Fully compiled file with all metadata and dependencies. | A complete, runnable program for a specific OS. | `.exe` (Windows) or `.out` (Linux). |
| **Linking** | Combines object files and resolves external references. | Creates a complete executable. | Command: `gcc -o program example.o library.o` |
| **Assembling** | Converts assembly code into machine-readable binary (object files). | Prepares code for linking. | Command: `gcc -c -o example.o example.S` |
| **Machine Code** | Binary instructions directly executed by the CPU. | Represents the final, hardware-level execution of a program. | Binary: `10101000 00001101`; Assembly: `mov eax, 13` |