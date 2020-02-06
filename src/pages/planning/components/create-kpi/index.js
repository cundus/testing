import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Modal,
  Typography,
  Divider,
  message,
  Skeleton,
  Spin,
  Form
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  actionGetKPI, actionGetLatestGoalKPI, actionGetManagerKPI, actionSaveKpi
} from '../../../../redux/actions';
import CreateOwn from './components/create-own';
import Cascade from './components/cascade';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../../../redux/status-code-type';
import globalStyle from '../../../../styles/globalStyles';

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
          id: null,
          achievementType: 0,
          name: '',
          baseline: '',
          weight: '',
          Below: '',
          Meet: '',
          Exceed: ''
        }
      ],
      tab: '1',
      dataOwnId: 2,
      dataManagerKpi: [],
      dataSelectedCascade: [],
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
    // this.getManagerKpiList(user.userId);
  };

  getOwnKpiList = async (id) => {
    const {
      getKpiList, form, access, setAccess
    } = this.props;
    if (access) {
      await getKpiList(id);
    }
    setAccess(true);
    const { kpiReducers } = this.props;
    const { dataKpi, dataKpiMetrics } = kpiReducers;
    const newData = [];
    const newSelectedData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    dataKpi.map((itemKpi) => {
      let dataMetrics = itemKpi.metricLookup.map((metric) => {
        return `{"${metric.label}":"${itemKpi.achievementType === 0 ?
          metric.achievementText : metric.achievementNumeric}"}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      if (itemKpi.cascadeType === 0) {
        const data = {
          key: itemKpi.id,
          id: itemKpi.id,
          cascadeType: itemKpi.cascadeType,
          cascadeName: itemKpi.cascadeName,
          kpi: itemKpi.name,
          baseline: itemKpi.baseline,
          weight: itemKpi.weight,
          achievementType: itemKpi.achievementType,
          metrics: dataKpiMetrics,
          ...dataMetrics
        };
        newData.push(data);
      } else {
        const data = {
          key: itemKpi.id,
          id: itemKpi.id,
          cascadeType: itemKpi.cascadeType,
          cascadeName: itemKpi.cascadeName,
          kpi: itemKpi.name,
          baseline: itemKpi.baseline,
          weight: itemKpi.weight,
          achievementType: itemKpi.achievementType,
          metrics: dataKpiMetrics,
          ...dataMetrics
        };
        newSelectedData.push(data);
      }
    });
    form.getFieldValue({
      dataKpi: newData
    });
    this.setState({
      dataOwn: newData,
      dataSelectedCascade: newSelectedData,
      loadingOwn: false
    });
  }

  getManagerKpiList = async (id) => {
    const { getKpiManagerList, form } = this.props;
    await getKpiManagerList(id);
    const { managerKpiReducers } = this.props;
    const {
      dataFirstManager, dataSecondManager, dataKpiManagerMetrics
    } = managerKpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line no-unused-expressions
    dataFirstManager && dataFirstManager.kpi.map((itemKpi) => {
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
        id: 0,
        cascadeType: 1,
        cascadeName: `${dataFirstManager.manager.firstName} ${dataFirstManager.manager.lastName}`,
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metrics: dataKpiManagerMetrics,
        ...dataMetrics
      };
      newData.push(data);
      return data;
    });
    // eslint-disable-next-line no-unused-expressions
    dataSecondManager && dataSecondManager.kpi.map((itemKpi) => {
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
        id: 0,
        cascadeType: 1,
        cascadeName: `${dataSecondManager.manager.firstName} ${dataSecondManager.manager.lastName}`,
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metrics: dataKpiManagerMetrics,
        ...dataMetrics
      };
      newData.push(data);
      return data;
    });
    form.getFieldValue({
      dataManagerKpi: newData
    });
    this.setState({
      dataManagerKpi: newData,
      loadingManager: false
    });
  }

  handleSaveDraft = async () => {
    const {
      doSavingKpi, userReducers, stepChange, form
    } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { challenge, dataKpi, dataKpiMetrics } = this.props.kpiReducers;
    const { user } = userReducers.result;
    const {
      tab,
      dataOwn,
      dataSelectedCascade
    } = this.state;
    const dataSaving = dataOwn.concat(dataSelectedCascade);
    const newDataKpi = [];
    // eslint-disable-next-line array-callback-return
    dataSaving.map((itemKpi, iii) => {
      const newMetricValue = [];
      const datass = Object.keys(itemKpi);
      // eslint-disable-next-line array-callback-return
      datass.map((m, index) => {
        // eslint-disable-next-line array-callback-return
        if (dataKpi[iii]) {
          dataKpi[iii].metricLookup.map((metric) => {
          // if (metric.label === datass[index]) {
            if (metric.label === datass[index]) {
              const mData = {
                id: metric.id,
                label: metric.label,
                achievementText: itemKpi.achievementType === 0 ? itemKpi[m] : '',
                achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi[m] : '')
              };
              newMetricValue.push(mData);
            }
          });
        } else {
          dataKpiMetrics.map((metric) => {
          // if (metric.label === datass[index]) {
            if (metric.label === datass[index]) {
              const mData = {
                id: parseFloat(0),
                label: metric.label,
                achievementText: itemKpi.achievementType === 0 ? itemKpi[m] : '',
                achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi[m] : '')
              };
              newMetricValue.push(mData);
            }
          });
        }
      });
      const data = {
        id: itemKpi.id,
        baseline: itemKpi.baseline,
        name: itemKpi.kpi,
        weight: itemKpi.weight,
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        achievementType: itemKpi.achievementType,
        metricLookup: newMetricValue
      };
      newDataKpi.push(data);
    });
    const data = {
      kpiList: newDataKpi,
      challangeYourSelf: challenge || ' '
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err || tab === '2') {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, user.userId);
            const { kpiReducers } = this.props;
            if (kpiReducers.statusSaveKPI === Success || kpiReducers.statusSaveKPI === FAILED_SAVE_CHALLENGE_YOURSELF) {
              message.success('Your KPI has been saved');
              stepChange(1); // go to draft
            } else {
              message.warning(`Sorry, ${kpiReducers.messageSaveKPI}`);
            }
          },
          onCancel() {}
        });
      }
    });
  };

  handleSelectData = (record) => {
    const { dataSelectedCascade } = this.state;
    const dataChecking = dataSelectedCascade.filter(
      (item) => item.kpi === record.kpi
    );
    if (dataChecking.length !== 0) {
      this.setState({
        dataSelectedCascade: dataSelectedCascade.filter(
          (item) => !item.statusCascade && item.kpi !== record.kpi
        )
      });
    } else {
      this.setState({
        dataSelectedCascade: [...dataSelectedCascade, record]
      });
    }
  };

  handleAddRow = () => {
    const { kpiReducers } = this.props;
    const { dataKpiMetrics } = kpiReducers;
    const { dataOwnId, dataOwn } = this.state;
    let dataMetrics = dataKpiMetrics.map((metric) => {
      return `{"${metric.label}":""}`;
    });
    dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
    dataMetrics = dataMetrics.reduce((result, current) => {
      return Object.assign(result, current);
    }, {});
    const newData = {
      key: dataOwnId,
      id: 0,
      kpi: '',
      baseline: '',
      weight: '',
      cascadeType: 0,
      cascadeName: null,
      achievementType: 0,
      metrics: dataKpiMetrics,
      ...dataMetrics
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

  changeTab = (activeKey) => {
    this.setState({ tab: activeKey });
  };

  render() {
    const {
      dataOwn,
      dataSelectedCascade,
      dataManagerKpi,
      loadingOwn,
      loadingManager,
      tab
    } = this.state;
    const {
      handleAddRow,
      handleChangeField,
      handleDeleteRow,
      handleSaveDraft,
      handleSelectData,
      handleError
    } = this;
    const { ownKpiReducers, form, managerKpiReducers } = this.props;
    const {
      dataGoal, loadingGoal, dataKpiMetrics
    } = ownKpiReducers;
    const {
      dataKpiManagerMetrics
    } = managerKpiReducers;
    const { name } = dataGoal;
    return (
      <div style={{ ...globalStyle.contentContainer, borderRadius: 0 }}>
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
            <Skeleton active loading={loadingGoal} paragraph={false} title={{ width: 500 }}>
              <Title level={4}>{name}</Title>
            </Skeleton>
          </center>
          <Tabs activeKey={tab} type="card" onChange={this.changeTab}>
            <TabPane
              tab="Cascade From Superior"
              key="1"
            >
              {!loadingManager ?
                <Cascade
                  dataSource={dataManagerKpi}
                  dataMetrics={dataKpiManagerMetrics}
                  dataSelectedCascade={dataSelectedCascade}
                  handleError={handleError}
                  handleSaveDraft={handleSaveDraft}
                  handleSelectData={handleSelectData}
                /> : <center><Spin /></center>}
            </TabPane>
            <TabPane tab="Create Own KPI" key="2">
              {!loadingOwn ?
                <CreateOwn
                  form={form}
                  dataSource={dataOwn}
                  dataMetrics={dataKpiMetrics}
                  handleSaveDraft={handleSaveDraft}
                  handleAddRow={handleAddRow}
                  handleError={handleError}
                  handleChangeField={handleChangeField}
                  handleDelete={handleDeleteRow}
                /> : <center><Spin /></center>}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ownKpiReducers: state.ownKpi,
  managerKpiReducers: state.managerKpi,
  saveKpiReducers: state.saveKpi,
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers
});

const mapDispatchToProps = (dispatch) => ({
  doSavingKpi: (data, id) => dispatch(actionSaveKpi(data, id)),
  getKpiList: (id) => dispatch(actionGetKPI(id)),
  getKpiManagerList: (id) => dispatch(actionGetManagerKPI(id)),
  getLatestGoalKpi: () => dispatch(actionGetLatestGoalKPI())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKPI);

export default Form.create({})(withRouter(connectToComponent));

CreateKPI.propTypes = {
  stepChange: PropTypes.func,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  getLatestGoalKpi: PropTypes.func,
  getKpiManagerList: PropTypes.func,
  form: PropTypes.instanceOf(Object),
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  userReducers: PropTypes.instanceOf(Object).isRequired
};
