import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import "./MonAn.scss";
import { getAllMA, deleteMA, createNewMA, updateMA } from "../../services/userService";
import { toast } from "react-toastify";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from "../../store/actions";

class MonAn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDanhMuc: [],
			isUpdate: false,
			arrMA: [],
			id: "",
			MA: "",
			donGia: "",
			trangThai: 1,
			linkImg : "",
			hinhAnh: "",
			danhMuc: "",
			isOpen: false,
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}

	async componentDidMount() {
		this.props.getDanhMucStart();
		try {
			const ma = await getAllMA();
			if (ma) {
				this.setState({
					arrMA: ma.data,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
	componentDidUpdate = (prevProps, prevState, snapshot) => {
		const arr = this.props.danhMucRedux;
		if (prevProps.danhMucRedux !== this.props.danhMucRedux) {
			this.setState({
				arrDanhMuc: arr,
				danhMuc: arr && arr.length > 0 ? arr[0].id : "",
			});
		}
	};
	handleDeleteMA = async (id) => {
		if (window.confirm("Xoá Món Ăn") === true) {
			try {
				const response = await deleteMA(id);
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
			MA: e.target.value,
		});
	};
	handleOnChangeTT = (e) => {
		this.setState({
			trangThai: e.target.value,
		});
	};
	handleOnChangeDG = (e) => {
		this.setState({
			donGia: e.target.value,
		});
	};
	handleOnChangeInputDM = (e) => {
		this.setState({
			danhMuc: e.target.value,
		});
	};
	handleCreateMA = async (e) => {
		e.preventDefault();
		const { arrDanhMuc, arrMA, isUpdate, id, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await createNewMA(data);
			toast.success(response.message);
			this.setState({
				MA: "",
				donGia: "",
				trangThai: 1,
				linkImg : "",
				hinhAnh: "",
				danhMuc: this.props.danhMuc && this.props.danhMuc.length > 0 ? this.props.danhMuc[0].id : "",
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng nhập đủ thông tin");
		}
	};
	handleCheckInput = (data) => {
		return data.MA && data.donGia !== "" ? true : false;
	};

	focus() {
		this.textInput.current.focus();
	}
	handleEditMA = (data) => {
		let imgBase64 = ""
		if(data.hinhAnh){
			imgBase64 = new Buffer(data.hinhAnh,'base64').toString('binary')
		}

		this.focus();
		this.setState({
			id: data.id,
			MA: data.tenMonAn,
			donGia: data.donGia,
			trangThai: data.trangThai,
			danhMuc: data.danhMuc,
			linkImg: imgBase64,
			isUpdate: true,
		});
	};
	handleUpdateMA = async (e) => {
		e.preventDefault();
		const { arrMA, arrDanhMuc, isUpdate, ...data } = this.state;
		if (this.handleCheckInput(data)) {
			const response = await updateMA(data);
			toast.success(response.message);
			this.setState({
				MA: "",
				donGia: "",
				trangThai: 1,
				isUpdate: false,
				linkImg : "",
				hinhAnh: "",
				danhMuc: this.props.danhMuc && this.props.danhMuc.length > 0 ? this.props.danhMuc[0].id : "",
			});
			this.componentDidMount();
		} else {
			alert("Vui lòng đủ thông tin");
		}
	};
	handleExitMA = (e) => {
		e.preventDefault();
		if (window.confirm("Huỷ cập nhật") === true) {
			this.setState({
				MA: "",
				donGia: "",
				trangThai: 1,
				isUpdate: false,
				linkImg : "",
				hinhAnh: "",
				danhMuc: this.props.danhMuc && this.props.danhMuc.length > 0 ? this.props.danhMuc[0].id : "",
			});
		}
	};
	onKeyDown = (e) => {
		if (e.key === "Enter") {
			if (this.state.isUpdate) {
				this.handleUpdateMA(e);
			} else {
				this.handleCreateMA(e);
			}
		}
	};

	onKeyUp = (e) => {
		this.formatCurrency(e);
	};

	formatCurrency = (input) => {
		var formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "VND",
		});
		return formatter.format(input);
	};
	handleOnChangeimg = async (e) => {
		const data = e.target.files
		const file = data[0]
		if(file){
			const hinhAnh = await this.getBase64(file)
			const linkImg = URL.createObjectURL(file)
			this.setState({
				linkImg: linkImg,
				hinhAnh: hinhAnh
			})

		}
	}
	getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		})
	}
	handleClick = () => {
		if(this.state.linkImg !== ""){
			this.setState({
				isOpen: true
			})
		}
	}
	getDM = (id) => {
		for (let index = 0; index < this.props.danhMucRedux.length; index++) {
			if (this.props.danhMucRedux[index].id === id) {
				return this.props.danhMucRedux[index].tenDanhMuc;
			}
		}
	};
	render() {
		const isLoadingDanhMuc = this.props.isLoadingDanhMuc;
		var formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "VND",
		});
		console.log(this.state);
		return (
			<div className="chuc-vu-container">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Quản lý món ăn</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-6">
									<label htmlFor="nameMA" className="form-label">
										Tên món ăn
									</label>
									<input
										type="text"
										className="form-control"
										id="tenMA"
										placeholder="Nhập tên món"
										ref={this.textInput}
										value={this.state.MA}
										onChange={(e) => this.handleOnChange(e)}
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
									{/* <input
										type="number"
										className="form-control"
										id="dongia"
										placeholder="Nhập đơn giá (VND)"
										ref={this.textInput}
										value={this.state.donGia}
										onChange={(e) => this.handleOnChangeDG(e)}
										onKeyDown={this.onKeyDown}
										onKeyUp={this.onKeyUp}
									/> */}
								</div>
								<div className="col-6">
									<label htmlFor="trangThai" className="form-label">
										Trạng thái
									</label>
									<select
										id="trangThai"
										className="form-select form-control "
										value={this.state.trangThai}
										onChange={(e) => this.handleOnChangeTT(e)}
									>
										<option value="1">Còn</option>
										<option value="0">Hết hàng</option>
									</select>
								</div>
								
								<div className="col-6">
									<label htmlFor="hinhAnh" className="form-label">
										Hình ảnh 
									</label>
									<input
										type="file"
										className="form-control"
										id="hinhAnh"
										ref={this.textInput}
										// value={this.state.hinhAnh}
										onChange={(e) => this.handleOnChangeimg(e)}
									/>
								</div>
								<div className="col-6" >
									<label htmlFor="danhMuc" className="form-label">
										Danh mục
									</label>
									<select
										id="role"
										className="form-select form-control "
										value={this.state.danhMuc}
										onChange={(e) => this.handleOnChangeInputDM(e)}
									>
										{isLoadingDanhMuc ? (
											<option>Loading...</option>
										) : (
											this.state.arrDanhMuc.length > 0 &&
											this.state.arrDanhMuc.map((item, index) => {
												return (
													<option key={index} value={item.id}>
														{item.tenDanhMuc}
													</option>
												);
											})
										)}
									</select>
								</div>
								<div className="col-6 img-preview"
									style={{
										backgroundImage: `url(${this.state.linkImg})`,
									}}
									onClick={() => this.handleClick()}
								>
								</div>
								<div className="col-12">
									{this.state.isUpdate === true ? (
										<>
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateMA(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitMA(e)}
											>
												Huỷ
											</button>
										</>
									) : (
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateMA(e)}
										>
											Thêm món ăn
										</button>
									)}
								</div>
							</form>
						</div>
						<div className="chuc-vu-body mb-5">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách món ăn</b>
								</div>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã món ăn</th>
											<th>Tên món ăn</th>
											<th>Đơn giá</th>
											<th>Trạng thái</th>
											<th>Danh mục</th>
											<th>Ảnh</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrMA.length > 0 &&
											this.state.arrMA.map((item, index) => {
												return (
													<tr key={index}>
														<td>{item.id}</td>
														<td>{item.tenMonAn}</td>
														<td>{formatter.format(item.donGia)}</td>
														<td>{item.trangThai === 1 ? 'Còn hàng' : (<p style={{color: 'red'}} >Hết hàng</p>) }</td>
														<td>{this.getDM(item.danhMuc)}</td>
														<td>{
															item.hinhAnh ? 
															<div className="col-6 img-preview"
																style={{
																	backgroundImage: `url(${new Buffer(item.hinhAnh,'base64').toString('binary')})`,
																	height: 50+"px"
																}}
																onClick={() => this.handleClick()}
															>
															</div> : ""
															}
														</td>
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditMA(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteMA(item.id)
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
				{this.state.isOpen === true &&  this.state.linkImg !== "" &&
					<Lightbox
						mainSrc={this.state.linkImg}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {danhMucRedux: state.admin.danhMuc,
		isLoadingDanhMuc: state.admin.isLoadingDanhMuc,};
};

const mapDispatchToProps = (dispatch) => {
	return {getDanhMucStart: () => dispatch(actions.fetchDanhMucStart())};
};

export default connect(mapStateToProps, mapDispatchToProps)(MonAn);
