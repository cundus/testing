import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider,
  message,
  Input
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableDrafKPI from './table-draf-kpi';
import { doSaveKpi, doGetKpiList } from '../../../../redux/actions/kpi';
import { Success } from '../../../../redux/status-code-type';

const { confirm } = Modal;
const { Text } = Typography;
const { TextArea } = Input;

class DraftKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0,
      weightTotalErr: false,
      kpiErr: false
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
    this.liveCount(newData);
  };

  liveCount = (data) => {
    let totalWeight = 0;
    // eslint-disable-next-line array-callback-return
    data.map((itemKpi) => {
      if (itemKpi.weight) {
        const weight = parseFloat(itemKpi.weight);
        totalWeight += weight;
      } else {
        totalWeight += 0;
      }
    });
    totalWeight = parseFloat(totalWeight);
    if (typeof totalWeight === 'number') {
      if (totalWeight === 100) {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: false,
          kpiErr: false,
          kpiErrMessage: ''
        });
      } else {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: true,
          kpiErr: true,
          kpiErrMessage: 'Sorry, Total KPI Weight must be 100%'
        });
      }
    }
  }

  handleSubmit = () => {
    const { doSavingKpi, userReducers, stepChange } = this.props;
    const { user } = userReducers.result;
    const {
      dataSource,
      kpiErr,
      kpiErrMessage
    } = this.state;
    const newData = [];
    // eslint-disable-next-line array-callback-return
    dataSource.map((itemKpi) => {
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
    if (newData.length > 20) {
      message.warning('Maximum KPI is 20');
    } else if (kpiErr) {
      message.warning(kpiErrMessage);
    } else {
      confirm({
        title: 'Are you sure?',
        onOk: async () => {
          await doSavingKpi(newData, user.userId);
          const { kpiReducers } = this.props;
          if (kpiReducers.statusSaveKPI === Success) {
            message.success('Your KPI has been submitted to supervisor');
            stepChange(2); // go to submit page
          } else {
            message.warning(`Sorry, ${kpiReducers.messageSaveKPI}`);
          }
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
    const { weightTotal } = this.state;
    if (statusErr) {
      this.setState({
        kpiErr: true,
        kpiErrMessage: 'Please fill the form'
      });
    } else if (weightTotal !== 100) {
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
    const newData = data.filter((item) => item.key !== key);
    this.setState({
      dataSource: newData
    });
    this.liveCount(newData);
  };

  handleSaveDraft = () => {
    const { doSavingKpi, userReducers } = this.props;
    const { user } = userReducers.result;
    const {
      dataSource,
      kpiErr,
      kpiErrMessage,
      totalWeight
    } = this.state;
    const newData = [];
    // eslint-disable-next-line array-callback-return
    dataSource.map((itemKpi) => {
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
      if (totalWeight !== 100) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(newData, user.userId);
            const { kpiReducers } = this.props;
            if (kpiReducers.statusSaveKPI === Success) {
              message.success('Your KPI has been saved');
            } else {
              message.warning(`Sorry, ${kpiReducers.messageSaveKPI}`);
            }
          },
          onCancel() {}
        });
      } else {
        message.warning(kpiErrMessage);
      }
    } else {
      confirm({
        title: 'Are you sure?',
        onOk: async () => {
          await doSavingKpi(newData, user.userId);
          const { kpiReducers } = this.props;
          if (kpiReducers.statusSaveKPI === Success) {
            message.success('Your KPI has been saved');
          } else {
            message.warning(`Sorry, ${kpiReducers.messageSaveKPI}`);
          }
        },
        onCancel() {}
      });
    }
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
    const { kpiReducers, stepChange } = this.props;
    const { loadingKpi } = kpiReducers;
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
        <div>
          <TableDrafKPI
            loading={loadingKpi}
            dataSource={dataSource}
            handleError={handleError}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
          <div>
            <Text>Challenge myself :</Text>
            <TextArea
              id="challenge-input"
              placeholder="Challenge myself"
              label="Challenge myself"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              id="add-kpi"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => stepChange(0) /* go back add */}
              style={{ margin: 10 }}
            >
              Add KPI
            </Button>
            <Button
              id="save-draft"
              onClick={handleSaveDraft}
              style={{ margin: 10 }}
            >
              Save as Draft
            </Button>
            <Button
              id="submit-superior"
              onClick={handleSubmit}
              type="primary" style={{ margin: 10 }}>
              Submit To Superior
            </Button>
          </div>
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
  doSavingKpi: (data) => dispatch(doSaveKpi(data)),
  getKpiList: (id) => dispatch(doGetKpiList(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftKPI);

export default withRouter(connectToComponent);

DraftKPI.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object)
};
