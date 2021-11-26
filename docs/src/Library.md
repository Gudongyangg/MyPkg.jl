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

``\begin{center}\begin{matrix} \sum_{k=1}^\mu−1 a_k \end{matrix}<r_2a_0<\begin{matrix} \sum_{k=1}^\mu a_k \end{matrix}\end{center}``

    - (c) If ``\mu\in ND``, update the number of each molecular species according to reaction ``\mu``.
    - (d) If ``\mu\in CD``, store the information that at time ``t + \tau_\mu`` the system must be updated according to reaction ``\mu``.
    - (e) If ``\mu\in ICD``, update the system according to the initiation of ``\mu`` and store that at time ``t + \tau_\mu`` the system must be updated according to the completion of reaction ``\mu``.
    - (f) Set ``t = t + \Delta``
    - (g) Return to step 2 or quit.

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
