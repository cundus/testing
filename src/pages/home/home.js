import React, { Component } from "react";
import  Layout from '../../layout/dashboard/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Button } from 'antd';
import  './home-styles.scss';



class Home extends Component {
  render(){
      return(
        <div>
            <Layout>
              <Row style={{paddingTop:50}}>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                <FontAwesomeIcon icon={faUserFriends} className='purple' style={{height:120, width:120}}/>
                  <h1>Planning</h1>
                  <p className='qoute-text'>Create New KPI or Cascade</p>
                  <Button shape='round' className='homeBtn  purpleBtn'>Create KPI</Button>
                </Col>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                  <FontAwesomeIcon icon={faUserFriends} className='pink' style={{ height:120, width:120}}/>
                  <h1>Monitoring</h1>
                  <p className='qoute-text'>Feedbask session with Superior</p>
                  <Button shape='round' className='homeBtn  pinkBtn'>View Feedback Session</Button>
                </Col>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                 <FontAwesomeIcon icon={faUserFriends} className='yellow' style={{ height:120, width:120}}/>
                  <h1>Appraisal</h1>
                  <p className='qoute-text'>View your final performance rating</p>
                  <Button  shape='round' className='homeBtn  yellowBtn'>View My Final Performance</Button>
                </Col>
                <Col xl={6} lg={6} md={6} xs={24} className='grid'>
                <FontAwesomeIcon icon={faUserFriends} className='green' style={{ height:120, width:120}}/>
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