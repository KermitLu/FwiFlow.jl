module FwiFlow
    using Conda
    using PyCall
    using Reexport
    @reexport using ADCME
    using LinearAlgebra
    using PyPlot
    using Random
    using JSON
    using DataStructures
    using Dierckx
    using Parameters
    using MAT


    export DATADIR
    DATADIR = "$(@__DIR__)/../docs/data"

    function ADCME.:Session(args...;kwargs...)
        config = tf.ConfigProto(
            device_count = Dict("GPU"=> 0) 
        )
        sess = tf.Session(config=config)
    end
    include("Core.jl")
    include("Utils.jl")
    include("FWI.jl")
    
end