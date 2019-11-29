import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider,
  message
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableDrafKPI from './table-draf-kpi';

const { confirm } = Modal;
const { Text } = Typography;

class DraftKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: null,
      weightTotalErr: false,
      kpiErr: false
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
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
    this.liveCount(newData);
  };

  liveCount = (data) => {
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

  handleSubmit = () => {
    const { history /* , doSavingDraft */ } = this.props;
    const { /* dataSource */ kpiErr, kpiErrMessage } = this.state;
    if (kpiErr) {
      message.warning(kpiErrMessage);
    } else {
      confirm({
        title: 'Are you sure?',
        async onOk() {
          // await doSavingDraft(dataSource);
          // history.push('/planning/kpi/submit-planning');
        },
        onCancel() {}
      });
    }
  };

  handleChange = (row) => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
    this.liveCount(newData);
  };

  handleError = (statusErr) => {
    const { totalWeight } = this.state;
    if (statusErr) {
      this.setState({
        kpiErr: true,
        kpiErrMessage: 'Please fill the form'
      });
    } else if (totalWeight !== 100) {
      this.setState({
        kpiErr: true,
        kpiErrMessage: 'Sorry, Total KPI Weight must be 100%'
      });
    } else {
      this.setState({
        kpiErr: false,
        kpiErrMessage: ''
      });
    }
  }

  handleDelete = (key) => {
    const { dataSource } = this.state;
    const data = [...dataSource];
    this.setState({
      dataSource: data.filter((item) => item.key !== key)
    });
  };

  handleSaveDraft = () => {
    const { history /* , doSavingDraft */ } = this.props;
    // const { dataOwn, dataSelectedCascade } = this.state;
    // const dataSaving = dataOwn.concat(dataSelectedCascade);
    confirm({
      title: 'Are u sure?',
      async onOk() {
        // await doSavingDraft(dataSaving);
        history.push('/planning/kpi/draft-planning');
      },
      onCancel() {}
    });
  };

  render() {
    const { dataSource, weightTotal, weightTotalErr } = this.state;
    const {
      handleChange,
      handleDelete,
      handleSubmit,
      handleSaveDraft,
      handleError
    } = this;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>KPI Save Draft </Text>
          <Text>
            This is a draft of your KPI. You can still edit these KPI(s) then
            submit to your superior.
          </Text>
          <br />
          <Text type={weightTotalErr ? 'danger' : ''}>
            Total KPI Weight :
            {` ${weightTotal}%`}
          </Text>
          <Divider />
        </div>
        <TableDrafKPI
          dataSource={dataSource}
          handleError={handleError}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleSaveDraft} style={{ margin: 10 }}>
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} type="primary" style={{ margin: 10 }}>
            Submit To Superior
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers
});

const mapDispatchToProps = (dispatch) => ({
  // doSavingDraft: (data) => dispatch(doSaveDraft(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftKPI);

export default withRouter(connectToComponent);

DraftKPI.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};
