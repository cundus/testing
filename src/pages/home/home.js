import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Button, Modal, List, Icon } from 'antd';
import PropTypes from 'prop-types';
import './home-styles.scss';

// icons list
import collaborationIcon from '../../assets/icons/collaboration.svg';
import CustomerIcon from '../../assets/icons/customer.svg';
import FileIcon from '../../assets/icons/file.svg';
import UsersIcon from '../../assets/icons/users.svg';
import globalStyle from '../../styles/globalStyles';
import { menuAppraisalAllow, menuMonitoringAllow } from '../../utils/stepKpi';

const myTeamMenus = [
  {
    id: 9,
    path: '/my-team/planning/',
    menuLevel: 2,
    title: 'Planning',
    parent: 'My Team',
    icon: 'calendar',
    theme: 'outlined',
    description: "View My Team KPI Planning status",
    manager: true
  },
  {
    id: 10,
    path: '/my-team/monitoring/',
    menuLevel: 2,
    title: 'Monitoring',
    parent: 'My Team',
    icon: 'stock',
    theme: 'outlined',
    description: "Monitoring My Team KPI",
    manager: true
  },
  {
    id: 11,
    path: '/my-team/appraisal/',
    menuLevel: 2,
    title: 'Appraisal',
    parent: 'My Team',
    icon: 'check-square',
    theme: 'outlined',
    description: "Appraisal My Team KPI & Non-KPI",
    manager: true
  },
  {
    id: 12,
    path: '/my-team/performance-review-alignment/',
    menuLevel: 2,
    title: 'Performance Review Alignment',
    parent: 'My Team',
    icon: 'pie-chart',
    theme: 'outlined',
    disabled: true,
    description: "View My Team Performance Review Alignment",
    employee: true
  },
  {
    id: 13,
    path: '/my-team/previous-kpi/',
    menuLevel: 2,
    title: 'Previous KPI',
    parent: 'My Team',
    icon: 'bar-chart',
    theme: 'outlined',
    description: "View My Team Previous KPI",
    manager: true
  },]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
    };
  }

  render() {
    const { authReducer } = this.props;
    const isMonitoring = menuMonitoringAllow.includes(authReducer?.currentStep);
    const isAppraisal = menuAppraisalAllow.includes(authReducer?.currentStep);
    const isManager = authReducer?.manager;
    let size = 6;
    if (!isManager) {
      size = 8;
    }
    return (
      <div style={{ ...globalStyle.contentContainer, textAlign: 'center', minHeight: '80vh' }}>
        <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Col xl={size} lg={size} md={size} xs={24} className="grid">
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
            <Link to="planning">
              <Button
                shape="round"
                className="homeBtn  purpleBtn"
                style={{ fontWeight: 'bold' }}
              >
                Create KPI
              </Button>
            </Link>
          </Col>
          <Col xl={size} lg={size} md={size} xs={24} className="grid">
            <br />
            <br />
            <img
              alt="monitoring"
              src={UsersIcon}
              className="pink"
              style={{ width: 120, height: 120 }}
            />
            <h1>Monitoring</h1>
            <p className="qoute-text">Feedback session with Superior</p>
            <Link to="/monitoring">
              <Button
                shape="round"
                className="homeBtn  pinkBtn"
                disabled={!isMonitoring}
                style={{ fontWeight: 'bold' }}
              >
                View Feedback Session
              </Button>
            </Link>
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
            <p className="qoute-text">View your final performance rating</p>
            <Link to="/appraisal">
              <Button
                shape="round"
                className="homeBtn  yellowBtn"
                disabled={!isAppraisal}
                style={{ fontWeight: 'bold' }}
              >
                View My Final Performance
              </Button>
            </Link>
          </Col>
          <Col
            xl={size}
            lg={size}
            md={size}
            xs={24}
            className="grid"
            style={{ display: isManager ? '' : 'none' }}
          >
            <br />
            <br />
            <img
              alt="team"
              src={collaborationIcon}
              className="green"
              style={{ width: 120, height: 120 }}
            />
            <h1>My Team</h1>
            <p className="qoute-text">View your team&apos;s performance</p>
              <Button
                className="homeBtn  greenBtn"
                shape="round"
                onClick={()=>this.setState({isModalShow: true})}
                style={{ fontWeight: 'bold' }}
              >
                View My Team Performance
              </Button>
          </Col>
        </Row>
      <Modal
        title="My Team Performance"
        visible={this.state.isModalShow}
        afterClose={()=>this.setState({isModalShow: false})}
        onCancel={()=>this.setState({isModalShow: false})}
        footer={null}
      >
        <List
          dataSource={myTeamMenus}
          renderItem={item =>
          <List.Item
            onClick={()=>this.props.history.push(item.path)}
            style={{cursor: 'pointer', borderBottom: '0px solid #e8e8e8', padding: 10, marginLeft: -10,marginRight:-10}}
          >
            <List.Item.Meta
              // style={{color: '#1890ff'}}
              avatar={
                <Icon
                  style={{color: 'inherit', marginTop: 5}}
                  type={`${item.icon}`}
                  theme={`${item.theme}`}
                  className="dropdownItem"
                />}
              title={item.title}
              description={item.description}
            />
          </List.Item>}
        />
      </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  user: state.userReducer,
  step: state.userKpiStateReducer
});
const connectToComponent = connect(mapStateToProps, null)(Home);

export default withRouter(connectToComponent);

Home.propTypes = {
  authReducer: PropTypes.instanceOf(Object)
};
