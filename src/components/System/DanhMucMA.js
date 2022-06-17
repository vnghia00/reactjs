import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllDM, deleteDM, createNewDM, updateDM } from "../../services/userService";
import { toast } from 'react-toastify';

class DanhMucMA extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUpdate: false,
			arrDanhMuc: [],
			id: "",
			DM: "",
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}

	async componentDidMount() {
		try {
			const dm = await getAllDM();
			if (dm) {
				this.setState({
					arrDanhMuc: dm.data,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
	handleDeleteDM = async (id) => {
		if (window.confirm("Xoá danh mục") === true) {
			try {
				const response = await deleteDM(id);
				if (response && response.errCode === 0) {
					this.componentDidMount();
					toast.success(response.message);
				} else {
					toast.error(response.message);
					this.componentDidMount();
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	handleOnChange = (e) => {
		this.setState({
			DM: e.target.value,
		});
	};
	handleCreateDM = async (e) => {
		console.log("aa");
		e.preventDefault();
		const { arrDanhMuc, isUpdate, id, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await createNewDM(data);
			toast.success(response.message);
			this.setState({
				DM: "",
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập tên danh mục");
		}
	};
	handleCheckInput = (data) => {
		return data.DM !== "" ? true : false;
	};

	focus() {
		this.textInput.current.focus();
	}
	handleEditDM = (data) => {
		this.focus();
		this.setState({
			id: data.id,
			DM: data.tenDanhMuc,
			isUpdate: true,
		});
	};
	handleUpdateDM = async (e) => {
		e.preventDefault();
		const { arrDanhMuc, isUpdate, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await updateDM(data);
			toast.success(response.message);
			this.setState({
				DM: "",
				isUpdate: false,
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập tên danh mục");
		}
	};
	handleExitDM = (e) => {
		e.preventDefault();
		if (window.confirm("Huỷ cập nhật") === true) {
			this.setState({
				DM: "",
				isUpdate: false,
			});
		}
	};

	onKeyDown = (e) => {
		if (e.key === "Enter") {
			if (this.state.isUpdate) {
				this.handleUpdateDM(e);
			} else {
				this.handleCreateDM(e);
			}
		}
	};
	render() {
		return (
			<div className="chuc-vu-container">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý danh mục món ăn</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-6">
									<label htmlFor="DM" className="form-label">
										Danh mục
									</label>
									<input
										type="text"
										className="form-control"
										id="DM"
										placeholder="Nhập tên danh mục"
										ref={this.textInput}
										value={this.state.DM}
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
												onClick={(e) => this.handleUpdateDM(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitDM(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateDM(e)}
										>
											Thêm danh mục
										</button>
									)}
								</div>
							</form>
						</div>
						<div className="chuc-vu-body">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách danh mục</b>
								</div>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã danh mục</th>
											<th>Tên danh mục</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrDanhMuc?.length > 0 &&
											this.state.arrDanhMuc.map((item, index) => {
												return (
													<tr key={index}>
														<td>{item.id}</td>
														<td>{item.tenDanhMuc}</td>
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditDM(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteDM(item.id)
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

export default connect(mapStateToProps, mapDispatchToProps)(DanhMucMA);
