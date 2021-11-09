using MyPkg
using SafeTestsets
using Test
using QuadGK

@safetestset BenchmarkTests = "Benchmark Tests" begin
    include("benchmark_tests.jl")
end
# @testset "MyPkg.jl" begin
#     # Write your tests here.
#     @test Simpson(MyPkg.g,0,1) == integral
#     @test Simpson(MyPkg.g,1,2) == 3
#
# end
