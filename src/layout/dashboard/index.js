import React from "react";
import  { connect } from  'react-redux';
import "antd/dist/antd.css";
import { Layout } from "antd";
import  { GetInfoUser } from '../../redux/actions/user';

import { Footer, Header, Sidebar } from "./components";
import { MappedRouter } from '../../routes/RouteGenerator';
import { authProvider } from '../../service/auth/auth';

import Stores from '../../redux/store/index';
const { Content } = Layout;

class Dashboard extends React.Component {
  state = {
    collapsed: true
  };

  async componentDidMount() {
    await this.callToken();
    const myToken = await this.getToken();
    await this.getDetailUser(myToken);

    // listen when browser close
    window.addEventListener('onbeforeunload', ()=>{
      localStorage.clear();
    });
  }
  async callToken() {
   const token = await authProvider.getAccessToken();
   localStorage.setItem('token', token.accessToken);
  }

  async getToken() {
    let token = localStorage.getItem('token');
    if (token === null) {
      if (this.props.auth === null) {
        token = null;
      } else if(this.props.auth.accessToken !== null) {
        token = this.props.auth.accessToken.accessToken;
        localStorage.setItem('token', token);
      }
    }
    return token;
  }

  async getDetailUser(token) {
    await this.props.GetInfoUser(token);
  }
  componentWillMount(){
    // this.props.GetInfoUser(this.props.auth.accessToken);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    const { child } = this.props;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} toggle={this.toggle} />
        <Layout style={{ opacity: !collapsed ? "0.3" : "1" }}>
          <Header collapsed={collapsed} toggle={this.toggle} />
          <Content style={{ margin: "100px 16px 0", overflow: "initial" }}>
            <div
              style={{ padding: 24, background: "#fff", borderRadius: 5 }}
            >
              <MappedRouter routes={child} />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}


const mapDispatchtoProps = dispatch => ({
  GetInfoUser: (token) => dispatch(GetInfoUser(token))
})
const mapStateToProps = state => ({
  auth: state.authReducer,
  user: state.userReducers
});
export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);
