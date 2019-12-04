import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Modal,
  Typography,
  Divider,
  message,
  Spin,
  Skeleton
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  doSaveKpi, doGetKpiList, doGetLatestGoalKpi, doGetKpiManagerList
} from '../../../redux/actions/kpi';
import CreateOwn from './components/create-own';
import Cascade from './components/cascade';
import { Success } from '../../../redux/status-code-type';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class CreateKPI extends Component {
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
      dataOwnId: 2,
      dataManagerKpi: [],
      dataSelectedCascade: [],
      kpiErr: false,
      kpiErrMessage: '',
      loadingOwn: true,
      loadingManager: true
    };
  }

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = async () => {
    const {
      userReducers, getLatestGoalKpi
    } = this.props;
    const { user } = userReducers.result;
    getLatestGoalKpi();
    this.getOwnKpiList(user.userId);
    this.getManagerKpiList(user.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList } = this.props;
    await getKpiList(id);
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
      dataOwn: newData,
      dataSelectedCascade: newData,
      loadingOwn: false,
      kpiErr: false,
      kpiErrMessage: ''
    });
  }

  getManagerKpiList = async (id) => {
    const { getKpiManagerList } = this.props;
    await getKpiManagerList(id);
    const { kpiReducers } = this.props;
    const {
      dataFirstManagerKpi, dataFirstManager, dataSecondManagerKpi, dataSecondManager
    } = kpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    dataFirstManagerKpi.map((itemKpi) => {
      let dataMetrics = itemKpi.metricLookup.map((metric) => {
        return `{"${metric.label}":"${metric.description}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      const data = {
        key: itemKpi.id,
        id: null,
        typeKpi: `${dataFirstManager.firstName} ${dataFirstManager.lastName}`,
        description: itemKpi.name,
        baseline: itemKpi.metric,
        weight: itemKpi.weight,
        ...dataMetrics
      };
      newData.push(data);
    });
    dataSecondManagerKpi.map((itemKpi) => {
      let dataMetrics = itemKpi.metricLookup.map((metric) => {
        return `{"${metric.label}":"${metric.description}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      const data = {
        key: itemKpi.id,
        id: null,
        typeKpi: `${dataSecondManager.firstName} ${dataSecondManager.lastName}`,
        description: itemKpi.name,
        baseline: itemKpi.metric,
        weight: itemKpi.weight,
        ...dataMetrics
      };
      newData.push(data);
    });
    this.setState({
      dataManagerKpi: newData,
      loadingManager: false
    });
  }

  handleSaveDraft = async () => {
    const { doSavingKpi, userReducers, history } = this.props;
    const { user } = userReducers.result;
    const {
      dataOwn,
      dataSelectedCascade,
      kpiErr,
      kpiErrMessage
    } = this.state;
    const dataSaving = dataOwn.concat(dataSelectedCascade);
    const newData = [];
    // eslint-disable-next-line array-callback-return
    dataSaving.map((itemKpi) => {
      const data = {
        id: itemKpi.id,
        name: itemKpi.description,
        metric: itemKpi.baseline,
        weight: itemKpi.weight,
        metricLookup: [
          {
            label: 'L1',
            description: itemKpi.L1
          },
          {
            label: 'L2',
            description: itemKpi.L2
          },
          {
            label: 'L3',
            description: itemKpi.L3
          }
        ]
      };
      newData.push(data);
    });
    if (kpiErr) {
      message.warning(kpiErrMessage);
    } else {
      confirm({
        title: 'Are you sure?',
        onOk: async () => {
          await doSavingKpi(newData, user.userId);
          const { kpiReducers } = this.props;
          if (kpiReducers.statusSaveKPI === Success) {
            message.success('Your KPI has been saved');
            history.push('/planning/kpi/draft-planning');
          } else {
            message.warning(`Sorry, ${kpiReducers.messageSaveKPI}`);
          }
        },
        onCancel() {}
      });
    }
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
      id: null,
      description: '',
      baseline: '',
      weight: '',
      L1: '',
      L2: '',
      L3: ''
    };
    this.setState({
      dataOwn: [...dataOwn, newData],
      dataOwnId: dataOwnId + 1
    });
  };

  handleError = (statusErr) => {
    if (statusErr) {
      this.setState({
        kpiErr: true,
        kpiErrMessage: 'Please fill the form'
      });
    } else {
      this.setState({
        kpiErr: false,
        kpiErrMessage: ''
      });
    }
  }

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
      dataOwn,
      dataSelectedCascade,
      dataManagerKpi,
      loadingOwn,
      loadingManager
    } = this.state;
    const {
      handleAddRow,
      handleChangeField,
      handleDeleteRow,
      handleSaveDraft,
      handleSelectData,
      handleError
    } = this;
    const { kpiReducers } = this.props;
    const {
      dataGoal, loadingGoal
    } = kpiReducers;
    const { name } = dataGoal;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Create New KPI </Text>
          <Text>
            {`Please complete the following form. You can create your own KPI or
            cascade from your Superior's KPI.`}
          </Text>
          <Divider />
        </div>
        <div>
          <center>
            <Skeleton active loading={loadingGoal} paragraph={false} title={{width: 500}}>
              <Title level={4}>{`Performance Management - ${name}`}</Title>
            </Skeleton>
          </center>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Create Own KPI" key="1">
              <CreateOwn
                loading={loadingOwn}
                dataSource={dataOwn}
                handleSaveDraft={handleSaveDraft}
                handleAddRow={handleAddRow}
                handleError={handleError}
                handleChangeField={handleChangeField}
                handleDeleteRow={handleDeleteRow}
              />
            </TabPane>
            <TabPane
              tab="Cascade From Supervisor"
              key="2"
            >
              <Cascade
                loading={loadingManager}
                dataSource={dataManagerKpi}
                dataSelectedCascade={dataSelectedCascade}
                handleError={handleError}
                handleSaveDraft={handleSaveDraft}
                handleSelectData={handleSelectData}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
  doSavingKpi: (data, id) => dispatch(doSaveKpi(data, id)),
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  getKpiManagerList: (id) => dispatch(doGetKpiManagerList(id)),
  getLatestGoalKpi: (id) => dispatch(doGetLatestGoalKpi())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKPI);

export default withRouter(connectToComponent);

CreateKPI.propTypes = {
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  getLatestGoalKpi: PropTypes.func,
  getKpiManagerList: PropTypes.func,
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  userReducers: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};
