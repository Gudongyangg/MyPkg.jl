```@meta
CurrentModule = MyPkg
```
# DelaySSAToolkit

  Gillespie developed a stochastic simulation algorithm (SSA)[1] to simulate stochastic dynamics of chemically reacting systems. In this algorithm, it is assumed that all reactions occur instantly.Since Gillespie’s exact SSA was developed for chemical reaction systems without delay, it is apparent that Gillespie’s SSA cannot produce exact simulation results for chemical reaction systems with delays.

  While this is true in many cases, it is also possible that some chemical reactions, such as gene transcription and translation in living cells, take certain time to finish after they are initiated. Neglecting delays in certain cases may still produce acceptable results, but in some delay-sensitive cases, such as delay-induced oscillators,neglecting delays in simulation will lead to erroneous conclusions.To solve this problem an exact SSA for chemical reaction systems with delays，Delay SSA[2,3] was proposed, based upon the same fundamental premise of stochastic kinetics used by Gillespie in the development of his SSA.

  DelaySSAToolkit.jl is a tool ..... contains three algorithms of delay SSA, namely The Rejection Method, Direct Method and Next Reaction Method. You can call any algorithm to ...


## Features
- 1
    - 1.1
    - 1.2
    - 1.3
- 2
- 3

## Installation
Install with Pkg, just like any other registered Julia package:
````
pkg> add DelaySSAToolkit  # Press ']' to enter the Pkg REPL mode.
````
You can use it by
````
using DelaySSAToolkit
....
````

## References
[1]: Daniel T. Gillespie "Exact stochastic simulation of coupled chemical reactions", J. Phys. Chem. 1977, 81, 25, 2340–2361.
[https://doi.org/10.1021/j100540a008](https://pubs.acs.org/doi/10.1021/j100540a008)

[2]: Xiaodong Cai, "Exact stochastic simulation of coupled chemical reactions with delays", The Journal of Chemical Physics 126, 124108(2007).
[https://doi/10.1063/1.2710253](https://aip.scitation.org/doi/10.1063/1.2710253).

[3]: David F. Anderson, "A modified Next Reaction Method for simulating chemical systems with time dependent propensities and delays", The Journal of Chemical Physics 128, 109903(2008).
[https://doi/10.1063/1.2799998](https://aip.scitation.org/doi/10.1063/1.2799998).




# Algorithms

  Consider a system consisting of ``N≥1`` chemical species,``\{X_1, . . . , X_N\}``, undergoing ``M ≥ 1`` chemical reactions through reaction channels ``\{R_1,...,R_M\}``, each of which is equipped with a propensity function (or intensity function in the mathematics literature),``a_k(X)``. The dynamic state of this chemical system can be described by the state vector ``X(t) =[X_1(t),...,X_N(t)]^T``, where ``X_n[t],n = 1,...,N,`` is the number of ``X_n`` molecules at time ``t``, and ``[·]^T`` denotes the transpose of the vector in the bracket.

  Delays, ``\tau_k > 0``, in systems are between the initiation and completion of some, or all, of the reactions. Notice that the definition of ``\tau_k``  is not the next reaction time of the Next Reaction Method. We partition the reactions into three sets, those with no delays, denoted ``ND``, those that change the state of the system only upon completion, denoted ``CD``, and those that change the state of the system at both initiation and completion, denoted ``ICD``. The following assumption is based upon physical principles and serves as the base assumption for simulation methods of chemically reacting systems with delays:

```math
a_k(X(t)) \Delta t + \omicron (t) = \mathrm{the\ probability\ that\  reaction}\ k
```
```math
\mathrm{takes\ place\ in\ a\ small\ time\ interval}\ [t, t + \Delta t)
```
where ``\omicron (\Delta t)/\Delta t \rightarrow 0``  as  ``\Delta t \rightarrow 0``.

  Thus, no matter whether a reaction is contained in ``ND``, ``CD``, or ``ICD``, the number ofinitiationsat absolute timetwill be given by
```math
\mathrm{number\ of\ initiations\ of\ reaction}\ k\mathrm{\ by time} t = Y_k(\int_{0}^{t} a_k(X(s))\, \mathrm{d}s)
```
where the ``Y_k`` are independent, unit rate Poisson processes.

  Because the assumption above, and hence equation ``t``, only pertains to the initiation times of reactions we must handle the completions separately. There are three different types of reactions, so there are three cases that need consideration.

**Case 1**: If reaction ``k`` is in ``ND`` and initiates at time ``t``, then the system is updated by losing the reactant species and gaining the product species at the time of initiation.

**Case 2**: If reaction ``k`` is in ``CD`` and initiates at time ``t``, then the system is updated only at the time of completion, ``t + \tau_k``, by losing the reactant species and gaining the product species.

**Case 3**: If reaction ``k`` is in ``ICD`` and initiates at time ``t``, then the system is updated by losing the reactant species at the time of initiation, ``t``, and is updated by gaining the product species at the time of completion,``t + \tau_k``.


## The Rejection Method

  Simulation methods for systems with delays need to calculate when reactions initiate and store when they complete. However, because of the delayed reactions, the propensity functions can change between initiation times. Bratsun et al.[1] and Barrio et al.[2] used an algorithm for computing the initiation times that is exactly like the original Gillespie Algorithm except that if there is a stored delayed reaction set to finish within a computed timestep, then the computed timestep is discarded, and the system is updated to incorporate the stored delayed reaction. The algorithm then attempts another step starting at its new state. This algorithm is called Rejection Method[3].


### Pseudo code
1. Initialize. Set the initial number of molecules of each species and set ``t = 0``.

2. Calculate the propensity function, ``a_k``, for each reaction.

3. Set ``a_0 = \begin{matrix} \sum_{k=1}^M a_k \end{matrix}``.

4. Generate an independent uniform``(0,1)`` random number, ``r_1``, and set ``\Delta = 1/a_0 \ln(1/r_1)``.

5. If there is a delayed reaction set to finish in ``[t, t + \Delta)``
    - (a) Discard ``\Delta``.
    - (b) Updatetto be the time of the next delayed reaction,``\mu``.
    - (c) Updatexaccording to the stored reaction ``\mu``.
    - (d) Return to step 2 or quit.
6. Else
    - (a) Generate an independent uniform``(0,1)`` random number ``r_2``.
    - (b) Find ``\mu\in[1,...., m]`` such that
```math
\begin{matrix} \sum_{k=1}^{\mu-1} a_k(t) \end{matrix} < r_2 a_0 < \begin{matrix} \sum_{k=1}^\mu a_k(t) \end{matrix}
```
    - (c) If ``\mu\in ND``, update the number of each molecular species according to reaction ``\mu``.
    - (d) If ``\mu\in CD``, store the information that at time ``t+\tau_\mu`` the system must be updated according to reaction ``\mu``.
    - (e) If ``\mu\in ICD``, update the system according to the initiation of ``\mu`` and store that at time ``t+\tau_\mu`` the system must be updated according to the completion of reaction ``\mu``.
    - (f) Set ``t = t +\Delta``
    - (g) Return to step 2 or quit.


## Direct Method for systems with delays
  The number of discarded ``\Delta 's`` will be approximately equal to the number of delayed reactions that initiate. This follows because, other than the stored completions at the time the script terminates, every delayed completion will cause one computed ``\Delta`` to be discarded.

  The percentage of random numbers generated in step 4 and discarded in
step 5a in above pseudo code for The Rejection Method can approach 50%. Cai[3] then develops an algorithm, called the Direct Method for systems with delays, in which no random variables are discarded.

  The principle of Direct Method is the same as that of the original Gillespie Algorithm and the Rejection Method above: use one random variable to calculate when the next reaction initiates and use another random variable to calculate which reaction occurs at that future time. However, Direct Method updates the state of the system and propensity functions due to stored delayed reactions during the search for the next initiation time. In this way he ensures that no random variables are discarded as in the Rejection Method.

  Suppose that at time ``t`` there are ongoing delayed reactions set to complete at times ``t + T_1, t + T_2, . . . , t + T_d``. Define ``T_0 = 0`` and ``T_{d+1} = \infty``.

### Pseudo code




## Next Reaction Method for systems with delays

  Because the initiations are still given by the firing times of independent Poisson processes. Therefore, if ``T_k`` is the current internal time of ``Y_k``, ``P_k`` the first internal time after ``T_k`` at which ``Y_k`` fires, and the propensity function for the ``k``th reaction channel is given by ``a_k``, then the time until the next initiation of reaction ``k``(assuming no other reactions initiate or complete) is still given by ``\Delta t_k= (P_k−T_k)/a_k``. The only change to the algorithm will be in keeping track and storing the delayed completions. To each delayed reaction channel we therefore assign a vector, ``s_k``, that stores the completion times of that reaction in ascending order. Thus, the time until there is a change in the state of the system, be it an initiation or a completion, will be given by:
```math
\Delta = \min\{\Delta t_k, s_k(1) − t\}
```
  where ``t`` is the current time of the system. These ideas form the heart of our Next Reaction Method[4] for systems with delays.

### Pseudo code
1. Initialize. Set the initial number of molecules of each species and set ``t = 0``. For each ``k ≤ M``, set ``P_k = 0`` and ``T_k = 0``, and for each delayed reaction channel set ``s_k = [\infty]``.

2. Calculate the propensity function, ``a_k``, for each reaction.

3. Generate ``M`` independent, uniform``(0,1)`` random numbers, ``r_k``, and set ``P_k = \ln(1/r_k)``.

4. Set ``\Delta t_k = (P_k − T_k)/a_k\``.

5. Set ``\Delta = \min_k\{\Delta t_k, s_k(1) − t\}``.

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

11. For each k, set ``T_k = T_k + a_k \Delta``.

12. If reaction ``\mu`` initiated, let ``r`` be uniform``(0,1)`` and set ``P_µ = P_µ + \ln(1/r)``.

13. Recalculate the propensity functions, ``a_k``.

14. Return to step 4 or quit.

## References
[1]: Dmitri A. Bratsun, Dmitri N. Volfson, Jeff Hasty, and Lev S. Tsimring "Non-Markovian processes in gene regulation (Keynote Address)", Proc. SPIE 5845, Noise in Complex Systems and Stochastic Dynamics III, (23 May 2005);
[https://doi.org/10.1117/12.609707](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/5845/1/Non-Markovian-processes-in-gene-regulation/10.1117/12.609707.full)

[2]:  Manuel Barrio,Kevin Burrage ,André Leier,Tianhai Tian. "Oscillatory Regulation of Hes1: Discrete Stochastic Delay Modelling and Simulation", PLoS Computational Biology, 10.1371(2006)[https://doi.org/10.1371/journal.pcbi.0020117](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.0020117)

[3]: Xiaodong Cai, "Exact stochastic simulation of coupled chemical reactions with delays", The Journal of Chemical Physics 126, 124108(2007).
[https://doi/10.1063/1.2710253](https://aip.scitation.org/doi/10.1063/1.2710253).

[4]: David F. Anderson, "A modified Next Reaction Method for simulating chemical systems with time dependent propensities and delays", The Journal of Chemical Physics 128, 109903(2008).
[https://doi/10.1063/1.2799998](https://aip.scitation.org/doi/10.1063/1.2799998).







# Theory

## Exact SSA For Coupled Chemical Reaction Without Delays
  Consider a system consisting of ``N≥1`` chemical species, ``\{X_1, . . . , X_N\}``, undergoing ``M ≥ 1`` chemical reactions through reaction channels ``\{R_1,...,R_M\}``, each of which is equipped with a propensity function (or intensity function in the mathematics literature), ``a_k(X)``. The dynamic state of this chemical system can be described by the state vector ``\mathbf{X}(t) =[X_1(t),...,X_N(t)]^T``, where ``X_n[t],n = 1,...,N,`` is the number of ``X_n`` molecules at time ``t``, and ``[·]^T`` denotes the transpose of the vector in the bracket.

  Following Gillespie, A the dynamics of reaction ``R_m`` defined by a state-change vector ``\mathbf{\nu_m} = [\nu_{1m} ,...,\nu_{Nm}]^T``, where ``\nu_{nm}`` gives the changes in the ``X_n`` molecular population produced by one ``R_m`` reaction, and a propensity function ``a_m(t)`` together with the fundamental premise of stochastic chemical kinetics:
```math
\begin{equation}
\begin{aligned}
a_m(t)dt &= \mathrm{the\ probability, given}\ \mathbf{X}(t)=\mathbf{x}, \\
& \mathrm{that\ one\ reaction\ }R_m \mathrm{\ will\ occur\ in\ the}\\
& \mathrm{next\ infinitesimal\ time\ interval\ }[t,t+d_t].
\end{aligned}
\end{equation}
```
  Defining the probability rate constant ``c_m`` as the probability that a randomly selected combination of ``R_m`` reactant molecules reacts in a unit time period, we can calculate  ``a_m(t)`` fromcmand the molecular numbers ofRmreactants at time ``t`` using the method given by Gillespie.
  For a chemical system in a given state ``\mathbf{X}(t)=\mathbf{x}`` at time ``t``,assuming that all reactions occur instantly, Gillespie’s exact SSA answers the following two questions: (i)  when will the next reaction occur?  (ii)  which reaction will occur? Specifically, Gillespie’s exact SSA simulates the following event in each step:
```math
\begin{equation}
\mathrm{E:no\ reaction\ occurs\ in\ the\ time\ interval\ }[t,t+\tau],\\
\\
\mathrm{and\ a\ reaction\ }R_\mu \ \mathrm{occurs in the infinitesimal}\\
\\
\mathrm{time\ interval\ }[t+\tau,t+\tau+d_\tau].
\end{equation}
```
  Based upon the fundamental premise (1), Gillespie showed that that ``\tau`` and ``\mu``are two independent random variables and have the following probability density functions (PDFs), respectively:
```math
\begin{equation}
f_\tau(\tau)=a_0(t) \exp(-a_0(t)\tau), \tau > 0,
\end{equation}
```
and
```math
\begin{equation}
f_\mu(\mu)=a_\mu(t)/a_0(t), \mu = 1,...,M,
\end{equation}
```
where ``a_0(t)=\begin{matrix} \sum_{m=1}^M a_m(t) \end{matrix}``. According to the PDF(4), a realization of ``\mu`` can be generated from a standard uniform random variable ``u_1``, by taking ``\mu`` to be the integer for which ``\begin{matrix} \sum_{j=1}^{\mu-1} a_j(t) \end{matrix} < u_1 a_0(t) ≤ \begin{matrix} \sum_{j=1}^\mu a_j(t) \end{matrix}``;based on the PDF (3), a realization of ``\tau``can be generated from another standard uniform random variable ``u_2`` as ``\tau=−\ln(u_2)/a_0(t)``. Therefore, Gillespie’s exact SSA generates a realization of ``\mu`` and ``\tau`` in each step of simulation, and then updates the time and system state as ``t\leftarrow t+\tau`` and  ``\mathbf{x} \leftarrow \mathbf{x}+ \mathbf{\nu_\mu}``, respectively.

## Exact SSA For Coupled Chemical Reaction With Delays
### Direct method
  As in the derivation of Gillespie’s exact SSA, we first need to find the probability of event (2), that is defined as ``P(\tau,\mu)d\tau``, where ``P(\tau,\mu)`` is the joint PDF of ``\tau`` and ``\mu``. Suppose that there are ``d`` ongoing reactions at timet, which will finish at ``t+T_1,...,t+T_{d}``, respectively. Without loss of generality, we assume that ``T_1≤T_2≤...≤T_d``. Unlike in the reaction system without delays where the propensity functions remain unchanged in the time interval ``[t,t+\tau]``, the propensity functions here change at ``t+T_i,i=1,...,d``, due to delayed reactions. We need to take into account such changes in propensity functions when deriving  ``P(\tau,\mu)``.

  As in the derivation of Gillespie’s exact SSA,``P(\tau,\mu)d\tau`` can be found from the fundamental premise(1) as
```math
\begin{equation}
P(\tau,\mu)d\tau=P_0(\tau) a_\mu(\tau,\mu)d\tau,
\end{equation}
```
where ``P_0(\tau)`` is the probability that no reaction will occur in the time interval ``[t,t+\tau]``, while ``a_\mu(t+\tau)d\tau``is the probability that a reaction ``R_\mu`` occurs in ``[t+\tau,t+\tau+d\tau]``. Defining ``T_0=0`` and ``T_{d+1}=\infty``, we can find ``P_0(\tau)`` for ``\tau`` that lies in different time intervals ``[T_i,T_{i+1}),i=0,...,d``. If ``\tau \in [T_i,T_i+1)``, we define the event ``E_j`` as the event that no reaction occurs in the time interval ``[t+T_j,t+T_j+1),j=0,...,j=i−1``, respectively,and the event  ``E_i``  as the event that no reaction occurs in the time interval ``[t+T_i,t+\tau)``. Then, we can express ``P_0(\tau)`` as
```math
\begin{equation}
P_0(\tau)=P(E_0,...,E_i)=P(E_0) \prod_{j=1}^i P(E_j丨E_0,...,E_j),
\end{equation}
```
From the derivation of Gillespie’s exact SSA,we know that  ``P(E0) = \exp（−a_0(t)T_1)``,  ``P(E_j丨E_0,...,E_j-1) = \exp(-a_0(t+T_j)T_1) × (T_{j+1}−T_j),j=0,...,i−1``,   and   ``P(E_i丨E_0,...,E_i-1) = \exp(-a_0(t+T_i)(\tau-T_i))``.  Notice that propensity functions change at ``t+T_j`` after a delayed reaction finishes, and we use ``a_0(t+T_j)`` to represent the new ``a_0``. The probability ``P_0(\tau)`` is then given by
```math
\begin{equation}
P_0(\tau)=exp(-\begin{matrix} \sum_{j=0}^{i-1} a_0(t+T_j)(T_{j+1}-T_j) \end{matrix}-a_0(t+T_i)(\tau-T_i)), \\
\tau \in [T_i,T_i+1), i = 0,...,d,
\begin{equation}
```
where we assume that the first term of the exponent is equal to zero when ``i = 0``. Since ``P_0(\tau)`` does not depend on individual propensity functions, as shown in Eq.(7), it is seen from Eq.(5) that ``\tau`` and ``\mu`` are independent random variables. Combining Eqs.(5) and (7) and noticing that ``a_\mu(t+\tau)=a_\mu(t+T_i)`` for ``\tau \in [T_i,T_i+1)``, we obtain the PDF of ``\tau`` and ``\mu`` as follows:
```math
\begin{equation}
f_\tau(\tau)=a_0(t+T_i)exp(-\begin{matrix} \sum_{j=0}^{i-1} a_0(t+T_j)(T_{j+1}-T_j) \end{matrix}-a_0(t+T_i)(\tau-T_i)), \\
\tau \in [T_i,T_i+1), i = 0,...,d,
\begin{equation}
```
and
```math
\begin{equation}
f_\mu(\mu)=a_\mu(t+T_i)/a_0(t+T_i), \mu = 1,...,M,\tau \in [T_i,T_i+1),
\begin{equation}
```
It is not difficult to verify that ``\int_{0}^{\infty} f_\tau(\tau)\, dx = 1``. In simulation, ``\mu`` can be generated, from a standard uniform random variable ``u_1``, by taking ``\mu`` to be the integer for which ``\begin{matrix} \sum_{j=1}^\{mu-1} a_j(t+T_i) \end{matrix} < u_1 a_0(t+T_i) ≤ \begin{matrix} \sum_{j=1}^\mu a_j(t+T_i) \end{matrix}``,after ``\tau`` is generated to be in the time interval ``[T_i,T_{i+1})``.We next derive the method of generating  ``\tau`` according to its PDF in Eq.(8).
  The cumulative distribution function of ``\tau``can be found from Eq.(8) as
```math
\begin{equation}
F_\tau(\tau)=1 - \exp(-\begin{matrix} \sum_{j=0}^{i-1} a_0(t+T_j)(T_{j+1}-T_j) \end{matrix}-a_0(t+T_i)(\tau-T_i)), \\
\tau \in [T_i,T_i+1), i = 0,...,d,
\begin{equation}
```
Then, we can generate ``\tau`` from a standard uniform random variable ``u_2``, by taking ``\tau=F_\tau^{−1}(u2)``, where ``F_\tau^{−1}(\cdot)`` represents the inverse of ``F_\tau(\tau)``. More specifically, we can obtain ``\tau`` as follows:
  Find ``T_i`` such that  ``F_\tau(T_i) ≤ u_2 ≤ F_\tau(T_{i+1})``, then calculate  ``\tau`` from
```math
\begin{equation}
\tau = T_i + {{-\ln (1-u_2)-\begin{matrix} \sum_{j=0}^{i-1} a_0(t+T_j)(T_{j+1}-T_j) } \over {a_0(t+T_j)}}
\tau \in [T_i,T_i+1).
\begin{equation}
```




# MyPkg

Documentation for [MyPkg](https://github.com/Gudongyangg/MyPkg.jl).

## introduction

用Simpson积分计算公式计算被积函数`f`的积分区间为[a, b]定积分

## content

两个pages的目录
```@contents
Pages = ["index.md","Library.md"]
```

## function

```@docs
Simpson(f, a, b)
```

```@docs
find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)
```

## Index

所有函数的索引
```@index
```
