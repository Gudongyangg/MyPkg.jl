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
        "Practice" => "Library.md"
    ],
)

deploydocs(;
    repo="github.com/Gudongyangg/MyPkg.jl",
    devbranch = "master",
    devurl = "dev",
    versions = ["stable" => "v^", "v1.0.4", devurl => devurl],
)
