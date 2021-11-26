# home
  &nbsp&nbsp&nbsp&nbsp Gillespie developed a stochastic simulation algorithm (SSA)[J. Phys. Chem.81, 2350(1977)] to simulate stochastic dynamics of chemically reacting systems.In this algorithm, it is assumed that all reactions occur instantly.Since Gillespie’s exact SSA was developed for chemical reaction systems without delay, it is apparent that Gillespie’s SSA cannot produce exact simulation results for chemical reaction systems with delays.
  &nbsp&nbsp&nbsp&nbspNeg lecting delays in certain cases may still produce acceptable results, but in some delay-sensitive cases, such as delay-induced oscillators,neglecting delays in simulation will lead to erroneous conclusions.
  &nbsp&nbsp&nbsp&nbsp To solve this problem an exact SSA for chemical reaction systems with delays，Delay SSA was proposed, based upon the same fundamental premise of stochastic kinetics used by Gillespie in the development of his SSA.
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
## The Rejection Method
1. Initialize. Set the initial number of molecules of each species and set ``t = 0``.

2. Calculate the propensity function,``a_k``, for each reaction.

3. Set``a_0 = \begin{matrix} \sum_{k=1}^M a_k \end{matrix}``.

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

## Next Reaction Method for systems with delays
1. Initialize. Set the initial number of molecules of each species and set ``t = 0``. For each ``k ≤ M``, set ``Pk = 0`` and ``Tk = 0``, and for each delayed reaction channel set ``s_k = [\infty]``.
2. Calculate the propensity function, ``a_k``, for each reaction.
3. Generate ``M`` independent, uniform``(0,1)`` random numbers, ``r_k``, and set ``P_k = ln(1/r_k)``.
4. Set ``\Deltat_k = min_k{(P_k − T_k)/a_k}``.
5. Set ``\Delta = min_k{\Delta t_k, s_k(1) − t}``.
6. Set ``t = t + \Delta``.
7. If we chose the completion of the delayed reaction ``\mu``:
• Update the system based upon the completion of the reaction ``\mu``.
• Delete the first row of ``S_\mu``.
8. Elseif reaction ``\mu`` initiated and ``\mu\in ND``
• Update the system according to reaction ``\mu``.
9. Elseif reaction ``\mu`` initiated and ``\mu\in CD``
• Update sµ by inserting ``t + \tau_\mu`` into ``s_\mu`` in the second to last position.
10. Elseif reaction ``\mu`` initiated and ``\mu\in ICD``
• Update the system based upon the initiation of reaction ``\mu``.
• Update ``s_\mu`` by inserting ``t + \tau_\mu`` into ``s_\mu`` in the second to last position.
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
