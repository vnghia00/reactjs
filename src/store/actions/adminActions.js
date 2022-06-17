import actionTypes from "./actionTypes";
import {
	getAllCV,
	getAllUsers,
	getAllNL,
	createNewUserSV,
	deleteUserSV,
	updateUser,
	createNewKNL,
	getAllKNL,
	getKNL,
	deleteKNL,
	updateKNL,
	getAllDM,
	getAllBA,
	getAllMA,
	createHD,
	getAllHD,
	deleteHD,
	updateHD,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchChucVuStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_CHUC_VU_START,
			});
			const res = await getAllCV();
			if (res && res.errCode === 0) {
				dispatch(fetchChucVuSucess(res.data));
			} else {
				dispatch(fetchChucVuFail());
			}
		} catch (e) {
			dispatch(fetchChucVuFail());
			console.log(e);
		}
	};
};
export const fetchChucVuSucess = (data) => ({
	type: actionTypes.FETCH_CHUC_VU_SUCSESS,
	data: data,
});
export const fetchChucVuFail = () => ({
	type: actionTypes.FETCH_CHUC_VU_FAIL,
});

export const fetchDanhMucStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_DANH_MUC_START,
			});
			const res = await getAllDM();
			if (res && res.errCode === 0) {
				dispatch(fetchDanhMucSucess(res.data));
			} else {
				dispatch(fetchDanhMucFail());
			}
		} catch (e) {
			dispatch(fetchDanhMucFail());
			console.log(e);
		}
	};
};
export const fetchDanhMucSucess = (data) => ({
	type: actionTypes.FETCH_DANH_MUC_SUCSESS,
	data: data,
});
export const fetchDanhMucFail = () => ({
	type: actionTypes.FETCH_DANH_MUC_FAIL,
});

export const fetchNLStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_NL_START,
			});
			const res = await getAllNL();
			if (res && res.errCode === 0) {
				dispatch(fetchNLSucess(res.data));
			} else {
				dispatch(fetchNLFail());
			}
		} catch (e) {
			dispatch(fetchNLFail());
			console.log(e);
		}
	};
};
export const fetchNLSucess = (data) => ({
	type: actionTypes.FETCH_NL_SUCSESS,
	data: data,
});
export const fetchNLFail = () => ({
	type: actionTypes.FETCH_NL_FAIL,
});

export const createNewUser = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await createNewUserSV(data);
			if (res && res.errCode === 0) {
				dispatch(createUserSucess());
				dispatch(fetchALLNVStart());
				toast.success(res.message);
			} else {
				dispatch(createUserFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(createUserFail());
			console.log(e);
		}
	};
};
export const createUserSucess = () => ({
	type: actionTypes.CREATE_NV_SUCSESS,
});
export const createUserFail = () => ({
	type: actionTypes.CREATE_NV_FAIL,
});

export const fetchALLNVStart = () => {
	return async (dispatch, getState) => {
		try {
			const res = await getAllUsers("ALL");
			if (res && res.errCode === 0) {
				dispatch(fetchAllUserSucess(res.users));
			} else {
				dispatch(fetchAllUserFail());
			}
		} catch (e) {
			dispatch(fetchAllUserFail());
			console.log(e);
		}
	};
};
export const fetchAllUserSucess = (data) => ({
	type: actionTypes.FETCH_ALL_NV_SUCSESS,
	data: data,
});
export const fetchAllUserFail = () => ({
	type: actionTypes.FETCH_ALL_NV_FAIL,
});

export const deleteNVStart = (id) => {
	return async (dispatch, getState) => {
		try {
			const res = await deleteUserSV(id);
			if (res && res.errCode === 0) {
				dispatch(deletelUserSucess());
				dispatch(fetchALLNVStart());
				toast.success(res.message);
			} else {
				dispatch(deleteUserFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(deleteUserFail());
			console.log(e);
		}
	};
};
export const deletelUserSucess = () => ({
	type: actionTypes.DELETE_NV_SUCSESS,
});
export const deleteUserFail = () => ({
	type: actionTypes.DELETE_NV_FAIL,
});

export const updateNVStart = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await updateUser(data);
			if (res && res.errCode === 0) {
				dispatch(updateUserSucess());
				dispatch(fetchALLNVStart());
				toast.success(res.message);
			} else {
				dispatch(updateUserFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(updateUserFail());
			console.log(e);
		}
	};
};
export const updateUserSucess = () => ({
	type: actionTypes.UPDATE_NV_SUCSESS,
});
export const updateUserFail = () => ({
	type: actionTypes.UPDATE_NV_FAIL,
});

export const createKNLStart = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await createNewKNL(data);
			if (res && res.errCode === 0) {
				dispatch(createKNLSucess());
				dispatch(fetchKNLStart());
				toast.success(res.message);
			} else {
				dispatch(createKNLFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(createKNLFail());
			console.log(e);
		}
	};
};
export const createKNLSucess = () => ({
	type: actionTypes.CREATE_KNL_SUCSESS,
});
export const createKNLFail = () => ({
	type: actionTypes.CREATE_KNL_FAIL,
});

export const fetchKNLStart = () => {
	return async (dispatch, getState) => {
		try {
			const res = await getAllKNL();
			if (res && res.errCode === 0) {
				dispatch(fetchKNLSucess(res.data));

				// dispatch(fetchALLNVStart());
			} else {
				dispatch(fetchKNLFail());
				// toast.error(res.message);
			}
		} catch (e) {
			dispatch(fetchKNLFail());
			console.log(e);
		}
	};
};
export const fetchKNLSucess = (data) => ({
	type: actionTypes.FETCH_KNL_SUCSESS,
	data: data,
});
export const fetchKNLFail = () => ({
	type: actionTypes.FETCH_KNL_FAIL,
});

export const fetchKNLDateStart = (date) => {
	return async (dispatch, getState) => {
		try {
			const res = await getKNL(date);
			if (res && res.errCode === 0) {
				dispatch(fetchKNLDateSucess(res.data));

			} else {
				dispatch(fetchKNLDateFail());
				// toast.error(res.message);
			}
		} catch (e) {
			dispatch(fetchKNLDateFail());
			console.log(e);
		}
	};
};
export const fetchKNLDateSucess = (data) => ({
	type: actionTypes.FETCH_KNL_DATE_SUCSESS,
	data: data,
});
export const fetchKNLDateFail = () => ({
	type: actionTypes.FETCH_KNL_DATE_FAIL,
});

export const deleteKNLStart = (arrId) => {
	return async (dispatch, getState) => {
		try {
			const res = await deleteKNL(arrId);
			if (res && res.errCode === 0) {
				dispatch(deleteKNLSucess());
				dispatch(fetchKNLStart());
				toast.success(res.message);
			} else {
				dispatch(deleteKNLFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(deleteKNLFail());
			console.log(e);
		}
	};
};
export const deleteKNLSucess = () => ({
	type: actionTypes.DELETE_KNL_DATE_SUCSESS,
});
export const deleteKNLFail = () => ({
	type: actionTypes.DELETE_KNL_DATE_FAIL,
});

export const updateKNLStart = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await updateKNL(data);
			if (res && res.errCode === 0) {
				dispatch(updateKNLSucess());
				dispatch(fetchKNLStart());
				toast.success(res.message);
			} else {
				dispatch(updateKNLFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(updateKNLFail());
			console.log(e);
		}
	};
};
export const updateKNLSucess = () => ({
	type: actionTypes.UPDATE_KNL_SUCSESS,
});
export const updateKNLFail = () => ({
	type: actionTypes.UPDATE_KNL_FAIL,
});


export const fetchBanAnStart = () => {
	return async (dispatch, getState) => {
		try {
			const res = await getAllBA();
			if (res && res.errCode === 0) {
				dispatch(fetchBanANSucess(res.data));

			} else {
				dispatch(fetchBanANFail());
				// toast.error(res.message);
			}
		} catch (e) {
			dispatch(fetchBanANFail());
			console.log(e);
		}
	};
};
export const fetchBanANSucess = (data) => ({
	type: actionTypes.FETCH_BAN_AN_SUCSESS,
	data: data,
});
export const fetchBanANFail = () => ({
	type: actionTypes.FETCH_BAN_AN_FAIL,
});

export const fetchMonAnStart = () => {
	return async (dispatch, getState) => {
		try {
			const res = await getAllMA();
			if (res && res.errCode === 0) {
				dispatch(fetchMonAnSucess(res.data));

			} else {
				dispatch(fetchMonANFail());
				// toast.error(res.message);
			}
		} catch (e) {
			dispatch(fetchMonANFail());
			console.log(e);
		}
	};
};
export const fetchMonAnSucess = (data) => ({
	type: actionTypes.FETCH_MON_AN_SUCSESS,
	data: data,
});
export const fetchMonANFail = () => ({
	type: actionTypes.FETCH_MON_AN_FAIL,
});

export const createHDStart = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await createHD(data);
			if (res && res.errCode === 0) {
				dispatch(createHDSucess());
				dispatch(fetchHDStart());
				toast.success(res.message);
			} else {
				dispatch(createHDFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(createHDFail());
			console.log(e);
		}
	};
};
export const createHDSucess = () => ({
	type: actionTypes.CREATE_KNL_SUCSESS,
});
export const createHDFail = () => ({
	type: actionTypes.CREATE_KNL_FAIL,
});

export const fetchHDStart = () => {
	return async (dispatch, getState) => {
		try {
			const res = await getAllHD();
			if (res && res.errCode === 0) {
				dispatch(fetchHDSucess(res.data));
				dispatch(fetchBanAnStart());
			} else {
				dispatch(fetchHDFail());
				// toast.error(res.message);
			}
		} catch (e) {
			dispatch(fetchHDFail());
			console.log(e);
		}
	};
};
export const fetchHDSucess = (data) => ({
	type: actionTypes.FETCH_HD_SUCSESS,
	data: data,
});
export const fetchHDFail = () => ({
	type: actionTypes.FETCH_HD_FAIL,
});

export const deleteHDStart = (arrId) => {
	return async (dispatch, getState) => {
		try {
			const res = await deleteHD(arrId);
			if (res && res.errCode === 0) {
				dispatch(deleteHDSucess());
				dispatch(fetchBanAnStart());
				dispatch(fetchHDStart());
				toast.success(res.message);
			} else {
				dispatch(deleteHDFail());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(deleteHDFail());
			console.log(e);
		}
	};
};
export const deleteHDSucess = () => ({
	type: actionTypes.DELETE_HD_SUCSESS,
});
export const deleteHDFail = () => ({
	type: actionTypes.DELETE_HD_FAIL,
});

export const updateHDStart = (data) => {
	return async (dispatch, getState) => {
		try {
			console.log(data);
			const res = await updateHD(data);
			if (res && res.errCode === 0) {
				dispatch(updateHDSucess());
				dispatch(fetchHDStart());
				toast.success(res.message);
			} else {
				dispatch(actionTypes());
				toast.error(res.message);
			}
		} catch (e) {
			dispatch(updateHDFail());
			console.log(e);
		}
	};
};
export const updateHDSucess = () => ({
	type: actionTypes.UPDATE_HD_SUCSESS,
});
export const updateHDFail = () => ({
	type: actionTypes.UPDATE_HD_FAIL,
});