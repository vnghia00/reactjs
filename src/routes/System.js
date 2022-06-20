import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../components/System/UserRedux";
import ChucVu from "../components/System/ChucVu";
import BanAn from "../components/System/BanAn";
import MonAn from "../components/System/MonAn";
import NguyenLieu from "../components/System/NguyenLieu";
import KhoNguyenLieu from "../components/System/KhoNguyenLieu";
import NhapNguyenLieu from "../components/System/NhapNguyenLieu";
import { path } from "../utils";
import Header from "../components/Header/Header";
import HoaDon from "../components/System/HoaDon";
import DanhMucMA from "../components/System/DanhMucMA";
import ThongKe from "../components/System/ThongKe";
import ThongKeBanAn from "../components/System/ThongKeBanAn";
import ThongKeMonAn from "../components/System/ThongKeMonAn";

class System extends Component {
	render() {
		const { systemMenuPath } = this.props;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="system-container">
					<div className="system-list">
						<Switch>
							<Route path={path.SYSTEM} exact component={BanAn} />
							<Route path={path.SYSTEM + "/user-redux"} component={UserRedux} />
							<Route path={path.SYSTEM + "/chuc-vu"} component={ChucVu} />
							<Route path={path.SYSTEM + "/ban-an"} component={BanAn} />
							<Route path={path.SYSTEM + "/mon-an"} component={MonAn} />
							<Route path={path.SYSTEM + "/hoa-don"} component={HoaDon} />
							<Route path={path.SYSTEM + "/nguyen-lieu"} component={NguyenLieu} />
							<Route path={path.SYSTEM + "/danh-muc-mon-an"} component={DanhMucMA} />
							<Route path={path.SYSTEM + "/thong-ke"} component={ThongKe} />
							<Route path={path.SYSTEM + "/thong-ke-ban"} component={ThongKeBanAn} />
							<Route path={path.SYSTEM + "/thong-ke-mon"} component={ThongKeMonAn} />

							<Route
								path={path.SYSTEM + "/kho-nguyen-lieu"}
								component={KhoNguyenLieu}
							/>
							<Route
								path={path.SYSTEM + "/nhap-nguyen-lieu"}
								component={NhapNguyenLieu}
							/>

							<Route
								component={() => {
									return <Redirect to={systemMenuPath} />;
								}}
							/>
						</Switch>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		systemMenuPath: state.app.systemMenuPath,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
