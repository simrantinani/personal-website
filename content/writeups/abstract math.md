---
title: "Abstract math for anyone: A brief introduction to Groups, their history and applications"
author: "Simran Tinani"
date: 2020-01-01
categories: ["Mathematics"]
#tags: ["Group Theory", "Math", "Symmetry", "Representation Theory"]
draft: false
math: true
summary: A gentle introduction to abstract group theory and some applications.
---

Everyone knows what a (mathematical) “set” is: any collection of entities or “elements”. Sets play a role in modelling practically any real-world problem and are perhaps the easiest mathematical objects to understand intuitively. However, the question of how two (or more) elements of a set “combine” with each other, soon arises . It is often seen that the elements of a set combine in some manner natural to a particular situation and their own properties, two at a time, giving rise to objects of the same set again, and thus providing some sort of a ‘structure’ to the set. This ‘structuring’ of a set calls for a systematic study and deeper understanding of the set and its elements. To do that, the concept of a ‘group’ was introduced. A group is an algebraic entity whose elements satisfy some properties and combine in a certain way. In particular, a group is associated with a binary operation, i.e. an operation that combines two elements of a set to give one element of the same set, i.e. a mapping from S X S to S.

**Formal definition:** A group is a pair $(G, \cdot)$ consisting of a set $G$ and a binary operation $\cdot: G \rightarrow G$ such that:

-   $g\cdot(h\cdot k)=(g\cdot h)\cdot k$ for all $g, h, k$ in $G$. (Associativity of multiplication with respect to the given binary operation)
-   For any two elements $a$,$b$ of $G$, the product $a\cdot b$ is another element of G. (Closure under multiplication)
-   $\exists e \in G$ such that $e\cdot g=g\cdot e=g$ for all $g$ in $G$ (Existence of an identity element)
-   For all $g \in G$, there exists an element $g-1$ in $G$ such that

$g\cdot g^{-1} = g^{-1} \cdot g= e$ (Existence of an inverse for each element of $G$)

Though at first this definition seems rather too vague and abstract to be of much further scope or use, it turns out that the theory of groups, their elements, structures, properties and classification spans a vast area of study, called Group Theory, and has a wide variety of physical applications in the fields of mathematics, chemistry, physics, cryptography, and so on.

**History**

The present definition (given above) was not recognized for a long time in the history of groups. The computation of solutions of polynomial equations of a given degree and the search for a formula relating the solutions to the coefficients was one of the major problems from which the algebraic structure “group” emerged. The idea of a group dates back at least to Lagrange (1736–1813) and his study of the roots of a polynomial. He was the first one to suggest a relation between permutations and the solution of equations by radicals. The actual credit for the discovery of a group is given to Évariste Galois, for he was the first one to coin the term “group” and in 1830 became the first ever to employ groups to determine the solvability of polynomial equations, though he did not provide an explicit definition or sufficient axioms. A Norwegian mathematician, Niels Abel, used the central idea of the concept of a ‘permutation’, and proved that a quintic formula for the general 5th degree polynomial is impossible. Augustin Cauchy, an English mathematician, developed a more general theory of permutations independent of the theory of equations, and came up with the idea of permutation groups. Arthur Cayley gave an explicit definition of an abstract group in one of his papers in 1854, though this definition was not quite correct. Yet, this paper is regarded by many as an inaugural paper in abstract group theory. Von Dyck and Weber gave a definition very close to the present one. Burnside’s definition included closure, associativity and inverses. Some other early mathematicians in this area were Ruffini, Ennemond Jordan, Marius Sophus Lie and Ludwig Sylow. Galois’, Cauchy’s and Sylow’s theorems were established even without a precise form of definition.

Number theory is another historical source of group theory. Work towards this end was begun by Leonhard Euler and developed by Gauss’s work on modular arithmetic and additive and multiplicative groups related to quadratic fields. In geometry, groups became important in projective geometry and other non-Euclidean geometry. In an attempt to get a hold on possible geometries (such as Euclidean, hyperbolic or projective geometry) using group theory, Felix Klein initiated the Erlangen program. Groups were also studied within algebraic number theory, first implicitly, and then explicitly. The theory of groups was unified starting around 1880. Since then, the impact of group theory has been ever growing, giving birth to abstract algebra in the early 20th century, representation theory, and many more influential spin-off domains.

**Applications of group theory**

It is no paradox that in our most abstract theoretical moods we may be nearest to our most practical applications. — A.N Whitehead

Group theory has a large number of applications in a wide range of fields. It is used in other branches of mathematics like number theory, algebraic number theory, algebraic geometry, physics, chemistry, quantum mechanics, and so on. Its applications can be classified broadly into two categories-

-Symmetry: The general notion of symmetry, as defined by the Oxford dictionary, is as follows: “Mutual relation of parts of something in respect of magnitude and position; relative measurement and arrangement of parts; proportion”, “Due or just proportion; harmony of parts with each other and the whole; fitting, regular or balanced arrangement and relation of parts or elements; the condition or quality of being well-proportioned or well-balanced”. Clearly, this definition does not precisely describe the “degree” of symmetry of any configuration. That is, it does not answer the question: How symmetric or asymmetric is an object/shape? Or the question: Which of the two given objects is more symmetric? It turns out that groups can beautifully describe symmetry quantitatively and precisely, and can classify objects and shapes on the basis of their symmetries. The symmetries of a configuration (in a plane or in space), i.e. the set of distance-preserving functions that preserve the configuration form a group, called the group of symmetries of that configuration. Obviously, these symmetries must permute the vertices. Symmetry manifests itself everywhere in nature, from crystal structures to rose petals to the laws of physics. Groups find applications in most places where symmetry plays an important role.

-Representation theory: Representation theory refers to the $one-to-one$ identification of a generalized symmetry operation with a matrix. If we can associate each element with a matrix that obeys the same multiplication table as the elements themselves, i.e. suppose elements $A, B, D$ satisfy $AB=D$, and $M(A), M(B), M(D)$ are the matrices representing these elements, respectively, then they must satisfy $M(A)M(B)=M(D)$. Then we can carry out all geometric operations analytically in terms of arithmetic operations on matrices that are easier to perform. A representation of an abstract group is a substitution group (a matrix group with square matrices such that the substitution group is homomorphic or isomorphic to the abstract group).

**Applications within Mathematics**

Almost all abstract algebraic structures are special cases of groups. For example, rings can be viewed as Abelian groups (corresponding to the operation of additions) together with a second operation (corresponding to multiplication). Groups can be used to prove certain results of number theory. For example, the group of prime residue classes $\pmod n$ can be used to prove the famous Euler’s theorem. Groups are used to describe the symmetries of the roots of a polynomial in Galois Theory, whose fundamental theorem gives a criterion for the solvability of polynomial equations in terms of the solvability of the corresponding Galois group. Groups are used in algebraic topology to describe certain invariants of topological spaces. Very large groups with complicated structures are used in cryptography to make discrete logarithms very hard to calculate and codes difficult to decipher. One of the earliest encryption protocols, Caesar’s cipher, may also be interpreted as a simple group operation. The concept of group actions and permutation groups are used to simplify the counting of a set of objects in Combinatorics. Lie groups (named after Sophus Lie) describe the symmetries of continuous geometric and analytical structures. The concept of a Lie group is vital in the study of differential equations and manifolds.

**Applications in Chemistry**

In chemistry and materials science, groups are used to classify crystal structures, regular polyhedra, and the symmetries of molecules. Chemists are often interested in the symmetry present in atoms and molecules to predict their behaviour and properties. For instance, one can recognize the equivalent atoms in a molecule by symmetry arguments and hence determine the number of possible substituted products. For example, there are 3 sets of equivalent hydrogen atoms in pyrene, giving 3 possible $mono-substituted$ products.

Symmetry provides immediate useful information about the properties of molecules from which their structure can be predicted. Attributes like the crystal structure, infrared spectra, ultraviolet spectra, dipole moments, and optical activity depend on molecular symmetry. Their measurement provides substantiation for the determination of the structure of a molecule. The consideration of molecular symmetry actually cuts short a lot of work involved in the $quantum-mechanical$ treatment of molecules. Here we may use symmetry operations and elements in the form of groups to systematize the concept of symmetry.

Representation theory plays a very imperative role in quantum mechanics. As an alternative to the differential representation, quantum mechanics is often represented and dealt with in the form of matrices and groups of matrices.

A **symmetry operation** is an action that moves the nuclear framework into a position physically indistinguishable from the original one.

A **symmetry element** is a geometric entity (a point, line or plane) about which a symmetry operation takes place.

There are 5 different kinds of symmetry operations:

**1\. Identical/Identity**: The operation of doing nothing, i.e. no change. Notation: E (from the German word Einheit meaning one)

**2\. Rotation about an axis** (taken either clockwise or anticlockwise as a convention, here we take a clockwise rotation to be positive) by an angle $2\pi/n$, where $n$ is a natural number. The symbol $C\_n\_$ denotes a rotation by angle 2π/\_n\_ around an axis (a symmetry operation). This axis is called an $n$-fold axis of symmetry and is obviously a symmetry element. If C\_n\_is the symmetry operation of a configuration, then clearly so is $C_n \times k$, where $k$ is an integer (denoting the rotation $C_n$ performed $k$ times if $k$ is positive, or $\left|k\right|$ times in the opposite (anticlockwise) direction if $k$ is negative.

**3\. Reflection in a plane:** Symbol: $\sigma$

$\sigma_h$ denotes a reflection in a plane perpendicular to the principal axis, which is the $n$-fold axis of rotation for the largest possible "$n$" for the configuration.

$\sigma_v$ denotes a reflection in a plane containing the principal axis.

$\sigma_d$ denotes a reflection in a plane containing the principal axis and bisecting the angle between the $2-fold$ axes of symmetry that are perpendicular to the principal axis. It is a special kind of $\sigma v$.Clearly, $\sigma^2=E$

**4\. Rotation–reflection operation:** This is the operation consisting of a clockwise rotation by $2\pi/n$ about an axis followed by reflection in a plane perpendicular to that axis (or these operations in the opposite order). The corresponding symmetry element is called an $n$-fold alternating axis of symmetry/improper axis of symmetry, and is denoted by S\_n\_.

**5\. Inverse operation:** This operation inverts all points about one $centre/origin$. It sends a point with coordinates $(x,y,z)$ to the one with coordinates $(-x,-y,-z)$.

Clearly, $S_2 \equiv i$; $i^2=E$; $S_n^2= C_n^2$; $S_n^k= C\_n^k$ if $k$ is even; $S_n^k= \sigma_h C_n^k$ if $k$ is odd.

The same symbols are used for the symmetry operations and elements.

Since the final position after the symmetry operation is physically indistinguishable from the initial one, the operation can have no effect on physical properties like:

Dipole moment

The direction of the dipole moment vector must remain the same after a symmetry operation. Hence, it must lie along the \_n\_\-fold axis of rotation, and in the plane of symmetry, or along the intersection of the planes of symmetry. So a molecule with two or more non-coincident rotation axes or with a centre of inversion must have zero dipole moment. For example, in ammonia, NH3, the dipole moment lies along the C3 axis which is also the intersection of 3 symmetry planes.

Optical activity

It is a well-established fact that the necessary and sufficient condition for a molecule to be optically active is that its molecular structure be non-superimposable on its mirror image. An optically active substance thus exists in two forms (called enantiomers) that are mirror images of each other and differ in no property other than the direction in which they rotate the plane of vibration of the electric field vectors of light. Clearly, a molecule containing an $n$-fold axis of symmetry is superimposable on its mirror image and cannot be optically active. A molecule with a plane or centre of symmetry too cannot be optically active. Conversely, it can be shown that a molecule without an $S_n$ axis, in principle, is optically inactive.

Since the molecule, on applying symmetry operations remains physically unchanged, its centre of mass remains fixed in space under all symmetry operations. Clearly, the symmetry operations of a given configuration satisfy the axioms of a group, and hence form a group. Since such groups keep one point fixed in space, they are called point groups. On the contrary, symmetry groups for infinite crystals include translations as well and have no fixed points. They are called space groups.

The crystallographic restriction theorem states that although objects themselves may appear to have $5$-fold, $7$-fold, $8$-fold or higher-fold rotation axes, these are not possible in crystals. The reason is that the external shape of a crystal is based on a geometric arrangement of atoms. In fact, if we try to combine objects with $5$-fold and $8$-fold apparent symmetry, we cannot combine them in such a way that they completely fill space. So, it is only possible for certain combinations of symmetry elements to be present in a molecule (or any other object). Although $n$-fold rotations other than $n = 2, 3, 4, 6$ are forbidden in the strict sense of perfect crystallographic symmetry, there are exotic materials called quasicrystals that display these forbidden symmetries. In 1984, D. Shechtman discovered a class of aluminum alloys the X-ray diffraction patterns of which display $5$-fold symmetry.

Once molecules are classified according to the symmetry elements they possess, specific molecules no longer have to be taken into account, and only bodies possessing those certain symmetry properties (i.e. belonging to a particular point group) are considered. The assigned point groups can then be used to determine the physical properties (such as polarity and chirality), spectroscopic properties, and to construct molecular orbitals.

Lastly, in the branch of crystallography, where the geometric visualization of repeated operations in the crystal is difficult, representation theory plays an important role, enabling one to carry out all geometric operations analytically.

**Applications in Physics**

It is not surprising that the laws of physics seem to obey certain types of symmetry. Group theory serves as a mathematical framework for describing the symmetry properties of classical and $quantum-mechanical$ systems. By forming the representations of various groups, especially of Lie groups, physicists are able to predict “possible” physical theories.

Physics uses that part of Group Theory known as the theory of representations, based centrally on the theme in which matrices act on the members of a vector space. It allows certain symmetrical members of the space to be created, and these can be classified by their symmetry. It is found that all the observed spectroscopic states of atoms and molecules correspond to such symmetrical functions, and can thus be classified accordingly. Among other things, representation theory gives selection rules that specify which transitions are observed, and which are not.

All Abelian groups can be represented numerically, which is natural because numbers commute. For example, we may represent the cyclic group of order two as $\\{1, -1\\}$. On the other hand one finds that matrices form a representation of noncommutative groups. There is a very natural and significant connection between particle physics and representation theory. This connection between the properties of elementary particles and the structure of Lie groups and Lie algebras was first noted in the 1930’s by Eugene Wigner. According to this relation, the various quantum states of an elementary particle give rise to an irreducible representation of the Poincaré group. Furthermore, properties including the spectra of the particles can be related to representations of Lie algebras.

The Lorentz group has applications in relativistic physics. The Standard Model group and the Poincaré group are useful in quantum physics. We now take a look at an example of the application of group theory to solid-state physics.

NaCl when allowed to crystallize under carefully controlled conditions forms cubic crystals.

Consider a cube in $\mathbb{R}^3$ with vertices $(\pm 1, \pm 1,\pm 1)$. The only linear transformations that preserve the cube are those that send a point $(x,y,z)$ to $(u,v,w)$ where $u,v,w$ are permutations of $\pm x, \pm y, \pm z$. Since there are $2^3 = 8$ choices of arranging $+$ and $—$ in a $3$-tuple and $6$ permutations of $x,y,z$. Let $O_h$ denote the group of all orthogonal transformations that carry $C$ into itself. Then clearly $\left| O_h \right| = 8\times 6 = 48.$

NaCl may also crystallize in other “forms”. On adding a small amount of urea, small equilateral triangles replace the corners of the cube. Since these are all congruent, the crystal is still invariant under Oh. As more urea is added, the triangles open up into hexagons. Finally, the cube faces disappear altogether and we have an octahedron. Thus, the group preserving the cube is the same as the one joining the octahedron. (Alternatively, this could be justified on the basis that the centres of all faces of a cube determine the cube completely, and are permuted by a symmetry operation of the cube. By joining the centres we get an octahedron, which therefore has the same symmetry group).

A substance may crystallize in a variety of “forms”. The concept of a group action allows us to concretize this idea of a form more precisely.

The law of corresponding angles, the first major discovery in the field of crystallography, states that the angles between corresponding faces on all crystals of the same substance are equal. In other words, suppose that we draw the normals to each of the faces so as to get a set of points on the unit sphere. Then, up to rotation of that sphere, this set of points is the same for crystals of a substance, though some of the points may be missing in a given crystal (when some faces do not make an appearance). In short, the collection of normal directions to the faces is invariant up to an overall rotation. Moreover, if a substance does (under controlled conditions) crystallize into a regular body, then the set of normals of any crystal of that substance is invariant under the symmetries of that regular body.

The directions of the normals can be regarded as points on a unit sphere. Clearly, the group of symmetries of the crystal acts on this set of points by application. An orbit of the symmetry group acting on this set of directions is called a form of the crystal.

**Description of the possible types of orbits for the cubic group $G=O_h$

The number of elements in an orbit must divide $|O_h| = 48$.

On choosing a generic point  $(x, y, z)$ with $|x| \neq |y|\neq |z|\neq 0$, we see that the stabilizer (or isotropy group) $G(x, y, z)$ consists only of identity, and hence by the orbit-stabilizer theorem, the orbit contains only $48$ elements.

Now consider a point $(x, x, z)$, $|x| \neq |z|$, $x \neq 0$, $z\neq 0$.

The stabilizer is the group of transformations permuting the first two variables, i.e. a two-element permutation group. Hence, the orbit contains 24 elements.

For a point $(x, x, 0)$, the stabilizer group has 4 elements, since the elements that invert the sign of $z$ are included. Hence, the orbit has cardinality 12.

The stabilizer group of a point $(x, y, z)$ has order $|S_3| = 6$. So, the orbit has 8 elements.

Finally, consider the stabilizer group of (1, 0, 0). This has order 8, because it includes all symmetries that fix $x$, and permute $y$ and $z$. There are 2 copies of each of these symmetries in this group because the ones that invert the signs of $y$ and $z$ are also included. Hence, the order is $2 \times 2 \times $2 = 8$. The orbit contains 6 elements.

In the last case, the $6$-element orbit obtained actually pertains to the points on the sphere corresponding to the normals to the 6 faces of the crystal. So, the last case actually corresponds to the cubic form of a crystal.

Similarly, the $8$-element orbit represents the set of faces (8 in number) of the octahedron. So, this case corresponds to the octahedral form. Thus, the following are the directions of the normals to the faces of the crystals.

Cubic form: $(1, 0, 0), (1, 0, 0), (0, 1, 0), (0, 1, 0), (0, 0, 1), (0, 0, 1)$.

Octahedral form: $(1, 1, 1), (1, 1, 1)$, $(1, 1, 1), (1, 1, 1), (1, 1, 1), (1, 1, 1), (1, 1, 1), (1, 1, 1)$.

**Bibliography**

Group Theory and Chemistry — David M. Bishop

Group Theory and Physics — S. Sternberg

en.wikipedia.org

[http://www.worldscientific.com](http://www.worldscientific.$com/)

[http://www.wiredchemist.com](http://www.wiredchemist.$com/)

cccbdb.nist.gov

chemwiki.ucdavis.edu