using MyPkg
using SafeTestsets
# using Test
using QuadGK
g(x) = 2*x

integral, err = quadgk(g,0,1,rtol=1e-5)

@safetestset BenchmarkTests = "Benchmark Tests" begin
    @test Simpson(g,0,1) == integral
    @test Simpson(g,1,2) == 3
end
# @testset "MyPkg.jl" begin
#     # Write your tests here.
#     @test Simpson(MyPkg.g,0,1) == integral
#     @test Simpson(MyPkg.g,1,2) == 3
#
# end
