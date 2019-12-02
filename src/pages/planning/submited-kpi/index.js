import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Spin
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableSubmitedKPI from './table-submited-kpi';
import { doGetKpiList } from '../../../redux/actions/kpi';

const { Text } = Typography;

class SubmitedKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0
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
    const { dataKpi } = kpiReducers;
    const newData = [];

    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    dataKpi.map((itemKpi) => {
      let dataMetrics = itemKpi.metricLookup.map((metric) => {
        return `{"${metric.label}":"${metric.description}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      const data = {
        key: itemKpi.id,
        id: itemKpi.id,
        typeKpi: 'Self KPI',
        description: itemKpi.name,
        baseline: itemKpi.metric,
        weight: itemKpi.weight,
        ...dataMetrics
      };
      newData.push(data);
    });
    this.setState({
      dataSource: newData
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
    const { dataSource, weightTotal, weightTotalErr } = this.state;
    const { kpiReducers } = this.props;
    const { loading } = kpiReducers;
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
        {loading ?
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div> :
          <TableSubmitedKPI dataSource={dataSource} />}
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
