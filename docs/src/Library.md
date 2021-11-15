# 练习page

 这一页的content
```@contents
Pages = ["Library.md"]
```
## Formula
一个点括起来表示程序，两个点括起来表示LaTeX公式，三个点括起来表示引用指定的宏来制作文档。

在MyPkg/docs/src/里的.md文件中，LaTeX的转义`\sqrt[n]{1 + x + x^2 + \ldots}`这里要写1条`\`

而MyPkg/src/里的.jl文件中使用三个双引号括起来的形式，称为docstring，则需要两条`\\`，来表示LaTeX的转义`\\sqrt[n]{1 + x + x^2 + \\ldots}`

Here's a example maths:``\sqrt[n]{1 + x + x^2 + \ldots}``.

## Cross Reference

- link to [MyPkg](@ref)
- link to [`Simpson(f, a, b)`](@ref)

## URL

外部链接

More detail in [Document.jl](https://juliadocs.github.io/Documenter.jl/stable/).
