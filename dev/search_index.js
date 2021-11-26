var documenterSearchIndex = {"docs":
[{"location":"Library/#home","page":"Practice","title":"home","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Gillespie developed a stochastic simulation algorithm (SSA)[J. Phys. Chem.81, 2350(1977)] to simulate stochastic dynamics of chemically reacting systems.In this algorithm, it is assumed that all reactions occur instantly.Since Gillespie’s exact SSA was developed for chemical reaction systems without delay, it is apparent that Gillespie’s SSA cannot produce exact simulation results for chemical reaction systems with delays.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Neglecting delays in certain cases may still produce acceptable results, but in some delay-sensitive cases, such as delay-induced oscillators,neglecting delays in simulation will lead to erroneous conclusions.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  To solve this problem an exact SSA for chemical reaction systems with delays，Delay SSA was proposed, based upon the same fundamental premise of stochastic kinetics used by Gillespie in the development of his SSA.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"<ol>  <li>Bird</li>  <li>McHale</li>  <li>Parish</li>  </ol>","category":"page"},{"location":"Library/#Features","page":"Practice","title":"Features","text":"","category":"section"},{"location":"Library/#Installation","page":"Practice","title":"Installation","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"Install with Pkg, just like any other registered Julia package:","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"pkg> add PkgTemplates  # Press ']' to enter the Pkg REPL mode.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"You can use it by","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"using DelaySSAToolkit\n....","category":"page"},{"location":"Library/#References","page":"Practice","title":"References","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"[1]: Xiaodong Cai, \"Exact stochastic simulation of coupled chemical reactions with delays\", The Journal of Chemical Physics 126, 124108(2007). https://aip.scitation.org/doi/10.1063/1.2710253.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"[2]: David F. Anderson, \"A modified Next Reaction Method for simulating chemical systems with time dependent propensities and delays\", The Journal of Chemical Physics 128, 109903(2008). https://doi/10.1063/1.2799998.","category":"page"},{"location":"Library/#home-2","page":"Practice","title":"home","text":"","category":"section"},{"location":"Library/#Algorithms","page":"Practice","title":"Algorithms","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Consider a system consisting of N=1 chemical species,X_1     X_N, undergoing M= 1 chemical reactions through reaction channels R_1R_M, each of which is equipped with a propensity function (or intensity function in the mathematics literature),a_k(X). The dynamic state of this chemical system can be described by the state vector X(t) =X_1(t)X_N(t)^T, where X_ntn = 1N is the number of X_n molecules at time t, and ^T denotes the transpose of the vector in the bracket.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Delays, tau_k  0, in systems are between the initiation and completion of some, or all, of the reactions. Notice that the definition of tau_k  is not the next reaction time of the Next Reaction Method. We partition the reactions into three sets, those with no delays, denoted ND, those that change the state of the system only upon completion, denoted CD, and those that change the state of the system at both initiation and completion, denoted ICD. The following assumption is based upon physical principles and serves as the base assumption for simulation methods of chemically reacting systems with delays:","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"a_k(X(t)) Delta t + omicron (t) = the probability that reaction k takes place in a small time intervalt t + Delta t)","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"where omicron (Delta t)Delta t rightarrow 0 as Delta t rightarrow 0.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Thus, no matter whether a reaction is contained in ND, CD, or ICD, the number ofinitiationsat absolute timetwill be given by","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"number of initiations of reaction k by time t = Y_k(int_0^t a_k(X(s)) mathrmds)","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"where the Y_k are independent, unit rate Poisson processes.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Because the assumption above, and hence equation t, only pertains to the initiation times of reactions we must handle the completions separately. There are three different types of reactions, so there are three cases that need consideration.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Case 1: If reaction k is in ND and initiates at time t, then the system is updated by losing the reactant species and gaining the product species at the time of initiation.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Case 2: If reaction k is in CD and initiates at time t, then the system is updated only at the time of completion, t + tau_k, by losing the reactant species and gaining the product species.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Case 3: If reaction k is in ICD and initiates at time t, then the system is updated by losing the reactant species at the time of initiation, t, and is updated by gaining the product species at the time of completion,t + tau_k.","category":"page"},{"location":"Library/#The-Rejection-Method","page":"Practice","title":"The Rejection Method","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Simulation methods for systems with delays need to calculate when reactions initiate and store when they complete. However, because of the delayed reactions, the propensity functions can change between initiation times. Bratsun et al. and Barrio et al. used an algorithm for computing the initiation times that is exactly like the original Gillespie Algorithm except that if there is a stored delayed reaction set to finish within a computed timestep, then the computed timestep is discarded, and the system is updated to incorporate the stored delayed reaction. The algorithm then attempts another step starting at its new state. We will refer to this algorithm as the Rejection Method.","category":"page"},{"location":"Library/#Pseudo-code","page":"Practice","title":"Pseudo code","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"Initialize. Set the initial number of molecules of each species and set t = 0.\nCalculate the propensity function,a_k, for each reaction.\nSet a_0 = beginmatrix sum_k=1^M a_k endmatrix.\nGenerate an independent uniform(0,1) random number,r_1, and set Delta = 1a_0ln(1r_1).\nIf there is a delayed reaction set to finish in t t + Delta)\n(a) Discard Delta.\n(b) Updatetto be the time of the next delayed reaction,mu.\n(c) Updatexaccording to the stored reaction mu.\n(d) Return to step 2 or quit.\nElse\n(a) Generate an independent uniform(01) random number r_2.\n(b) Find muin1 m such that","category":"page"},{"location":"Library/#Direct-Method-for-systems-with-delays","page":"Practice","title":"Direct Method for systems with delays","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"  The number of discarded Delta s will be approximately equal to the number of delayed reactions that initiate. This follows because, other than the stored completions at the time the script terminates, every delayed completion will cause one computed Delta to be discarded.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Cai notes that the percentage of random numbers generated in step 4 and discarded in step 5a in above pseudo code for The Rejection Method can approach 50%.Cai then develops an algorithm, called the Direct Method for systems with delays, in which no random variables are discarded.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  The principle of Direct Method is the same as that of the original Gillespie Algorithm and the Rejection Method above: use one random variable to calculate when the next reaction initiates and use another random variable to calculate which reaction occurs at that future time. However, Direct Method updates the state of the system and propensity functions due to stored delayed reactions during the search for the next initiation time. In this way he ensures that no random variables are discarded as in the Rejection Method.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Suppose that at time t there are ongoing delayed reactions set to complete at times","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"t + T_1 t + T_2     t + T_d. Define T_0 = 0 and T_d + 1 = infty.","category":"page"},{"location":"Library/#Pseudo-code-2","page":"Practice","title":"Pseudo code","text":"","category":"section"},{"location":"Library/#Next-Reaction-Method-for-systems-with-delays","page":"Practice","title":"Next Reaction Method for systems with delays","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"  Because the initiations are still given by the firing times of independent Poisson processes. Therefore, if T_k is the current internal time of Y_k, P_k the first internal time after T_k at which Y_k fires, and the propensity function for the kth reaction channel is given by a_k, then the time until the next initiation of reaction k(assuming no other reactions initiate or complete) is still given by Delta t_k= (P_kT_k)a_k. The only change to the algorithm will be in keeping track and storing the delayed completions. To each delayed reaction channel we therefore assign a vector, s_k, that stores the completion times of that reaction in ascending order. Thus, the time until there is a change in the state of the system, be it an initiation or a completion, will be given by:","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"          Delta = min_kDelta t_k s_k(1)  t","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"  where t is the current time of the system. These ideas form the heart of our Next Reaction Method for systems with delays.","category":"page"},{"location":"Library/#Pseudo-code-3","page":"Practice","title":"Pseudo code","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"Initialize. Set the initial number of molecules of each species and set t = 0. For each k  M, set P_k = 0 and T_k = 0, and for each delayed reaction channel set s_k = infty.\nCalculate the propensity function, a_k, for each reaction.\nGenerate M independent, uniform(01) random numbers, r_k, and set P_k = ln(1r_k).\nSet Delta t_k = min_k(P_k  T_k)a_k.\nSet Delta = min_kDelta t_k s_k(1)  t.\nSet t = t + Delta.\nIf we chose the completion of the delayed reaction mu:\nUpdate the system based upon the completion of the reaction mu.\nDelete the first row of S_mu.\nElseif reaction mu initiated and muin ND\nUpdate the system according to reaction mu.\nElseif reaction mu initiated and muin CD\nUpdate sµ by inserting t + tau_mu into s_mu in the second to last position.\nElseif reaction mu initiated and muin ICD\nUpdate the system based upon the initiation of reaction mu.\nUpdate s_mu by inserting t + tau_mu into s_mu in the second to last position.\nFor each k, set min_kT_k = min_kT_k + a_kDelta.\nIf reaction mu initiated, let r be uniform(01) and set P_µ = P_µ + ln(1r).\nRecalculate the propensity functions, a_k.\nReturn to step 4 or quit.","category":"page"},{"location":"Library/#References-2","page":"Practice","title":"References","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"[1]: Xiaodong Cai, \"Exact stochastic simulation of coupled chemical reactions with delays\", The Journal of Chemical Physics 126, 124108(2007). https://aip.scitation.org/doi/10.1063/1.2710253.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"[2]: David F. Anderson, \"A modified Next Reaction Method for simulating chemical systems with time dependent propensities and delays\", The Journal of Chemical Physics 128, 109903(2008). https://aip.scitation.org/doi/10.1063/1.2710253.","category":"page"},{"location":"Library/#练习page","page":"Practice","title":"练习page","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"这一页的content","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Pages = [\"Library.md\"]","category":"page"},{"location":"Library/#Formula","page":"Practice","title":"Formula","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"一个点括起来表示程序，两个点括起来表示LaTeX公式，三个点括起来表示引用指定的宏来制作文档。","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"在MyPkg/docs/src/里的.md文件中，LaTeX的转义\\sqrt[n]{1 + x + x^2 + \\ldots}这里要写1条\\","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"而MyPkg/src/里的.jl文件中使用三个双引号括起来的形式，称为docstring，则需要两条\\\\，来表示LaTeX的转义\\\\sqrt[n]{1 + x + x^2 + \\\\ldots}","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Here's a example maths:sqrtn1 + x + x^2 + ldots.","category":"page"},{"location":"Library/#Cross-Reference","page":"Practice","title":"Cross Reference","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"link to MyPkg\nlink to Simpson(f, a, b)\nlink to function","category":"page"},{"location":"Library/#URL","page":"Practice","title":"URL","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"外部链接","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"More detail in Document.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = MyPkg","category":"page"},{"location":"#MyPkg","page":"Home","title":"MyPkg","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for MyPkg.","category":"page"},{"location":"#introduction","page":"Home","title":"introduction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"用Simpson积分计算公式计算被积函数f的积分区间为[a, b]定积分","category":"page"},{"location":"#content","page":"Home","title":"content","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"两个pages的目录","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"index.md\",\"Library.md\"]","category":"page"},{"location":"#function","page":"Home","title":"function","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Simpson(f, a, b)","category":"page"},{"location":"#MyPkg.Simpson-Tuple{Any, Any, Any}","page":"Home","title":"MyPkg.Simpson","text":"function Simpson(f, a, b)\n\nCalculate the integral f function from x to y by Simpson formula\n\nHere's Simpson expression:\n\n`Simpson(f, a, b) = \\frac{(b-a)}{6} * (f(a) + 4*f(\\frac{(a+b)}{2}) + f(b))\n\nArguments\n\nf::Express: integrand function\na::Float: left boundary of integral interval of definite integral\nb::Float: right boundary of integral interval of definite integral\n\nExamples\n\njulia> Simpson(2*x, 1, 2)\n4\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)","category":"page"},{"location":"#MyPkg.find_num_in_vec-Tuple{Vector{T} where T, Vector{Int64}, Any}","page":"Home","title":"MyPkg.find_num_in_vec","text":"function find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)\n\nFind the number of values which in each vector elements equal to x according to the corresponding index position specified by the element in the position_index vector in the given vetcer A.\n\nExamples\n\njulia> A =  [[0.09,0.09,0.1],[0.3,0.09,0.1],[0.09]]\n3-element Vector{Vector{Float64}}:\n [0.09, 0.09, 0.1]\n [0.3, 0.09, 0.1]\n [0.09]\n\njulia> position_index =  [1,2,3]\n3-element Vector{Int64}:\n 1\n 2\n 3\n\njulia> find_num_in_vec(A::Vector, position_index::Vector{Int64}, 0.09)\n3-element Vector{Int64}:\n2\n1\n1\n\n\n\n\n\n","category":"method"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"所有函数的索引","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"}]
}
