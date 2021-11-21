```@meta
CurrentModule = MyPkg
```

# MyPkg

Documentation for [MyPkg](https://github.com/Gudongyangg/MyPkg.jl).

## introduction

用Simpson积分计算公式计算被积函数`f`的积分区间为[a, b]定积分

## content

两个pages的目录
```@contents
Pages = ["index.md","Library.md"]
```

## function

```@docs
Simpson(f, a, b)
```

```@docs
find_num_in_vec(A::Vector, position_index::Vector{Int64}, x)
```

## Index

所有函数的索引
```@index
```
