import React from "react";
import { connect } from "react-redux";
import { Layout, Result, Button, Spin, Typography } from "antd";
import PropTypes from "prop-types";
import IdleTimer from "react-idle-timer";
import { GetInfoUser, GetUserKpiState } from "../../redux/actions/user";
import { doGetMetrics } from "../../redux/actions/kpi";
import { actionGetNotifications } from "../../redux/actions";
import { Footer, Header, Sidebar } from "./components";
import { MappedRouter } from "../../routes/RouteGenerator";
import { authProvider } from "../../service/activeDirectory";
import styles from "./Dashboard.style";
import { menuMonitoringAllow, menuAppraisalAllow } from "../../utils/stepKpi";
import actionLoginByADToken from "../../redux/actions/auth/actionLoginByADToken";
import Logo from "../../assets/xl.png";
import { SUCCESS, errorHandlerCode, httpHeaders } from "../../redux/status-code-type";
import actionGetCurrStep from "../../redux/actions/auth/actionGetCurrentStep";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withCookies } from "react-cookie";

// import Stores from '../../redux/store/index';
const { Content } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      loading: true,
      pleaseWait: false,
    };
    this.idleTimer = null;
  }

  async componentDidMount() {
    await this.callAndStore();
    // listen when browser close
    window.addEventListener("onbeforeunload", () => {
      localStorage.clear();
    });
    // listen when route change
    this.unlisten = this.props.history.listen(async () => {
      const { authReducer, doGetCurrStep } = this.props;
      if (authReducer?.statusLoginCode === SUCCESS) {
        await doGetCurrStep();
      }
    });
    // // refresh token
    const { auth } = this.props;
    const { accessToken } = auth;
    const { expiresOn } = accessToken;
    if (accessToken) {
      const now = new Date().getTime();
      const last = expiresOn.getTime();
      const refresh = last - now;
      setInterval(async () => {
        await this.callAndStore();
      }, refresh);
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getToken = async () => {
    const { auth } = this.props;
    let token = localStorage.getItem("token");
    if (token === null) {
      if (!auth) {
        token = null;
      } else if (auth.accessToken) {
        token = auth.accessToken.accessToken;
        localStorage.setItem("token", token);
      }
    }
    return token;
  };

  getDetailUser = async (token) => {
    const { doLoginByADToken, doGetCurrStep } = this.props;
    setTimeout(() => {
      this.setState({
        pleaseWait: true
      })
    }, 8000)
    await doLoginByADToken(token);
    const { authReducer } = this.props;
    if (authReducer?.statusLoginCode === SUCCESS) {
      if (localStorage.getItem("sfToken")) {
        doGetCurrStep();
      } else {
        await doGetCurrStep();
      }
    }
  };

  callAndStore = async () => {
    this.setState({ loading: true });
    await this.callToken();
    const myToken = await this.getToken();
    await this.getDetailUser(myToken);
    if (localStorage.getItem("sfToken")) {
      this.props.getNotifications();
      setInterval(() => this.props.getNotifications(), 180000);
    }
    this.setState({ loading: false });
  };

  callToken = async () => {
    const token = await authProvider.getAccessToken();
    localStorage.setItem("token", token.accessToken);
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  onIdle = (e) => {
    const token = localStorage.getItem("token");
    this.getDetailUser(token);
  };

  render() {
    const { collapsed, loading } = this.state;
    const { child, logout, authReducer } = this.props;
    const isMonitoring = menuMonitoringAllow.includes(authReducer?.currentStep);
    const isAppraisal = menuAppraisalAllow.includes(authReducer?.currentStep);
    const mainRouter = child;
    if (loading || authReducer?.loadingLogin) {
      return (
        <Layout
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <ToastContainer />
          <img
            src={Logo}
            alt="logo"
            style={{ ...styles.logo, marginBottom: 20 }}
          />
          {this.state.pleaseWait && <Typography
            style={{ marginBottom: 10 }}
          >
            Please wait a minute, while we are getting a response from a server
          </Typography>}
          <Spin />
        </Layout>
      );
    } else if (authReducer?.statusLoginCode === SUCCESS) {
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <ToastContainer />
          <IdleTimer
            ref={(ref) => {
              this.idleTimer = ref;
            }}
            element={document}
            onIdle={this.onIdle}
            debounce={250}
            timeout={1000 * 60 * 15} // 15mnt
          />
          <Sidebar
            collapsed={collapsed}
            toggle={this.toggle}
            isMonitoring={isMonitoring}
            isAppraisal={isAppraisal}
          />
          <Layout style={{ opacity: !collapsed ? "0.3" : "1" }}>
            <Header
              collapsed={collapsed}
              toggle={this.toggle}
              logout={logout}
              isMonitoring={isMonitoring}
              isAppraisal={isAppraisal}
            />
            <Content style={styles.contentContainer}>
              <MappedRouter routes={mainRouter} />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      );
    } else {
      const errors = errorHandlerCode(
        authReducer?.statusLoginCode,
        authReducer?.statusLoginDesc
      );
      return (
        <Layout style={{ minHeight: "100vh" }} id="result-token">
          <ToastContainer />
          <Content style={styles.contentContainer}>
            <Result
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...errors}
              extra={
                errors?.status === httpHeaders.ERR_SERVER ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => {
                        localStorage.removeItem("sfToken");
                        localStorage.removeItem("token");
                        localStorage.removeItem("currStep");
                        try {
                          const cookies = this.props.cookies.getAll();
                          Array.from(
                            (Object.keys(cookies) || []).map((item) => {
                              this.props.cookies.remove(item);
                            })
                          );
                        } catch (error) {
                          console.log(error);
                        }
                        window.location.reload();
                      }}
                      style={{ fontWeight: "bold" }}
                    >
                      Refresh
                    </Button>
                    <Button
                      type="primary"
                      onClick={logout}
                      style={{ fontWeight: "bold" }}
                      ghost
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={logout}
                    style={{ fontWeight: "bold" }}
                  >
                    Logout
                  </Button>
                )
              }
            />
          </Content>
          <Footer />
        </Layout>
      );
    }
  }
}
const mapDispatchtoProps = (dispatch) => ({
  doGetInfoUser: (token) => dispatch(GetInfoUser(token)),
  getMetrics: () => dispatch(doGetMetrics()),
  GetMyKpiState: () => dispatch(GetUserKpiState()),
  getNotifications: () => dispatch(actionGetNotifications()),
  doLoginByADToken: (token) => dispatch(actionLoginByADToken(token)),
  doGetCurrStep: () => dispatch(actionGetCurrStep()),
});

const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  user: state.userReducer,
  kpi: state.kpiReducer,
  step: state.userKpiStateReducer,
});

export default withCookies(connect(mapStateToProps, mapDispatchtoProps)(Dashboard));

Dashboard.propTypes = {
  auth: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  authReducer: PropTypes.instanceOf(Object),
  doGetInfoUser: PropTypes.func,
  GetMyKpiState: PropTypes.func,
  getNotifications: PropTypes.func,
  logout: PropTypes.func,
  doLoginByADToken: PropTypes.func,
  doGetCurrStep: PropTypes.func,
  child: PropTypes.instanceOf(Array),
};
