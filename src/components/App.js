import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter as Router} from "connected-react-router";
import {history} from "../redux";
import {ToastContainer} from "react-toastify";
import "./App.scss";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import {path} from "../utils";
import HomePage from "./HomePage/HomePage";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import {CustomToastCloseButton} from "../components/CustomToast/CustomToast";
import CustomScrollbars from "../components/CustomToast/CustomScrollbars";

class App extends Component {
  handlePersistorState = () => {
    const {persistor} = this.props;
    let {bootstrapped} = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({bootstrapped: true}))
          .catch(() => this.setState({bootstrapped: true}));
      } else {
        this.setState({bootstrapped: true});
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    console.log(history,"111111111");
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* {this.props.isLoggedIn && <Header />} */}
            <div className="content-container">
              <CustomScrollbars>
                <Switch>
                  <Route path={path.HOM_PAGE} exact component={Home} />
                  {/* <Route path={path.HOME} exact component={Home} /> */}
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                </Switch>
              </CustomScrollbars>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
