import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import "./MonAn.scss";
import { getAllNL, deleteNL, createNewNL, updateNL } from "../../services/userService";

class NhapNguyenLieu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUpdate: false,
			arrNL: [],
			id: "",
			NL: "",
			donGia: "",
			donVi: "",
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}

	async componentDidMount() {
		try {
			const nl = await getAllNL();
			if (nl) {
				this.setState({
					arrNL: nl.data,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
	handleDeleteNL = async (id) => {
		if (window.confirm("Xoá nguyên liệu") === true) {
			try {
				const response = await deleteNL(id);
				if (response && response.errCode === 0) {
					this.componentDidMount();
				} else {
					alert(response.message);
					this.componentDidMount();
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	handleOnChange = (e) => {
		this.setState({
			NL: e.target.value,
		});
	};
	handleOnChangeDG = (e) => {
		this.setState({
			donGia: e.target.value,
		});
	};
	handleOnChangeDV = (e) => {
		this.setState({
			donVi: e.target.value,
		});
	};
	handleCreateNL = async (e) => {
		e.preventDefault();
		const { arrNL, isUpdate, id, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await createNewNL(data);
			alert(response.message);
			this.setState({
				NL: "",
				donGia: "",
				donVi: "",
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập đủ thông tin");
		}
	};
	handleCheckInput = (data) => {
		return data.NL && data.donGia && data.donVi !== "" ? true : false;
	};

	focus() {
		this.textInput.current.focus();
	}
	handleEditNL = (data) => {
		this.focus();
		this.setState({
			id: data.id,
			NL: data.tenMonAn,
			donGia: data.donGia,
			donVi: data.donVi,
			isUpdate: true,
		});
	};
	handleUpdateNL = async (e) => {
		e.preventDefault();
		const { arrNL, isUpdate, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await updateNL(data);
			alert(response.message);
			this.setState({
				NL: "",
				donGia: "",
				donVi: "",
				isUpdate: false,
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng đủ thông tin");
		}
	};
	handleExitNL = (e) => {
		e.preventDefault();
		if (window.confirm("Huỷ cập nhật") === true) {
			this.setState({
				NL: "",
				donGia: "",
				isUpdate: false,

				isUpdate: false,
			});
		}
	};
	
	onKeyDown = (e) => {
		if (e.key === "Enter") {
			if (this.state.isUpdate) {
				this.handleUpdateNL(e);
			} else {
				this.handleCreateNL(e);
			}
		}
	};
	render() {
		var formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "VND",
		});
		return (
			<div className="chuc-vu-container">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý Nguyên liệu</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-12">
									<label htmlFor="nameNL" className="form-label">
										Tên nguyên liệu
									</label>
									<input
										type="text"
										className="form-control"
										id="tenNL"
										placeholder="Nhập tên nguyên liệu"
										ref={this.textInput}
										value={this.state.NL}
										onChange={(e) => this.handleOnChange(e)}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-6">
									<label htmlFor="donvi" className="form-label">
										Đơn vị
									</label>
									<input
										type="text"
										className="form-control"
										id="donvi"
										placeholder="Nhập đơn vị"
										ref={this.textInput}
										value={this.state.donVi}
										onChange={(e) => this.handleOnChangeDV(e)}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-6">
									<label htmlFor="dongia" className="form-label">
										Đơn giá
									</label>
									<CurrencyInput
										className="form-control"
										id="dongia"
										name="dongia"
										placeholder="Nhập đơn giá (VND)"
										prefix={"₫"}
										allowDecimals={false}
										value={this.state.donGia}
										onValueChange={(value, name) =>
											this.setState({ donGia: value })
										}
										onKeyDown={this.onKeyDown}
									/>
								</div>

								<div className="col-12">
									{this.state.isUpdate === true ? (
										<>
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateNL(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitNL(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateNL(e)}
										>
											Thêm Nguyên liệu
										</button>
									)}
								</div>
							</form>
						</div>
						<div className="chuc-vu-body">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách nguyên liệu</b>
								</div>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã nguyên liệu</th>
											<th>Tên nguyên liệu</th>
											<th>Đơn vị</th>

											<th>Đơn giá</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrNL.length > 0 &&
											this.state.arrNL.map((item, index) => {
												return (
													<tr key={index}>
														<td>{item.id}</td>
														<td>{item.tenNguyenLieu}</td>
														<td>{item.donVi}</td>

														<td>{formatter.format(item.donGia)}</td>
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditNL(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteNL(item.id)
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

export default connect(mapStateToProps, mapDispatchToProps)(NhapNguyenLieu);
