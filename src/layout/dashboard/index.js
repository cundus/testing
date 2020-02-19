import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Layout, Spin, message } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { GetInfoUser, GetUserKpiState } from '../../redux/actions/user';
import { doGetMetrics } from '../../redux/actions/kpi';
import { actionGetNotifications } from '../../redux/actions';
import { Footer, Header, Sidebar } from './components';
import { MappedRouter } from '../../routes/RouteGenerator';
import { authProvider } from '../../service/auth/auth';
import styles from './Dashboard.style';

// import Stores from "../../redux/store/index";
const { Content } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
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
  }

  getDetailUser = async (token) => {
    const { doGetInfoUser, GetMyKpiState } = this.props;
    await doGetInfoUser(token);
    const { user } = this.props;
    const { result } = user;
    if (result) {
      await localStorage.setItem('sfToken', result.accessToken);
      GetMyKpiState();
    } else {
      const header = document.querySelector('.headerContainer');
      header.style.display = 'none';
      message.error('user not found');
    }
  }

  callAndStore = async () => {
    await this.callToken();
    const myToken = await this.getToken();
    await this.getDetailUser(myToken);
  }

  callToken = async () => {
    const token = await authProvider.getAccessToken();
    localStorage.setItem('token', token.accessToken);
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    const step = _.get(this, 'props.step.currentStep', 'Emp Goal Setting');
    const isAllowToMonitor = step === 'Manager Goal Review' || step === 'Emp Goal Setting';
    const { collapsed } = this.state;
    const {
      child, user, logout
    } = this.props;
    let mainRouter = child;
    const isManager = _.get(this.props, 'user.result.user.manager', false);
    // const isNoEmpleyee = _.get(this.props, 'user.result.user.managerId', null);
    if (isManager === false) {
      mainRouter = mainRouter.filter((d) => d.title !== 'My Team');
    }
    // if (!isNoEmpleyee) {
    //   mainRouter = mainRouter.filter((d) => d.title.includes('My Team'));
    // }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} toggle={this.toggle} isAllowToMonitor={isAllowToMonitor} />
        <Layout style={{ opacity: !collapsed ? '0.3' : '1' }}>
          <Header collapsed={collapsed} toggle={this.toggle} logout={logout} isAllowToMonitor={isAllowToMonitor} />
          <Content style={styles.contentContainer}>
            {/* <div style={{ padding: 24, background: '#fff', borderRadius: 5 }}> */}
            {Object.keys(user).length ? (
              <MappedRouter routes={mainRouter} />
            ) : (
              <center><Spin /></center>
            )}
            {/* </div> */}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchtoProps = (dispatch) => ({
  doGetInfoUser: (token) => dispatch(GetInfoUser(token)),
  getMetrics: () => (dispatch(doGetMetrics())),
  GetMyKpiState: () => dispatch(GetUserKpiState()),
  getNotifications: () => dispatch(actionGetNotifications())
});

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers,
  kpi: state.kpiReducers,
  step: state.userKpiStateReducers
});

export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);

Dashboard.propTypes = {
  auth: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  doGetInfoUser: PropTypes.func,
  GetMyKpiState: PropTypes.func,
  getNotifications: PropTypes.func,
  logout: PropTypes.func,
  child: PropTypes.instanceOf(Array)
};
