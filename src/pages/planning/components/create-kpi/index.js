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
  Form, Select
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
import { kpiGetManagerProcess, kpiGetProcess } from '../../../../utils/kpiGetProcess';
import { sendChallengeYourselfChecker } from '../../../../utils/challengeYourselfChecker';
import Previous from './components/previous';
import { actionGetFormTemplates, actionGetPrevKpiByFormId } from '../../../../redux/actions/previousKpi';

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
      dataPreviousKpi: [],
      dataSelectedCascade: [],
      loadingOwn: true,
      loadingPrevious: true,
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
      authReducer, getLatestGoalKpi, doGetFormTemplates
    } = this.props;
    getLatestGoalKpi();
    this.getOwnKpiList(authReducer.userId);
    this.getManagerKpiList(authReducer.userId);
    await doGetFormTemplates(true);
    const { previousKpiReducer } = this.props;
    this.selectFormTemplate(previousKpiReducer?.dataFormTemplates[0]?.formTemplateId)
  };

  selectFormTemplate = (value) =>{
    const { authReducer, match} = this.props;
    this.getPreviousKPI(authReducer?.userId, value)
    this.setState({
      selectedForm: value
    })
  }

  getOwnKpiList = async (id) => {
    const {
      getKpiList, access, setAccess
    } = this.props;
    if (access) {
      await getKpiList(id);
    }
    setAccess(true);
    const { ownkpiReducer } = this.props;
    const { dataKpi, dataKpiMetrics, dataKpiFiltered } = ownkpiReducer;
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
    const { managerkpiReducer } = this.props;
    const {
      dataFirstManager, dataSecondManager, dataKpiManagerMetrics
    } = managerkpiReducer;
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

  getPreviousKPI = async (userId, formId) => {
    this.setState({
      loadingPrevious: true,
    });
    const { doGetKpiFormId } = this.props;
    await doGetKpiFormId(userId, formId);
    const { previousKpiReducer } = this.props;
    const newData = kpiGetProcess(
      previousKpiReducer?.dataKpiByForm?.kpiList || [],
      previousKpiReducer?.dataKpiByForm?.labelList || []
    );
    this.setState({
      dataPreviousKpi: newData,
      loadingPrevious: false,
    });
  };

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
      doSavingKpi, authReducer, stepChange, form, ownkpiReducer
    } = this.props;
    const { challenge, dataKpi, dataKpiMetrics } = ownkpiReducer;
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
      } else if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, authReducer.userId);
            const { savekpiReducer } = this.props;
            const { status, statusMessage } = savekpiReducer;
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
        dataSelectedCascade: [...dataSelectedCascade, { ...record, id: 0}]
      });
      this.liveCount([...dataOwn, ...newData]);
    }
  };

  handleAddRow = () => {
    const { ownkpiReducer } = this.props;
    const { dataKpiMetrics } = ownkpiReducer;
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
      weightTotal,
      selectedForm,
      loadingPrevious,
      dataPreviousKpi
    } = this.state;
    const {
      handleAddRow,
      handleChangeField,
      handleDeleteRow,
      handleSaveDraft,
      handleSelectData,
      handleError,
      selectFormTemplate
    } = this;
    const { ownkpiReducer, form, managerkpiReducer, previousKpiReducer } = this.props;
    const {
      dataGoal, loadingGoal, dataKpiMetrics
    } = ownkpiReducer;
    const {
      dataKpiManagerMetrics
    } = managerkpiReducer;
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
              id="cascade-superior-tab"
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
            <TabPane
              id="copy-previous-tab"
              tab="Copy From Previous KPI"
              key="3"
            >
              <Select
                placeholder="Select Performance"
                style={{minWidth: 500}}
                value={selectedForm||undefined}
                onChange={selectFormTemplate}
              >
                {previousKpiReducer?.dataFormTemplates && previousKpiReducer?.dataFormTemplates.map((item, index) =>(
                  <Select.Option value={item?.formTemplateId}>{item?.formTemplateName}</Select.Option>))}
              </Select>
              {!loadingPrevious ?
                <Previous
                  dataSource={dataPreviousKpi}
                  dataMetrics={previousKpiReducer?.dataKpiByForm?.labelList || []}
                  dataSelectedCascade={dataSelectedCascade}
                  handleError={handleError}
                  handleSaveDraft={handleSaveDraft}
                  handleSelectData={handleSelectData}
                /> : <center><Spin /></center>}
            </TabPane>
            <TabPane id="create-own-tab" tab="Create Own KPI" key="2">
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
  ownkpiReducer: state.ownKpi,
  managerkpiReducer: state.managerKpi,
  savekpiReducer: state.saveKpi,
  kpiReducer: state.kpiReducer,
  userReducer: state.userReducer,
  authReducer: state.authReducer,
  previousKpiReducer: state.previousKpiReducer
});

const mapDispatchToProps = (dispatch) => ({
  doSavingKpi: (data, id) => dispatch(actionSaveKpi(data, id)),
  getKpiList: (id) => dispatch(actionGetKPI(id)),
  getKpiManagerList: (id) => dispatch(actionGetManagerKPI(id)),
  getLatestGoalKpi: () => dispatch(actionGetLatestGoalKPI()),
  doGetFormTemplates: (ellgibleToCopy) =>
    dispatch(actionGetFormTemplates(ellgibleToCopy)),
  doGetKpiFormId: (userId, formId) => dispatch(actionGetPrevKpiByFormId(userId, formId))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKPI);

export default Form.create({})(withRouter(connectToComponent));

CreateKPI.propTypes = {
  ownkpiReducer: PropTypes.instanceOf(Object),
  managerkpiReducer: PropTypes.instanceOf(Object),
  access: PropTypes.bool,
  setAccess: PropTypes.func,
  savekpiReducer: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  getLatestGoalKpi: PropTypes.func,
  getKpiManagerList: PropTypes.func,
  form: PropTypes.instanceOf(Object),
  userReducer: PropTypes.instanceOf(Object).isRequired
};
