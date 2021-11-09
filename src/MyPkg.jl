module MyPkg
# using QuadGK
# Write your package code here.
include("simpson.jl")
export Simpson

export g
function g(x)
    2*x
end
end
