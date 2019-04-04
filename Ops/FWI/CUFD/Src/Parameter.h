// Dongzhuo Li 04/22/2018
#ifndef PARAMETER_H__
#define PARAMETER_H__

#include <string>
#include "utilities.h"

class Parameter {

 private:
	int nz_;
	int nx_;
	float dz_;
	float dx_;
	int nSteps_;
	float dt_;
	float f0_;
	float filter_[4];
	std::string Cp_fname_;
	std::string Cs_fname_;
	std::string Den_fname_;
	std::string Src_loc_fname_;
	std::string Rec_loc_fname_;
	// std::string src_rec_pos_fname_;
	std::string data_dir_name_;
	int nPoints_pml_;
	int nPad_;
	bool isAc_;
	bool withAdj_;
	bool if_res_;
	bool if_win_;
	bool if_src_update_;


 public:
	Parameter();
	Parameter(const std::string &para_fname);
	~Parameter();

	int nz() const {
		return nz_;
	}
	int nx() const {
		return nx_;
	}
	float dz() const {
		return dz_;
	}
	float dx() const {
		return dx_;
	}
	int nSteps() const {
		return nSteps_;
	}
	float dt() const {
		return dt_;
	}
	float f0() const {
		return f0_;
	}
	float *filter() {
		return filter_;
	}
	std::string Cp_fname() const {
		return Cp_fname_;
	}
	std::string Cs_fname() const {
		return Cs_fname_;
	}
	std::string Den_fname() const {
		return Den_fname_;
	}
	// std::string src_rec_pos_fname() const {
	// 	return src_rec_pos_fname_;
	// }
	int nPoints_pml() const {
		return nPoints_pml_;
	}
	int nPad() const {
		return nPad_;
	}
	std::string data_dir_name() const {
		return data_dir_name_;
	}
	bool isAc() const {
		return isAc_;
	}
	bool withAdj() const {
		return withAdj_;
	}
	bool if_res() const {
		return if_res_;
	}
	bool if_win() const {
		return if_win_;
	}
	bool if_src_update() const {
		return if_src_update_;
	}
};

#endif