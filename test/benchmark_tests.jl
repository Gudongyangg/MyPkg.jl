using MyPkg
@test 1 == 1
@test 3 == 3
@test Simpson(MyPkg.g,1,2) == 3
