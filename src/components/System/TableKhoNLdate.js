import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./UserManage.scss";

class TableKhoNLdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			KNLdate:[],
			ngayNhap: ""
		};
	}
	componentDidMount() {
		this.setState({
			ngayNhap: this.props.date[0].ngayNhap.slice(0, 10)
		})
		this.props.fetchKNLDateStart(this.props.date[0].ngayNhap.slice(0, 10));
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.KNLdate !== this.props.KNLdate) {
			this.setState({
				KNLdate: this.props.KNLdate,
			});
		}
		if (prevProps.listKNL !== this.props.listKNL) {
			this.props.fetchKNLDateStart(this.props.listKNL[0].ngayNhap.slice(0, 10));
			console.log(123);
			this.setState({
				ngayNhap:this.props.listKNL[0].ngayNhap.slice(0, 10)
			});
		}
	}
	handleOnChangeInputDate = (event, name) => {
		let copyState = this.state;
		copyState[name] = event.target.value;
		this.setState({
			...copyState,
		});
		this.props.fetchKNLDateStart(event.target.value.slice(0, 10));
	};
	handleDeleteKNL = (data) => {
		if (window.confirm("Xoá Kho nguyên liệu") === true) {
			try {
				let arrId = []
				for (let index = 0; index < data.length; index++) {
					arrId = [...arrId, data[index].id]
					
				}
				console.log(arrId);
				this.props.deleteKNLStart(arrId);
			} catch (e) {
				console.log(e);
			}
		}
		
	};
	handleEditKNL = (data) => {
		console.log(data);

		console.log(this.state.KNLdate);
		this.props.handleEditKNLProps(data);
	};
	getTenNL = (id) => {
		for (let index = 0; index < this.props.listNL.length; index++) {
			if (id === this.props.listNL[index].id) {
				return this.props.listNL[index].tenNguyenLieu;
			}
		}
		return "Không tồn tại";
	};
	getTenNV = (id) => {
		if(id==-1){
			return "Văn Nghĩa"
		}
		for (let index = 0; index < this.props.listNV.length; index++) {
			if (id === this.props.listNV[index].id) {
				return this.props.listNV[index].tenNV;
			}
		}
		return "Không tồn tại";
	};
	render() {
		console.log(this.state);
		return (
			<>
				<div className="col-12 mb-3  header-manage-user">
					<b>Kho nguyên liệu</b>
				</div>
				<div className="col-12" style={{padding:0}}>
					<label htmlFor="ngayNhap" className="form-label">
						Tìm theo ngày
					</label>
					<input
						type="date"
						className="form-control mb-2"
						id="ngayNhap"
						ref={this.textInput}
						value={this.state.ngayNhap}
						onChange={(e) => this.handleOnChangeInputDate(e, "ngayNhap")}
					/>
				</div>
				<table className=" col-12 mb-3">
					<tbody>
						<tr>
							<th>tên người nhập</th>
							<th>ngày nhập</th>
							<th>thao tác</th>
						</tr>
						<tr>
							<td>{this.getTenNV(this.state.KNLdate[0]?.idNhanVien)}</td>
							<td>{this.state.KNLdate[0]?.ngayNhap.slice(0, 10)}</td>
							<td>
								<button
									className="action edit"
									onClick={() => this.handleEditKNL(this.state.KNLdate)}
								>
									<i className="fas fa-edit"></i>
								</button>
								<button
									className="action delete"
									onClick={() => this.handleDeleteKNL(this.state.KNLdate)}
								>
									<i className="fas fa-trash"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<table className=" col-12 mb-3 ">
					<tbody>
						<tr>
							<th>Mã nguyên liệu</th>
							<th>Tên nguyên liệu</th>
							<th>Số lượng đầu ngày</th>
							<th>Số lượng nhập trong ngày</th>
							<th>Số lượng cuối ngày</th>
							<th>Đơn vị</th>
						</tr>
						{this.state.KNLdate.length > 0 &&
							this.state.KNLdate.map((item, index) => {
								return (
								<tr key={index}>
									<td>{item.idNguyenLieu}</td>
									<td>{this.getTenNL(item.idNguyenLieu)}</td>
									<td>{item.soLuongDauNgay}</td>
									<td>{item.soLuongNhapTrongNgay}</td>
									<td>{item.soLuongCuoiNgay}</td>
									<td>{item.donVi}</td>
								</tr>
								)
							}
						)}
					</tbody>
				</table>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		listKNL: state.admin.KNL,
		KNLdate: state.admin.KNLdate,
		listNL: state.admin.NL,
		listNV: state.admin.NV,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchKNLDateStart: (date) => dispatch(actions.fetchKNLDateStart(date)),
		deleteKNLStart: (data) => dispatch(actions.deleteKNLStart(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableKhoNLdate);
