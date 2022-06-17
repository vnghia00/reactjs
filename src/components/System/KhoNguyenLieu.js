import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./MonAn.scss";
import TableKhoNL from "./TableKhoNL";

class KhoNguyenLieu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrNL: [],
			id:[],

			idNguyenLieu: [],
			donVi: [],
			soLuongDauNgay: [],
			soLuongNhapTrongNgay: [],
			soLuongCuoiNgay: [],

			ngayNhap: "",
			idNhanVien: this.props.userInfo.id,
			isUpdate: false,
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}
	async componentDidMount() {
		const date = new Date();
		const today = date.toISOString();
		this.setState({
			ngayNhap: today,
		});

		this.props.getNLStart();
	}
	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (prevProps.NL !== this.props.NL) {
			const arrNLredux = this.props.NL;
			const { arrNL, ...copyState } = this.state;
			for (let i = 0; i < arrNLredux.length; i++) {
				copyState["idNguyenLieu"][i] = arrNLredux[i]["id"];
				copyState["donVi"][i] = arrNLredux[i]["donVi"];
			}
			this.setState({
				arrNL: arrNLredux,
				...copyState,
			});
		}
		if (this.props.listKNL !== prevProps.listKNL) {
			const date = new Date();
			const today = date.toISOString();
			this.setState({
				donVi: [],
				soLuongDauNgay: [],
				soLuongNhapTrongNgay: [],
				soLuongCuoiNgay: [],
	
				ngayNhap: today,
				idNhanVien: this.props.userInfo.id,
			});
		}
	};

	handleOnChangeInput = (event, name, i) => {
		let copyState = this.state;
		copyState[name][i] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleOnChangeInputDate = (event, name) => {
		let copyState = this.state;
		copyState[name] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleCreateKNL = (e) => {
		e.preventDefault();
		const { isUpdate, arrNL, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			this.props.createKNLStart(data);
		}
	};

	handleCheckInput = (data) => {
		let isValid = true;
		const arrCheck = ["soLuongDauNgay", "soLuongCuoiNgay", "donVi"];
		for (let i = 0; i < data.idNguyenLieu.length; i++) {
			for (let index = 0; index < arrCheck.length; index++) {
				if (!data[arrCheck[index]][i]) {
					isValid = false;
					alert(`Nhập thông tin : ${arrCheck[index]}`);
					return isValid;
				}
			}
		}
		return isValid;
	};
	focus() {
		this.textInput.current.focus();
	}

	onKeyDown = (e) => {
		if (e.key === "Enter") {
			if (this.state.isUpdate) {
				this.handleUpdateKNL(e);
			} else {
				this.handleCreateKNL(e);
			}
		}
	};
	handleUpdateKNL = (e) =>{
		e.preventDefault();
		const { isUpdate, arrNL, ...data } = this.state;
		const check = this.handleCheckInput(data);
		if (check) {
			this.props.updateKNLStart(data);
		}
		this.setState({
			isUpdate: false
		})
	}
	
	handleEditKNL = (data) => {
		let id = []
		let donVi = []
		let soLuongDauNgay = []
		let soLuongNhapTrongNgay = []
		let soLuongCuoiNgay = []
		const ngayNhap = data[0].ngayNhap
		const idNhanVien = data[0].idNhanVien
		for (let index = 0; index < data.length; index++) {
			id = [...id, data[index].id]
			donVi =[...donVi,data[index].donVi]
			soLuongDauNgay =[...soLuongDauNgay,data[index].soLuongDauNgay]
			soLuongNhapTrongNgay =[...soLuongNhapTrongNgay,data[index].soLuongNhapTrongNgay]
			soLuongCuoiNgay =[...soLuongCuoiNgay,data[index].soLuongCuoiNgay]
		}
		this.setState({
			isUpdate:true,
			id,
			donVi,
			soLuongDauNgay,
			soLuongNhapTrongNgay,
			soLuongCuoiNgay,
			ngayNhap,
			idNhanVien,
		});
		// this.props.fetchKNLDateStart(data[0].ngayNhap.slice(0, 10));
		this.props.fetchKNLStart();
	};

	handleExitKNL = () => {
		if (window.confirm("Huỷ cập nhật") === true) {
			const date = new Date();
			const today = date.toISOString();
			this.setState({
				isUpdate: false,
				donVi: [],
				soLuongDauNgay: [],
				soLuongNhapTrongNgay: [],
				soLuongCuoiNgay: [],
	
				ngayNhap: today,
				idNhanVien: this.props.userInfo.id,
			});
		}
	};

	render() {
		const isLoadingNL = this.props.isLoadingNL;
		console.log(this.state);
		return (
			<div className="chuc-vu-container">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý kho Nguyên liệu</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-3">
									<label htmlFor="idNguyenLieu" className="form-label">
										Tên nguyên liệu
									</label>
								</div>
								<div className="col-2">
									<label htmlFor="soLuongDauNgay" className="form-label">
										Số lượng đầu ngày
									</label>
								</div>
								<div className="col-3">
									<label htmlFor="soLuongNhapTrongNgay" className="form-label">
										Số lượng nhập trong ngày
									</label>
								</div>
								<div className="col-2">
									<label htmlFor="soLuongCuoiNgay" className="form-label">
										Số lượng cuối ngày
									</label>
								</div>
								<div className="col-2">
									<label htmlFor="donVi" className="form-label">
										Đơn vị
									</label>
								</div>
								{this.state.arrNL.length > 0 &&
									this.state.arrNL.map((item, index) => {
										return (
											<div className="row mb-2" key={index}>
												<div className="col-3">
													<input
														id="idNguyenLieu"
														className="form-control "
														value={item.tenNguyenLieu}
														placeholder={
															isLoadingNL
																? "Loading..."
																: item.tenNguyenLieu
														}
														disabled={true}
													/>
												</div>
												<div className="col-2">
													<input
														type="number"
														className="form-control"
														id="soLuongDauNgay"
														ref={this.textInput}
														value={
															this.state.soLuongDauNgay[index] || ""
														}
														onChange={(e) =>
															this.handleOnChangeInput(
																e,
																"soLuongDauNgay",
																index
															)
														}
													/>
												</div>
												<div className="col-3">
													<input
														type="number"
														className="form-control"
														id="soLuongNhapTrongNgay"
														ref={this.textInput}
														value={
															this.state.soLuongNhapTrongNgay[
																index
															] || ""
														}
														onChange={(e) =>
															this.handleOnChangeInput(
																e,
																"soLuongNhapTrongNgay",
																index
															)
														}
													/>
												</div>
												<div className="col-2">
													<input
														type="number"
														className="form-control"
														id="soLuongCuoiNgay"
														ref={this.textInput}
														value={
															this.state.soLuongCuoiNgay[index] || ""
														}
														onChange={(e) =>
															this.handleOnChangeInput(
																e,
																"soLuongCuoiNgay",
																index
															)
														}
													/>
												</div>
												<div className="col-2">
													<input
														type="text"
														className="form-control"
														id="donVi"
														ref={this.textInput}
														value={this.state.donVi[index] || ""}
														onChange={(e) =>
															this.handleOnChangeInput(
																e,
																"donVi",
																index
															)
														}
													/>
												</div>
											</div>
										);
									})}

								<div className="col-12">
									<label htmlFor="ngayNhap" className="form-label">
										Ngày tạo
									</label>
									<input
										type="date"
										className="form-control"
										id="ngayNhap"
										ref={this.textInput}
										value={this.state.ngayNhap.slice(0, 10)}
										onChange={(e) =>
											this.handleOnChangeInputDate(e, "ngayNhap")
										}
									/>
								</div>

								<div className="col-12">
									{this.state.isUpdate === true ? (
										<>
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateKNL(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitKNL(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateKNL(e)}
										>
											Nhập kho
										</button>
									)}
								</div>
							</form>
						</div>
						<div className="chuc-vu-body">
							<div className="row"></div>
						</div>
						<TableKhoNL handleEditKNLProps={this.handleEditKNL} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo,
		NL: state.admin.NL,
		isLoadingNL: state.admin.isLoadingNL,
		listKNL: state.admin.KNL
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getNLStart: () => dispatch(actions.fetchNLStart()),
		createKNLStart: (data) => dispatch(actions.createKNLStart(data)),
		updateKNLStart: (data) => dispatch(actions.updateKNLStart(data)),
		fetchKNLDateStart: (date) => dispatch(actions.fetchKNLDateStart(date)),
		fetchKNLStart: () => dispatch(actions.fetchKNLStart)

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(KhoNguyenLieu);
