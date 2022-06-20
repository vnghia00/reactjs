import React, {Component} from "react";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {FormattedMessage} from "react-intl";
import { toast } from "react-toastify";
import * as actions from "../../store/actions";
import "./Login.scss";
import {handleLoginAPI} from "../../services/userService";
import {path} from "../../utils";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      message2: "",
      message3: "",
      errCode: "",
    };
  }

  handleOnchangeUsername = (event) => {
    this.setState({
      email: event.target.value,
      message2: "",
    });
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
      message3: "",
    });
  };
  handleLogin = async () => {
    if(this.state.password == "" || this.state.email == "" ){
      this.setState({
        message3: "Vui lòng nhập đủ thông tin",
      });
    }else{
      this.setState({
        message2: "",
        message3: "",
      });
      try {
        const data = await handleLoginAPI(this.state.email, this.state.password);
        if (data && data.errCode !== 0) {
          if(data.errCode == 2){
            this.setState({
              message2: data.message,
            });
          }
          if(data.errCode == 3){
            this.setState({
              message3: data.message,
            });
          }
        }
        if (data && data.errCode === 0) {
          this.props.userLoginSuccess(data.user);
          toast.success(data.message)
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            this.setState({
              message3: error.response.data.message,
            });
          }
        }
      }
    }
    
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="main">
        {/* <form action="" method="POST" className="form" id="form-1"> */}
        <div className="form">
          <h3 className="heading">Đăng nhập</h3>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Tài khoản
            </label>
            <input
              value={this.state.username}
              id="email"
              name="email"
              type="email"
              placeholder="VD: email@domain.com"
              className="form-control"
              onChange={(event) => this.handleOnchangeUsername(event)}
              onKeyDown={this.onKeyDown}
            />
          </div>
          <span className="form-message">{this.state.message2}</span>
          <div className="form-group ">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <div className="show-hide-password">
              <input
                value={this.state.password}
                id="password"
                name="password"
                type={this.state.isShowPassword ? "text" : "password"}
                placeholder="nhập mật khẩu"
                className="form-control"
                onChange={(event) => this.handleOnchangePassword(event)}
                onKeyDown={this.onKeyDown}
              />
              <span
                className="icon-show-hide-password"
                onClick={() => this.handleShowHidePassword()}
              >
                <i
                  className={
                    this.state.isShowPassword
                      ? "fas fa-eye"
                      : "fas fa-eye-slash"
                  }
                ></i>
              </span>
            </div>
          </div>

          <span className="form-message">{this.state.message3}</span>
          <button className="form-submit" onClick={() => this.handleLogin()}>
            Login
          </button>

          <div className="form-group forgot">
              <Link to = {path.FORGOT} >
                <span>Quên mật khẩu?</span>
              </Link>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
