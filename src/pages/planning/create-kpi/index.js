import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Modal,
  Typography,
  Divider,
  message,
  Spin
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  doSaveKpi, doGetKpiList, doGetLatestGoalKpi, doGetKpiManagerList
} from '../../../redux/actions/kpi';
import CreateOwn from './components/create-own';
import CascadePartner from './components/cascade-partner';
import CascadePrevious from './components/cascade-previous';
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
      cascadePrevious: false,
      dataCascadeFirstManager: [],
      dataCascadeSecondManager: [],
      dataCascadePrevious: [],
      dataSelectedCascade: [],
      kpiErr: false,
      kpiErrMessage: ''
    };
  }

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = async () => {
    const {
      userReducers, getKpiList, getLatestGoalKpi, getKpiManagerList
    } = this.props;
    const { user } = userReducers.result;
    getLatestGoalKpi();
    await getKpiList(user.userId);
    await getKpiManagerList(user.userId);
    this.getOwnKpiList();
    this.getFirstManagerKpiList();
    this.getSecondManagerKpiList();
  };

  getOwnKpiList = () => {
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
      kpiErr: false,
      kpiErrMessage: ''
    });
  }

  getFirstManagerKpiList = () => {
    const { kpiReducers } = this.props;
    const { dataFirstManagerKpi } = kpiReducers;
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
        typeKpi: 'Casacade from Supervisor',
        description: itemKpi.name,
        baseline: itemKpi.metric,
        weight: itemKpi.weight,
        ...dataMetrics
      };
      newData.push(data);
    });
    this.setState({
      dataCascadeFirstManager: newData
    });
  }

  getSecondManagerKpiList = () => {
    const { kpiReducers } = this.props;
    const { dataSecondManagerKpi } = kpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
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
        id: itemKpi.id,
        typeKpi: 'Casacade from Supervisor',
        description: itemKpi.name,
        baseline: itemKpi.metric,
        weight: itemKpi.weight,
        ...dataMetrics
      };
      newData.push(data);
    });
    this.setState({
      dataCascadeSecondManager: newData
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
    console.log(newData);
    
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
      cascadePrevious,
      dataOwn,
      dataCascadePrevious,
      dataSelectedCascade,
      dataCascadeFirstManager,
      dataCascadeSecondManager
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
      dataGoal, loading, dataFirstManager, dataSecondManager
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
        {loading ?
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div> :
          <div>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>{`Performance Management - ${name}`}</Title>
            </div>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Create Own KPI" key="1">
                <CreateOwn
                  dataOwn={dataOwn}
                  handleSaveDraft={handleSaveDraft}
                  handleAddRow={handleAddRow}
                  handleError={handleError}
                  handleChangeField={handleChangeField}
                  handleDeleteRow={handleDeleteRow}
                />
              </TabPane>
              {dataFirstManager.userId &&
              <TabPane
                tab={`Cascade From ${dataFirstManager.firstName} ${dataFirstManager.lastName}`}
                key="2"
              >
                <CascadePartner
                  dataCascadePartner={dataCascadeFirstManager}
                  dataSelectedCascade={dataSelectedCascade}
                  handleError={handleError}
                  handleSaveDraft={handleSaveDraft}
                  handleSelectData={handleSelectData}
                />
              </TabPane>}
              {dataSecondManager.userId &&
              <TabPane
                tab={`Cascade From ${dataSecondManager.firstName} ${dataSecondManager.lastName}`}
                key="3"
              >
                <CascadePartner
                  dataCascadePartner={dataCascadeSecondManager}
                  dataSelectedCascade={dataSelectedCascade}
                  handleError={handleError}
                  handleSaveDraft={handleSaveDraft}
                  handleSelectData={handleSelectData}
                />
              </TabPane>}
              {cascadePrevious && (
                <TabPane tab="Cascade From Previous Year" key="4">
                  <CascadePrevious
                    dataCascadePrevious={dataCascadePrevious}
                    dataSelectedCascade={dataSelectedCascade}
                    handleError={handleError}
                    handleSaveDraft={handleSaveDraft}
                    handleSelectData={handleSelectData}
                  />
                </TabPane>
              )}
            </Tabs>
          </div>}
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
