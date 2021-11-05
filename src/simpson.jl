"""
    function Simpson(f, a, b)

Calculate the integral ``f`` function from ``x`` to ``y`` by Simpson formula

Here's Simpson expression:

``Simpson(f, a, b) = \\frac{(b-a)}{6} * (f(a) + 4*f(\\frac{(a+b)}{2}) + f(b))``

# Arguments
- `f::Express`: integrand function
- `a::Float`: left boundary of integral interval of definite integral
- `b::Float`: right boundary of integral interval of definite integral


# Examples
```julia-repl
julia> Simpson(2*x, 1, 2)
4
```
"""
function Simpson(f, a, b)
    # Simpson Formula
    # (b-a)/6 * (f(a) + 4*f((a+b)/2) + f(b))
    h = (b - a)/2
    x = a:h:b
    sum((x[3] - x[1])/6*(f(x[3]) + 4*f(x[2]) + f(x[1])))
end
