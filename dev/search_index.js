var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = DataTools","category":"page"},{"location":"#DataTools","page":"Home","title":"DataTools","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [DataTools]","category":"page"},{"location":"#DataTools.inc1-Tuple{Any,Any}","page":"Home","title":"DataTools.inc1","text":"inc1(n, _) -> n + 1\n\nA reducing function for counting elements.  It increments the first argument by one.\n\nExamples\n\njulia> using DataTools\n       using Transducers\n\njulia> inc1(10, :ignored)\n11\n\njulia> inc1(Init(inc1), :ignored)\n1\n\njulia> foldl(inc1, Map(identity), 'a':2:'e')\n3\n\njulia> foldl(TeeRF(+, inc1), Map(identity), 1:2:10)  # sum and count\n(25, 5)\n\njulia> rf = oncol(:a => (+) => :sum, :a => inc1 => :count);\n\njulia> foldl(rf, Map(identity), [(a = 1, b = 2), (a = 2, b = 3)])\n(sum = 3, count = 2)\n\n\n\n\n\n","category":"method"},{"location":"#DataTools.modifying","page":"Home","title":"DataTools.modifying","text":"modifying(; $property₁ = f₁, ..., $propertyₙ = fₙ) -> g::Function\nmodifying(lens₁ => f₁, ..., lensₙ => fₙ) -> g::Function\n\nCreate a function that runs function fᵢ on the locations specified by propertyᵢ or lensᵢ.\n\nThe keyword-only method modifying(; a = f₁, b = f₂) is equivalent to modifying(@len(_.a) => f₁, @len(_.b) => f₂).\n\nThe unary method g(x) is equivalent to\n\nx = modify(f₁, x, lens₁)\nx = modify(f₂, x, lens₂)\n...\nx = modify(fₙ, x, lensₙ)\n\nThe binary method g(x, y) is equivalent to\n\nx = set(x, lens₁, f₁(get(x, lens₁), get(y, lens₁)))\nx = set(x, lens₂, f₂(get(x, lens₂), get(y, lens₂)))\n...\nx = set(x, lensₙ, fₙ(get(x, lensₙ), get(y, lensₙ)))\n\nNote that the locations that are not specified by the lenses keep the values as in x.  This is similar to how mergewith behaves.\n\nExamples\n\njulia> using DataTools\n\njulia> map(modifying(a = string), [(a = 1, b = 2), (a = 3, b = 4)])\n2-element Array{NamedTuple{(:a, :b),Tuple{String,Int64}},1}:\n (a = \"1\", b = 2)\n (a = \"3\", b = 4)\n\njulia> reduce(modifying(a = +), [(a = 1, b = 2), (a = 3, b = 4)])\n(a = 4, b = 2)\n\njulia> using Setfield\n\njulia> map(modifying(@lens(_.a[1].b) => x -> 10x),\n           [(a = ((b = 1,), 2),), (a = ((b = 3,), 4),)])\n2-element Array{NamedTuple{(:a,),Tuple{Tuple{NamedTuple{(:b,),Tuple{Int64}},Int64}}},1}:\n (a = ((b = 10,), 2),)\n (a = ((b = 30,), 4),)\n\n\n\n\n\n","category":"function"},{"location":"#DataTools.oncol","page":"Home","title":"DataTools.oncol","text":"oncol(iname₁ => spec₁, ..., inameₙ => specₙ) -> f::Function\noncol(; $iname₁ = spec₁, ..., $inameₙ = specₙ) -> f::Function\n\nCombine functions that work on a column and create a function that work on an entire row.\n\nIt constructs a reducing step function acting on a table row where specᵢ is either a reducing step function or a Pair of a reducing step function and an output column name.\n\nIt also defines a unary function when specᵢ is either a unary function or a Pair of a unary function and an output column name.\n\nThis function is inspired by the \"Pair notation\" in DataFrames.jl (see also Split-apply-combine · DataFrames.jl and DataFrames.select).\n\nExamples\n\njulia> using DataTools\n       using Transducers\n\njulia> rf = oncol(a = +, b = *);\n\njulia> foldl(rf, Map(identity), [(a = 1, b = 2), (a = 3, b = 4)])\n(a = 4, b = 8)\n\njulia> rf((a = 1, b = 2), (a = 3, b = 4))\n(a = 4, b = 8)\n\njulia> rf = oncol(:a => (+) => :sum, :a => max => :max);\n\njulia> foldl(rf, Map(identity), [(a = 1,), (a = 2,)])\n(sum = 3, max = 2)\n\njulia> rf((sum = 1, max = 1), (a = 2,))\n(sum = 3, max = 2)\n\njulia> rf = oncol(:a => min, :a => max);\n\njulia> foldl(rf, Map(identity), [(a = 2,), (a = 1,)])\n(a_min = 1, a_max = 2)\n\njulia> rf((a_min = 2, a_max = 2), (a = 1,))\n(a_min = 1, a_max = 2)\n\njulia> foldl(rf, Map(x -> (a = x,)), [5, 2, 6, 8, 3])\n(a_min = 2, a_max = 8)\n\noncol also defines a unary function\n\njulia> f = oncol(a = string);\n\njulia> f((a = 1, b = 2))\n(a = \"1\",)\n\nNote that oncol does not verify the arity of input functions.  If the input functions have unary and binary methods, oncol is callable with both arities:\n\njulia> f((a = 1, b = 2), (a = 3, b = 4))\n(a = \"13\",)\n\n\n\n\n\n","category":"function"}]
}
