module MyPkg
# using QuadGK
# Write your package code here.
include("simpson.jl")
export Simpson
export find_num_in_vec

"""
    function find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)

Find the number of values which in each vector elements equal to `x` according to the corresponding index position specified by the element in the `position_index` vector in the given vetcer `A`.

# Examples
```julia-repl
julia> A =  [[0.09,0.09,0.1],[0.3,0.09,0.1],[0.09]]
3-element Vector{Vector{Float64}}:
 [0.09, 0.09, 0.1]
 [0.3, 0.09, 0.1]
 [0.09]

julia> position_index =  [1,2,3]
3-element Vector{Int64}:
 1
 2
 3

julia> find_num_in_vec(A::Vector, position_index::Vector{Int64}, 0.09)
3-element Vector{Int64}:
2
1
1
```
"""
function find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)
    number_in_vec = Vector{Int64}(undef, length(position_index))
    for i in eachindex(position_index)
        count = 0
        for j in eachindex(A[position_index[i]])
            if A[position_index[i]][j] == x
                count += 1
            end
        end
        number_in_vec[i] = count
    end
    return number_in_vec
end

function g(x)
    2*x
end
end
