#define d_vx(z,x)  d_vx[(x)*(nz)+(z)]
#define d_vy(z,x)  d_vy[(x)*(nz)+(z)]
#define d_vz(z,x)  d_vz[(x)*(nz)+(z)]
#define d_sxx(z,x) d_sxx[(x)*(nz)+(z)]
#define d_szz(z,x) d_szz[(x)*(nz)+(z)]
#define d_sxz(z,x) d_sxz[(x)*(nz)+(z)]
#define sh_vz(z,x)  			sh_vz[(x)*(localz)+(z)]
#define sh_vx(z,x)  			sh_vx[(x)*(localz)+(z)]
#define d_mem_dvz_dz(z,x) d_mem_dvz_dz[(x)*(nz)+(z)]
#define d_mem_dvz_dx(z,x) d_mem_dvz_dx[(x)*(nz)+(z)]
#define d_mem_dvx_dz(z,x) d_mem_dvx_dz[(x)*(nz)+(z)]
#define d_mem_dvx_dx(z,x) d_mem_dvx_dx[(x)*(nz)+(z)]
#define d_Lambda(z,x)     d_Lambda[(x)*(nz)+(z)]
#define d_Mu(z,x)         d_Mu[(x)*(nz)+(z)]
#define d_ave_Mu(z,x)     d_ave_Mu[(x)*(nz)+(z)]
#define d_Den(z,x)        d_Den[(x)*(nz)+(z)]
#include "utilities.h"

__global__ void update_stress(float *d_vz, float *d_vx, float *d_szz, \
	float *d_sxx, float *d_sxz, float *d_mem_dvz_dz, float *d_mem_dvz_dx, \
	float *d_mem_dvx_dz, float *d_mem_dvx_dx, float *d_Lambda, float *d_Mu, float *d_ave_Mu,\
	float *d_Den, float *d_K_z, float *d_a_z, float *d_b_z, float *d_K_z_half, \
	float *d_a_z_half, float *d_b_z_half, float *d_K_x, float *d_a_x, float *d_b_x, \
	float *d_K_x_half, float *d_a_x_half, float *d_b_x_half, \
	int nz, int nx, float dt, float dz, float dx, int nPml, int nPad){

	int hFD = 2;
	int n_tile_z = blockDim.x - 2*hFD;
	int n_tile_x = blockDim.y - 2*hFD;
	int tz = threadIdx.x;
	int tx = threadIdx.y;
	int lz = tz + hFD;
	int lx = tx + hFD;
	int localz = blockDim.x;

  int gidz = blockIdx.x*n_tile_z + threadIdx.x;
  int gidx = blockIdx.y*n_tile_x + threadIdx.y;

  int gidz_in = gidz - hFD;
  int gidx_in = gidx - hFD;

  __shared__ float sh_vz[TX*TY];
  __shared__ float sh_vx[TX*TY];

	if(gidz_in>=0 && gidz_in<=nz-nPad-1 && gidx_in>=0 && gidx_in<=nx-1) {
  	sh_vz(tz, tx) = d_vz(gidz_in, gidx_in);
  	sh_vx(tz, tx) = d_vx(gidz_in, gidx_in);
	} else {
		sh_vz(tz, tx) = 0.0;
		sh_vx(tz, tx) = 0.0;
	}
  __syncthreads();


  float dvz_dz = 0.0;
  float dvx_dx = 0.0;

  float c1 = 9.0/8.0;
  float c2 = 1.0/24.0;

  float lambda = d_Lambda(gidz,gidx);
  float mu = d_Mu(gidz,gidx);
  // float c1 = coef[0];
  // float c2 = coef[1];
  if(tz < n_tile_z && tx < n_tile_x){
		if(gidz>=2 && gidz<=nz-nPad-3 && gidx>=2 && gidx<=nx-3) {

		  // dvz_dz = c1*(d_vz(gidz+1,gidx)-d_vz(gidz,gidx)) - c2*(d_vz(gidz+2,gidx)-d_vz(gidz-1,gidx));
		  // dvx_dx = c1*(d_vx(gidz,gidx)-d_vx(gidz,gidx-1)) - c2*(d_vx(gidz,gidx+1)-d_vx(gidz,gidx-2));
		  dvz_dz = c1*(sh_vz(lz+1, lx)-sh_vz(lz, lx)) - c2*(sh_vz(lz+2,lx)-sh_vz(lz-1,lx));
		  dvx_dx = c1*(sh_vx(lz, lx)-sh_vx(lz, lx-1)) - c2*(sh_vx(lz,lx+1)-sh_vx(lz,lx-2));

		  if(gidz<nPml || (gidz>nz-nPml-nPad-1)){
			  d_mem_dvz_dz(gidz,gidx) = d_b_z_half[gidz]*d_mem_dvz_dz(gidz,gidx) + d_a_z_half[gidz]*dvz_dz;
			  dvz_dz = dvz_dz / d_K_z_half[gidz] + d_mem_dvz_dz(gidz,gidx);
			}
			if(gidx<nPml || gidx>nx-nPml){
			  d_mem_dvx_dx(gidz,gidx) = d_b_x[gidx]*d_mem_dvx_dx(gidz,gidx) + d_a_x[gidx]*dvx_dx;
			  dvx_dx = dvx_dx / d_K_x[gidx] + d_mem_dvx_dx(gidz,gidx);
			}

			// lambda = d_Lambda(gidz,gidx);
			// mu = d_Mu(gidz,gidx);

		  d_szz(gidz,gidx) = d_szz(gidz,gidx) + \
		  	((lambda+2.0*mu)*dvz_dz/dz + lambda*dvx_dx/dx) * dt;
		  d_sxx(gidz,gidx) = d_sxx(gidz,gidx) + \
		  	(lambda*dvz_dz/dz + (lambda+2.0*mu)*dvx_dx/dx) * dt;





		  float dvx_dz = 0.0;
		  float dvz_dx = 0.0;

  	  // dvx_dz = c1*(d_vx(gidz,gidx)-d_vx(gidz-1,gidx)) - c2*(d_vx(gidz+1,gidx)-d_vx(gidz-2,gidx));
		  // dvz_dx = c1*(d_vz(gidz,gidx+1)-d_vz(gidz,gidx)) - c2*(d_vz(gidz,gidx+2)-d_vz(gidz,gidx-1));
		  dvx_dz = c1*(sh_vx(lz, lx)-sh_vx(lz-1, lx)) - c2*(sh_vx(lz+1,lx)-sh_vx(lz-2,lx));
		  dvz_dx = c1*(sh_vz(lz, lx+1)-sh_vz(lz, lx)) - c2*(sh_vz(lz,lx+2)-sh_vz(lz,lx-1));

		  if(gidz<nPml || (gidz>nz-nPml-nPad-1)){
			  d_mem_dvx_dz(gidz,gidx) = d_b_z[gidz]*d_mem_dvx_dz(gidz,gidx) + d_a_z[gidz]*dvx_dz;
			  dvx_dz = dvx_dz / d_K_z[gidz] + d_mem_dvx_dz(gidz,gidx);
			}
			if(gidx<nPml || gidx>nx-nPml){
			  d_mem_dvz_dx(gidz,gidx) = d_b_x_half[gidx]*d_mem_dvz_dx(gidz,gidx) + d_a_x_half[gidx]*dvz_dx;
			  dvz_dx = dvz_dx / d_K_x_half[gidx] + d_mem_dvz_dx(gidz,gidx);
			}

		  d_sxz(gidz,gidx) = d_sxz(gidz,gidx) + d_ave_Mu(gidz,gidx) * (dvx_dz/dz + dvz_dx/dx) * dt;
		}
		else{
			return;
		}
	}
}
