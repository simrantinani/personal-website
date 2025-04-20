---
title: "What is a blockchain?"
author: "Simran Tinani"
date: 2024-02-01
categories: ["Cryptography"]
#tags: ["decidability", "complexity", "np-complete", "p-vs-np"]
draft: false
math: true
summary: "An accessible introduction to blockchain technology, explaining its decentralized architecture, consensus mechanisms like Proof of Work and Proof of Stake, the role of cryptography, and some applications."
---

Blockchain, Decentralized, Distributed: these words are too often thrown around, and too little understood. What do they even mean?

## Introduction

In recent years, blockchain technology has become a significant area of discussion in research, development, and public discourse. Initially brought into the spotlight by the Bitcoin white paper, blockchain has since evolved to support a broad range of uses, including cryptocurrencies, smart contracts, supply chain management, and asset tokenization.

At its core, a blockchain is a decentralized ledger that records information across a network of computers, ensuring the accuracy and security of data without relying on a central authority. It is a concept that replaces the traditional “centralized” system architecture, which inherently relies on a centralized authority (e.g., a bank, a web server) for the accurate and secure maintenance of data records.

<img src="/images/blockchain.png" style="width: 300px; height: auto; display: block; margin: 0 auto;" />

## Three key concepts: Decentralized, Distributed, and Peer-to-Peer Systems

A **distributed system** is one in which multiple _independent_ entities called **nodes** or **components**, collaborate to achieve a common goal. These entities communicate and coordinate their activities to provide a unified service.

**Decentralization** is an architectural approach to implementing software systems, under which the network of components system is designed to have no central point of control or coordination. In a decentralized system (in contrast to a centralized system), decision-making and control, and resources are distributed across multiple nodes or entities. There is no single point of authority, control, or failure.

Many blockchain networks, such as Bitcoin and Ethereum, are both distributed and decentralized. Each node in the network has a copy of the entire blockchain, and decisions are reached through a consensus mechanism without the need for a central authority.

A **peer-to-peer (P2P)** systems is a distributed network where individual participants (“nodes”/”peers”) communicate and share computational resources (e.g., processing power, storage capacity, or information) directly with each other without the need for a centralized authority. Many peer-to-peer systems exhibit decentralized characteristics, but it is possible to have P2P systems with varying degrees of centralization.

## Explaining Blockchain

A ledger simply refers to a chronological record-keeping system. A block is the format of data that is used by the ledgers in a blockchain to record and store data.

A **blockchain** is a _distributed_, _decentralized_ _peer-to-peer_ system of ledgers utilizing an algorithm. This algorithm records information across a network of computers (nodes) in the form of ordered and connected **blocks** using cryptographic tools. Each node in a blockchain maintains its copy of the ledger. Transactions are grouped into blocks, and each block contains a reference to the previous block (forming a chain). This ensures chronological order and immutability of the data. Once a block is added to the blockchain, it is nearly impossible to alter or delete. Immutability enhances the security and reliability of the ledger.

In practice, blockchain is used as an umbrella term for the entire distributed peer-to-peer system with a common application area, or for the underlying data structure, or the underlying algorithm or for the underlying suite of technologies. one of the following aspects of a distributed peer-to-peer system

1.  As a d**ata structure/ledger:** chronological chain of blocks, each containing a list of transactions, linked together through cryptographic hashes.
2.  As an **algorithm: i.e. a** sequence of instructions that negotiates the informational content of many blockchain-data-structures in the system
3.  As **a suite of technologies**: combination of the blockchain-data-structure, the blockchain-algorithm, as well as cryptographic and security technologies combined to achieve integrity
4.  An **umbrella term for purely distributed peer-to-peer systems with a common application area or that** utilize the blockchain-technology-suite

Apart from being decentralized, blockchains are also designed to be immutable (it is extremely difficult to alter the information within a block in the chain), which makes the data reliable and tamper-resistant, transparent (all participants have access to the same ledger), and secure against malicious activites.

## Working of a blockchain

### Consensus Mechanism

Blockchain networks are designed to be decentralized, so there is no central authority governing the system. In the absence of a central authority, an alternative mechanism is required to ensure that nodes across the network collectively agree on the validity, order, immutability and tamper-resistance of the data.

A **consensus mechanism** is a protocol or set of rules that allow nodes in a decentralized, trustless network to agree on the state of the blockchain. Once a transaction is confirmed through the consensus process and added to a block, it is considered irrevocable. This finality is crucial for participants to trust the validity of transactions. Consensus mechanisms play a vital role in maintaining the integrity and security of the entire system.

In a public peer-to-peer system, it is imprudent to assume that every node always behaves innocuously and correctly. **_Byzantine Fault Tolerance_** is a property of a distributed system that allows it to continue operating reliably and reach consensus, even in the presence of a certain number of faulty or malicious nodes.

There are various types of consensus mechanisms, each with its own approach to achieving agreement among nodes. Some common ones are explained below.

### 1\. Proof of Work (PoW)

Under this consensus mechanism, nodes are called **miners**, and compete to validate transactions and add new blocks to the blockchain. Bitcoin, the first and most well-known cryptocurrency, relies on PoW.

The procedure is as follows. Transactions are broadcast to the network and are collected and verified by miners. Miners then select a set of unconfirmed transactions to include in a new block.

To add a new block, a miner must solve a computationally challenging mathematical puzzle. The puzzle is typically constructed using a cryptographic hash function and requires the miner to compute a candidate “**nonce**” which is a preimage of a certain subset of hash values satisfying specific predefined criteria. For example, in the case of Bitcoin, the criterion is that the hash value must have a certain number of leading zeros. There are multiple correct solutions to this puzzle, but to find any of them, the miner must iterate randomly through the set of all possibilities (brute force). Miners repeatedly modify the nonce, hashing the entire block until a hash is found that meets specific criteria. The difficulty of this puzzle may be adjusted periodically to maintain a consistent rate of block creation.

The first miner to find a valid hash value broadcasts the new block to the network, along with the solution to the cryptographic puzzle (the nonce). Other nodes in the network verify the validity of the solution. Unlike the brute-force search for the nonce, the **validation** process is quick and efficient, as it requires just a single computation by each node. If it is correct, the nodes reach consensus that this miner has the right to add the new block to the blockchain. As a reward for their effort and computational work, the successful miner receives an some newly created cryptocurrency as a reward, (e.g., bitcoins) and any transaction fees from the transactions included in the block.

A crucial drawback of PoW is that is is extremely energy-intensive and wasteful by default, and therefore has a significant negative environmental impact.

### 2\. Proof of Stake (PoS)

Proof of Stake (PoS) is an alternative consensus mechanism used in blockchain networks to achieve agreement on the state of the blockchain. In PoS, nodes are called **validators**. Unlike Proof of Work (PoW), where participants (miners) compete through computational work, PoS chooses validators to create new blocks and validate transactions _based on the amount of cryptocurrency_ they hold and are willing to “**stake**” as collateral. The more cryptocurrency a validator stakes, the higher the chance they have to be selected to create a new block. The selection process may also include a randomization algorithm.

Transactions are broadcast to the network, and validators collect and verify these transactions. Validators take turns being chosen to create new blocks and add them to the blockchain. The chosen validator creates a new block, including a set of transactions, and signs it with their private key. This signature serves as proof that the validator has the right to create the block.

Other nodes in the network then **verify** the validity of the block and the signature using the validator’s public key. If the block is valid, it gets added to the blockchain, and the validator is rewarded with new cryptocurrency (**block reward**) and sometimes also transaction fees from the transactions in the block.

To discourage malicious behaviour, PoS systems often include a mechanism called **slashing**. If a validator is found to be acting dishonestly, such as by double-signing or attempting to create an invalid block, a portion of their staked cryptocurrency may be “slashed” or forfeited. Validators have a vested interest in acting honestly because malicious behavior risks losing a portion of their collateral funds.

One of the key advantages of PoS over PoW is its energy efficiency and faster transaction finality in the blockchain. PoS doesn’t require the same level of computational work as PoW, making it more environmentally friendly.

A variation of PoS is **Delegated Proof of Stake**, where instead of all token holders being eligible to create blocks, a small number of delegates are elected by the community to perform this task. DPoS aims to increase efficiency and speed in block creation.

## The role of Cryptography

Cryptography plays a pivotal role in the correct functioning and security of the blockchain. This is the reason for the “crypto” part of the name of cryptocurrencies, and for the misplaced and unfortunate abbrevation of cryptocurrencies to “crypto”. Two vital cryptographic tools involved in the blockchain are hash functions and digital signatures.

### Hash Functions

A hash function $h$ is a mathematical function which unambiguously maps arbitrarily large words on an alphabet $A$ of letters to words of fixed length $n$:
 $$H : A^\star \rightarrow A^n $$

Such a function therefore performs a compression action on messages, returning fixed-length outputs. Most cryptocurrencies use the alphabet _A={0,1}_ and a value of _n_ typically between 160 and 256.

A _collision_ of $h$ is a pair of distinct strings $(x, x’)$ over the alphabet such that _h(x)=h(x’)_. The hash function $h$ is called collision-resistant if it is infeasible to compute a collision of $h$. Itis called preimage-resistant if given any fixed length string $s$, it is computationally infeasible to compute a string $x$ such that $h(x)=s$. A _cryptographic hash function_ is a hash function which is efficiently computable, preimage-resistant, and collision-resistant.

In a blockchain, hash functions are used to _identify blocks_ and _ensure transaction integrity._ Before transactions are added to a block, they are hashed and compiled into a _**Merkle Tree,**_ which is a layered data structure, with each layer’s values containing the combined hash of two of the hash values in the previous layer. This is done until a single hash value (root) is obtained.

The block’s **overall hash** is computed from the **root hash** of the Merkle tree and the previous block’s hash value. A change to one of the transaction hash values in the Merkle tree would thus affect all the subsequent layers of the tree and also the block’s overall hash, and therefore also the hash of all the blocks following it. Owing to the collision-resistance of the hash function, making all these changes is extremely computationally expensive. This property therefore protects the blockchain transactions from tampering. Further, each block contains a hash of the previous block’s header. This ensures that each block is linked uniquely to the one preceding it and maintains the order of the blocks.

### Digital signatures

A _digital signature_ is a cryptographic tool used to provide authenticity, integrity, and non-repudiation to digital messages, thus serving as a digital equivalent of a handwritten signature.

Each digital signature involves a cryptographic private key and its corresponding public key. The private key is known only to the signer and is used to generate the signature. The corresponding public key is made available to others and is used to verify the digital signature.

In most cases, the signer first applies a hash function to the message to be signed, and then uses their private key to encrypt the hash value, thus creating the digital signature. The result is a unique, encrypted signature that is specific to both the content and the private key. For verification, the same hash function is applied to the message received, and the public key is used to decrypt and verify the digital signature. If the decrypted signature matches the generated hash value, the signature is valid.

Digital signatures play a crucial role in ensuring the security and authenticity of data within a blockchain by _associating each transaction reliably to the node which initiated it_.  Each transaction is signed by the participant using their private key before it is broadcast to the network. Other participants can use the sender’s public key to verify the digital signature. Once a transaction is verified and added to a block, the digital signature becomes an integral part of that block. Any attempt to alter the content of a block would therefore require recalculating the digital signatures for all subsequent blocks, which is computationally infeasible.

Most cryptocurrencies use the ECDSA (Elliptic-Curve Digital Signature Algorithm) with the elliptic curve “secp256k1”. Here, the secret key is 256 bits long and the public key is 512 bits long.

## Applications of blockchain technology

In broad terms, the purpose of a blockchain is to help _achieve and maintain the integrity_ in a distributed software system. More specifically, the blockchain is the tool used to create a secure, transparent, and decentralized system for recording, verifying, and transferring ownership of assets. Blockchain’s features such as decentralization, immutability, and transparency provide trust in the integrity of the recorded data, and contribute to the reliability of ownership management in diverse industries, including finance, real estate, supply chain, and more. This makes blockchains a possibility for various applications beyond cryptocurrencies, including smart contracts, supply chain management, and decentralized finance.

Some prominent applications of blockchains are cryptocurrencies (e.g., Bitcoin, Ethereum, etc.), decentralized finance (borrowing, lending assets without a centralized intermediary like a bank), supply chain data management and tracking, healthcare data management and storage, voting systems, digital identity management, digital asset (ex. digital art , intellectual property) management real estate data recording, and smart contracts.