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
import kpiSendProcess from '../../../../utils/kpiSendProcess';
import { kpiGetManagerProcess } from '../../../../utils/kpiGetProcess';
import { sendChallengeYourselfChecker } from '../../../../utils/challengeYourselfChecker';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class CreateKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '1',
      dataOwnId: 0,
      dataManagerKpi: [],
      dataSelectedCascade: [],
      loadingOwn: true,
      loadingManager: true,
      weightTotal: 0,
      weightTotalErr: true
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
    const {
      getKpiList, access, setAccess
    } = this.props;
    if (access) {
      await getKpiList(id);
    }
    setAccess(true);
    const { ownKpiReducers } = this.props;
    const { dataKpi, dataKpiMetrics, dataKpiFiltered } = ownKpiReducers;
    const { dataOwnId } = this.state;
    const newData = [];
    const newSelectedData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    if (dataKpi.length === 0) {
      const data = {
        key: dataOwnId,
        id: 0,
        kpi: '',
        baseline: '',
        weight: '',
        cascadeType: 0,
        cascadeName: null,
        achievementType: 0,
        metrics: dataKpiMetrics
        // ...dataMetrics
      };
      newData.push(data);
      this.setState({
        dataOwnId: dataOwnId + 1
      });
    } else {
      dataKpiFiltered.map((itemKpi, index) => {
        if (itemKpi.cascadeType === 0) {
          newData.push(itemKpi);
          return itemKpi;
        } else {
          newSelectedData.push(itemKpi);
          return itemKpi;
        }
      });
    }
    this.setState({
      dataOwn: newData,
      dataSelectedCascade: newSelectedData,
      loadingOwn: false
    });
    this.liveCount(newData);
  }

  getManagerKpiList = async (id) => {
    const { getKpiManagerList } = this.props;
    await getKpiManagerList(id);
    const { managerKpiReducers } = this.props;
    const {
      dataFirstManager, dataSecondManager, dataKpiManagerMetrics
    } = managerKpiReducers;
    let newData = [];
    if (dataFirstManager) {
      const newManagerData = kpiGetManagerProcess(dataFirstManager, dataKpiManagerMetrics);
      newData = [...newData, ...newManagerData];
    }
    if (dataSecondManager) {
      const newManagerData = kpiGetManagerProcess(dataSecondManager, dataKpiManagerMetrics);
      newData = [...newData, ...newManagerData];
    }
    this.setState({
      dataManagerKpi: newData,
      loadingManager: false
    });
  }

  liveCount = (data) => {
    let totalWeight = 0;
    // eslint-disable-next-line array-callback-return
    data.map((itemKpi) => {
      if (itemKpi.weight) {
        const weight = parseFloat(itemKpi.weight);
        if (weight) {
          totalWeight += weight;
        }
      } else {
        totalWeight += 0;
      }
    });
    totalWeight = parseFloat(totalWeight);
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

  handleSaveDraft = async () => {
    const {
      doSavingKpi, userReducers, stepChange, form, ownKpiReducers
    } = this.props;
    const { challenge, dataKpi, dataKpiMetrics } = ownKpiReducers;
    const { user } = userReducers.result;
    const {
      dataOwn,
      dataSelectedCascade
    } = this.state;
    const dataSaving = dataOwn.concat(dataSelectedCascade);
    const newDataKpi = kpiSendProcess(dataSaving, dataKpi, dataKpiMetrics);
    const data = {
      kpiList: newDataKpi,
      challengeYourSelf: sendChallengeYourselfChecker(challenge)
    };
    form.validateFieldsAndScroll((err, values) => {
      if (dataSaving.length === 0) {
        message.warning('You must have at least one KPI');
      } else if (!err && form.getFieldValue('dataKpi')) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, user.userId);
            const { saveKpiReducers } = this.props;
            const { status, statusMessage } = saveKpiReducers;
            if (status === Success || status === FAILED_SAVE_CHALLENGE_YOURSELF) {
              message.success('Your KPI has been saved');
              stepChange(1); // go to draft
            } else {
              message.warning(`Sorry, ${statusMessage}`);
            }
          },
          onCancel() {}
        });
      } else {
        this.changeTab('2');
      }
    });
  };

  handleSelectData = (record) => {
    const { dataSelectedCascade, dataOwn } = this.state;
    const dataChecking = dataSelectedCascade.filter(
      (item) => item.kpi === record.kpi
    );
    if (dataChecking.length !== 0) {
      const newData = dataSelectedCascade.filter(
        (item) => !item.statusCascade && item.kpi !== record.kpi
      );
      this.setState({
        dataSelectedCascade: newData
      });
      this.liveCount([...dataOwn, ...newData]);
    } else {
      const newData = [...dataSelectedCascade, record];
      this.setState({
        dataSelectedCascade: [...dataSelectedCascade, record]
      });
      this.liveCount([...dataOwn, ...newData]);
    }
  };

  handleAddRow = () => {
    const { ownKpiReducers } = this.props;
    const { dataKpiMetrics } = ownKpiReducers;
    const { dataOwnId, dataOwn, dataSelectedCascade } = this.state;
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
    this.liveCount([...dataOwn, ...dataSelectedCascade, newData]);
  };

  handleDeleteRow = (key) => {
    const { form } = this.props;
    const { dataOwn, dataSelectedCascade } = this.state;
    const data = [...dataOwn];
    const dataFiltered = data.filter((item) => item.key !== key);
    this.setState({ dataOwn: dataFiltered });
    const dataKpiCheck = form.getFieldsValue(['dataKpi']);
    if (dataKpiCheck) {
      form.setFieldsValue({
        dataKpi: dataFiltered
      });
    }
    this.liveCount([...dataSelectedCascade, ...dataFiltered]);
  };

  handleChangeField = (row) => {
    const { dataOwn, dataSelectedCascade } = this.state;
    const newData = [...dataOwn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataOwn: newData });
    this.liveCount([...dataSelectedCascade, ...newData]);
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
      tab,
      weightTotalErr,
      weightTotal
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
          <br />
          <Text type={weightTotalErr ? 'danger' : ''}>
            Total KPI Weight :
            {` ${weightTotal}%`}
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
  ownKpiReducers: PropTypes.instanceOf(Object),
  managerKpiReducers: PropTypes.instanceOf(Object),
  access: PropTypes.bool,
  setAccess: PropTypes.func,
  saveKpiReducers: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  getLatestGoalKpi: PropTypes.func,
  getKpiManagerList: PropTypes.func,
  form: PropTypes.instanceOf(Object),
  userReducers: PropTypes.instanceOf(Object).isRequired
};
