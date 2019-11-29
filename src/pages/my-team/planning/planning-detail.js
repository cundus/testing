import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin, Input, Button, Divider, Typography, Modal } from 'antd';
import  { GetMyTeamKPIDetail, GetUserDetail } from '../../../redux/actions/user';
import { doGetLatestGoalKpi } from '../../../redux/actions/kpi';
import TablePlanningDetails from './table-detail-plan-kpi';
const { TextArea } = Input;
const { Title, Text } = Typography;
const {confirm } = Modal;

class PlanningDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  async componentDidMount() {
    await this.getAllData();
  }

  async getAllData() {
    const newData = [];
    await this.props.getLatestGoalKpi();
    await this.props.getTeamDetailKPI(this.props.match.params.id);
    await this.props.getUserDetail(this.props.match.params.id);
    const mydata = this.props.myteamdetail;
    if (mydata[0].error !== true) {
      mydata.map((itemKpi) => {
        let dataMetrics = itemKpi.metrics.map((metric) => {
          return `{"${metric.label}":"${metric.description}"}`;
        });
        dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
        dataMetrics = dataMetrics.reduce((result, current) => {
          return Object.assign(result, current);
        }, {});
        const data = {
          key: itemKpi.id,
          description: itemKpi.description,
          baseline: itemKpi.baseline,
          weight: itemKpi.weight,
          ...dataMetrics,
          feedback: ''
        };
        newData.push(data);
      });
      this.setState({
        dataSource: newData,
      });
    } else {
      this.setState({
        dataSource: [],
      });
    }
  }


  handleChange = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  handleFeedback = () => {
    confirm({
      title: 'Are you sure to send Feedbacks ?',
      async onOk() {
        // await doSavingDraft(dataSaving);
        // history.push('/planning/kpi/draft-planning');
      },
      onCancel() {}
    });
  }

  handleApprove = () => {
    confirm({
      title: 'Are you sure to Approve ?',
      async onOk() {
        // await doSavingDraft(dataSaving);
        // history.push('/planning/kpi/draft-planning');
      },
      onCancel() {}
    });
  }


  render() {
    return(
      <div>
        {
         (this.props.myteamdetail.length > 0 ) ?
           <div>
             {
              (Object.keys(this.props.userDetail).length > 0 && !this.props.userDetail.error) ?
                <div>
                  <Divider />
                  <Text strong>View KPI </Text>
                  <Text>
                    {`View KPI of ${this.props.userDetail.firstName} ${this.props.userDetail.lastName} `}
                  </Text>
                  <Divider />
                </div>
                : <div></div>
             }
             {
              (Object.keys(this.props.userDetail).length > 0 && !this.props.userDetail.error) ?
                <div style={{ textAlign: 'center' }}>
                  <Title level={4}>{`Performance Management - ${this.props.kpi.dataGoal.name} for ${this.props.userDetail.firstName} ${this.props.userDetail.lastName} `}</Title>
                </div>
                : <div></div>
            }
             <TablePlanningDetails
               dataSource={this.state.dataSource}
               handleChange={this.handleChange}
             />
             <h3><b>General feedbacks:</b></h3>
             <TextArea
               placeholder={'Please make necessary changes on KPI items, please refer to my KPI or just cascading it.'}
             />
             <br/>
             <br/>
             <center>
               <Button
                style={{ 'background-color': 'orange', color: 'white'}}
                onClick={this.handleFeedback}
               >
                Send Feedbacks
               </Button>
               &nbsp;&nbsp;
               <Button onClick={this.handleApprove} type="primary">Approve</Button>
             </center>
            </div>:
           <center>
              <Spin/>
           </center>
        }
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  getTeamDetailKPI: (idUser) => dispatch(GetMyTeamKPIDetail(idUser)),
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi()),
  getUserDetail: (idUser) => dispatch(GetUserDetail(idUser))
});

const mapStateToProps = (state) => ({
  myteamdetail: state.myTeamDetailReducers,
  kpi: state.kpiReducers,
  userDetail: state.userDetailReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(PlanningDetail);

export default withRouter(connectToComponent);
