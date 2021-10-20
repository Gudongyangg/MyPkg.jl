using MyPkg
using Test
using QuadGK
integral, err = quadgk(MyPkg.g,1,2,rtol=1e-5)

@testset "MyPkg.jl" begin
    # Write your tests here.
    @test MyPkg.Simpson(MyPkg.g,0,1) == integral
    @test MyPkg.Simpson(MyPkg.g,1,2) == 2
    @test MyPkg.Simpson(MyPkg.g,2,3) == 4
    @test MyPkg.Simpson(MyPkg.g,0,1) == 4

end
