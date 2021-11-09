using MyPkg
using QuadGK

integral, err = quadgk(MyPkg.g,0,1,rtol=1e-5)

@test Simpson(MyPkg.g,0,1) == integral
@test Simpson(MyPkg.g,0,1) == 1
@test Simpson(MyPkg.g,1,2) == 3
