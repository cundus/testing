import React, { Component } from "react";
import  { connect } from  'react-redux';
import { withRouter, Link } from  'react-router-dom'
import { Row, Col, Button/*, Icon */} from 'antd';
import  './home-styles.scss';
import  { GetInfoUser } from '../../redux/actions/user';

// icons list
import collaborationIcon from '../../assets/icons/collaboration.svg';
import CustomerIcon from  '../../assets/icons/customer.svg';
import FileIcon from '../../assets/icons/file.svg';
import UsersIcon from '../../assets/icons/users.svg';

import _ from  'lodash';


class Home extends Component {
  async componentDidMount() {
  }

  render() {
    const isManager = _.get(this, 'props.user.result.user.manager', false);
    let size = 6;
    if (!isManager) {
      size = 8;
    }
    return(
      <div style={{textAlign: "center" }}>
            <Row style={{paddingTop:50}}>
              <Col xl={size} lg={size} md={size} xs={24} className='grid'>
                <br/><br/>
                <img alt={"plannning"} src={FileIcon} className='purple' style={{width:120, height: 120}}/>
                <h1>Planning</h1>
                <p className='qoute-text'>Create New KPI or Cascade</p>
                <Link to={'planning/kpi'}><Button shape='round' className='homeBtn  purpleBtn'>Create KPI</Button></Link>
              </Col>
              <Col xl={size} lg={size} md={size} xs={24} className='grid'>
                <br/><br/>
                <img alt={"monitoring"} src={UsersIcon} className='pink' style={{width:120, height: 120}}/>
                <h1>Monitoring</h1>
                <p className='qoute-text'>Feedbask session with Superior</p>
                <Link to={'/monitoring'}><Button shape='round' className='homeBtn  pinkBtn'>View Feedback Session</Button></Link>
              </Col>
              <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                <br/><br/>
                <img alt={"appraisal"} src={CustomerIcon} className='yellow' style={{width:120, height: 120}}/>
                <h1>Appraisal</h1>
                <p className='qoute-text'>View your final performance rating</p>
                <Link to={'/Appraisal'}><Button  shape='round' className='homeBtn  yellowBtn'>View My Final Performance</Button>
                </Link>
              </Col>
              <Col xl={size} lg={size} md={size} xs={24} className='grid' style={{display: (isManager) ? '': 'none'}}>
                <br/><br/>
                <img alt={"team"} src={collaborationIcon}  className='green' style={{width:120, height: 120}}/>
                <h1>My Team</h1>
                <p className='qoute-text'>View your team's performance</p>
                <Link to={'/my-team/planning'}><Button className='homeBtn  greenBtn' shape='round'>View My Team Performance</Button></Link>
              </Col>
            </Row>
      </div>
    )
  }
}
const mapDispatchtoProps = dispatch => ({
  GetInfoUser: (token) => dispatch(GetInfoUser(token))
})
const mapStateToProps = state => ({
  auth: state.authReducer,
  user: state.userReducers
});
const connectToComponent=  connect(mapStateToProps, mapDispatchtoProps)(Home);

export default withRouter(connectToComponent);
