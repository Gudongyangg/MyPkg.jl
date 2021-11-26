var documenterSearchIndex = {"docs":
[{"location":"Library/#Algorithms","page":"Practice","title":"Algorithms","text":"","category":"section"},{"location":"Library/#The-Rejection-Method","page":"Practice","title":"The Rejection Method","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"Initialize. Set the initial number of molecules of each species and set t = 0.\nCalculate the propensity function,a_k, for each reaction.\nSeta_0 = beginmatrix sum_k=1^M a_k endmatrix.\nGenerate an independent uniform(0,1) random number,r_1, and set Delta = 1a_0ln(1r_1).\nIf there is a delayed reaction set to finish in t t + Delta)","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"(a) Discard Delta.   (b) Updatetto be the time of the next delayed reaction,mu.   (c) Updatexaccording to the stored reaction mu.   (d) Return to step 2 or quit.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Else","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"(a) Generate an independent uniform(01) random number r_2. (b) Find muin1 m such that","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"beginmatrix sum_k=1^mu1 a_k endmatrixr_2a_0beginmatrix sum_k=1^mu a_k endmatrix","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"(c) If muin ND, update the number of each molecular species according to reaction mu. (d) If muin CD, store the information that at time t + tau_mu the system must be updated according to reaction mu. (e) If muin ICD, update the system according to the initiation of mu and store that at time t + tau_mu the system must be updated according to the completion of reaction mu. (f) Set t = t + Delta (g) Return to step 2 or quit.","category":"page"},{"location":"Library/#Direct-Method-for-systems-with-delays","page":"Practice","title":"Direct Method for systems with delays","text":"","category":"section"},{"location":"Library/#Next-Reaction-Method-for-systems-with-delays","page":"Practice","title":"Next Reaction Method for systems with delays","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"Initialize. Set the initial number of molecules of each species and set t = 0. For each k  M, set Pk = 0 and Tk = 0, and for each delayed reaction channel set s_k = infty.\nCalculate the propensity function, a_k, for each reaction.\nGenerate M independent, uniform(01) random numbers, r_k, and set P_k = ln(1r_k).\nSet Deltat_k = min_k(P_k  T_k)a_k.\nSet Delta = min_kDelta t_k s_k(1)  t.\nSet t = t + Delta.\nIf we chose the completion of the delayed reaction mu:","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"• Update the system based upon the completion of the reaction mu. • Delete the first row of S_mu.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Elseif reaction mu initiated and muin ND","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"• Update the system according to reaction mu.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Elseif reaction mu initiated and muin CD","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"• Update sµ by inserting t + tau_mu into s_mu in the second to last position.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Elseif reaction mu initiated and muin ICD","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"• Update the system based upon the initiation of reaction mu. • Update s_mu by inserting t + tau_mu into s_mu in the second to last position.","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"For each k, set min_kT_k = min_kT_k + a_kDelta.\nIf reaction mu initiated, let r be uniform(01) and set P_µ = P_µ + ln(1r).\nRecalculate the propensity functions, a_k.\nReturn to step 4 or quit.","category":"page"},{"location":"Library/#练习page","page":"Practice","title":"练习page","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"这一页的content","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Pages = [\"Library.md\"]","category":"page"},{"location":"Library/#Formula","page":"Practice","title":"Formula","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"一个点括起来表示程序，两个点括起来表示LaTeX公式，三个点括起来表示引用指定的宏来制作文档。","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"在MyPkg/docs/src/里的.md文件中，LaTeX的转义\\sqrt[n]{1 + x + x^2 + \\ldots}这里要写1条\\","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"而MyPkg/src/里的.jl文件中使用三个双引号括起来的形式，称为docstring，则需要两条\\\\，来表示LaTeX的转义\\\\sqrt[n]{1 + x + x^2 + \\\\ldots}","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"Here's a example maths:sqrtn1 + x + x^2 + ldots.","category":"page"},{"location":"Library/#Cross-Reference","page":"Practice","title":"Cross Reference","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"link to MyPkg\nlink to Simpson(f, a, b)\nlink to function","category":"page"},{"location":"Library/#URL","page":"Practice","title":"URL","text":"","category":"section"},{"location":"Library/","page":"Practice","title":"Practice","text":"外部链接","category":"page"},{"location":"Library/","page":"Practice","title":"Practice","text":"More detail in Document.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = MyPkg","category":"page"},{"location":"#MyPkg","page":"Home","title":"MyPkg","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for MyPkg.","category":"page"},{"location":"#introduction","page":"Home","title":"introduction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"用Simpson积分计算公式计算被积函数f的积分区间为[a, b]定积分","category":"page"},{"location":"#content","page":"Home","title":"content","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"两个pages的目录","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"index.md\",\"Library.md\"]","category":"page"},{"location":"#function","page":"Home","title":"function","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Simpson(f, a, b)","category":"page"},{"location":"#MyPkg.Simpson-Tuple{Any, Any, Any}","page":"Home","title":"MyPkg.Simpson","text":"function Simpson(f, a, b)\n\nCalculate the integral f function from x to y by Simpson formula\n\nHere's Simpson expression:\n\n`Simpson(f, a, b) = \\frac{(b-a)}{6} * (f(a) + 4*f(\\frac{(a+b)}{2}) + f(b))\n\nArguments\n\nf::Express: integrand function\na::Float: left boundary of integral interval of definite integral\nb::Float: right boundary of integral interval of definite integral\n\nExamples\n\njulia> Simpson(2*x, 1, 2)\n4\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)","category":"page"},{"location":"#MyPkg.find_num_in_vec-Tuple{Vector{T} where T, Vector{Int64}, Any}","page":"Home","title":"MyPkg.find_num_in_vec","text":"function find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)\n\nFind the number of values which in each vector elements equal to x according to the corresponding index position specified by the element in the position_index vector in the given vetcer A.\n\nExamples\n\njulia> A =  [[0.09,0.09,0.1],[0.3,0.09,0.1],[0.09]]\n3-element Vector{Vector{Float64}}:\n [0.09, 0.09, 0.1]\n [0.3, 0.09, 0.1]\n [0.09]\n\njulia> position_index =  [1,2,3]\n3-element Vector{Int64}:\n 1\n 2\n 3\n\njulia> find_num_in_vec(A::Vector, position_index::Vector{Int64}, 0.09)\n3-element Vector{Int64}:\n2\n1\n1\n\n\n\n\n\n","category":"method"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"所有函数的索引","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"}]
}
