import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Modal,
  Typography,
  Divider
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { doGetLatestGoalKpi } from '../../redux/actions/kpi';
import TableKPI from './kpi';
import TableValue from './value';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { TabPane } = Tabs;

class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOwn: [
        {
          key: 1,
          typeKpi: 'Self KPI',
          kpi: '',
          baseline: '',
          weight: '',
          l1: '',
          l2: '',
          l3: ''
        }
      ],
      dataOwnId: 2
    };
  }

  componentDidMount() {
    this.getKPIData();
  }

  getKPIData = async (e) => {
    const {
      getLatestGoalKpi
      // history
    } = this.props;
    await getLatestGoalKpi();
    // const { kpiReducers } = this.props;
    // const { page } = kpiReducers;
    // if (page === 'create-kpi') {
    //   history.push('/planning/kpi/draft-planning');
    // }
  }

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

  handleSelectData = (record) => {
    const { dataSelectedCascade } = this.state;
    const dataChecking = dataSelectedCascade.filter(
      (item) => item.key === record.key
    );
    if (dataChecking.length !== 0) {
      this.setState({
        dataSelectedCascade: dataSelectedCascade.filter(
          (item) => item.key !== record.key
        )
      });
    } else {
      this.setState({
        dataSelectedCascade: [...dataSelectedCascade, record]
      });
    }
  };

  handleAddRow = () => {
    const { dataOwnId, dataOwn } = this.state;
    const newData = {
      key: dataOwnId,
      kpi: '',
      baseline: '',
      weight: '',
      l1: '',
      l2: '',
      l3: ''
    };
    this.setState({
      dataOwn: [...dataOwn, newData],
      dataOwnId: dataOwnId + 1
    });
  };

  handleDeleteRow = (key) => {
    const { dataOwn } = this.state;
    const data = [...dataOwn];
    this.setState({ dataOwn: data.filter((item) => item.key !== key) });
  };

  handleChangeField = (row) => {
    const { dataOwn } = this.state;
    const newData = [...dataOwn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataOwn: newData });
  };

  render() {
    const {
      handleChangeField,
    } = this;
    const { kpiReducers } = this.props;
    const { dataGoal } = kpiReducers;
    const { name } = dataGoal;
    return (
      <div>
        <div>
          <Divider />
          <Text strong> Monitoring KPI</Text>
          <Text>
            {` Monitoring your KPI and Values.`}
          </Text>
          <Divider />
          <div style={{ textAlign: 'center' }}>
          <Title level={4}>{`Performance Management - ${name}`}</Title>
        </div>
        <div>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="KPI" key="1">
              <TableKPI
                dataOwn={[]}
                handleChangeField={handleChangeField}
              />
            </TabPane>
            <TabPane tab="VALUE" key="2">
              <TableValue
                dataOwn={[]}
                handleChangeField={handleChangeField}
              />
            </TabPane>
          </Tabs>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers
});

const mapDispatchToProps = (dispatch) => ({
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi()),
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitoring);

export default withRouter(connectToComponent);

Monitoring.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};
