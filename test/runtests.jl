using MyPkg
using Test
using QuadGK
integral, err = quadgk(MyPkg.g,0,1,rtol=1e-5)

@testset "MyPkg.jl" begin
    # Write your tests here.
    @test Simpson(MyPkg.g,0,1) == integral
    @test Simpson(MyPkg.g,1,2) == 3

end
