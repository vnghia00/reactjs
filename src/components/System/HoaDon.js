import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { getAllMA, deleteMA, createNewMA, updateMA, updateBA, getCTHD, updateTTHD } from "../../services/userService";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as actions from "../../store/actions";
import { CSVLink } from "react-csv";
import thunk from "redux-thunk";

class HoaDon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBA: [],
			arrMA: [],
			arrHD: [],
			data: [],
			headers: [
				{ label: "Tên khách hàng", key: "tenKhachHang" },
				{ label: "Tên nhân viên", key: "tenNhanVien" },
				{ label: "Bàn ăn", key: "tenBanAn" },
				{ label: "Ngày tạo", key: "ngayNhap" },
				{ label: "Món ăn", key: "tenMonAn" },
				{ label: "Số lượng", key: "soLuong" },
				{ label: "Đơn giá", key: "donGia" },
				{ label: "Thành tiền", key: "thanhTien" },
				{ label: "Chi phí khác", key: "chiPhiKhac" },
				{ label: "Giảm giá", key: "giamGia" },
				{ label: "Tổng tiền", key: "tongTien" },
			  ],
			id:"",
			idba:"",
			tthd:"",

			idBanAn: "",
			ngayNhap: "",
			tenKhachHang: "",
			chiPhiKhac: 0,
			giamGia: 0,
			tongTien: 0,
			trangThaiHD: 0,
			idNhanVien: this.props.userInfo.id,
			isUpdate: false,

			idMonAn: [],
			soLuong: [],
			donGia: [],
			thanhTien: [],

			tm: [],
			filter: {
				trangThaiHD: 1,
				ngayNhap: ""
			}
		};
		this.textInput = React.createRef();
		this.focus = this.focus.bind(this);
	}
	componentDidMount() {
		this.props.getBanAnStart();
		this.props.getMonAnStart();
		this.props.fetchUserRedux();
		this.props.getHDStart();

		const date = new Date();
		const today = date.toISOString();
		this.setState({
			ngayNhap: today,
		});
	}
	componentDidUpdate = (prevProps, prevState, snapshot) => {
		// const arr = this.props.BARedux;
		const arr = this.props.BARedux.filter((item)=>{
			return item.trangThaiBA == 0
		})
		if (prevProps.BARedux !== this.props.BARedux) {
			if(this.state.isUpdate){
				this.setState({
					arrBA: arr,
				});
			}else{
				this.setState({
					arrBA: arr,
					idBanAn: arr && arr.length > 0 ? arr[0].id : "",
				});
			}
		}
		const arr2 = this.props.MARedux.filter((item)=>{
			return item.trangThai == 1
		})
		if (prevProps.MARedux !== this.props.MARedux) {
			this.setState({
				arrMA: arr2,
			});
		}
		const arr3 = this.props.HDRedux.reverse();
		if (prevProps.HDRedux !== this.props.HDRedux) {
			const date = new Date();
			const today = date.toISOString();
			this.setState({
				arrHD: arr3,

				idBanAn: arr[0]?.id||"",
				ngayNhap: today,
				tenKhachHang: "",
				chiPhiKhac: 0,
				giamGia: 0,
				tongTien: 0,
				trangThaiHD: 0,
				idNhanVien: this.props.userInfo.id,

				idMonAn: [],
				soLuong: [],
				donGia: [],
				thanhTien: [],

				tm: [],
			});
		}
		
	};
	handleOnChangeInput = (e, id) => {
		let copyState = { ...this.state };
		copyState[id] = e.target.value;	
		this.setState({
			...copyState,
		});
	};
	handleOnChangeInputMA = (event, name, i) => {
		let copyState = this.state;
		copyState[name][i] = event.target.value;
		if(name === 'idMonAn'){
			const DG = this.state.arrMA.filter((item)=>{
				return item.id == copyState[name][i]
			})
			copyState['donGia'][i] = DG[0].donGia
			copyState['thanhTien'][i] = DG[0].donGia * this.state['soLuong'][i]
		}else{
			copyState['thanhTien'][i] = this.state['donGia'][i] * copyState[name][i]
		}
		this.setState({
			...copyState,
		});
	};
	handleOnCL = (e) =>{
		e.preventDefault();

		this.setState({
			tm: [...this.state.tm, 1],
			idMonAn: [...this.state.idMonAn, this.state.arrMA[0].id],
			soLuong: [...this.state.soLuong, 1],
			donGia: [...this.state.donGia, this.state.arrMA[0]?.donGia],
			thanhTien: [...this.state.thanhTien, (1*this.props.MARedux[0]?.donGia)]
		})
	}
	handleDeleteMA = (e, index) =>{
		e.preventDefault();
		let copyState = this.state;	

		copyState.tm.splice(index, 1);
		copyState.idMonAn.splice(index, 1);
		copyState.soLuong.splice(index, 1);
		copyState.donGia.splice(index, 1);
		copyState.thanhTien.splice(index, 1);

		this.setState({
			...copyState,
		})
	}
	
	handleCreateHD = (e) => {
		e.preventDefault();
		if(this.state.idBanAn == ''){
			toast.error('bàn ăn trống')
		}else{
			let { arrHD, arrMA, arrBA, tm ,...copyState} = this.state;	
			copyState.tongTien = (copyState.thanhTien?.length > 0 ? copyState.thanhTien.reduce((acc, cur) => {
				return acc + cur
			}, 0) : 0 ) + (parseInt(copyState.chiPhiKhac) || 0) - (copyState.giamGia || 0)
			this.props.createHDStart(copyState);
		}
	}
	focus() {
		this.textInput?.current?.focus();
	}
	getTenNV = (id) => {
		if(id==-1 || id==111){
			return "Văn Nghĩa"
		}else{
			for (let index = 0; index < this.props.listNV.length; index++) {
				console.log(this.props.listNV[index].tenNV);
				if (id === this.props.listNV[index].id) {
					return this.props.listNV[index].tenNV;
				}
			}
		}
		return "Không tồn tại";
	};
	getTenMA = (id) => {
		for (let index = 0; index < this.props.MARedux.length; index++) {
			if (id === this.props.MARedux[index].id) {
				return this.props.MARedux[index].tenMonAn;
			}
		}
		return "Không tồn tại";
	};
	getTenBA = (id) => {
		for (let index = 0; index < this.props.BARedux.length; index++) {
			if (id === this.props.BARedux[index].id) {
				return this.props.BARedux[index].tenBanAn;
			}
		}
		return "Không tồn tại";
	};
	handleDeleteHD = (id) => {
		if (window.confirm("Xoá Hoá đơn") === true) {
			try {
				this.props.deleteHDStart(id);
			} catch (e) {
				console.log(e);
			}
		}
	};
	handleDoneHD = async (id) => {
		if (window.confirm("Thanh toán hoá đơn") === true) {
			try {
				const tthd = await updateTTHD({id:id});
				toast.success(tthd.message);
				this.props.getHDStart();
				this.props.getBanAnStart();

			} catch (e) {
				console.log(e);
			}
		}
	};
	handleOnChangeInputDate = (e) => {
		e.preventDefault();
		let copyFilterState = this.state.filter 
		copyFilterState = {...copyFilterState, ngayNhap: e.target.value.slice(0, 10)}
		this.setState({
			filter: copyFilterState
		})
	};
	handleOnClickLoc = (e) => {
		e.preventDefault();
		let copyFilterState = this.state.filter 
		copyFilterState = {...copyFilterState, ngayNhap: ""}
		this.setState({
			filter: copyFilterState
		})
	}
	handleEditHD = async (data) => {
		this.focus();
		const banan = {
			id : data.idBanAn,
			trangThaiBA: 0
		}
		const ba = await updateBA(banan)
		this.props.getBanAnStart();


		const ct = await getCTHD(data.id)
		console.log("aaaaaaaa",ct);
		let tm = []
		let idMonAn = []
		let soLuong = []
		let donGia = []
		let thanhTien = []
		let dataExc = []
		if(ct.data.length > 0){
			dataExc = [...dataExc, { tenKhachHang: data.tenKhachHang, tenNhanVien: this.getTenNV(data.idNhanVien), tenBanAn: this.getTenBA(data.idBanAn), 
				ngayNhap: data.ngayNhap.slice(0,10), chiPhiKhac: data.chiPhiKhac, giamGia: data.giamGia, tongTien: data.tongTien, 
				tenMonAn: this.getTenMA(ct.data[0].idMonAn), soLuong: ct.data[0].soLuong, donGia: ct.data[0].DG, thanhTien: ct.data[0].thanhTien  } ]
			for (let index = 0; index < ct.data.length; index++) {
				tm = [...tm, index]
				idMonAn = [...idMonAn, ct.data[index].idMonAn] 
				soLuong = [...soLuong, ct.data[index].soLuong] 
				thanhTien = [...thanhTien, ct.data[index].thanhTien]
				donGia = [...donGia, ct.data[index].DG]
				if (index > 0 ) {
					dataExc = [...dataExc, 
						{ tenMonAn: this.getTenMA(ct.data[index].idMonAn), soLuong: ct.data[index].soLuong, donGia: ct.data[index].DG, thanhTien: ct.data[index].thanhTien }
					]
				}
			}
		}
		
		
		
		this.setState({
			id: data.id,
			tenKhachHang: data.tenKhachHang,
			idBanAn: data.idBanAn,
			idba: data.idBanAn,
			tthd: data.trangThaiHD,
			ngayNhap: data.ngayNhap,
			chiPhiKhac: data.chiPhiKhac,
			giamGia: data.giamGia,
			trangThaiHD: data.trangThaiHD,
			tm: tm,
			idMonAn:idMonAn,
			soLuong:soLuong,
			thanhTien:thanhTien,
			donGia:donGia,

			data:dataExc,

			isUpdate: true,
		});
	};
	handleExitHD = async (e) => {
		e.preventDefault();
		if (window.confirm("Huỷ cập nhật") === true) {
			if(this.state.tthd == 0){
				const banan = {
					id: this.state.idba,
					trangThaiBA: 1 
				}
				const ba = await updateBA(banan)
			}
			this.props.getBanAnStart();
			const date = new Date();
			const today = date.toISOString();
			this.setState({
	
				idBanAn: this.state.arrBA[0],
				ngayNhap: today,
				tenKhachHang: "",
				chiPhiKhac: 0,
				giamGia: 0,
				tongTien: 0,
				trangThaiHD: 0,
	
				idMonAn: [],
				soLuong: [],
				donGia: [],
				thanhTien: [],
	
				tm: [],

				isUpdate: false,
			});
		}
	};
	handleUpdateHD = (e) => {
		e.preventDefault();
		const { arrHD, arrMA, arrBA, tm ,...copyState} = this.state;	
		copyState.tongTien = (copyState.thanhTien?.length > 0 ? copyState.thanhTien.reduce((acc, cur) => {
			return acc + cur
		}, 0) : 0 ) + (parseInt(copyState.chiPhiKhac) || 0) - (copyState.giamGia || 0)
		this.props.updateHDStart(copyState);
		this.setState({
			isUpdate: false,
		})
	}
	getLink = (id) => {
		const linkImg = this.props.MARedux.filter((item)=>{
			return item.id == id
		})
		const anh = new Buffer(linkImg[0].hinhAnh,'base64').toString('binary')
		return anh;
	}
	
	render() {
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
							<b>Quản lý hoá đơn</b>
						</div>
						<div className="col-12 mb-3">
							<form className="row g-3">
								<div className="col-6">
									<label htmlFor="tenKhachHang" className="form-label">
										Tên khách hàng
									</label>
									<input
										type="text"
										className="form-control"
										id="tenKhachHang"
										placeholder="Nhập tên khách hàng"
										ref={this.textInput}
										value={this.state.tenKhachHang}
										onChange={(e) =>
											this.handleOnChangeInput(e, "tenKhachHang")
										}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-6">
									<label htmlFor="idBanAn" className="form-label">
										Bàn ăn
									</label>
									<select
										id="idBanAn"
										className="form-select form-control"
										value={this.state.idBanAn}
										onChange={(e) => this.handleOnChangeInput(e, "idBanAn")}
										style={{
											textTransform:"capitalize"
										}}
									>
										{this.state.arrBA.length > 0 &&
											this.state.arrBA.map((item, index) => {
												return (
													<option key={index} value={item.id}>
														{item.tenBanAn}
													</option>
												);
											})}
									</select>
								</div>
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
										onChange={(e) => this.handleOnChangeInput(e, "ngayNhap")}
									/>
								</div>
								{this.state.tm.length > 0 && 
									(
										<div className="row mt-4"
											// style={{
											// 	display: 'flex',
											// }}
										>
											<div className="col-2">
												<label className="form-label"style={{
														display: "block",
														textAlign: "center",
													}}>Món ăn</label>
											</div>
											<div className="col-2">
												<label className="form-label"style={{
														display: "block",
														textAlign: "center",
													}}>Hình ảnh</label>
											</div>
											<div className="col-2">
												<label className="form-label"style={{
														display: "block",
														textAlign: "center",
													}}>Số lượng</label>
											</div>
											<div className="col-2">
												<label className="form-label"style={{
														display: "block",
														textAlign: "center",
													}}>Đơn giá</label>
											</div>
											<div className="col-2">
												<label className="form-label"style={{
														display: "block",
														textAlign: "center",
													}}>Thành tiền</label>
											</div>
											<div className="col-2">
												<label className="form-label"
													style={{
														display: "block",
														textAlign: "center",
													}}
												>Thao tác</label>
											</div>
										{this.state.tm.map((item, index) => {
											return (
												<div className="row ms-1 mb-3" key={index}>
													<div className="col-2">
														<select
															id="idMonAn"
															className="form-select form-control"
															value={
																this.state.idMonAn?.length > 0 ? this.state.idMonAn[index] : ''
															}
															onChange={(e) => this.handleOnChangeInputMA(e, "idMonAn", index)}
															style={{
																textTransform:"capitalize"
															}}
														>
															{this.state.arrMA?.length > 0 &&
																this.state.arrMA.map((item, i) => {
																	return (
																		<option key={i} value={item.id}
																		>
																			{item.tenMonAn}
																		</option>
																	);
																})}
														</select>
													</div>
													<div className="col-2">
														<div className="img-preview"
															style={{
																backgroundImage: `url(${this.getLink(this.state.idMonAn[index])})`,
																height: 40+"px"
															}}
														>
														</div>
													</div>
													<div className="col-2">
														<input
															min = '1'
															type="number"
															className="form-control"
															id="soLuong"
															placeholder="Nhập Số lượng"
															ref={this.textInput}
															value={
																this.state.soLuong[index] || ""
															}
															onChange={(e) =>
																this.handleOnChangeInputMA(
																	e,
																	"soLuong",
																	index,
																)
															}
															onKeyDown={this.onKeyDown}
														/>
													</div>
													<div className="col-2">
														<CurrencyInput
															placeholder="(VND)"
															prefix={"₫"}
															allowDecimals={false}
															disabled
															type="text"
															className="form-control"
															id="donGia"
															ref={this.textInput}
															value={
																this.state.donGia[index] || ""
															}
														/>
													</div>
													<div className="col-2">
														<CurrencyInput
															className="form-control"
															placeholder="(VND)"
															prefix={"₫"}
															allowDecimals={false}
															disabled
															type="text"
															id="thanhTien"
															ref={this.textInput}
															value={
																this.state.thanhTien[index] || ""
															}
														/>
													</div>
													<div className="col-2">
														<button
															className="action delete"
															style={{
																display: "block",
																height: '40px',
																width: '25%',
																margin: '0 auto'
															}}
															onClick={(e) =>
																this.handleDeleteMA(e, index)
															}
														>
															<i className="fas fa-trash"></i>
														</button>
													</div>
												</div>
											);
										})}
										</div>
									)
								}
								<div
									className="col-6"
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<button
										className="btn btn-primary"
										style={{
											padding: "0 20px",
										}}
										onClick = {(e) => this.handleOnCL(e)}
									>
										{/* <i className="fas fa-plus"></i> */}
										Thêm món ăn
									</button>
								</div>
								<div
									className="col-6"
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<label  className="form-label"
										// style={{
										// 	padding: "0 20px",
										// }}
									>
										Tổng tiền: {formatter.format(this.state.thanhTien.reduce((acc, cur )=>{
											return acc + cur
										}, 0) || 0)}
									</label>
								</div>
								<div className="col-6">
									<label htmlFor="chiPhiKhac" className="form-label">
										Chi phí khác
									</label>
									<CurrencyInput
										className="form-control"
										id="chiPhiKhac"
										name="chiPhiKhac"
										placeholder="(VND)"
										prefix={"₫"}
										allowDecimals={false}
										value={this.state.chiPhiKhac}
										onValueChange={(value, name) =>
											this.setState({ chiPhiKhac: value })
										}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-6">
									<label htmlFor="giamGia" className="form-label">
										Giảm giá
									</label>
									<CurrencyInput
										className="form-control"
										id="giamGia"
										name="giamGia"
										placeholder="(VND)"
										prefix={"₫"}
										allowDecimals={false}
										value={this.state.giamGia}
										onValueChange={(value, name) =>
											this.setState({ giamGia: value })
										}
										onKeyDown={this.onKeyDown}
									/>
								</div>
								<div className="col-6">
									<label htmlFor="tongTien" className="form-label"
										style={{
											display: "block",
											textAlign: "center"
										}}
									>
										Tổng tiền hoá đơn
									</label>
									<span className=""  
										style={{
											textAlign: "center",
											display: "block",
											height: '40px',
											lineHeight: '40px',
											fontWeight: 'bold',
											fontSize: "1.5rem",
											manageBottom: "0px !important",
											paddingBottom: "0px !important",
											color: "#ff2020"
										}}
									>
										{formatter.format((this.state.thanhTien.reduce((acc, cur )=>{
											return acc + cur
										}, 0) || 0) + (parseInt(this.state.chiPhiKhac)||0) - (parseInt(this.state.giamGia))||0)}
									</span>
								</div>
								<div className="col-6">
									<label htmlFor="trangThaiHD" className="form-label">
										Trạng thái
									</label>
									<select
										id="trangThaiHD"
										className="form-select form-control "
										value={this.state.trangThaiHD}
										onChange={(e) => this.handleOnChangeInput(e, "trangThaiHD")}
									>
										<option value="0">Chưa thanh toán</option>
										<option value="1">Đã thanh toán</option>
									</select>
								</div>

								{this.state.isUpdate === true ? (
									<>
										<div className="col-6">
											<button
												type="submit"
												className="btn btn-primary ps-2 pe-2"
												onClick={(e) => this.handleUpdateHD(e)}
											>
												Cập nhật
											</button>
											<button
												className="btn btn-danger ms-3 ps-2 pe-2"
												onClick={(e) => this.handleExitHD(e)}
											>
												Huỷ
											</button>
										</div>
										<div className="col-6"
											style={{
												display: 'flex',
												justifyContent:'flex-end'
											}}
										>
											<CSVLink className="btn btn-warning ms-3 ps-2 pe-2" data={this.state.data} headers={this.state.headers}>
												Tải hoá đơn
											</CSVLink>
										</div>
									</>
									) : (
									<div className="col-12"
										
									>
										<button
											type="submit"
											className="btn btn-primary ps-2 pe-2"
											onClick={(e) => this.handleCreateHD(e)}
										>
											Tạo đơn hàng
										</button>
									</div>
								)}
							</form>
						</div>
						<div className="chuc-vu-body mb-3">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách hoá đơn chưa thanh toán</b>
								</div>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã hoá đơn</th>
											<th>Tên khách hàng</th>
											<th>Người tạo</th>
											<th>Bàn ăn</th>
											<th>Chi phí khác</th>
											<th>Giảm giá</th>
											<th>Tổng tiền HD</th>
											<th>Ngày tạo</th>
											<th>Trạng thái</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrHD?.length > 0 &&
											this.state.arrHD.filter((item)=>{
												return item.trangThaiHD == 0
											}).map((item, index) => {
												return (
													<tr key={index}>
														<td>{item.id}</td>
														<td>{item.tenKhachHang||'trống'}</td>
														<td
															style={{
																textTransform: "capitalize"
															}}
														>{this.getTenNV(item.idNhanVien)}</td>
														<td>{this.getTenBA(item.idBanAn)}</td>
														<td>{formatter.format(item.chiPhiKhac)}</td>
														<td>{formatter.format(item.giamGia)}</td>
														<td>{formatter.format(item.tongTien)}</td>
														<td>{item.ngayNhap.toString().slice(0, 10)}</td>
														<td>
															{item.trangThaiHD == 0
																? "Chưa thanh toán"
																: "Đã thanh toán"}
														</td>
														
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditHD(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteHD(item.id)
																}
															>
																
																<i className="fas fa-trash"></i>
															</button>
															{item.trangThaiHD == 1 ? '': (
																<button
																	className="action check"
																	onClick={() =>
																		this.handleDoneHD(item.id)
																	}
																>
																	<i className="fas fa-check"></i>
																</button>
															)}
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="chuc-vu-body mb-5">
							<div className="row">
								<div className="col-12 mb-3  header-manage-user">
									<b>Danh sách hoá đơn đã thanh toán</b>
								</div>
								<div className="col-6	" style={{padding:0}}>
									<label htmlFor="ngayNhap" className="form-label">
										Lọc theo ngày
									</label>
									<input
										type="date"
										className="form-control mb-2"
										id="ngayNhap"
										ref={this.textInput}
										value={this.state.filter.ngayNhap}
										onChange={(e) => this.handleOnChangeInputDate(e)}
									/>
								</div>
									<button className="btn btn-primary" 
										style={{ 
											padding: "5px",
											width: "7%",
											height: "40px",
											marginBottom: "8px",
											marginLeft: "1rem",
											marginTop: "auto"
										}}
										onClick = {(e) =>this.handleOnClickLoc(e)}
									>
										Huỷ lọc
									</button>
								<table className=" col-12 ">
									<tbody>
										<tr>
											<th>Mã hoá đơn</th>
											<th>Tên khách hàng</th>
											<th>Người tạo</th>
											<th>Bàn ăn</th>
											<th>Chi phí khác</th>
											<th>Giảm giá</th>
											<th>Tổng tiền HD</th>
											<th>Ngày tạo</th>
											<th>Trạng thái</th>
											<th>Thao tác</th>
										</tr>
										{this.state.arrHD?.length > 0 &&
											this.state.arrHD.filter((item)=>{
												for (var key in this.state.filter) {
													if(this.state.filter[key] != ""){
														if (key == "ngayNhap") {
															if (item[key].slice(0, 10) != this.state.filter[key]){
																return false;
															}
														}else{
															if (item[key] != this.state.filter[key]){
																return false;
															}
														}
													}
												}
												return true;
												// return (item.trangThaiHD == 1 && item.ngayNhap.slice(0,19) == "2022-06-14")
											}).map((item, index) => {
												return (
													<tr key={index}>
														<td>{item.id}</td>
														<td>{item.tenKhachHang||'trống'}</td>
														<td
															style={{
																textTransform: 'capitalize'
															}}
														>{this.getTenNV(item.idNhanVien)}</td>
														<td>{this.getTenBA(item.idBanAn)}</td>
														<td>{formatter.format(item.chiPhiKhac)}</td>
														<td>{formatter.format(item.giamGia)}</td>
														<td>{formatter.format(item.tongTien)}</td>
														<td>{item.ngayNhap.toString().slice(0, 10)}</td>
														<td>
															{item.trangThaiHD == 0
																? "Chưa thanh toán"
																: "Đã thanh toán"}
														</td>
														
														<td>
															<button
																className="action edit"
																onClick={() =>
																	this.handleEditHD(item)
																}
															>
																<i className="fas fa-edit"></i>
															</button>
															<button
																className="action delete"
																onClick={() =>
																	this.handleDeleteHD(item.id)
																}
															>
																
																<i className="fas fa-trash"></i>
															</button>
															{item.trangThaiHD == 1 ? '': (
																<button
																	className="action check"
																	onClick={() =>
																		this.handleDoneHD(item.id)
																	}
																>
																	<i className="fas fa-check"></i>
																</button>
															)}
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
				{this.state.isOpen === true && this.state.linkImg !== "" && (
					<Lightbox
						mainSrc={this.state.linkImg}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		BARedux: state.admin.BA,
		MARedux: state.admin.MA,
		userInfo: state.user.userInfo,
		HDRedux: state.admin.HD,
		listNV: state.admin.NV,
	};
};

const mapDispatchToProps = (dispatch) => {
	return { 
			fetchUserRedux: () => dispatch(actions.fetchALLNVStart()),
			getBanAnStart: () => dispatch(actions.fetchBanAnStart()),
			getMonAnStart: () => dispatch(actions.fetchMonAnStart()),
			createHDStart: (data) => dispatch(actions.createHDStart(data)),
			getHDStart: () => dispatch(actions.fetchHDStart()),
			deleteHDStart: (id) => dispatch(actions.deleteHDStart(id)),
			updateHDStart: (data) => dispatch(actions.updateHDStart(data)),
			};
};

export default connect(mapStateToProps, mapDispatchToProps)(HoaDon);
