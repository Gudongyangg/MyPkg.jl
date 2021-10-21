# MyPkg
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
    include("docs/make.jl")

## 生成CI
 CI使用的是Github Action的CI


[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://Gudongyangg.github.io/MyPkg.jl/dev)
[![Build Status](https://github.com/Gudongyangg/MyPkg.jl/workflows/CI/badge.svg)](https://github.com/Gudongyangg/MyPkg.jl/actions)
[![Coverage](https://codecov.io/gh/Gudongyangg/MyPkg.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/Gudongyangg/MyPkg.jl)
