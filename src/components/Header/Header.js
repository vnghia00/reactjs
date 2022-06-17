import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../Navigator/Navigator";
import { adminMenu, thuNganMenu, thuKhoMenu } from "./menuApp";
import "./Header.scss";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleOnChangeLanguage = () => {
		let language = this.props.language === "vi" ? "en" : "vi";
		this.props.appChangeLanguageRedux(language);
	};
	render() {
		const { processLogout } = this.props;
		return (
			<div className="header-container">
				<div className="header-tabs-container">
					{this.props.userInfo.id == -1 ? <Navigator menus={adminMenu} /> :
					(this.props.userInfo.idChucVu == 1 ? <Navigator menus={adminMenu} /> : 
					(this.props.userInfo.idChucVu == 2 ? <Navigator menus={thuNganMenu}/> : <Navigator menus={thuKhoMenu}/>))}
					
				</div>
				<div className="header-end">
					<div className="me-3">
						<span className="">Xin chào: </span>
						<span className="text-warning" style={{fontWeight:'bold',textTransform: 'capitalize'}}>
							{this.props.userInfo.tenChuNH ? this.props.userInfo.tenChuNH : this.props.userInfo.tenNV }</span>
					</div>
					{/* <div className="header-language">
						<button
							className="btn-language"
							onClick={() => this.handleOnChangeLanguage()}
						>
							<span className={this.props.language === "vi" ? "action-language" : ""}>
								Vn
							</span>
							<span> / </span>
							<span className={this.props.language === "en" ? "action-language" : ""}>
								En
							</span>
						</button>
					</div> */}
					{/* nút logout */}
					<div className="btn btn-logout" onClick={processLogout}>
						<i className="fas fa-sign-out-alt"></i>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		processLogout: () => dispatch(actions.processLogout()),
		appChangeLanguageRedux: (language) => dispatch(actions.appChangeLanguage(language)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
