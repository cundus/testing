import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider,
  message,
  Input,
  Spin,
  Form
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './kpi';
import { doSaveKpi, doGetKpiList, doSubmitNext, doGetLatestGoalKpi } from '../../redux/actions/kpi';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../redux/status-code-type';
import globalStyle from '../../styles/globalStyles';


const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;

class MonitorKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0,
      weightTotalErr: false,
      challengeYour: '',
      kpiErr: false,
      isFeedback: false,
      userId: '',
      isSuperior: false,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const { userReducers, getKpiList, form, getLatestGoalKpi, match } = this.props;
    const { params } = match;
    const { userId } = params;
    const { user } = userReducers.result;
    let isSuperior  = this.state.isSuperior;
    await getLatestGoalKpi();
    if (userId) {
      await getKpiList(userId);
      isSuperior = true;
    } else {
      await getKpiList(user.userId);
    }
    const { kpiReducers } = this.props;
    const { dataKpi, challenge, dataKpiMetrics } = kpiReducers;
    const newData = [];

    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    dataKpi.map((itemKpi) => {
      if (itemKpi.othersRatingComments.id) {
        this.setState({ isFeedback: true });
      }
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
        id: itemKpi.id,
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        // typeKpi: itemKpi.cascadeType === 0 ? 'Self KPI' : `Cascade From ${itemKpi.cascadeName}`,
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metrics: dataKpiMetrics,
        ...dataMetrics,
        // feedback: itemKpi.othersRatingComments.comment
      };
      newData.push(data);
    });
    form.getFieldValue({
      dataKpi: newData
    });
    this.setState({
      dataSource: newData,
      userId: user.userId,
      challengeYour: challenge,
      isSuperior
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
    const {
      doSavingKpi, userReducers, form, kpiReducers, submitNext, stepChange
    } = this.props;
    const { dataKpi } = kpiReducers;
    const { user } = userReducers.result;
    const {
      dataSource,
      kpiErr,
      kpiErrMessage,
      challengeYour
    } = this.state;
    const newDataKpi = [];
    // eslint-disable-next-line array-callback-return
    dataSource.map((itemKpi, iii) => {
      const newMetricValue = [];
      const datass = Object.keys(itemKpi);
      // eslint-disable-next-line array-callback-return
      datass.map((m, index) => {
        // eslint-disable-next-line array-callback-return
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
        // }
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
      challangeYourSelf: challengeYour
    };
    if (newDataKpi.length > 20) {
      message.warning('Maximum KPI is 20');
    } else if (kpiErr) {
      message.warning(kpiErrMessage);
    } else {
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          confirm({
            title: 'Are you sure?',
            onOk: async () => {
              await doSavingKpi(data, user.userId);
              // eslint-disable-next-line react/destructuring-assignment
              if (this.props.kpiReducers.statusSaveKPI === Success || FAILED_SAVE_CHALLENGE_YOURSELF) {
                await submitNext(user.userId);
                message.success('Your KPI has been submitted to your superior');
                stepChange(2, true); // go to submit page
                // eslint-disable-next-line react/destructuring-assignment
                if (this.props.kpiReducers.statusSaveKPI === FAILED_SAVE_CHALLENGE_YOURSELF) {
                  message.warning(`Sorry, ${this.props.kpiReducers.messageSaveKPI}`);
                }
              } else {
                message.warning(`Sorry, ${this.props.kpiReducers.messageSaveKPI}`);
              }
            },
            onCancel() {}
          });
        }
      });
    }
  };

  handleChange = (row) => {
    const { form } = this.props;
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    form.getFieldValue({
      dataKpi: newData
    });
    this.setState({ dataSource: newData });
    this.liveCount(newData);
  };

  changeChallenge = ({ target: { value } }) => {
    this.setState({ challengeYour: value });
  };

  handleError = () => {
    const { weightTotal } = this.state;
    if (weightTotal !== 100) {
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
    const {
      doSavingKpi, userReducers, form, kpiReducers
    } = this.props;
    const { dataKpi } = kpiReducers;
    const { user } = userReducers.result;
    const {
      dataSource,
      challengeYour
    } = this.state;
    if (this.state.weightTotal !== 100) {
      return message.warning('Total KPI Weight must 100%');

    }
    const newDataKpi = [];
    // eslint-disable-next-line array-callback-return
    dataSource.map((itemKpi, iii) => {
      const newMetricValue = [];
      const datass = Object.keys(itemKpi);
      // eslint-disable-next-line array-callback-return
      datass.map((m, index) => {
        // eslint-disable-next-line array-callback-return
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
        // }
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
      challangeYourSelf: challengeYour
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, user.userId);
            // eslint-disable-next-line react/destructuring-assignment
            if (this.props.kpiReducers.statusSaveKPI === Success || FAILED_SAVE_CHALLENGE_YOURSELF) {
              message.success('Your KPI has been saved');
              this.getAllData();
              // eslint-disable-next-line react/destructuring-assignment
              if (this.props.kpiReducers.statusSaveKPI === FAILED_SAVE_CHALLENGE_YOURSELF) {
                message.warning(`Sorry, ${this.props.kpiReducers.messageSaveKPI}`);
              }
            } else {
              message.warning(`Sorry, ${this.props.kpiReducers.messageSaveKPI}`);
            }
          },
          onCancel() {}
        });
      }
    });
  };

  gotToAppraisal = () => {
    if (this.state.dataSource.length > 20) {
      message.warning('Maximum KPI is 20');
    } else if (this.state.kpiErr) {
      message.warning(this.state.kpiErrMessage);
    } else {
      this.props.history.push('/appraisal');
    }
  }

  render() {
    const {
      dataSource, weightTotal, weightTotalErr, challengeYour, isFeedback, userId, isSuperior
    } = this.state;
    const {
      handleChange,
      handleDelete,
      handleSubmit,
      handleSaveDraft,
      changeChallenge,
      handleError
    } = this;
    const { kpiReducers, stepChange, form } = this.props;
    const { loadingKpi, dataKpiMetrics, generalFeedback, dataGoal, currentStep, user, holderUserId } = kpiReducers;
    const { name  } = dataGoal;
    const stafname = isSuperior ? `${user.firstName} ${user.lastName}` : '';
    const stafid = holderUserId;
    const isHasSubmit = (currentStep === 'Performance Review Manager')
    return (
      <div style={globalStyle.contentContainer}>
        <div>
          <Divider />
          <Text strong> Monitoring KPI - {stafname} </Text>
          <Text>
            {` Monitoring your KPI.`}
          </Text>
          <Divider />
          <center>
            <Title level={4}>{name || ''}</Title>
            <br />
          </center>
        </div>
        {!loadingKpi && (currentStep === 'Performance Review Employee' || currentStep === 'Performance Review Manager') ?
          <div>
            <Text type={weightTotalErr ? 'danger' : ''}>
            Total KPI Weight :
            {` ${weightTotal}%`}
          </Text>
            <TableKPI
              form={form}
              dataMetrics={dataKpiMetrics}
              isFeedback={isFeedback}
              dataSource={dataSource}
              handleError={handleError}
              handleChange={handleChange}
              handleDelete={handleDelete}
              userId={userId}
              isSuperior={isSuperior || isHasSubmit}
              stafid={stafid}
            />
            <div>
              <Text strong>Challenge Myself :</Text>
              {
                isSuperior ?
                  <Text><br/> {challengeYour} </Text> :
                  <TextArea
                    id="challenge-input"
                    placeholder="Challenge yourself"
                    label="Challenge yourself"
                    value={challengeYour}
                    onChange={changeChallenge}
                  />
              }
            </div>
            <div style={{ textAlign: 'center' }}>
              {
                isSuperior ?
                <div>
                  <Button type="default" onClick={()=> this.props.history.goBack()} >Back</Button>
                </div>:
                <div>
                  <Button
                    id="add-kpi"
                  // eslint-disable-next-line react/jsx-no-bind
                    onClick={() =>  this.props.history.push('/monitoring/add')}
                    style={{ margin: 10 }}
                    disabled={isHasSubmit}
                  >
                  Add KPI
                  </Button>
                  <Button
                    id="save-draft"
                    onClick={handleSaveDraft}
                    style={{ margin: 10 }}
                    disabled={isHasSubmit}
                  >
                  Save
                  </Button>
                  <Button
                    id="submit-superior"
                    onClick={this.gotToAppraisal}
                    type="primary" style={{ margin: 10 }}
                  >
                  Go To Appraisal
                  </Button>
                </div>
              }
            </div>
          </div> : <center><Spin /></center>}
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
  submitNext: (id) => dispatch(doSubmitNext(id)),
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorKPI);

export default Form.create({})(withRouter(connectToComponent));

MonitorKPI.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
