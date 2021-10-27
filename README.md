# MyPkg

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/dev)
[![Build Status](https://github.com/Gudongyangg/MyPkg.jl/workflows/CI/badge.svg)](https://github.com/Gudongyangg/MyPkg.jl/actions)
[![Coverage](https://codecov.io/gh/Gudongyangg/MyPkg.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/Gudongyangg/MyPkg.jl)

## 生成一个my package
1.先进入 ] pkg模式  add PkgTemplates

2.using PkgTemplates

3.代码

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
4.julia t("MyPkg")

就在%HOME%\\.julia\\dev\\MyPkg 生成相应的文件
## 修改src和test

## 生成docs
1.先安装需要的pkg

    add Documenter
    add DocumenterTools
2.julia生成通信的keys

    using Documenter
    using DocumenterTools
    DocumenterTools.genkeys(user="Gudongyangg", repo="MyPkg.jl")
    #include("docs/make.jl")

## 生成CI
 CI使用的是Github Action的CI，在.github的workflow的CI.yml中修改CI。

## 左侧增加page  Library
 修改make.jl的makedocs里的pages增加新的pages。

## 增加@autodocs

    ```@autodocs
    Modules = [MyPkg]
    Private = true
    Public = true
    ```
### 添加cross referencing

    - link to [MyPkg](@ref)
    - link to [`Simpson(f, a, b)`](@ref)

### 目录修改

    ```@contents
    Pages = ["index.md","Library.md"]
    ```
### 添加url


# SafeTestset

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
