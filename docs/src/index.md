```@meta
CurrentModule = MyPkg
```

# MyPkg

Documentation for [MyPkg](https://github.com/Gudongyangg/MyPkg.jl).

```@contents
```

```@index
```

不需要这个r

```@autodocs
Modules = [MyPkg]
```


- link to [MyPkg.jl Documentation](@ref)
- link to [`Simpson(f, a, b)`](@ref)

# Example.jl Documentation

```@contents
```

## Functions

```@docs
Simpson(f, a, b)
```

```@docs
g(x)
```

## Index

```@index
```

makedocs(
    ...,
    pages = [
        "page.md",
        "Page title" => "page2.md",
        "Subsection" => [
            ...
        ]
    ]
)
