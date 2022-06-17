import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllBA, deleteBA, createNewBA, updateBA } from "../../services/userService";
import { toast } from "react-toastify";

class BanAn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUpdate: false,
			arrBA: [],
			id: "",
			BA: "",
			trangThaiBA: "",
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}

	async componentDidMount() {
		try {
			const ba = await getAllBA();
			if (ba) {
				this.setState({
					arrBA: ba.data,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
	handleDeleteBA = async (id) => {
		if (window.confirm("Xoá Bàn ăn") === true) {
			try {
				const response = await deleteBA(id);
				if (response && response.errCode === 0) {
					this.componentDidMount();
				} else {
					alert(response.message);
					this.componentDidMount();
				}
				toast.success(response.message);
			} catch (e) {
				console.log(e);
			}
		}
	};
	handleOnChange = (e) => {
		this.setState({
			BA: e.target.value,
		});
	};
	handleOnChangeTT = (e) => {
		this.setState({
			trangThaiBA: e.target.value,
		});
	};
	handleCreateBA = async (e) => {
		e.preventDefault();
		const { arrBA, isUpdate, id, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await createNewBA(data);
			toast.success(response.message);
			this.setState({
				BA: "",
				trangThaiBA: "",
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập tên bàn");
		}
	};
	handleCheckInput = (data) => {
		return data.BA !== "" ? true : false;
	};

	focus() {
		this.textInput.current.focus();
	}
	handleEditBA = (data) => {
		this.focus();
		this.setState({
			id: data.id,
			BA: data.tenBanAn,
			trangThaiBA: data.trangThaiBA,
			isUpdate: true,
		});
	};
	handleUpdateBA = async (e) => {
		e.preventDefault();
		const { arrBA, isUpdate, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await updateBA(data);
			toast.success(response.message);
			this.setState({
				BA: "",
				trangThaiBA: "",
				isUpdate: false,
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập tên bàn");
		}
	};
	handleExitBA = (e) => {
		e.preventDefault();
		if (window.confirm("Huỷ cập nhật") === true) {
			this.setState({
				BA: "",
				trangThaiBA: "",
				isUpdate: false,
			});
		}
	};
	onKeyDown = (e) => {
		if (e.key === "Enter") {
			if (this.state.isUpdate) {
				this.handleUpdateBA(e);
			} else {
				this.handleCreateBA(e);
			}
		}
	};
	render() {
		console.log(this.state);
		return (
			<div className="chuc-vu-container">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý Bàn ăn</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-6">
									<label htmlFor="nameBA" className="form-label">
										Tên bàn ăn
									</label>
									<input
										type="text"
										className="form-control"
										id="tenBA"
										placeholder="Nhập tên bàn"
										ref={this.textInput}
										value={this.state.BA}
										onChange={(e) => this.handleOnChange(e)}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-6">
									<label htmlFor="trangThaiBA" className="form-label">
										Trạng thái
									</label>
									<select
										id="trangThaiBA"
										className="form-select form-control "
										value={this.state.trangThaiBA}
										onChange={(e) => this.handleOnChangeTT(e)}
									>
										<option value="0">Còn trống</option>
										<option value="1">Đã có khách</option>
									</select>
								</div>
								<div className="col-12">
									{this.state.isUpdate === true ? (
										<>
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateBA(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitBA(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateBA(e)}
										>
											Thêm bàn ăn
										</button>
									)}
								</div>
							</form>
						</div>
						<div className="chuc-vu-body">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách bàn ăn</b>
								</div>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã bàn ăn</th>
											<th>Tên bàn ăn</th>
											<th>trạng thái bàn ăn</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrBA.length > 0 &&
											this.state.arrBA.map((item, index) => {
												return (
													<tr key={index}>
														<td>{"BA"+item.id}</td>
														<td>{item.tenBanAn}</td>
														<td>{item.trangThaiBA === 0 ? 'Còn trống' : 'Đã có khách' }</td>
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditBA(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteBA(item.id)
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

export default connect(mapStateToProps, mapDispatchToProps)(BanAn);
