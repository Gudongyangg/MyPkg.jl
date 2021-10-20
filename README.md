# MyPkg
## 生成一个my package
1.先进入 ] pkg模式  add PkgTemplates
2.using PkgTemplates
3.
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
4.t("MyPkg")
就在%HOME%\\.julia\\dev\\MyPkg 生成相应的文件
## 修改src和test

## 生成docs
using Documenter
include("docs/make.jl")



[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/dev)
[![Build Status](https://github.com/Gudongyangg/MyPkg.jl/workflows/CI/badge.svg)](https://github.com/Gudongyangg/MyPkg.jl/actions)
[![Coverage](https://codecov.io/gh/Gudongyangg/MyPkg.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/Gudongyangg/MyPkg.jl)
