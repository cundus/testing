import React, { Component } from 'react';
import { Row, Col, Button /* , Icon */ } from 'antd';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { connect } from 'react-redux';
import { authProvider } from '../../service/auth/auth';
import store from '../../redux/store';
import './home-styles.scss';

// icons list
import collaborationIcon from '../../assets/icons/collaboration.svg';
import CustomerIcon from '../../assets/icons/customer.svg';
import FileIcon from '../../assets/icons/file.svg';
import UsersIcon from '../../assets/icons/users.svg';
// import { file } from "@babel/types";

import { GetInfoUser } from '../../redux/actions/user';

class Home extends Component {
  componentDidMount() {
    this.azureLogin();
  }

  azureLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      const newToken = await authProvider.getAccessToken();
      localStorage.setItem('token', newToken.accessToken);
      GetInfoUser(newToken.accessToken);
    }
    GetInfoUser(token);
  };

  render() {
    return (
      <AzureAD provider={authProvider} forceLogin reduxStore={store}>
        {({ login, logout, authenticationState }) => {
          if (authenticationState === AuthenticationState.Authenticated) {
            return (
              <div style={{ textAlign: 'center' }}>
                <Row style={{ paddingTop: 50 }}>
                  <Col xl={6} lg={6} md={6} xs={24} className="grid">
                    <br />
                    <br />
                    <img
                      alt="plannning"
                      src={FileIcon}
                      className="purple"
                      style={{ width: 120, height: 120 }}
                    />
                    <h1>Planning</h1>
                    <p className="qoute-text">Create New KPI or Cascade</p>
                    <Button shape="round" className="homeBtn  purpleBtn">
                      Create KPI
                    </Button>
                  </Col>
                  <Col xl={6} lg={6} md={6} xs={24} className="grid">
                    <br />
                    <br />
                    <img
                      alt="monitoring"
                      src={UsersIcon}
                      className="pink"
                      style={{ width: 120, height: 120 }}
                    />
                    <h1>Monitoring</h1>
                    <p className="qoute-text">Feedbask session with Superior</p>
                    <Button shape="round" className="homeBtn  pinkBtn">
                      View Feedback Session
                    </Button>
                  </Col>
                  <Col xl={6} lg={6} md={6} xs={24} className="grid">
                    <br />
                    <br />
                    <img
                      alt="appraisal"
                      src={CustomerIcon}
                      className="yellow"
                      style={{ width: 120, height: 120 }}
                    />
                    <h1>Appraisal</h1>
                    <p className="qoute-text">
                      View your final performance rating
                    </p>
                    <Button shape="round" className="homeBtn  yellowBtn">
                      View My Final Performance
                    </Button>
                  </Col>
                  <Col xl={6} lg={6} md={6} xs={24} className="grid">
                    <br />
                    <br />
                    <img
                      alt="team"
                      src={collaborationIcon}
                      className="green"
                      style={{ width: 120, height: 120 }}
                    />
                    <h1>My Team</h1>
                    <p className="qoute-text">View your team's performance</p>
                    <Button className="homeBtn  greenBtn" shape="round">
                      View My Team Performance
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          } else if (
            authenticationState === AuthenticationState.Unauthenticated
          ) {
            localStorage.clear();
            return (
              <div />
            );
          }
        }}
      </AzureAD>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
  GetInfoUser: (token) => dispatch(GetInfoUser(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
