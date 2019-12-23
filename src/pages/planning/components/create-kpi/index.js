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
  doSaveKpi, doGetKpiList, doGetLatestGoalKpi, doGetKpiManagerList
} from '../../../../redux/actions/kpi';
import CreateOwn from './components/create-own';
import Cascade from './components/cascade';
import { Success } from '../../../../redux/status-code-type';

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
          L1: '',
          L2: '',
          L3: ''
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
    this.getManagerKpiList(user.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList, form } = this.props;
    await getKpiList(id);
    const { kpiReducers } = this.props;
    const { dataKpi } = kpiReducers;
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
    const { kpiReducers } = this.props;
    const {
      dataFirstManager, dataSecondManager
    } = kpiReducers;
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
    const { challenge } = this.props.kpiReducers;
    const { user } = userReducers.result;
    const {
      tab,
      dataOwn,
      dataSelectedCascade
    } = this.state;
    const dataSaving = dataOwn.concat(dataSelectedCascade);
    const newDataKpi = [];
    // eslint-disable-next-line array-callback-return
    dataSaving.map((itemKpi) => {
      const data = {
        id: itemKpi.id,
        baseline: itemKpi.baseline,
        name: itemKpi.kpi,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metricLookup: [
          {
            label: 'L1',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L1 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L1 : '')
          },
          {
            label: 'L2',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L2 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L2 : '')
          },
          {
            label: 'L3',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L3 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L1 : '')
          }]
      };
      newDataKpi.push(data);
    });
    const data = {
      challangeYourSelf: challenge,
      kpiList: newDataKpi
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err || tab === '2') {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, user.userId);
            const { kpiReducers } = this.props;
            if (kpiReducers.statusSaveKPI === Success) {
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
    const { dataOwnId, dataOwn } = this.state;
    const newData = {
      key: dataOwnId,
      id: 0,
      typeKpi: 'Self KPI',
      achievementType: 0,
      name: '',
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
    const { kpiReducers, form } = this.props;
    const {
      dataGoal, loadingGoal, dataKpiMetrics, dataKpiManagerMetrics
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
            <Skeleton active loading={loadingGoal} paragraph={false} title={{ width: 500 }}>
              <Title level={4}>{`Performance Management - ${name}`}</Title>
            </Skeleton>
          </center>
          <Tabs activeKey={tab} type="card" onChange={this.changeTab}>
            <TabPane tab="Create Own KPI" key="1">
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
            <TabPane
              tab="Cascade From Superior"
              key="2"
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
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi())
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
