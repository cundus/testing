import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import {
  Layout,
  Result,
  Button,
  Spin
} from 'antd';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';
import { GetInfoUser, GetUserKpiState } from '../../redux/actions/user';
import { doGetMetrics } from '../../redux/actions/kpi';
import { actionGetNotifications } from '../../redux/actions';
import { Footer, Header, Sidebar } from './components';
import { MappedRouter } from '../../routes/RouteGenerator';
import { authProvider } from '../../service/activeDirectory';
import styles from './Dashboard.style';
import { menuMonitoringAllow, menuAppraisalAllow } from '../../utils/stepKpi';
import actionLoginByADToken from '../../redux/actions/auth/actionLoginByADToken';
import Logo from '../../assets/xl.png';
import { SUCCESS, errorHandlerCode } from '../../redux/status-code-type';
import actionGetCurrStep from '../../redux/actions/auth/actionGetCurrentStep';

// import Stores from '../../redux/store/index';
const { Content } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      loading: true
    };
    this.idleTimer = null;
  }

  async componentDidMount() {
    await this.callAndStore();
    // listen when browser close
    window.addEventListener('onbeforeunload', () => {
      localStorage.clear();
    });
    // // refresh token
    const { auth, getNotifications } = this.props;
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
    getNotifications();
    setInterval(() => getNotifications(), 180000);
  }

  getToken = async () => {
    const { auth } = this.props;
    let token = localStorage.getItem('token');
    if (token === null) {
      if (!auth) {
        token = null;
      } else if (auth.accessToken) {
        token = auth.accessToken.accessToken;
        localStorage.setItem('token', token);
      }
    }
    return token;
  };

  getDetailUser = async (token) => {
    const { doLoginByADToken, doGetCurrStep } = this.props;
    await doLoginByADToken(token);
    const { getNotifications } = this.props;
    const { authReducer } = this.props;
    if (authReducer?.statusLoginCode === SUCCESS) {
      await doGetCurrStep();
    }
  };

  callAndStore = async () => {
    this.setState({ loading: true });
    await this.callToken();
    const myToken = await this.getToken();
    await this.getDetailUser(myToken);
    this.setState({ loading: false });
  };

  callToken = async () => {
    const token = await authProvider.getAccessToken();
    localStorage.setItem('token', token.accessToken);
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  onIdle = (e) => {
    const token = localStorage.getItem('token');
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
        <Layout style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ ...styles.logo, marginBottom: 20 }}
          />
          <Spin />
        </Layout>
      );
    } else if (authReducer?.statusLoginCode === SUCCESS) {
      return (
        <Layout style={{ minHeight: '100vh' }}>
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
          <Layout style={{ opacity: !collapsed ? '0.3' : '1' }}>
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
      const errors = errorHandlerCode(authReducer?.statusLoginCode, authReducer?.statusLoginDesc);
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={styles.contentContainer}>
            <Result
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...errors}
              extra={
                <Button type="primary" onClick={logout} style={{ fontWeight: 'bold' }}>
                  Logout
                </Button>
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
  doGetCurrStep: () => dispatch(actionGetCurrStep())
});

const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  user: state.userReducer,
  kpi: state.kpiReducer,
  step: state.userKpiStateReducer
});

export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);

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
  child: PropTypes.instanceOf(Array)
};
