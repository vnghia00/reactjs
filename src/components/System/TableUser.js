import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./UserManage.scss";

class TableUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userRedux: [],
		};
	}
	async componentDidMount() {
		this.props.fetchUserRedux();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.listUsers !== this.props.listUsers) {
			this.setState({
				userRedux: this.props.listUsers,
			});
		}
	}
	handleDeleteUser = (id) => {
		this.props.deleteNVStart(id);
	};
	handleEditUser = (data) => {
		this.props.handleEditUserProps(data);
	};
	getCV = (id) => {
		for (let index = 0; index < this.props.chucVuRedux.length; index++) {
			if (this.props.chucVuRedux[index].id === id) {
				return this.props.chucVuRedux[index].tenChucVu;
			}
		}
	};
	render() {
		const arrUsers = this.state.userRedux.reverse();

		return (
			<>
				<div className="col-12 mb-3 header-manage-user">
					<b>Danh sách nhân viên</b>
				</div>

				<table className=" col-12 ">
					<tbody>
						<tr>
							<th className="">Stt</th>
							<th>Email</th>
							<th>Họ Tên</th>
							<th>Số Điện Thoại</th>
							<th>Giới Tính</th>
							<th>Chức Vụ</th>
							<th>Thao tác</th>
						</tr>
						{arrUsers &&
							arrUsers.map((item, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.email}</td>
										<td>{item.tenNV}</td>
										<td>{item.soDT}</td>
										<td>
											{item.gioiTinh === "1"
												? "Nam"
												: item.gioiTinh === "0"
												? "Nữ"
												: "Khác"}
										</td>
										<td>{this.getCV(item.idChucVu)}</td>
										<td>
											<button
												className="action edit"
												onClick={() => this.handleEditUser(item)}
											>
												<i className="fas fa-edit"></i>
											</button>
											<button
												className="action delete"
												onClick={() => this.handleDeleteUser(item.id)}
											>
												<i className="fas fa-trash"></i>
											</button>
										</td>
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
		listUsers: state.admin.NV,
		chucVuRedux: state.admin.chucVu,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserRedux: () => dispatch(actions.fetchALLNVStart()),
		deleteNVStart: (id) => dispatch(actions.deleteNVStart(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
