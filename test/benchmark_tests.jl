using MyPkg
g(x) = 2*x
@test 1 == 1
@test 3 == 3
@test Simpson(g,1,2) == 3
