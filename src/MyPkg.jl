module MyPkg
# using QuadGK
# Write your package code here.
# include("simpson.jl")
# export Simpson
"""
    function Simpson(f, a, b)

Calculate the integral 'f' function from 'x' to 'y' by Simpson formula

Simpson(f, a, b)=(b-a)/6 * (f(a) + 4*f((a+b)/2) + f(b))


用来查看两者的区别
# Examples
```julia-repl
julia> Simpson(2*x, 1, 2)
3
```
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

# Examples
```jldoctest
julia> g(2)
4
```
"""
function g(x)
    2*x
end
end
