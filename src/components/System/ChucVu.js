import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllCV, deleteChucVu, createNewCV, updateCV } from "../../services/userService";
import { toast } from 'react-toastify';


class ChucVu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUpdate: false,
			arrChucVu: [],
			id: "",
			CV: "",
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}

	async componentDidMount() {
		try {
			const cv = await getAllCV();
			if (cv) {
				this.setState({
					arrChucVu: cv.data,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
	handleDeleteCV = async (id) => {
		if (window.confirm("Xoá Chức vụ") === true) {
			try {
				const response = await deleteChucVu(id);
				if (response && response.errCode === 0) {
					this.componentDidMount();
					toast.success(response.message)
				} else {
					toast.error(response.message)
					this.componentDidMount();
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	handleOnChange = (e) => {
		this.setState({
			CV: e.target.value,
		});
	};
	handleCreateCV = async (e) => {
		e.preventDefault();
		const { arrChucVu, isUpdate, id, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await createNewCV(data);
			toast.success(response.message)
			this.setState({
				CV: "",
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập tên chức vụ");
		}
	};
	handleCheckInput = (data) => {
		return data.CV !== "" ? true : false;
	};

	focus() {
		this.textInput.current.focus();
	}
	handleEditCV = (data) => {
		this.focus();
		this.setState({
			id: data.id,
			CV: data.tenChucVu,
			isUpdate: true,
		});
	};
	handleUpdateCV = async (e) => {
		e.preventDefault();
		const { arrChucVu, isUpdate, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await updateCV(data);
			toast.success(response.message)
			this.setState({
				CV: "",
				isUpdate: false,
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập tên chức vụ");
		}
	};
	handleExitCV = (e) => {
		e.preventDefault();
		if (window.confirm("Huỷ cập nhật") === true) {
			this.setState({
				CV: "",
				isUpdate: false,
			});
		}
	};

	onKeyDown = (e) => {
		if (e.key === "Enter") {
			if (this.state.isUpdate) {
				this.handleUpdateCV(e);
			} else {
				this.handleCreateCV(e);
			}
		}
	};
	render() {
		return (
			<div className="chuc-vu-container">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý Chức vụ</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-6">
									<label htmlFor="nameCV" className="form-label">
										Chức vụ
									</label>
									<input
										type="text"
										className="form-control"
										id="nameCV"
										placeholder="Nhập tên chức vụ"
										ref={this.textInput}
										value={this.state.CV}
										onChange={(e) => this.handleOnChange(e)}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-12">
									{this.state.isUpdate === true ? (
										<>
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateCV(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitCV(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateCV(e)}
										>
											Thêm Chức vụ
										</button>
									)}
								</div>
							</form>
						</div>
						<div className="chuc-vu-body">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách chức vụ</b>
								</div>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã chức vụ</th>
											<th>Tên chức vụ</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrChucVu?.length > 0 &&
											this.state.arrChucVu.map((item, index) => {
												return (
													<tr key={index}>
														<td>{'MCV'+item.id}</td>
														<td>{item.tenChucVu}</td>
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditCV(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteCV(item.id)
																}
															>
																<i className="fas fa-trash"></i>
															</button>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChucVu);
