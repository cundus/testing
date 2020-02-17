import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { doGetAppraisalTeam, doGetAppraisalTeamDetail } from '../../../redux/actions/user';
import TableAppraisal from './table-appraisal';
import globalStyle from '../../../styles/globalStyles';

const { Text } = Typography;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    const {
      userReducers
    } = this.props;
    const { user } = userReducers.result;
    this.fetchAppraisalTeam(user.userId);
  }

  fetchAppraisalTeam = async (id) => {
    const { getAppraisalTeam } = this.props;
    await getAppraisalTeam(id);
    const { appraisal } = this.props;
    const { data, loading } = appraisal;
    if (!loading) {
      let dataTeam = [];
      dataTeam = await data.map((item, index) => {
        return {
          key: item.userId,
          ...item,
          name: `${item.firstName} ${item.lastName}`,
          kpiTitle: item.kpiTitle,
          score: item.kpiScore,
          rating: item.kpiRating,
          status: item.status,
          statusNumber: item.statusNumber
        };
      });
      this.setState({
        dataSource: dataTeam
      });
      // this.fetchAppraisalTeamDetail();
    }
  }

  fetchAppraisalTeamDetail = async () => {
    const { dataSource } = this.state;
    const { getAppraisalTeamDetail } = this.props;
    dataSource.map(async (item, index) => {
      await getAppraisalTeamDetail(item.userId);
      const { appraisal } = this.props;
      const { dataa } = appraisal;
      const newData = [...this.state.dataSource];
      const indexItem = newData.findIndex((itemNew) => itemNew.key === item.key);
      const newItem = newData[index];
      const newItema = {
        ...newItem,
        ...dataa
      };
      newData.splice(indexItem, 1, {
        ...newItema
      });
      this.setState({
        dataSource: newData
      });
    });
  }

  render() {
    const { appraisal } = this.props;
    const { loading } = appraisal;
    const { dataSource } = this.state;
    return (
      <div style={globalStyle.contentContainer}>
        <div>
          <div>
            <Divider />
            <Text strong>Appraisal My Team KPI & Non-KPI Status </Text>
            <Text> Appraisal your team KPI and Non-KPI </Text>
            <Divider />
          </div>
          <TableAppraisal dataSource={dataSource} loading={loading} />
        </div>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  getAppraisalTeam: (idUser) => dispatch(doGetAppraisalTeam(idUser)),
  getAppraisalTeamDetail: (idUser) => dispatch(doGetAppraisalTeamDetail(idUser))
});

const mapStateToProps = (state) => ({
  appraisal: state.AppraisalReducers,
  userReducers: state.userReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Appraisal);

export default withRouter(connectToComponent);
