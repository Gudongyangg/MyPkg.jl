# MyPkg

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/dev)
[![Build Status](https://github.com/Gudongyangg/MyPkg.jl/workflows/CI/badge.svg)](https://github.com/Gudongyangg/MyPkg.jl/actions)
[![Coverage](https://codecov.io/gh/Gudongyangg/MyPkg.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/Gudongyangg/MyPkg.jl)

## 生成一个my package
1.先进入 ] pkg模式  add PkgTemplates

2.using PkgTemplates

3.然后再交互界面输入下面的样例，可修改所需要的内容。

    t=Template(;
        user="Gudongyangg",
        authors="Gudongyangg",
        julia=v"1.6",
        plugins=[
            License(; name="MIT"),
            Git(; manifest=true, ssh=false),
            GitHubActions(; x86=true),
            Codecov(),
            Documenter{GitHubActions}(),
            Develop(),
        ],
    )

GithubActions就是CI。

4.运行 t("MyPkg.jl")  生成自己的Package，MyPkg.jl改成需要的名字

就在%HOME%\\.julia\\dev\\MyPkg 生成相应的文件

自己在github上创建一个全空的名字为MyPkg.jl的repository，就可以将生成的MyPkg.jl  push到github上。
## 修改src和test

## 生成docs
1.先进入 ] pkg模式

    add Documenter
    add DocumenterTools
2.生成自动装载github文档所需的通信keys

    using Documenter
    using DocumenterTools
    DocumenterTools.genkeys(user="Gudongyangg", repo="MyPkg.jl")

打开github的repository，进入Settings，在Deploy keys中Add deploy key：

  将生成的第一串字符，填入进去，名字取为documenter。注意要勾选write！！

在Secrets中New repository secret：

  将生成的第二串字符，填入，名字为DOCUMENTER_KEY。注意这里名字不可以改！

docs 在push操作后执行的顺序：将在github中自动执行make.jl ，`makedocs()`在/docs/中生成build文件夹，里面包含生成的网页，相当于创建好了docs。接下来`deploydocs()`，将使生成的网页部署到github中。

## 生成CI
 CI使用的是Github Action的CI，在.github的workflow的CI.yml中可以自己修改CI。

## document的内容
  在MyPkg/docs/src/里的.md文件中，一个点括起来表示程序，两个点括起来表示LaTeX公式，三个点括起来表示引用指定的宏来制作文档。
1.基本宏块

目录的宏块，生成指定pages的目录，默认为生成到二级标题：
`
  ```@contents
  Pages = ["index.md","Library.md"]
  Depth = 2
  ```
`
函数的宏块，将一个或多个函数前的docstring拼接到文档中以代替代码块：
`
  ```@docs
  Simpson(f, a, b)
  ```
`
函数的索引宏块，将`exprot`出口的所有函数和宏生成为索引，也可以指定某一特定page、模型：
`
  ```@index
  ```
`
举例子的宏块，可以产生repl形式的例子:
```@raw html
```@repl
a = 1
b = 2
a + b
```
```
2.左侧增加额外page叫做Practice
在/docs/src文件夹中创建Library.md（名字自取），然后在/docs文件下的make.jl中`makedocs()`中修改

    pages=[
        "Home" => "index.md",
        "Practice" => "Library.md"
    ],

其中Practice是document左边栏的小标题。

3.latex公式
在MyPkg/docs/src/里的.md文件中，LaTeX的转义`\sqrt[n]{1 + x + x^2 + \ldots}`这里要写1条`\`。

`Here's a example maths:``\sqrt[n]{1 + x + x^2 + \ldots}``.`

而MyPkg/src/里的.jl文件中使用三个双引号括起来的形式，称为docstring，则需要两条`\\`，来表示LaTeX的转义`\\sqrt[n]{1 + x + x^2 + \\ldots}`

`Here's a example maths:``\\sqrt[n]{1 + x + x^2 + \\ldots}``.`

4.添加cross referencing
  只需要在需要交叉引用的地方后加入`(@ref)`，可以交叉引用的是docstring, header name, 或者 GitHub PR/Issue number。例如：

    - link to [MyPkg](@ref)
    - link to [`Simpson(f, a, b)`](@ref)

5.添加url，例如：

    More detail in [Document.jl](https://juliadocs.github.io/Documenter.jl/stable/).

6.举例
在docstring中的example，也就是在function前的解释性文字（注意是在src中的.jl文件里，而不是docs文件夹下的.md里）：

    # Examples
    ```julia-repl
    julia> Simpson(2*x, 1, 2)
    4
    ```
7.查看的文档
julia官方文档的[Documentation](https://docs.julialang.org/en/v1/manual/documentation/).
Documenttation的[Syntax](https://juliadocs.github.io/Documenter.jl/stable/man/syntax/).


# SafeTestset
和`@testset`用法一模一样，他的第二个参数`begin include("benchmark_tests.jl") end`里的`benchmark_tests.jl`里应该是
`@test ...
@test ...
`
类似的类型

相比于`@testset`，还在最前面加了`Module`,生成了模型


    module SafeTestsets

    export @safetestset

    #报错
    const err = ArgumentError("""
                  Use `@safetestset` like the following:
                  @safetestset "Benchmark Tests" begin include("benchmark_tests.jl") end
                  @safetestset BenchmarkTests = "Benchmark Tests" begin include("benchmark_tests.jl") end
                  """)
    macro safetestset(args...)
        length(args) != 2 && throw(err) #如果参数不是两个，就报错
        name, expr = args
        if name isa String
            mod = gensym(name)  #gensym()帮助标志词不重复引起错误
            testname = name  #testname、和mod对应我们的MyPkg.jl
        elseif name isa Expr && name.head == :(=) && length(name.args) == 2
            mod, testname = name.args  #判断是不是a = b的形式
        else
            throw(err)
        end
        quote
            @eval module $mod    #和@testset用法一模一样
                using Test, SafeTestsets
                @testset $testname $expr
            end
            nothing
        end
    end

    end # module

# 遗留三个问题

1.SafeTestsets的使用，要单独在test文件夹下创建一个benchmark_tests.jl，不然`@SafeTestset`里会因为变量、函数的作用域导致Simpson not defined。

benchmark_tests.jl里程序入下：

    using MyPkg
    using QuadGK

    integral, err = quadgk(MyPkg.g,0,1,rtol=1e-5)

    @test Simpson(MyPkg.g,0,1) == integral
    @test Simpson(MyPkg.g,0,1) == 1
    @test Simpson(MyPkg.g,1,2) == 3

存在一个问题就是project.toml中SafeTestsets包必须在[deps]里面才能运行。

    [deps]
    Documenter = "e30172f5-a6a5-5a46-863b-614d45cd2de4"
    QuadGK = "1fd47b50-473d-5c70-9696-f719f8f3bcdc"
    SafeTestsets = "1bc83da4-3b8d-516f-aca4-4fe02f6d838f"

2.docs 在push操作后执行的顺序：将在github中自动执行make.jl ，`makedocs()`在/docs/中生成build文件夹，里面包含生成的网页，相当于创建好了docs。接下来`deploydocs()`，将使生成的网页部署到github中。


3.example里的例子不会运行报错

    ```julia-repl
    julia> Simpson(2*x, 1, 2)
    4
    ```
