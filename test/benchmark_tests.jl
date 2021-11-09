using MyPkg
@test Simpson(MyPkg.g,0,1) == integral
@test 3 == 3
@test Simpson(MyPkg.g,1,2) == 3
