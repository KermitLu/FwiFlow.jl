var documenterSearchIndex = {"docs":
[{"location":"api/#API-Reference-1","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"(Image: )","category":"page"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"poisson_op\nlaplacian_op\nfwi_obs_op\nfwi_op\nsat_op\nupwlap_op","category":"page"},{"location":"api/#FwiFlow.poisson_op","page":"API Reference","title":"FwiFlow.poisson_op","text":"poisson_op(c::Union{PyObject, Float64}, g::Union{PyObject, Float64}, \n    h::Union{PyObject, Float64}, ρ::Union{PyObject, Float64}, index::Union{Integer, PyObject}=0)\n\nSolves the Poisson equation (mathbfx=zquad x^T)\n\nbeginaligned\n-nablacdotleft(c(mathbfx) nabla left(u(mathbfx) -rho  beginbmatrixz  0endbmatrix   right)right) =  g(mathbfx)  mathbfxin Omega\nfracpartial u(x)partial n =  0  mathbfxin Omega\nendaligned\n\nHere Omega=0n_zhtimes 0 n_xh. The equation is solved using finite difference method, where the step size in each direction is h. Mathematically, the solution to the PDE is determined up to a constant. Numerically, we discretize the equation with the scheme\n\n(A+E_11)mathbfu = mathbff\n\nwhere A is the finite difference coefficient matrix,\n\n(E_11)_ij = left beginmatrix1  i=j=1  0  mbox otherwise endmatrixright\n\nindex : Int32, when index=1, SparseLU is used to solve the linear system; otherwise the function invokes algebraic multigrid method from amgcl. \n\n\n\n\n\n","category":"function"},{"location":"api/#FwiFlow.laplacian_op","page":"API Reference","title":"FwiFlow.laplacian_op","text":"laplacian_op(coef::Union{PyObject, Array{Float64}}, f::Union{PyObject, Array{Float64}}, \n        h::Union{PyObject, Float64}, ρ::Union{PyObject, Float64})\n\nComputes the Laplacian of function f(mathbfx); here (mathbfx=zquad x^T)\n\n-nablacdotleft(c(mathbfx) nabla left(u(mathbfx) -rho beginbmatrixz  0endbmatrix  right)right)\n\n\n\n\n\n","category":"function"},{"location":"api/#FwiFlow.fwi_obs_op","page":"API Reference","title":"FwiFlow.fwi_obs_op","text":"fwi_obs_op(cp::Union{PyObject, Array{Float64}},cs::Union{PyObject, Array{Float64}},\n    den::Union{PyObject, Array{Float64}},stf::Union{PyObject, Array{Float64}},\n    gpu_id::Union{PyObject, Integer},shot_ids::Union{PyObject, Array{T}},para_fname::String) where T<:Integer\n\nGenerates the observation data and store them as files which will be used by fwi_op For the meaning of parameters, see fwi_op.\n\n\n\n\n\n","category":"function"},{"location":"api/#FwiFlow.fwi_op","page":"API Reference","title":"FwiFlow.fwi_op","text":"fwi_op(cp::Union{PyObject, Array{Float64}},cs::Union{PyObject, Array{Float64}},\n    den::Union{PyObject, Array{Float64}},stf::Union{PyObject, Array{Float64}},\n    gpu_id::Union{PyObject, Integer},shot_ids::Union{PyObject, Array{T}},para_fname::String) where T<:Integer\n\nComputes the FWI loss function. \n\ncp : P-wave velocity\ncs : S-wave velocity\nden : Density \nstf : Source time functions  \ngpu_id : The ID of GPU to run this FWI operator\nshot_ids : The source function IDs (determining the location of sources)\npara_fname : Parameter file location\n\n\n\n\n\n","category":"function"},{"location":"api/#FwiFlow.sat_op","page":"API Reference","title":"FwiFlow.sat_op","text":"sat_op(s0::Union{PyObject, Array{Float64}},pt::Union{PyObject, Array{Float64}},\n    permi::Union{PyObject, Array{Float64}},poro::Union{PyObject, Array{Float64}},\n    qw::Union{PyObject, Array{Float64}},qo::Union{PyObject, Array{Float64}},\n    muw::Union{PyObject, Float64},muo::Union{PyObject, Float64},\n    sref::Union{PyObject, Array{Float64}},dt::Union{PyObject, Float64},h::Union{PyObject, Float64})\n\nSolves the following discretized equation \n\nphi (S_2^n + 1 - S_2^n) - nabla  cdot left( m_2(S_2^n + 1)Knabla Psi _2^n right) Delta t= left(q_2^n + q_1^n fracm_2(S^n+1_2)m_1(S^n+1_2)right) Delta t\n\nwhere\n\nm_2(s) = fracs^2mu_wqquad m_1(s) = frac(1-s)^2mu_o\n\nThis is a nonlinear equation and is solved with the Newton-Raphson method. \n\ns0 : n_ztimes n_x, saturation of fluid, i.e., S_2^n\npt : n_ztimes n_x, potential of fluid, i.e., Psi_2^n\npermi : n_ztimes n_x, permeability, i.e., K \nporo : n_ztimes n_x, porosity, i.e., phi\nqw : n_ztimes n_x, injection or production rate of ﬂuid 1, q_2^n\nqo : n_ztimes n_x, injection or production rate of ﬂuid 2, q_1^n\nmuw : viscosity of fluid 1, i.e., mu_w\nmuo : viscosity of fluid 2, i.e., mu_o\nsref : n_ztimes n_x, initial guess for S_2^n+1\ndt : Time step size  \nh : Spatial step size\n\n\n\n\n\n","category":"function"},{"location":"api/#FwiFlow.upwlap_op","page":"API Reference","title":"FwiFlow.upwlap_op","text":"upwlap_op(perm::Union{PyObject, Array{Float64}},\n    mobi::Union{PyObject, Array{Float64}},\n    func::Union{PyObject, Array{Float64}},\n    h::Union{PyObject, Float64},\n    rhograv::Union{PyObject, Float64})\n\nComputes the Laplacian of function f(mathbfx); here mathbfx=zquad x^T.\n\nnablacdotleft(m(mathbfx)K(mathbfx) nabla left(f(mathbfx) -rho beginbmatrixz  0endbmatrix  right)right)\n\nThe permeability on the computational grid is computed with Harmonic mean;  the mobility is computed with upwind scheme. \n\nperm : n_ztimes n_x, permeability of fluid, i.e., K\nmobi : n_ztimes n_x, mobility of fluid, i.e., m\nfunc : n_ztimes n_x, potential of fluid, i.e., f\nh : Float64, spatial step size \nrhograv : Float64, i.e., rho\n\n\n\n\n\n","category":"function"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"Modules = [FwiFlow]\nPages   = [\"utils.jl\"]","category":"page"},{"location":"api/#FwiFlow.padding-NTuple{9,Any}","page":"API Reference","title":"FwiFlow.padding","text":"Adds PML boundaries to cp, cs and den.  The original nz_orig x nx_orig grid is resampled to nz x nx. \n\nnote: Note\nnPad is used to make the number of nodes in the z direction a multiple of 32 (for coalesced memory access). \n\n\n\n\n\n","category":"method"},{"location":"api/#FwiFlow.paraGen-NTuple{12,Any}","page":"API Reference","title":"FwiFlow.paraGen","text":"Generates a parameter file consumed by fwi_op and fwi_op_ops\n\nnSteps : Number of time steps in the simulation \ndt : Time step \nf0 : Source frequency \nnPoints_pml : Number of points in PML boundary condition \nnPad : Padding width \nif_win : \nfilter : Whether apply filters \nif_src_update : \nsurvey_fname : The name of the survey file \ndata_dir_name : Locations for storing observation data (generated by fwi_op_ops, in the form of .bin)\nscratch_dir_name : Temporary data location \n\n\n\n\n\n","category":"method"},{"location":"api/#FwiFlow.surveyGen-Union{Tuple{T}, Tuple{Array{T,N} where N,Array{T,N} where N,Array{T,N} where N,Array{T,N} where N,String}} where T<:Integer","page":"API Reference","title":"FwiFlow.surveyGen","text":"surveyGen(zsrc::Array{T}, xsrc::Array{T},      zrec::Array{T}, xrec::Array{T}, survey_fname::String; Windows=nothing, Weights=nothing) where T<:Integer\n\nGenerates the survey parameter file. \n\nz_src : z coordinates of sources\nx_src : x coordinates of sources\nz_rec : z coordinates of receivers\nx_rec : x coordinates of receiverss\nsurvey_fname : The name of the survey file \nWindows : \nWeights : \n\n\n\n\n\n","category":"method"},{"location":"api/#FwiFlow.cs_bounds_cloud-Tuple{Any,Any}","page":"API Reference","title":"FwiFlow.cs_bounds_cloud","text":"get vs upper and lower bounds from log point cloud \n\n1st row of Bounds: vp ref line\n2nd row of Bounds: vs high ref line\n3rd row of Bounds: vs low ref line\n\n\n\n\n\n","category":"method"},{"location":"api/#FwiFlow.klauderWave-NTuple{6,Any}","page":"API Reference","title":"FwiFlow.klauderWave","text":"Generates Klauder wavelet\n\nDongzhuo Li @ Stanford August, 2019\n\n\n\n\n\n","category":"method"},{"location":"api/#FwiFlow.sourceGene-Tuple{Float64,Integer,Float64}","page":"API Reference","title":"FwiFlow.sourceGene","text":"sourceGene(f::Float64, nStep::Integer, delta_t::Float64)\n\nGenerates Ricker wavelets.\n\n\n\n\n\n","category":"method"},{"location":"tutorials/flow/#Flow-Inversion-1","page":"Flow Inversion","title":"Flow Inversion","text":"","category":"section"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"const K_CONST =  9.869232667160130e-16 * 86400 * 1e3\nconst ALPHA = 1.0\nmutable struct Ctx\n  m; n; h; NT; Δt; Z; X; ρw; ρo;\n  μw; μo; K; g; ϕ; qw; qo; sw0\nend\n\nfunction tfCtxGen(m,n,h,NT,Δt,Z,X,ρw,ρo,μw,μo,K,g,ϕ,qw,qo,sw0,ifTrue)\n  tf_h = constant(h)\n  # tf_NT = constant(NT)\n  tf_Δt = constant(Δt)\n  tf_Z = constant(Z)\n  tf_X= constant(X)\n  tf_ρw = constant(ρw)\n  tf_ρo = constant(ρo)\n  tf_μw = constant(μw)\n  tf_μo = constant(μo)\n  # tf_K = isa(K,Array) ? Variable(K) : K\n  if ifTrue\n    tf_K = constant(K)\n  else\n    tf_K = Variable(K)\n  end\n  tf_g = constant(g)\n  # tf_ϕ = Variable(ϕ)\n  tf_ϕ = constant(ϕ)\n  tf_qw = constant(qw)\n  tf_qo = constant(qo)\n  tf_sw0 = constant(sw0)\n  return Ctx(m,n,tf_h,NT,tf_Δt,tf_Z,tf_X,tf_ρw,tf_ρo,tf_μw,tf_μo,tf_K,tf_g,tf_ϕ,tf_qw,tf_qo,tf_sw0)\nend\n\nfunction Krw(Sw)\n    return Sw ^ 1.5\nend\n\nfunction Kro(So)\n    return So ^1.5\nend\n\nfunction ave_normal(quantity, m, n)\n    aa = sum(quantity)\n    return aa/(m*n)\nend\n\n\n# variables : sw, u, v, p\n# (time dependent) parameters: qw, qo, ϕ\nfunction onestep(sw, p, m, n, h, Δt, Z, ρw, ρo, μw, μo, K, g, ϕ, qw, qo)\n    # step 1: update p\n    # λw = Krw(sw)/μw\n    # λo = Kro(1-sw)/μo\n    λw = sw.*sw/μw\n    λo = (1-sw).*(1-sw)/μo\n    λ = λw + λo\n    q = qw + qo + λw/(λo+1e-16).*qo\n    # q = qw + qo\n    potential_c = (ρw - ρo)*g .* Z\n\n    # Step 1: implicit potential\n    Θ = upwlap_op(K * K_CONST, λo, potential_c, h, constant(0.0))\n\n    load_normal = (Θ+q/ALPHA) - ave_normal(Θ+q/ALPHA, m, n)\n\n    # p = poisson_op(λ.*K* K_CONST, load_normal, h, constant(0.0), constant(1))\n    p = upwps_op(K * K_CONST, λ, load_normal, p, h, constant(0.0), constant(0)) # potential p = pw - ρw*g*h \n\n    # step 2: implicit transport\n    sw = sat_op(sw, p, K * K_CONST, ϕ, qw, qo, μw, μo, sw, Δt, h)\n    return sw, p\nend\n\n\n\n\"\"\"\nimpes(tf_ctx)\nSolve the two phase flow equation. \n`qw` and `qo` -- `NT x m x n` numerical array, `qw[i,:,:]` the corresponding value of qw at i*Δt\n`sw0` and `p0` -- initial value for `sw` and `p`. `m x n` numerical array.\n\"\"\"\nfunction imseq(tf_ctx)\n    ta_sw, ta_p = TensorArray(NT+1), TensorArray(NT+1)\n    ta_sw = write(ta_sw, 1, tf_ctx.sw0)\n    ta_p = write(ta_p, 1, constant(zeros(tf_ctx.m, tf_ctx.n)))\n    i = constant(1, dtype=Int32)\n    function condition(i, tas...)\n        i <= tf_ctx.NT\n    end\n    function body(i, tas...)\n        ta_sw, ta_p = tas\n        sw, p = onestep(read(ta_sw, i), read(ta_p, i), tf_ctx.m, tf_ctx.n, tf_ctx.h, tf_ctx.Δt, tf_ctx.Z, tf_ctx.ρw, tf_ctx.ρo, tf_ctx.μw, tf_ctx.μo, tf_ctx.K, tf_ctx.g, tf_ctx.ϕ, tf_ctx.qw[i], tf_ctx.qo[i])\n        ta_sw = write(ta_sw, i+1, sw)\n        ta_p = write(ta_p, i+1, p)\n        i+1, ta_sw, ta_p\n    end\n\n    _, ta_sw, ta_p = while_loop(condition, body, [i, ta_sw, ta_p])\n    out_sw, out_p = stack(ta_sw), stack(ta_p)\nend\n","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"using FwiFlow\nusing PyCall\nusing LinearAlgebra\nusing DelimitedFiles\nnp = pyimport(\"numpy\")\n\nconst SRC_CONST = 86400.0 #\nconst GRAV_CONST = 9.8    # gravity constant\n\n# Hyperparameter for flow simulation\nm = 15\nn = 30\nh = 30.0 # meter\nNT  = 50\ndt_survey = 5\nΔt = 20.0 # day\nz = (1:m)*h|>collect\nx = (1:n)*h|>collect\nX, Z = np.meshgrid(x, z)\n\nρw = 501.9\nρo = 1053.0\nμw = 0.1\nμo = 1.0\n\nK_init = 20.0 .* ones(m,n) # initial guess of permeability \n\ng = GRAV_CONST\nϕ = 0.25 .* ones(m,n)\nqw = zeros(NT, m, n)\nqw[:,9,3] .= 0.005 * (1/h^2)/10.0 * SRC_CONST\nqo = zeros(NT, m, n)\nqo[:,9,28] .= -0.005 * (1/h^2)/10.0 * SRC_CONST\nsw0 = zeros(m, n)\nsurvey_indices = collect(1:dt_survey:NT+1) # 10 stages\nn_survey = length(survey_indices)\n\n\n\nK = 20.0 .* ones(m,n) # millidarcy\nK[8:10,:] .= 120.0\n# K[17:21,:] .= 100.0\n# for i = 1:m\n#     for j = 1:n\n#         if i <= (14 - 24)/(30 - 1)*(j-1) + 24 && i >= (12 - 18)/(30 - 1)*(j-1) + 18\n#             K[i,j] = 100.0\n#         end\n#     end\n# end\ntfCtxTrue = tfCtxGen(m,n,h,NT,Δt,Z,X,ρw,ρo,μw,μo,K,g,ϕ,qw,qo, sw0, true)\nout_sw_true, out_p_true = imseq(tfCtxTrue)","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"(Image: )","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"tfCtxInit = tfCtxGen(m,n,h,NT,Δt,Z,X,ρw,ρo,μw,μo,K_init,g,ϕ,qw,qo, sw0, false)\nout_sw_init, out_p_init = imseq(tfCtxInit)\n\nsess = Session(); init(sess)\nO = run(sess, out_sw_init)\nvis(O)\n# NOTE Compute FWI loss\n\n\nloss = sum((out_sw_true-out_sw_init)^2)\nopt = ScipyOptimizerInterface(loss, options=Dict(\"maxiter\"=> 100, \"ftol\"=>1e-12, \"gtol\"=>1e-12),var_to_bounds = Dict(tfCtxInit.K=>(10.0, 130.0)))\n       \n\n__cnt = 0\n__loss = 0\nout = []\nfunction print_loss(l)\n    if mod(__cnt,1)==0\n        println(\"iter $__cnt, current loss=\",l)\n    end\n    global __loss = l\n    global __cnt += 1\nend\n__iter = 0\nfunction step_callback(rk)\n    if mod(__iter,1)==0\n        println(\"================ ITER $__iter ===============\")\n    end\n    println(\"$__loss\")\n    push!(out, __loss)\n    global __iter += 1\nend\nsess = Session(); init(sess)\nScipyOptimizerMinimize(sess, opt, loss_callback=print_loss, \n        step_callback=step_callback, fetches=[loss])\n","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"(Image: )","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"We can visualize K with ","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"imshow(run(sess, tfCtxInit.K), extent=[0,n*h,m*h,0]);\nxlabel(\"Distance (m)\")\nylabel(\"Depth (m)\")\ncb = colorbar()\nclim([20, 120])\ncb.set_label(\"Permeability (md)\")","category":"page"},{"location":"tutorials/flow/#","page":"Flow Inversion","title":"Flow Inversion","text":"(Image: ) (Image: )","category":"page"},{"location":"tutorials/fwi/#FWI-1","page":"FWI","title":"FWI","text":"","category":"section"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"In this example, we perform full-waveform inversion (FWI) with FwiFlow. For explanation of FWI, see the documentation here. ","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"First we load all necessary packages","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"using FwiFlow\nusing PyCall\nusing LinearAlgebra\nusing DelimitedFiles\nnp = pyimport(\"numpy\")\nsio = pyimport(\"scipy.io\")","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"We specify the parameters for the computational domain and numerical methods. The computational domain is shown below","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"<p align=\"center\"> <img src=\"assets/doc_domain.png\" width=\"50%\"> </p>","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"oz = 0.0 \nox = 0.0\ndz_orig = 24.0 \ndx_orig = 24.0 \nnz_orig = 134 \nnx_orig = 384 \ndz = dz_orig/1.0\ndx = dx_orig/1.0\nnz = Int64(round((dz_orig * nz_orig) / dz));\nnx = Int64(round((dx_orig * nx_orig) / dx))\ndt = 0.0025\nnSteps = 2000\npara_fname = \"para_file.json\"\nsurvey_fname = \"survey_file.json\"\ndata_dir_name = \"Data\"","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"We set the PML width, padding width (optional; the padding is for performance, see padding) and the mask, which removes the effect of sources and makes inversion more stable. ","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"nPml = 32\nnPad = 32 - mod((nz+2*nPml), 32)\nnz_pad = nz + 2*nPml + nPad\nnx_pad = nx + 2*nPml\nMask = zeros(nz_pad, nx_pad)\nMask[nPml+1:nPml+nz, nPml+1:nPml+nx] .= 1.0\nMask[nPml+1:nPml+10,:] .= 0.0\ntf_mask = constant(Mask)\ntf_mask_neg = constant(1.0 .- Mask)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"The source and receiver indices are given by","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"ind_src_x = collect(4:8:384)\nind_src_z = 2ones(Int64, size(ind_src_x))\nind_rec_x = collect(3:381)\nind_rec_z = 2ones(Int64, size(ind_rec_x))","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"Next, we load source time functions (stf_load) from the file. ","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"stf_load = Matrix{Float64}(undef, 1, nSteps)\nstf_load[1,:] = sio.loadmat(\"$(DATADIR)/sourceF_4p5_2_high.mat\", squeeze_me=true, struct_as_record=false)[\"sourceF\"]\ntf_stf_array = tf.broadcast_to(constant(stf_load), [length(ind_src_z), nSteps])","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"Each source time function has the following profile","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"(Image: )","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"We load the true P-wave, S-wave and densities to generate synthetic observation data","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"cp_true_pad = reshape(reinterpret(Float32,read(\"$DATADIR/Model_Cp_true.bin\"))          , (nz_pad, nx_pad))\ncs_true_pad = zeros(nz_pad, nx_pad)\nden_true_pad = 2500.0 .* ones(nz_pad, nx_pad)\n\ntf_cp_pad = Variable(cp_true_pad, dtype=Float64) # original scale as \ntf_cs_pad = constant(cs_true_pad, dtype=Float64)\ntf_den_pad = constant(den_true_pad, dtype=Float64)\n\nfunction vel2moduli(cp,cs,den)\n    lambda = (cp^2 - 2.0 * cs^2) .* den / 1e6\n    mu = cs^2 .* den / 1e6\n    return lambda, mu\nend\ntf_lambda_inv_pad, tf_mu_inv_pad = vel2moduli(tf_cp_pad, tf_cs_pad, tf_den_pad)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"We use paraGen and surveyGen to generate parameter files","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"f0 = 4.5\nparaGen(nz_pad, nx_pad, dz, dx, nSteps, dt, f0, nPml, nPad, para_fname, survey_fname, data_dir_name)\nsurveyGen(ind_src_z, ind_src_x, ind_rec_z, ind_rec_x, survey_fname)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"At this point, we should be able to see two files in the current directory","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"para_file.json","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"{\"nz\":224,\"nx\":448,\"dz\":24.0,\"dx\":24.0,\"nSteps\":2000,\"dt\":0.0025,\"f0\":4.5,\"nPoints_pml\":32,\"nPad\":26,\"survey_fname\":\"survey_file.json\",\"data_dir_name\":\"Data\"}","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"survey_file.json","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"{\"nShots\":48,\"shot0\":{\"z_src\":2,\"x_src\":4,\"nrec\":379,\"z_rec\":[2,2,2,2,2,...","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"Finally we execute the forward wave equation and save the observation data to files. In the following script, we explicitly specify the ID of GPU where the operator is executed. ","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"tf_shot_ids = collect(0:length(ind_src_z)-1)\ndummy = fwi_obs_op(tf_lambda_inv_pad, tf_mu_inv_pad, tf_den_pad, tf_stf_array, 0, tf_shot_ids, para_fname) # use GPU:0\nsess = Session(); init(sess);\nrun(sess, dummy)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"In the Data folder, there will be 47 Shot*.bin files. We can visualize the result with the following script","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"A=read(\"Data/Shot10.bin\");imshow(reshape(reinterpret(Float32,A),(nSteps ,length(ind_rec_z))), aspect=\"auto\", vmax=2000, vmin=-2000, extent=[0, nx*dx, dt*(nSteps-1), 0])\nxlabel(\"Receiver Location (m)\")\nylabel(\"Time (s)\")\ncolorbar()\nset_cmap(\"gray\")","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"(Image: )","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"We now consider the inversion problem: assume that we do not known the P-wave velocity. We mark it as independent variable to be update using Variable. Additionally, for better coalesced memory access on GPU, we pad the variables to multiples of 32 in the z direction.","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"cs_init_pad = zeros(nz_pad, nx_pad)\nden_init_pad = 2500.0 .* ones(nz_pad, nx_pad)\ncp_init_pad = reshape(reinterpret(Float32,read(\"$DATADIR/Model_Cp_init_1D.bin\")), (nz_pad, nx_pad))\ntf_cp_inv = Variable(cp_init_pad[nPml+1:nPml+nz, nPml+1:nPml+nx], dtype=Float64) # original scale as \ntf_cs_inv = constant(cs_init_pad[nPml+1:nPml+nz, nPml+1:nPml+nx], dtype=Float64)\ntf_den_inv = constant(den_init_pad[nPml+1:nPml+nz, nPml+1:nPml+nx], dtype=Float64)\ntf_cp_ref_pad = constant(cp_init_pad, dtype=Float64) # original scale as \ntf_cs_ref_pad = constant(cs_init_pad, dtype=Float64)\ntf_den_ref_pad = constant(den_init_pad, dtype=Float64)\ntf_cp_inv_pad, tf_cs_inv_pad, tf_den_inv_pad = padding(tf_cp_inv, tf_cs_inv, \n    tf_den_inv, nz_orig, nx_orig, nz, nx, nPml, nPad)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"Likewise, to remove the effect of extreme values close to the sources, we use masks","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"tf_cp_msk_pad = tf_cp_inv_pad .* tf_mask + tf_cp_ref_pad .* tf_mask_neg\ntf_cs_msk_pad = tf_cs_inv_pad .* tf_mask + tf_cs_ref_pad .* tf_mask_neg\ntf_den_msk_pad = tf_den_inv_pad .* tf_mask + tf_den_ref_pad .* tf_mask_neg\ntf_lambda_inv_pad, tf_mu_inv_pad = vel2moduli(tf_cp_msk_pad, tf_cs_msk_pad,tf_den_msk_pad)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"The inversion can be done in parallel in multi-GPU machines. This is done by specifying the GPU IDs for different fwi_op. ","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"loss = constant(0.0)\nnGpus = length(use_gpu())\nshot_id_points = Int32.(trunc.(collect(LinRange(0, length(ind_src_z)-1, nGpus+1))))\n\nloss = constant(0.0)\nfor i = 1:nGpus\n    global loss\n    tf_shot_ids = collect(shot_id_points[i]:shot_id_points[i+1])\n    loss += fwi_op(tf_lambda_inv_pad, tf_mu_inv_pad, tf_den_inv_pad, \n            tf_stf_array, i-1, tf_shot_ids, para_fname)\nend","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"Finally, we trigger BFGS optimizer with two lines of codes. ","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"sess = Session(); init(sess)\nBFGS!(sess, loss)","category":"page"},{"location":"tutorials/fwi/#","page":"FWI","title":"FWI","text":"Here is a snapshot of multi-GPU execution. Note we have only used approximately 2% of total memory, which means we can actually places about 50 times the current number of sources on each GPU!  (Image: )","category":"page"},{"location":"troubleshooting/#Trouble-Shooting-1","page":"Trouble Shooting","title":"Trouble Shooting","text":"","category":"section"},{"location":"troubleshooting/#AMG-1","page":"Trouble Shooting","title":"AMG","text":"","category":"section"},{"location":"README/#FwiFlow-1","page":"FwiFlow","title":"FwiFlow","text":"","category":"section"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"<img src=\"assets/diagram.png\" style=\"zoom:67%;\" />","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"This project consider the coupling of the wave equation and a two-phase incompressible immiscible flow equation, mainly for CO2 injection or water injection monitoring","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"utt = m(x) uxx + f(x,t)","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"m_t = grad(a(x)grad(m)) + b(x)*grad(m)","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"The time scale T2 for the second equation is much larger than that of the first one T1","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"T2 >> T1","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"a(x), b(x) are unknown functions and will be calibrated using observation data di(x), which depends on ui for each observation time i","category":"page"},{"location":"README/#Instruction-1","page":"FwiFlow","title":"Instruction","text":"","category":"section"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Compile AdvectionDiffusion","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"cd Ops/AdvectionDiffusion/\nmkdir build\ncd build\ncmake ..\nmake -j","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Test AdvectionDiffusion and Generate Data (required)","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"julia> include(\"cdtest.jl\")\njulia> include(\"gradtest.jl\")","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Compile CUFA","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"cd Ops/FWI/CUFD/Src\nmake -j","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Compile Wrapper","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"cd Ops/FWI/ops/build\ncmake ..\nmake -j","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Generate data","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"julia> include(\"generate_m.jl\")\npython main_calc_obs_data.py\npython fwitest.py","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Test Wrapper","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"cd src","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"julia> include(\"fwi_gradient_check.jl\")\njulia> include(\"coupled_gradient_check\")","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"Run experiments","category":"page"},{"location":"README/#","page":"FwiFlow","title":"FwiFlow","text":"julia> include(\"learn_m.jl\")","category":"page"},{"location":"#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"#Intelligent-Automatic-Differentiation-(IAD):-Philosophy-1","page":"Getting Started","title":"Intelligent Automatic Differentiation (IAD): Philosophy","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"We treat physical simulations as a chain of multiple differentiable operators, such as discrete Laplacian evaluation, a Poisson solver and a single implicit time stepping for nonlinear PDEs. They are like building blocks that can be assembled to make simulation tools for new physical models. ","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"Those operators are differentiable and integrated in a computational graph so that the gradients can be computed automatically and efficiently via analyzing the dependency in the graph. Independent operators are parallelized executed. With the gradients we can perform gradient-based PDE-constrained optimization for inverse problems. ","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"FwiFlow is built on ADCME, a powerful static graph based automatic differentiation library for scientific computing (with TensorFlow backend). FwiFlow implements the idea of Intelligent Automatic Differentiation. ","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"(Image: )","category":"page"},{"location":"#Tutorials-1","page":"Getting Started","title":"Tutorials","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"Here are some examples to start with (* denotes advanced examples)","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"FWI\nTwo Phase Flow Inversion\n*Coupled Inversion\n*Coupled Inversion: Channel Flow","category":"page"},{"location":"#FwiFlow:-Application-of-IAD-to-FWI-and-Two-Phase-Flow-Coupled-Inversion-1","page":"Getting Started","title":"FwiFlow: Application of IAD to FWI and Two Phase Flow Coupled Inversion","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"This framework uses waveform data to invert for intrinsic parameters (e.g., permeability and porosity) in subsurface problems, with coupled flow physics, rock physics, and wave physics models.","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"(Image: )","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"IAD provides three levels of user control with ","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"built-in differentiable operators from modern deep-learning infrastructures (TensorFlow), and customized operators that can either \nencapsulate analytic adjoint gradient computation or \nhandle the forward simulation and compute the corresponding gradient for a single time step. ","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"This intelligent strategy strikes a good balance between computational efficiency and programming efficiency and would serve as a paradigm for a wide range of PDE-constrained geophysical inverse problems.","category":"page"},{"location":"#Physical-Models-1","page":"Getting Started","title":"Physical Models","text":"","category":"section"},{"location":"#Flow-Physics-1","page":"Getting Started","title":"Flow Physics","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The flow physics component maps from intrinsic properties such as permeability to flow properties, such as fluid saturation. We use a model of two-phase flow in porous media as an example. The governing equations are convervation of mass, Darcy's law, and other relationships.","category":"page"},{"location":"#Rock-Physics-1","page":"Getting Started","title":"Rock Physics","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The rock physics model describes the relationship between fluid properties and rock elastic properties. As one fluid phase displaces the other, the bulk modulus and density of rocks vary. ","category":"page"},{"location":"#Wave-Physics-1","page":"Getting Started","title":"Wave Physics","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The elastic wave equation maps from elastic properties to wavefields, such as particle velocity and stress, which can be recorded by receiver arrays as seismic waveform data.","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The elastic wave equation maps from elastic properties to wavefields, such as particle velocity and stress, which can be recorded by receiver arrays as seismic waveform data.","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"###\tThe Adjoint Method & Automatic Differentation","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"(Image: )","category":"page"},{"location":"#Customized-Operators-1","page":"Getting Started","title":"Customized Operators","text":"","category":"section"}]
}
