import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
 Spin, Input, Button, Divider, Typography, Modal, message, Form
} from 'antd';
import {
  GetMyTeamKPIDetail, GetUserDetail, GiveFeedbackKpi, ApproveKPI
} from '../../../redux/actions/user';
import { doGetLatestGoalKpi } from '../../../redux/actions/kpi';
import TablePlanningDetails from './table-detail-plan-kpi';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { confirm } = Modal;

class PlanningDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      globalfeedback: '',
      labelList: []
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
    const mydata = this.props.myteamdetail.kpiList;
    const globalFeedback = this.props.myteamdetail.challengeOthersRatingComments;
    if (mydata[0].error !== true) {
      // eslint-disable-next-line array-callback-return
      mydata.map((itemKpi) => {
        let dataMetrics;
        if (itemKpi.metricLookup !== null) {
          dataMetrics = itemKpi.metricLookup.map((metric) => {
            return `{"${metric.label}":"${itemKpi.achievementType === 0 ?
              metric.achievementText : metric.achievementNumeric}"}`;
          });
          dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
          dataMetrics = dataMetrics.reduce((result, current) => {
            return Object.assign(result, current);
          }, {});
        }
        const data = {
          key: itemKpi.id,
          kpi: itemKpi.name,
          baseline: itemKpi.baseline,
          weight: itemKpi.weight,
          achievementType: itemKpi.achievementType,
          metrics: this.props.myteamdetail.labelList,
          ...dataMetrics,
          feedback: itemKpi.othersRatingComments.comment
        };
        newData.push(data);
      });
      this.setState({
        dataSource: newData,
        globalfeedback: globalFeedback.comment,
        labelList: this.props.myteamdetail.labelList
      });
    } else {
      this.setState({
        dataSource: [],
        globalfeedback: '',
        labelList: this.props.myteamdetail.labelList
      });
    }
  }


  handleChange = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  handleFeedback = () => {
    const { giveFeedbackKpi, match, myteamdetail, form } = this.props;
    const userId = match.params.id;
    const { kpiList } = myteamdetail;
    this.state.dataSource.map((item) => {
      kpiList.find((d) => d.id === item.key).othersRatingComments.comment = item.feedback;
    });
    myteamdetail.challengeOthersRatingComments.comment = this.state.globalfeedback;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure to send Feedbacks ?',
          onOk: async () => {
            await giveFeedbackKpi(userId, myteamdetail);
            if (this.props.feedback.error === true) {
              message.error(this.props.feedback.message);
            }
            if (this.props.feedback.success === true) {
              message.success('Feedback  Send');
              this.props.history.push('/my-team/planning');
            }

          },
          onCancel() {}
        });
      }
    });
  }

  handleApprove = () => {
    const { approveKpi, match, myteamdetail } = this.props;
    const userId = match.params.id;
    const { kpiList } = myteamdetail;
    this.state.dataSource.map((item)=>{
      kpiList.find(d => d.id === item.key).othersRatingComments.comment = item.feedback;
    });
    myteamdetail.challengeOthersRatingComments.comment = this.state.globalfeedback;
    confirm({
      title: 'Are you sure to Approve ?',
      onOk: async () => {
        await approveKpi(userId, myteamdetail);
        if (this.props.feedback.error === true) {
          message.error(this.props.feedback.message);
        }
        if (this.props.feedback.success === true) {
          message.success('Approved Kpi');
          this.props.history.push('/my-team/planning');
        }

      },
      onCancel() {}
    });
  }

  changeGlobalfeedback = ({ target: { value } }) => {
    this.setState({ globalfeedback: value });
  };

  render() {
    return (
      <div>
        {
         (this.state.dataSource.length > 0 ) ?
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
                </div> :
                <div />
             }
             {
              (Object.keys(this.props.userDetail).length > 0 && !this.props.userDetail.error) ?
                <div style={{ textAlign: 'center' }}>
                  <Title level={4}>{`Performance Management - ${this.props.kpi.dataGoal.name} for ${this.props.userDetail.firstName} ${this.props.userDetail.lastName} `}</Title>
                </div> :
                <div />
            }
             <TablePlanningDetails
               dataSource={this.state.dataSource}
               form={this.props.form}
               handleChange={this.handleChange}
               dataMetrics={this.state.labelList}
             />
             <Text strong>Challenge yourself :</Text>
             <TextArea
               value={this.props.myteamdetail.challangeYourSelf}
               disabled
             />
             <br />
             <br />
             <Text strong>General Feedbacks :</Text>
             <TextArea
               value={this.state.globalfeedback}
               onChange={this.changeGlobalfeedback}
               placeholder="Please make necessary changes on KPI items, please refer to my KPI or just cascading it."
             />
             <br />
             <br />
             <center>
               <Button
                 style={{ 'background-color': 'orange', color: 'white' }}
                 onClick={this.handleFeedback}
               >
                Send Feedbacks
               </Button>
               &nbsp;&nbsp;
               <Button onClick={this.handleApprove} type="primary">Approve</Button>
             </center>
           </div> :
           <center>
             <Spin />
           </center>
        }
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  getTeamDetailKPI: (idUser) => dispatch(GetMyTeamKPIDetail(idUser)),
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi()),
  getUserDetail: (idUser) => dispatch(GetUserDetail(idUser)),
  giveFeedbackKpi: (idUser, data) => dispatch(GiveFeedbackKpi(idUser, data)),
  approveKpi: (idUser, data) => dispatch(ApproveKPI(idUser, data))
});

const mapStateToProps = (state) => ({
  myteamdetail: state.myTeamDetailReducers,
  kpi: state.kpiReducers,
  userDetail: state.userDetailReducers,
  feedback: state.feedbackReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(PlanningDetail);

export default Form.create({})(withRouter(connectToComponent));
