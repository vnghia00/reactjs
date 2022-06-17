import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { path } from "../utils";

class Home extends Component {
	render() {
		const { isLoggedIn } = this.props;
		let linkToRedirect = isLoggedIn ? path.SYSTEM + "/ban-an" : path.LOGIN;

		return <Redirect to={linkToRedirect} />;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
