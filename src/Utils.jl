# input: nz, nx, dz, dx, nSteps, nPoints_pml, nPad, dt, f0, survey_fname, data_dir_name, scratch_dir_name, isAc
export paraGen, surveyGen, padding
"""
	paraGen(nz::Int64, nx::Int64, dz::Real, dx::Real, nSteps::Int64, dt::Real, 
	f0::Real, nPml::Int64, nPad::Int64, para_fname::String, survey_fname::String, data_dir_name::String; 
	if_win::Bool=false, filter_para=nothing, if_src_update::Bool=false, scratch_dir_name::String="")

Generates a parameter file consumed by [`fwi_op`](@ref) and [`fwi_op_ops`](@ref)

- `nSteps` : Number of time steps in the simulation 
- `dt` : Time step size
- `f0` : Source reference frequency for CPML (usually chosen a th dominant frequency)
- `nPoints_pml` : Number of points in CPML boundary condition 
- `nPad` : Padding width in the z direction, in order to make the GPU memory coalesced
- `if_win` : Whether to apply window function to data gathers
- `filter` : Whether apply band-pass filters to data 
- `if_src_update` : Whether update source signatures
- `survey_fname` : The name of the survey file 
- `data_dir_name` : Locations for storing observation data (generated by [`fwi_op_ops`](@ref), in the form of `.bin`)
- `scratch_dir_name` : Temporary data location. If present, will output intermediate files for QC.
"""
function paraGen(nz::Int64, nx::Int64, dz::Real, dx::Real, nSteps::Int64, dt::Real, 
		f0::Real, nPml::Int64, nPad::Int64, para_fname::String, survey_fname::String, data_dir_name::String; 
		if_win::Bool=false, filter_para=nothing, if_src_update::Bool=false, scratch_dir_name::String="")
	para = OrderedDict()
	para["nz"] = nz
	para["nx"] = nx
	para["dz"] = dz
	para["dx"] = dx
	para["nSteps"] = nSteps
	para["dt"] = dt
	para["f0"] = f0
	para["nPoints_pml"] = nPml
	para["nPad"] = nPad
	if if_win != false
		para["if_win"] = true
	end
	if filter_para != nothing
		para["filter"] = filter_para
	end
	if if_src_update != false
		para["if_src_update"] = true
	end
	para["survey_fname"] = survey_fname
	para["data_dir_name"] = data_dir_name
	if !isdir(data_dir_name)
		mkdir(data_dir_name)
	end
	# if nStepsWrap != nothing
	#   para["nStepsWrap"] = nStepsWrap
	# end

	if(scratch_dir_name != "")
			para["scratch_dir_name"] = scratch_dir_name
			if !isdir(scratch_dir_name)
				mkdir(scratch_dir_name)
			end
	end
	para_string = JSON.json(para)

	open(para_fname,"w") do f
		write(f, para_string)
	end
end

# all shots share the same number of receivers
@doc raw"""
	surveyGen(z_src::Array{T}, x_src::Array{T}, 
	z_rec::Array{T}, x_rec::Array{T}, survey_fname::String; Windows=nothing, Weights=nothing) where T<:Integer

Generates the survey parameter file. 

- `z_src` : $z$ coordinates of sources
- `x_src` : $x$ coordinates of sources
- `z_rec` : $z$ coordinates of receivers
- `x_rec` : $x$ coordinates of receiverss
- `survey_fname` : The name of the survey file 
- `Windows` : 
- `Weights` : 
"""
function surveyGen(z_src::Array{T}, x_src::Array{T}, 
	z_rec::Array{T}, x_rec::Array{T}, survey_fname::String; Windows=nothing, Weights=nothing) where T<:Integer
	nsrc = length(x_src)
	nrec = length(x_rec)
	survey = OrderedDict()
	survey["nShots"] = nsrc
	for i = 1:nsrc
		shot = OrderedDict()
		shot["z_src"] = z_src[i]
		shot["x_src"] = x_src[i]
		shot["nrec"] = nrec
		shot["z_rec"] = z_rec
		shot["x_rec"] = x_rec
		if Windows != nothing
			shot["win_start"] = Windows["shot$(i-1)"][:start]
			shot["win_end"] = Windows["shot$(i-1)"][:end]
		end
		if Weights != nothing
			# shot["weights"] = Int64.(Weights["shot$(i-1)"][:weights])
			shot["weights"] = Weights["shot$(i-1)"][:weights]
		end
		survey["shot$(i-1)"] = shot
	end
	
	survey_string = JSON.json(survey)
	open(survey_fname,"w") do f
		write(f, survey_string)
	end

end

"""
		sourceGene(f::Float64, nStep::Integer, delta_t::Float64)

Generates Ricker wavelets.
"""
function sourceGene(f::Float64, nStep::Integer, delta_t::Float64)
#  Ricker wavelet generation and integration for source
#  Dongzhuo Li @ Stanford
#  May, 2015

	e = pi*pi*f*f;
	t_delay = 1.2/f;
	source = Matrix{Float64}(undef, 1, nStep)
	for it = 1:nStep
			source[it] = (1-2*e*(delta_t*(it-1)-t_delay)^2)*exp(-e*(delta_t*(it-1)-t_delay)^2);
	end

	for it = 2:nStep
			source[it] = source[it] + source[it-1];
	end
	source = source * delta_t;
end



"""
		

get `vs` upper and lower bounds from log point cloud 
- 1st row of Bounds: `vp ref line`
- 2nd row of Bounds: `vs high ref line`
- 3rd row of Bounds: `vs low ref line`
"""
function cs_bounds_cloud(cpImg, Bounds)
	cs_high_itp = Spline1D(Bounds[1,:], Bounds[2,:]; k=1)
	cs_low_itp = Spline1D(Bounds[1,:], Bounds[3,:]; k=1)
	csHigh = zeros(size(cpImg))
	csLow = zeros(size(cpImg))
	for i = 1:size(cpImg, 1)
		for j = 1:size(cpImg, 2)
			csHigh[i,j] = cs_high_itp(cpImg[i,j])
			csLow[i,j] = cs_low_itp(cpImg[i,j])
		end
	end
	return csHigh, csLow
end

"""
	klauderWave(fmin, fmax, t_sweep, nStepTotal, nStepDelay, delta_t)

Generates Klauder wavelet.
"""
function klauderWave(fmin, fmax, t_sweep, nStepTotal, nStepDelay, delta_t)

	nStep = nStepTotal - nStepDelay
	source = Matrix{Float64}(undef, 1, nStep+nStep-1)
	source_half = Matrix{Float64}(undef, 1, nStep-1)
	K = (fmax - fmin) / t_sweep
	f0 = (fmin + fmax) / 2.0
	t_axis = delta_t:delta_t:(nStep-1)*delta_t
	source_half = sin.(pi * K .* t_axis .* (t_sweep .- t_axis)) .* cos.(2.0 * pi * f0 .* t_axis) ./ (pi*K.*t_axis*t_sweep)
	for i = 1:nStep-1
		source[i] = source_half[end-i+1]
	end
	for i = nStep+1:2*nStep-1
		source[i] = source_half[i-nStep]
	end
	source[nStep] = 1.0
	source_crop = source[:,nStep-nStepDelay:end]
	return source_crop
end

@doc raw"""
	padding(cp, cs, den, nz_orig, nx_orig, nz, nx, nPml, nPad)

Adds PML boundaries to `cp`, `cs` and `den`. 
The original `nz_orig x nx_orig` grid is resampled to `nz x nx`. 

# Note
`nPad` is used to make the number of nodes in the $z$ direction a multiple of 32 (for coalesced memory access). 
"""
function padding(cp, cs, den, nz_orig, nx_orig, nz, nx, nPml, nPad)
	tran_cp = tf.reshape(cp, (1, nz_orig, nx_orig, 1))
	tran_cs = tf.reshape(cs, (1, nz_orig, nx_orig, 1))
	tran_den = tf.reshape(den, (1, nz_orig, nx_orig, 1))

	tran_cp = squeeze(tf.image.resize_bilinear(tran_cp, (nz, nx)))
	tran_cs = squeeze(tf.image.resize_bilinear(tran_cs, (nz, nx)))
	tran_den = squeeze(tf.image.resize_bilinear(tran_den, (nz, nx)))

	# cp_pad = tf.pad(tran_cp, [nPml (nPml+nPad); nPml nPml], constant_values=5500.0)
	# cs_pad = tf.pad(tran_cs, [nPml (nPml+nPad); nPml nPml], constant_values=0.0)
	# den_pad = tf.pad(tran_den, [nPml (nPml+nPad); nPml nPml], constant_values=2500.0)
	cp_pad = tf.pad(tran_cp, [nPml (nPml+nPad); nPml nPml], "SYMMETRIC")
	cs_pad = tf.pad(tran_cs, [nPml (nPml+nPad); nPml nPml], "SYMMETRIC")
	den_pad = tf.pad(tran_den, [nPml (nPml+nPad); nPml nPml], "SYMMETRIC")

	cp_pad = cast(cp_pad, Float64)
	cs_pad = cast(cs_pad, Float64)
	den_pad = cast(den_pad, Float64)
	return cp_pad, cs_pad, den_pad
end
