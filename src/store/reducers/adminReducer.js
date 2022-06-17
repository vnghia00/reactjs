import actionTypes from "../actions/actionTypes";

const initialState = {
	chucVu: [],
	isLoadingChucVu: false,
	danhMuc: [],
	isLoadingDanhMuc: false,
	NL: [],
	isLoadingNL: false,
	NV: [],
	KNL: [],
	KNLdate: [],
	BA: [],
	MA: [],
	HD: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CHUC_VU_START:
			console.log("FETCH_CHUC_VU_START");
			let copyState = { ...state };
			copyState.isLoadingChucVu = true;
			return {
				...copyState,
			};
		case actionTypes.FETCH_CHUC_VU_SUCSESS:
			console.log("FETCH_CHUC_VU_SUCSESS");
			let copyState2 = { ...state };
			copyState2.chucVu = action.data;
			copyState2.isLoadingChucVu = false;
			return {
				...copyState2,
			};
		case actionTypes.FETCH_CHUC_VU_FAIL:
			console.log("FETCH_CHUC_VU_FAIL");
			let copyState3 = { ...state };
			copyState3.chucVu = [];
			copyState3.isLoadingChucVu = false;
			return {
				...copyState3,
			};

		case actionTypes.FETCH_NL_START:
			console.log("FETCH_NL_START");
			let copyState4 = { ...state };
			copyState4.isLoadingNL = true;
			return {
				...copyState4,
			};
		case actionTypes.FETCH_NL_SUCSESS:
			console.log("FETCH_NL_SUCSESS");
			let copyState5 = { ...state };
			copyState5.NL = action.data;
			copyState5.isLoadingNL = false;
			return {
				...copyState5,
			};
		case actionTypes.FETCH_NL_FAIL:
			console.log("FETCH_NL_FAIL");
			let copyState6 = { ...state };
			copyState6.NL = [];
			copyState6.isLoadingNL = false;
			return {
				...copyState6,
			};
		case actionTypes.FETCH_ALL_NV_SUCSESS:
			console.log("FETCH_ALL_NV_SUCSESS");
			let copyState7 = { ...state };
			copyState7.NV = action.data;
			return {
				...copyState7,
			};
		case actionTypes.FETCH_ALL_NV_FAIL:
			console.log("FETCH_ALL_NV_FAIL");
			let copyState8 = { ...state };
			copyState8.NV = [];
			return {
				...copyState8,
			};
		case actionTypes.FETCH_KNL_SUCSESS:
			console.log("FETCH_KNL_SUCSESS");
			let copyState9 = { ...state };
			copyState9.KNL = action.data;
			return {
				...copyState9,
			};
		case actionTypes.FETCH_KNL_FAIL:
			console.log("FETCH_KNL_FAIL");
			let copyState10 = { ...state };
			copyState10.KNL = [];
			return {
				...copyState10,
			};
		case actionTypes.FETCH_KNL_DATE_SUCSESS:
			console.log("FETCH_KNL_DATE_SUCSESS");
			let copyState11 = { ...state };
			copyState11.KNLdate = action.data;
			return {
				...copyState11,
			};
		case actionTypes.FETCH_KNL_DATE_FAIL:
			console.log("FETCH_KNL_DATE_FAIL");
			let copyState12 = { ...state };
			copyState12.KNLdate = [];
			return {
				...copyState12,
			};

		case actionTypes.FETCH_DANH_MUC_START:
			console.log("FETCH_DANH_MUC_START");
			let copyState13 = { ...state };
			copyState13.isLoadingDanhMuc = true;
			return {
				...copyState13,
			};
		case actionTypes.FETCH_DANH_MUC_SUCSESS:
			console.log("FETCH_DANH_MUC_SUCSESS");
			let copyState14 = { ...state };
			copyState14.danhMuc = action.data;
			copyState14.isLoadingDanhMuc = false;
			return {
				...copyState14,
			};
		case actionTypes.FETCH_DANH_MUC_FAIL:
			console.log("FETCH_DANH_MUC_FAIL");
			let copyState15 = { ...state };
			copyState15.danhMuc = [];
			copyState15.isLoadingDanhMuc = false;
			return {
				...copyState15,
			};
			
		case actionTypes.FETCH_BAN_AN_SUCSESS:
			console.log("FETCH_BAN_AN_SUCSESS");
			let copyState16 = { ...state };
			copyState16.BA = action.data;
			return {
				...copyState16,
			};
		case actionTypes.FETCH_BAN_AN_FAIL:
			console.log("FETCH_BAN_AN_FAIL");
			let copyState17 = { ...state };
			copyState17.BA = [];
			return {
				...copyState17,
			};

		case actionTypes.FETCH_MON_AN_SUCSESS:
			console.log("FETCH_MON_AN_SUCSESS");
			let copyState18 = { ...state };
			copyState18.MA = action.data;
			return {
				...copyState18,
			};
		case actionTypes.FETCH_MON_AN_FAIL:
			console.log("FETCH_MON_AN_FAIL");
			let copyState19 = { ...state };
			copyState19.MA = [];
			return {
				...copyState19,
			};
			
		case actionTypes.FETCH_HD_SUCSESS:
			console.log("FETCH_HD_SUCSESS");
			let copyState20 = { ...state };
			copyState20.HD = action.data;
			return {
				...copyState20,
			};
		case actionTypes.FETCH_HD_FAIL:
			console.log("FETCH_HD_FAIL");
			let copyState21 = { ...state };
			copyState21.HD = [];
			return {
				...copyState21,
			};
		default:
			return state;
	}
};

export default adminReducer;
