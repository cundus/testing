import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider
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
      dataSource: []
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
        ...dataMetrics
      };
      newData.push(data);
    });
    this.setState({
      dataSource: newData
    });
  };

  handleSubmit = () => {
    const { history /* , doSavingDraft */ } = this.props;
    // const { dataSource } = this.state;
    confirm({
      title: 'Are u sure?',
      async onOk() {
        // await doSavingDraft(dataSource);
        history.push('/planning/kpi/submit-planning');
      },
      onCancel() {}
    });
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
  };

  handleDelete = (key) => {
    const { dataSource } = this.state;
    const data = [...dataSource];
    this.setState({
      dataSource: data.filter((item) => item.key !== key)
    });
  };

  render() {
    const { dataSource } = this.state;
    const { handleChange, handleDelete, handleSubmit } = this;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>KPI Save Draft </Text>
          <Text>
            This is a draft of your KPI. You can still edit these KPI(s) then
            submit to your superior.
          </Text>
          <Divider />
        </div>
        <TableDrafKPI
          dataSource={dataSource}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        <div style={{ textAlign: 'center' }}>
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
