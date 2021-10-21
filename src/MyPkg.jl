module MyPkg
# using QuadGK
# Write your package code here.
# include("simpson.jl")
# export Simpson
"""
    function Simpson(f, a, b)

Simpson Formula
Simpson(f, a, b)=(b-a)/6 * (f(a) + 4*f((a+b)/2) + f(b))
"""
function Simpson(f, a, b)
    # Simpson Formula
    # (b-a)/6 * (f(a) + 4*f((a+b)/2) + f(b))
    h = (b - a)/2
    x = a:h:b
    sum((x[3] - x[1])/6*(f(x[3]) + 4*f(x[2]) + f(x[1])))
end
"""
    function g(x)

g(x)=2*x
"""
function g(x)
    2*x
end
end
