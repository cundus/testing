import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Input,
  Spin,
  Button,
  Icon
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableSubmitedKPI from './table-submited-kpi';
import { doGetKpiList } from '../../../../redux/actions/kpi';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

class SubmitedKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0,
      challengeYour: '',
      isFeedback: false
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const { userReducers, getKpiList } = this.props;
    const { user } = userReducers.result;
    await getKpiList(user.userId);
    const { kpiReducers } = this.props;
    const { dataKpi, challenge, dataKpiMetrics } = kpiReducers;
    const newData = [];

    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    dataKpi.map((itemKpi) => {
      if (itemKpi.othersRatingComments.id) {
        this.setState({ isFeedback: true });
      }
      let dataMetrics = itemKpi.metricLookup.map((metric) => {
        return `{"${metric.label}":"${itemKpi.achievementType === 0 ?
          metric.achievementText : metric.achievementNumeric}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      const data = {
        key: itemKpi.id,
        id: itemKpi.id,
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        // typeKpi: itemKpi.cascadeType === 0 ? 'Self KPI' : `Cascade From ${itemKpi.cascadeName}`,
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metrics: dataKpiMetrics,
        ...dataMetrics,
        feedback: itemKpi.othersRatingComments.comment
      };
      newData.push(data);
    });
    this.setState({
      dataSource: newData,
      challengeYour: challenge
    });
    this.weightCount(newData);
  };

  weightCount = (data) => {
    let totalWeight = 0;
    // eslint-disable-next-line array-callback-return
    data.map((itemKpi) => {
      if (itemKpi.weight) {
        totalWeight += itemKpi.weight;
      } else {
        totalWeight += 0;
      }
    });
    if (typeof totalWeight === 'number') {
      if (totalWeight === 100) {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: false
        });
      } else {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: true
        });
      }
    }
  }

  render() {
    const {
      dataSource, weightTotal, weightTotalErr, challengeYour, isFeedback
    } = this.state;
    const { kpiReducers } = this.props;
    const {
      loadingKpi, dataKpiMetrics, generalFeedback, currentStep
    } = kpiReducers;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Submit KPI </Text>
          <Text>Submit KPI to your Superior</Text>
          <br />
          <Text type={weightTotalErr ? 'danger' : ''}>
            Total KPI Weight :
            {` ${weightTotal}%`}
          </Text>
          <Divider />
        </div>
        {!loadingKpi ?
          <div>
            <TableSubmitedKPI
              dataMetrics={dataKpiMetrics}
              dataSource={dataSource}
              loading={loadingKpi}
              isFeedback={isFeedback}
            />
            <div>
              <Text strong>Challenge yourself :</Text>
              <TextArea
                id="challenge-input"
                placeholder="Challenge yourself"
                label="Challenge yourself"
                value={challengeYour}
                disabled
              />
            </div>
            {generalFeedback.comment &&
              <div style={{
                marginTop: 20,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'rgb(250, 247, 187)',
                overflow: 'hidden'
              }}
              >
                <Text strong>General Feedback :</Text>
                <Paragraph>{generalFeedback.comment}</Paragraph>
              </div>}
            <center>
              {currentStep !== 'Emp Goal Setting' && currentStep !== 'Manager Goal Review' &&
              <Button
                style={{ margin: 10, borderColor: '#52c41a' }}
              >
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                <Text strong>Your KPI Approved</Text>
              </Button>}
            </center>
          </div> : <center><Spin /></center>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(doGetKpiList(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitedKPI);

export default withRouter(connectToComponent);

SubmitedKPI.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  getKpiList: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object)
  // history: PropTypes.instanceOf(Object).isRequired
};