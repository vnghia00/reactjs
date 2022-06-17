import axios from "../axios";

const handleLoginAPI = (email, password) => {
	return axios.post("/api/login-admin", { email, password });
};
const getAllUsers = (inputId) => {
	return axios.get("/api/get-all-users", { params: { id: inputId } });
};
const createNewUserSV = (data) => {
	return axios.post("/api/create-new-user", data);
};
const deleteUserSV = (id) => {
	return axios.delete("/api/delete-user", { data: { id } });
};
const updateUser = (data) => {
	return axios.put("/api/update-user", data);
};

const createNewCV = (data) => {
	return axios.post("/api/add-cv", data);
};
const updateCV = (data) => {
	return axios.put("/api/update-cv", data);
};
const getAllCV = () => {
	return axios.get("/api/get-cv");
};
const deleteChucVu = (id) => {
	return axios.delete("/api/delete-cv", { data: { id } });
};

const createNewDM = (data) => {
	return axios.post("/api/add-dm", data);
};
const updateDM = (data) => {
	return axios.put("/api/update-dm", data);
};
const getAllDM = () => {
	return axios.get("/api/get-dm");
};
const deleteDM = (id) => {
	return axios.delete("/api/delete-dm", { data: { id } });
};

const createNewBA = (data) => {
	return axios.post("/api/add-ba", data);
};
const updateBA = (data) => {
	return axios.put("/api/update-ba", data);
};
const getAllBA = () => {
	return axios.get("/api/get-ba");
};
const deleteBA = (id) => {
	return axios.delete("/api/delete-ba", { data: { id } });
};

const createNewMA = (data) => {
	return axios.post("/api/add-ma", data);
};
const updateMA = (data) => {
	return axios.put("/api/update-ma", data);
};
const getAllMA = () => {
	return axios.get("/api/get-ma");
};
const deleteMA = (id) => {
	return axios.delete("/api/delete-ma", { data: { id } });
};

const createNewNL = (data) => {
	return axios.post("/api/add-nl", data);
};
const updateNL = (data) => {
	return axios.put("/api/update-nl", data);
};
const getAllNL = () => {
	return axios.get("/api/get-nl");
};
const deleteNL = (id) => {
	return axios.delete("/api/delete-nl", { data: { id } });
};

const createNewKNL = (data) => {
	return axios.post("/api/add-knl", data);
};
const updateKNL = (data) => {
	return axios.put("/api/update-knl", data);
};
const getAllKNL = () => {
	return axios.get("/api/get-knl");
};
const getKNL = (date) => {
	return axios.get("/api/get-knl-date", { params: { date: date } });
};
const deleteKNL = (arrId) => {
	return axios.delete("/api/delete-knl", { data: { arrId } });
};

const createHD = (data) => {
	return axios.post("/api/add-hd", data);
};
const updateHD = (data) => {
	return axios.put("/api/update-hd", data);
};
const updateTTHD = (data) => {
	return axios.put("/api/update-tthd", data);
};
const getAllHD = () => {
	return axios.get("/api/get-hd");
};
const deleteHD = (arrId) => {
	return axios.delete("/api/delete-hd", { data: { arrId } });
};

const getCTHD = (id) => {
	return axios.get("/api/get-cthd" , { params: { idHoaDon: id } });
};

export {
	handleLoginAPI,
	getAllUsers,
	createNewUserSV,
	deleteUserSV,
	updateUser,

	getAllCV,
	deleteChucVu,
	createNewCV,
	updateCV,

	getAllDM,
	deleteDM,
	createNewDM,
	updateDM,

	getAllBA,
	deleteBA,
	createNewBA,
	updateBA,

	getAllMA,
	deleteMA,
	createNewMA,
	updateMA,

	getAllNL,
	deleteNL,
	createNewNL,
	updateNL,

	getAllKNL,
	getKNL,
	deleteKNL,
	createNewKNL,
	updateKNL,

	getAllHD,
	deleteHD,
	createHD,
	updateHD,
	updateTTHD,

	getCTHD
};
