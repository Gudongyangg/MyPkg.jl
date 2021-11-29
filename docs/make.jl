using MyPkg
using Documenter

DocMeta.setdocmeta!(MyPkg, :DocTestSetup, :(using MyPkg); recursive=true)

makedocs(;
    modules=[MyPkg],
    authors="Gudongyangg",
    repo="https://github.com/Gudongyangg/MyPkg.jl/blob/{commit}{path}#{line}",
    sitename="MyPkg.jl",
    format=Documenter.HTML(;
        mathengine=Documenter.Writers.HTMLWriter.MathJax2(),
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
)
