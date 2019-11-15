import React, { Component } from "react";
import  Layout from '../../layout/dashboard/index';
import { Row, Col, Button/*, Icon */} from 'antd';
import  './home-styles.scss';

// icons list
import collaborationIcon from '../../assets/icons/collaboration.svg'; 
import CustomerIcon from  '../../assets/icons/customer.svg';
import FileIcon from  '../../assets/icons/file.svg';
import UsersIcon from '../../assets/icons/users.svg';
// import { file } from "@babel/types";

class Home extends Component {
  componentDidMount(){
    console.log(this.props.auth.getAccessToken())
  }
  render(){
      return(
        <div>
            <Layout>
              <Row style={{paddingTop:50}}>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                  <br/><br/>
                  <img alt={"plannning"} src={FileIcon} className='purple' style={{width:120, height: 120}}/>
                  <h1>Planning</h1>
                  <p className='qoute-text'>Create New KPI or Cascade</p>
                  <Button shape='round' className='homeBtn  purpleBtn'>Create KPI</Button>
                </Col>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                  <br/><br/>
                  <img alt={"monitoring"} src={UsersIcon} className='pink' style={{width:120, height: 120}}/>
                  <h1>Monitoring</h1>
                  <p className='qoute-text'>Feedbask session with Superior</p>
                  <Button shape='round' className='homeBtn  pinkBtn'>View Feedback Session</Button>
                </Col>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                  <br/><br/>
                  <img alt={"appraisal"} src={CustomerIcon} className='yellow' style={{width:120, height: 120}}/>
                  <h1>Appraisal</h1>
                  <p className='qoute-text'>View your final performance rating</p>
                  <Button  shape='round' className='homeBtn  yellowBtn'>View My Final Performance</Button>
                </Col>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                  <br/><br/>
                  <img alt={"team"} src={collaborationIcon}  className='green' style={{width:120, height: 120}}/>
                  <h1>My Team</h1>
                  <p className='qoute-text'>View your team's performance</p>
                  <Button className='homeBtn  greenBtn' shape='round'>View My Team Performance</Button>
                </Col>
              </Row>
            </Layout>
        </div>
      )
  }
}
export default Home;