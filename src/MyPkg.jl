module MyPkg
# using QuadGK
# Write your package code here.
include("simpson.jl")
export Simpson


function g(x)
    2*x
end
end
