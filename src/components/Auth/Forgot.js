import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleForgotAPI, handleChechCode } from "../../services/userService";
import { path } from "../../utils";
import { Link, withRouter,Redirect } from "react-router-dom";

class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			code: "",
			isShowPassword: false,
			message: "",
			errCode: "",
			link: false
		};
	}

	handleOnchangeUsername = (event) => {
		this.setState({
			email: event.target.value,
			message: "",
		});
	};
	handleOnchangePassword = (event) => {
		this.setState({
			password: event.target.value,
			message: "",
		});
	};
	handleFindEmail = async () => {
		if (this.state.email == "") {
			this.setState({
				message: "Vui lòng nhập đủ thông tin",
			});
		} else {
			this.setState({
				message: "",
			});
			try {
				const data = await handleForgotAPI(this.state.email);
				if (data && data.errCode !== 0) {
					if (data.errCode == 2) {
						this.setState({
							message: data.message,
						});
					}
					if (data.errCode == 3) {
						this.setState({
							message: data.message,
						});
					}
				}
				if (data && data.errCode === 0) {
					toast.success(data.message);
					this.setState({
						message: "",
						ok: true,
					});
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data) {
						this.setState({
							message: error.response.data.message,
						});
					}
				}
			}
		}
	};
	handleShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword,
		});
	};
	handleOnchangeCode = (e) => {
		this.setState({
			code: e.target.value,
			message: "",
		});
	};
	onKeyDown = (e) => {
		if (e.key === "Enter") {
			this.handleLogin();
		}
	};
	handlechangePassword = async (e) => {
		if (this.state.code == "" || this.state.password == "") {
			this.setState({
				message: "Vui lòng nhập đủ thông tin",
			});
		} else {
			const data = await handleChechCode(
				this.state.email,
				this.state.code,
				this.state.password
			);
			if (data && data.errCode !== 0) {
				if (data.errCode == 2) {
					this.setState({
						message: data.message,
					});
				}
				if (data.errCode == 3) {
					this.setState({
						message: data.message,
					});
				}
			}
			if (data && data.errCode === 0) {
				toast.success(data.message);
				this.setState({
					message: "",
					code: "",
					password: "",
					ok: false,
				});

			}
		}
	};
	render() {
		return (
			<div className="main">
				{/* <form action="" method="POST" className="form" id="form-1"> */}
				<div className="form">
					<h3 className="heading">Quên mật khẩu</h3>

					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Nhập tài khoản email
						</label>
						<input
							value={this.state.username}
							id="email"
							name="email"
							type="email"
							placeholder="VD: email@domain.com"
							className="form-control"
							onChange={(event) => this.handleOnchangeUsername(event)}
							onKeyDown={this.onKeyDown}
						/>
					</div>
					{this.state.ok ? (
						<>
							<div className="form-group">
								<label htmlFor="email" className="form-label">
									Nhập mã
								</label>
								<input
									value={this.state.code}
									id="code"
									name="code"
									type="number"
									placeholder="12345"
									className="form-control"
									onChange={(event) => this.handleOnchangeCode(event)}
									onKeyDown={this.onKeyDown}
								/>
							</div>
							<div className="form-group ">
								<label htmlFor="password" className="form-label">
									Mật khẩu mới
								</label>
								<div className="show-hide-password">
									<input
										value={this.state.password}
										id="password"
										name="password"
										type={this.state.isShowPassword ? "text" : "password"}
										placeholder="nhập mật khẩu"
										className="form-control"
										onChange={(event) => this.handleOnchangePassword(event)}
										onKeyDown={this.onKeyDown}
									/>
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
								</div>
							</div>
						</>
					) : (
						""
					)}
					<span className="form-message">{this.state.message}</span>
					{this.state.ok ? (
						<button className="form-submit" onClick={() => this.handlechangePassword()}>
							Đổi mật khẩu
						</button>
					) : (
						<button className="form-submit" onClick={() => this.handleFindEmail()}>
							Xác nhận
						</button>
					)}

					<div className="form-group forgot">
						<Link to={path.HOM_PAGE}>
							<span>Đăng nhập</span>
						</Link>
					</div>
					{/* </form> */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		// userLoginFail: () => dispatch(actions.adminLoginFail()),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
