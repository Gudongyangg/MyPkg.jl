# home

&nbsp; Gillespie developed a stochastic simulation algorithm (SSA)[J. Phys. Chem.81, 2350(1977)] to simulate stochastic dynamics of chemically reacting systems.In this algorithm, it is assumed that all reactions occur instantly.Since Gillespie’s exact SSA was developed for chemical reaction systems without delay, it is apparent that Gillespie’s SSA cannot produce exact simulation results for chemical reaction systems with delays.

&nbsp;&nbsp;Neglecting delays in certain cases may still produce acceptable results, but in some delay-sensitive cases, such as delay-induced oscillators,neglecting delays in simulation will lead to erroneous conclusions.

  To solve this problem an exact SSA for chemical reaction systems with delays，Delay SSA was proposed, based upon the same fundamental premise of stochastic kinetics used by Gillespie in the development of his SSA.

## Features

## Installation
Install with Pkg, just like any other registered Julia package:
````
pkg> add PkgTemplates  # Press ']' to enter the Pkg REPL mode.
````
You can use it by
````
using DelaySSAToolkit
....
````
## References
[1]: Xiaodong Cai, "Exact stochastic simulation of coupled chemical reactions with delays", The Journal of Chemical Physics 126, 124108(2007).
[https://aip.scitation.org/doi/10.1063/1.2710253](https://doi/10.1063/1.2710253).

[2]: David F. Anderson, "A modified Next Reaction Method for simulating chemical systems with time dependent propensities and delays", The Journal of Chemical Physics 128, 109903(2008).
[https://doi/10.1063/1.2799998](https://aip.scitation.org/doi/10.1063/1.2799998).
# home

# Algorithms

Consider a system consisting of ``N>=1`` chemical species,``{X_1, . . . , X_N}``, undergoing ``M>= 1`` chemical reactions through reaction channels ``{R_1,...,R_M}``, each of which is equipped with a propensity function (or intensity function in the mathematics literature),``a_k(X)``. The dynamic state of this chemical system can be described by the state vector ``X(t) =[X_1(t),...,X_N(t)]^T``, where ``X_n[t],n = 1,...,N,`` is the number of ``X_n`` molecules at time ``t``, and ``[·]^T`` denotes the transpose of the vector in the bracket.

Delays, ``\tau_k > 0``, in systems are between the initiation and completion of some, or all, of the reactions. Notice that the definition of ``\tau_k``  is not the next reaction time of the Next Reaction Method. We partition the reactions into three sets, those with no delays, denoted ``ND``, those that change the state of the system only upon completion, denoted ``CD``, and those that change the state of the system at both initiation and completion, denoted ``ICD``. The following assumption is based upon physical principles and serves as the base assumption for simulation methods of chemically reacting systems with delays:

``a_k(X(t)) \Delta t + \omicron (t) `` = the probability that reaction ``k``
takes place in a small time interval``[t, t + \Delta t)``

where ``\omicron (\Delta t)/\Delta t \rightarrow 0`` as ``\Delta t \rightarrow 0``.

Thus, no matter whether a reaction is contained in ``ND``, ``CD``, or ``ICD``, the number ofinitiationsat absolute timetwill be given by

number of initiations of reaction ``k`` by time ``t`` = ``Y_k(\int_{0}^{t} a_k(X(s))\, \mathrm{d}s)``

where the ``Y_k`` are independent, unit rate Poisson processes.

Because the assumption above, and hence equation ``t``, only pertains to the initiation
times of reactions we must handle the completions separately. There are three different
types of reactions, so there are three cases that need consideration.

Case 1: If reaction ``k`` is in ``ND`` and initiates at time ``t``, then the system is updated by losing the reactant species and gaining the product species at the time of initiation.

Case 2: If reaction ``k`` is in ``CD`` and initiates at time ``t``, then the system is updated only at the time of completion, ``t + \tau_k``, by losing the reactant species and gaining the product species.

Case 3: If reaction ``k`` is in ``ICD`` and initiates at time ``t``, then the system is updated by losing the reactant species at the time of initiation, ``t``, and is updated by gaining the product species at the time of completion,``t + \tau_k``.


## The Rejection Method

Simulation methods for systems with delays need to calculate when reactions initiate and store when they complete. However, because of the delayed reactions, the propensity functions can change between initiation times. Bratsun et al. and Barrio et al. used an algorithm for computing the initiation times that is exactly like the original Gillespie Algorithm except that if there is a stored delayed reaction set to finish within a computed timestep, then the computed timestep is discarded, and the system is updated to incorporate the stored delayed reaction. The algorithm then attempts another step starting at its new state. We will refer to this algorithm as the Rejection Method.


### Pseudo code
1. Initialize. Set the initial number of molecules of each species and set ``t = 0``.

2. Calculate the propensity function,``a_k``, for each reaction.

3. Set ``a_0 = \begin{matrix} \sum_{k=1}^M a_k \end{matrix}``.

4. Generate an independent uniform(0,1) random number,``r_1``, and set ``\Delta = 1/a_0ln(1/r_1)``.

5. If there is a delayed reaction set to finish in ``[t, t + \Delta)``
    - (a) Discard ``\Delta``.
    - (b) Updatetto be the time of the next delayed reaction,``\mu``.
    - (c) Updatexaccording to the stored reaction ``\mu``.
    - (d) Return to step 2 or quit.
6. Else
    - (a) Generate an independent uniform``(0,1)`` random number ``r_2``.
    - (b) Find ``\mu\in[1,...., m]`` such that

## Direct Method for systems with delays
The number of discarded ``\Delta ’s`` will be approximately equal to the number of delayed reactions that initiate. This follows because, other than the stored completions at the time the script terminates, every delayed completion will cause one computed ``\Delta`` to be discarded.

Cai notes that the percentage of random numbers generated in step 4 and discarded in
step 5a in above pseudo code for The Rejection Method can approach 50%.Cai then develops an algorithm, called the Direct Method for systems with delays, in which no random variables are discarded.

The principle of Direct Method is the same as that of the original Gillespie Algorithm and the Rejection Method above: use one random variable to calculate when the next reaction initiates and use another random variable to calculate which reaction occurs at that future time. However, Direct Method updates the state of the system and propensity functions due to stored delayed reactions during the search for the next initiation time. In this way he ensures that no random variables are discarded as in the Rejection Method.

Suppose that at time ``t`` there are ongoing delayed reactions set to complete at times
``t + T_1, t + T_2, . . . , t + T_d``. Define ``T_0 = 0`` and ``T_d + 1 = \infty``.

### Pseudo code




## Next Reaction Method for systems with delays

Because the initiations are still given by the firing times of independent Poisson processes. Therefore, if ``T_k`` is the current internal time of ``Y_k``, ``P_k`` the first internal time after ``T_k`` at which ``Y_k`` fires, and the propensity function for the ``k``th reaction channel is given by ``a_k``, then the time until the next initiation of reaction ``k``(assuming no other reactions initiate or complete) is still given by ``\Delta t_k= (P_k−T_k)/a_k``. The only change to the algorithm will be in keeping track and storing the delayed completions. To each delayed reaction channel we therefore assign a vector, ``s_k``, that stores the completion times of that reaction in ascending order. Thus, the time until there is a change in the state of the system, be it an initiation or a completion, will be given by:

``\Delta = min_k{\Delta t_k, s_k(1) − t} ``

where ``t`` is the current time of the system. These ideas form the heart of our Next Reaction Method for systems with delays.

### Pseudo code
1. Initialize. Set the initial number of molecules of each species and set ``t = 0``. For each ``k ≤ M``, set ``P_k = 0`` and ``T_k = 0``, and for each delayed reaction channel set ``s_k = [\infty]``.

2. Calculate the propensity function, ``a_k``, for each reaction.

3. Generate ``M`` independent, uniform``(0,1)`` random numbers, ``r_k``, and set ``P_k = ln(1/r_k)``.

4. Set ``\Delta t_k = min_k{(P_k − T_k)/a_k}``.

5. Set ``\Delta = min_k{\Delta t_k, s_k(1) − t}``.

6. Set ``t = t + \Delta``.

7. If we chose the completion of the delayed reaction ``\mu``:

    - Update the system based upon the completion of the reaction ``\mu``.
    - Delete the first row of ``S_\mu``.

8. Elseif reaction ``\mu`` initiated and ``\mu\in ND``
    - Update the system according to reaction ``\mu``.

9. Elseif reaction ``\mu`` initiated and ``\mu\in CD``
    - Update sµ by inserting ``t + \tau_\mu`` into ``s_\mu`` in the second to last position.

10. Elseif reaction ``\mu`` initiated and ``\mu\in ICD``
    - Update the system based upon the initiation of reaction ``\mu``.
    - Update ``s_\mu`` by inserting ``t + \tau_\mu`` into ``s_\mu`` in the second to last position.

11. For each k, set ``min_k{T_k} = min_k{T_k} + a_k\Delta``.

12. If reaction ``\mu`` initiated, let ``r`` be uniform``(0,1)`` and set ``P_µ = P_µ + ln(1/r)``.

13. Recalculate the propensity functions, ``a_k``.

14. Return to step 4 or quit.

## References
[1]: Xiaodong Cai, "Exact stochastic simulation of coupled chemical reactions with delays", The Journal of Chemical Physics 126, 124108(2007).
[https://aip.scitation.org/doi/10.1063/1.2710253](https://aip.scitation.org/doi/10.1063/1.2710253).

[2]: David F. Anderson, "A modified Next Reaction Method for simulating chemical systems with time dependent propensities and delays", The Journal of Chemical Physics 128, 109903(2008).
[https://aip.scitation.org/doi/10.1063/1.2710253](https://aip.scitation.org/doi/10.1063/1.2710253).


# 练习page

 这一页的content
```@contents
Pages = ["Library.md"]
```
## Formula
一个点括起来表示程序，两个点括起来表示LaTeX公式，三个点括起来表示引用指定的宏来制作文档。

在MyPkg/docs/src/里的.md文件中，LaTeX的转义`\sqrt[n]{1 + x + x^2 + \ldots}`这里要写1条`\`

而MyPkg/src/里的.jl文件中使用三个双引号括起来的形式，称为docstring，则需要两条`\\`，来表示LaTeX的转义`\\sqrt[n]{1 + x + x^2 + \\ldots}`

Here's a example maths:``\sqrt[n]{1 + x + x^2 + \ldots}``.

## Cross Reference

- link to [MyPkg](@ref)
- link to [`Simpson(f, a, b)`](@ref)
- link to [function](@ref)

## URL

外部链接

More detail in [Document.jl](https://juliadocs.github.io/Documenter.jl/stable/).
