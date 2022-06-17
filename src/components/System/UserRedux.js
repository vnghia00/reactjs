import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import * as actions from "../../store/actions";
import TableUser from "./TableUser";

class UserRedux extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrChucVu: [],
			isShowPassword: false,
			isUpdate: false,
			id: "",

			email: "",
			password: "",
			fullName: "",
			phoneNumber: "",
			gender: "1",
			role: "",
		};
	}
	handleShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword,
		});
	};
	componentDidMount() {
		this.props.getChucVuStart();
	}
	componentDidUpdate = (prevProps, prevState, snapshot) => {
		const arrRole = this.props.chucVuRedux;

		if (prevProps.chucVuRedux !== this.props.chucVuRedux) {
			this.setState({
				arrChucVu: arrRole,
				role: arrRole && arrRole.length > 0 ? arrRole[0].id : "",
			});
		}

		if (this.props.listUsers !== prevProps.listUsers) {
			this.setState({
				email: "",
				password: "",
				fullName: "",
				phoneNumber: "",
				gender: "1",
				role: arrRole && arrRole.length > 0 ? arrRole[0].id : "",
			});
		}
	};

	checkInput = () => {
		let isValid = true;
		const arrCheck = ["email", "password", "fullName", "phoneNumber"];
		for (let i = 0; i < arrCheck.length; i++) {
			if (!this.state[arrCheck[i]]) {
				isValid = false;
				alert(`Nhập thông tin : ${arrCheck[i]}`);
				break;
			}
			if (arrCheck[i] === "email") {
				const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (!checkEmail.test(this.state[arrCheck[i]])) {
					isValid = false;
					alert("Please enter an email address");
					break;
				}
			}
		}
		return isValid;
	};

	handleSaveUser = (e) => {
		e.preventDefault();
		const check = this.checkInput();
		if (check) {
			const { arrChucVu, isShowPassword, isUpdate, ...data } = this.state;
			this.props.createNewUser(data);
		}
	};
	handleOnChangeInput = (e, id) => {
		let copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	};
	handleEditUser = (data) => {
		this.setState({
			isUpdate: true,
			id: data.id,
			email: data.email,
			password: data.email,
			fullName: data.tenNV,
			phoneNumber: data.soDT,
			gender: data.gioiTinh,
			role: data.idChucVu,
		});
	};
	exitUpdateUser = () => {
		if (window.confirm("Huỷ cập nhật") === true) {
			this.setState({
				isUpdate: false,
				id: "",
				email: "",
				password: "",
				fullName: "",
				phoneNumber: "",
				gender: "1",
				role:
					this.props.chucVuRedux && this.props.chucVuRedux.length > 0
						? this.props.chucVuRedux[0].id
						: "",
			});
		}
	};
	handleUpdateUser = (e) => {
		e.preventDefault();
		const check = this.checkInputUpdate();
		if (check) {
			const { arrChucVu, isShowPassword, isUpdate, ...data } = this.state;
			this.props.updateNVStart(data);
		}
	};
	checkInputUpdate = () => {
		let isValid = true;
		const arrCheck = ["fullName", "phoneNumber"];
		for (let i = 0; i < arrCheck.length; i++) {
			if (!this.state[arrCheck[i]]) {
				isValid = false;
				alert(`Nhập thông tin : ${arrCheck[i]}`);
				break;
			}
		}
		return isValid;
	};
	render() {
		const isLoadingChucVu = this.props.isLoadingChucVu;
		let { email, password, fullName, phoneNumber, gender, role } = this.state;
		console.log(this.state);
		return (
			<div className="user-redux-container">
				<div className="container">
					<div className="row mb-5">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý nhân viên</b>
						</div>
						<div className="col-12 mb-3 user-redux">
							<form className="row g-3">
								<div className="col-md-6">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										placeholder="Email@gmail.com"
										value={email}
										onChange={(e) => this.handleOnChangeInput(e, "email")}
										disabled={this.state.isUpdate ? true : false}
									/>
								</div>
								<div className="col-md-6 show-hide-password">
									<label htmlFor="password" className="form-label">
										Mật khẩu
									</label>
									<input
										type={this.state.isShowPassword ? "text" : "password"}
										className="form-control"
										id="password"
										placeholder="Nhập mật khẩu"
										value={password}
										onChange={(e) => this.handleOnChangeInput(e, "password")}
										disabled={this.state.isUpdate ? true : false}
									/>
									{this.state.isUpdate ? (
										""
									) : (
										<span
											className="icon-show-hide-password"
											onClick={() => this.handleShowHidePassword()}
										>
											<i
												className={
													this.state.isShowPassword
														? "fas fa-eye"
														: "fas fa-eye-slash"
												}
											></i>
										</span>
									)}
								</div>
								<div className="col-12">
									<label htmlFor="fullName" className="form-label">
										Tên
									</label>
									<input
										type="text"
										className="form-control"
										id="fullName"
										placeholder="Nhập họ tên"
										value={fullName}
										onChange={(e) => this.handleOnChangeInput(e, "fullName")}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="phoneNumber" className="form-label">
										Số điện thoại
									</label>
									<input
										type="number"
										className="form-control"
										id="phoneNumber"
										placeholder="Nhập số điện thoại"
										value={phoneNumber}
										onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
									/>
								</div>
								<div className="col-md-3">
									<label htmlFor="gender" className="form-label">
										Gới tính
									</label>
									<select
										id="gender"
										className="form-select form-control "
										value={gender}
										onChange={(e) => this.handleOnChangeInput(e, "gender")}
									>
										<option value="1">Nam</option>
										<option value="0">Nữ</option>
										<option value="2">Khác</option>
									</select>
								</div>
								<div className="col-md-3">
									<label htmlFor="role" className="form-label">
										Chức vụ
									</label>
									<select
										id="role"
										className="form-select form-control "
										value={role}
										onChange={(e) => this.handleOnChangeInput(e, "role")}
									>
										{isLoadingChucVu ? (
											<option>Loading...</option>
										) : (
											this.state.arrChucVu.length > 0 &&
											this.state.arrChucVu.map((item, index) => {
												return (
													<option key={index} value={item.id}>
														{item.tenChucVu}
													</option>
												);
											})
										)}
									</select>
								</div>

								<div className="col-12">
									{this.state.isUpdate ? (
										<>
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateUser(e)}
											>
												Cập nhật
											</button>
											<button
												type="submit"
												className="btn btn-danger ps-2 pe-2 ms-3"
												onClick={(e) => this.exitUpdateUser(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleSaveUser(e)}
										>
											Thêm nhân viên
										</button>
									)}
								</div>
							</form>
						</div>
						<TableUser handleEditUserProps={this.handleEditUser} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		chucVuRedux: state.admin.chucVu,
		isLoadingChucVu: state.admin.isLoadingChucVu,
		listUsers: state.admin.NV,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChucVuStart: () => dispatch(actions.fetchChucVuStart()),
		createNewUser: (data) => dispatch(actions.createNewUser(data)),
		updateNVStart: (data) => dispatch(actions.updateNVStart(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
