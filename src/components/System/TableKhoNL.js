import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./UserManage.scss";
import TableKhoNLdate from "./TableKhoNLdate";

class TableKhoNL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrNL:[],
			KhoNLRedux: [],
			date:""
		};
	}
	async componentDidMount() {
		this.props.fetchKNLStart();
		this.props.fetchUserRedux();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.listKNL !== this.props.listKNL) {
			this.setState({
				KhoNLRedux: this.props.listKNL,
				date: this.props.listKNL[0]?.ngayNhap.slice(0, 10)
			});
		}
		if (prevProps.listNL !== this.props.listNL) {
			const arrNLredux = this.props.listNL;
			this.setState({
				arrNL: arrNLredux,
			});
		}
	}
	getTenNL = (id) => {
		for (let index = 0; index < this.state.arrNL.length; index++) {

			if (id === this.state.arrNL[index].id) {
				return this.state.arrNL[index].tenNguyenLieu;
			}
		}
		return "Không tồn tại";
	};
	getTenNV = (id) => {
		if(id==-1 || id==111){
			return "Văn Nghĩa"
		}else{
			for (let index = 0; index < this.props.listNV.length; index++) {
				if (id === this.props.listNV[index].id) {
					return this.props.listNV[index].tenNV;
				}
			}
		}
		return "Không tồn tại";
	};
	render() {
		const arrKNL = this.state.KhoNLRedux;
		return (
			<>
				{this.state.date?<TableKhoNLdate date={arrKNL} handleEditKNLProps={this.props.handleEditKNLProps}/>:""}	
				
				<div className="col-12 mb-3  header-manage-user">
					<b>Danh sách nhập kho</b>
				</div>
				<table className=" col-12 mb-5">
					<tbody>
						<tr>
							<th>Mã nguyên liệu</th>
							<th>Tên nguyên liệu</th>
							<th>Số lượng đầu ngày</th>
							<th>Số lượng nhập trong ngày</th>
							<th>Số lượng cuối ngày</th>
							<th>Đơn vị</th>
							<th>Tên người nhập</th>
							<th>Ngày nhập</th>
						</tr>
						{arrKNL.length > 0 &&
							arrKNL.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.idNguyenLieu}</td>
										<td>{this.getTenNL(item.idNguyenLieu)}</td>
										<td>{item.soLuongDauNgay}</td>
										<td>{item.soLuongNhapTrongNgay}</td>
										<td>{item.soLuongCuoiNgay}</td>
										<td>{item.donVi}</td>
										{
											index-1<0?<td rowSpan={this.state.arrNL.length}>{this.getTenNV(item.idNhanVien)}</td>:
											(arrKNL[index-1<0?0:index-1].ngayNhap!=item.ngayNhap ?
											<td rowSpan={this.state.arrNL.length}>{this.getTenNV(item.idNhanVien)}</td>
											: <td hidden={true}></td>)
										}
										{
											index-1<0?<td rowSpan={this.state.arrNL.length}>{item.ngayNhap.slice(0, 10)}</td>:
											(arrKNL[index-1<0?0:index-1].ngayNhap!=item.ngayNhap ?
											<td rowSpan={this.state.arrNL.length}>{item.ngayNhap.slice(0, 10)}</td>
											:<td hidden={true}></td>)
										}
									</tr>
								);
							})}
					</tbody>
				</table>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		listKNL: state.admin.KNL,
		listNL: state.admin.NL,
		listNV: state.admin.NV,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserRedux: () => dispatch(actions.fetchALLNVStart()),
		fetchKNLStart: () => dispatch(actions.fetchKNLStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableKhoNL);
