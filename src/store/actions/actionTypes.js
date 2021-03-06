const actionTypes = Object.freeze({
	//app
	APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
	SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
	CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

	//user
	ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
	USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
	USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCES",
	PROCESS_LOGOUT: "PROCESS_LOGOUT",

	//admin
	FETCH_CHUC_VU_START: "FETCH_CHUC_VU_START",
	FETCH_CHUC_VU_SUCSESS: "FETCH_CHUC_VU_SUCSESS",
	FETCH_CHUC_VU_FAIL: "FETCH_CHUC_VU_FAIL",

	FETCH_DANH_MUC_START: "FETCH_DANH_MUC_START",
	FETCH_DANH_MUC_SUCSESS: "FETCH_DANH_MUC_SUCSESS",
	FETCH_DANH_MUC_FAIL: "FETCH_DANH_MUC_FAIL",

	FETCH_NL_START: "FETCH_NL_START",
	FETCH_NL_SUCSESS: "FETCH_NL_SUCSESS",
	FETCH_NL_FAIL: "FETCH_NL_FAIL",

	FETCH_ALL_NV_SUCSESS: "FETCH_ALL_NV_SUCSESS",
	FETCH_ALL_NV_FAIL: "FETCH_ALL_NV_FAIL",

	CREATE_NV_SUCSESS: "CREATE_NV_SUCSESS",
	CREATE_NV_FAIL: "CREATE_NV_FAIL",

	UPDATE_NV_SUCSESS: "UPDATE_NV_SUCSESS",
	UPDATE_NV_FAIL: "UPDATE_NV_FAIL",

	DELETE_NV_SUCSESS: "DELETE_NV_SUCSESS",
	DELETE_NV_FAIL: "DELETE_NV_FAIL",

	CREATE_KNL_SUCSESS: "CREATE_KNL_SUCSESS",
	CREATE_KNL_FAIL: "CREATE_KNL_FAIL",

	FETCH_KNL_SUCSESS: "FETCH_KNL_SUCSESS",
	FETCH_KNL_FAIL: "FETCH_KNL_FAIL",

	FETCH_KNL_DATE_SUCSESS: "FETCH_KNL_DATE_SUCSESS",
	FETCH_KNL_DATE_FAIL: "FETCH_KNL_DATE_FAIL",

	DELETE_KNL_DATE_SUCSESS: "DELETE_KNL_DATE_SUCSESS",
	DELETE_KNL_DATE_FAIL: "DELETE_KNL_DATE_FAIL",

	UPDATE_KNL_SUCSESS: "UPDATE_KNL_SUCSESS",
	UPDATE_KNL_FAIL: "UPDATE_KNL_FAIL",

	FETCH_BAN_AN_SUCSESS: "FETCH_BAN_AN_SUCSESS",
	FETCH_BAN_AN_FAIL: "FETCH_BAN_AN_FAIL",

	FETCH_MON_AN_SUCSESS: "FETCH_MON_AN_SUCSESS",
	FETCH_MON_AN_FAIL: "FETCH_MON_AN_FAIL",

	CREATE_HD_SUCSESS: "CREATE_HD_SUCSESS",
	CREATE_HD_FAIL: "CREATE_HD_FAIL",

	FETCH_HD_SUCSESS: "FETCH_HD_SUCSESS",
	FETCH_HD_FAIL: "FETCH_HD_FAIL",

	DELETE_HD_SUCSESS: "DELETE_HD_SUCSESS",
	DELETE_HD_FAIL: "DELETE_HD_FAIL",

	UPDATE_HD_SUCSESS: "UPDATE_HD_SUCSESS",
	UPDATE_HD_FAIL: "UPDATE_HD_FAIL",

});

export default actionTypes;
