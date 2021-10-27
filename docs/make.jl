using MyPkg
using Documenter

DocMeta.setdocmeta!(MyPkg, :DocTestSetup, :(using MyPkg); recursive=true)

makedocs(;
    modules=[MyPkg],
    authors="Gudongyangg",
    repo="https://github.com/Gudongyangg/MyPkg.jl/blob/{commit}{path}#{line}",
    sitename="MyPkg.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://Gudongyangg.github.io/MyPkg.jl",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
        "Library" => "Library.md"
        "Formula exercise.md"
        "Formula exercise => "Formula exercise.md"

    ],
)

deploydocs(;
    repo="github.com/Gudongyangg/MyPkg.jl",
    devbranch="master",
)
