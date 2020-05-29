import React, { Component } from 'react';
import {
  Button,
  Modal,
  Typography,
  Divider,
  message,
  Input,
  Spin,
  Form,
  Result
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './kpi';
import { doSaveKpi, doGetKpiList, doSubmitNext, doGetLatestGoalKpi } from '../../redux/actions/kpi';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../redux/status-code-type';
import globalStyle from '../../styles/globalStyles';
import stepKpi from '../../utils/stepKpi';


const { confirm } = Modal;
const { Text, Title, Paragraph } = Typography;
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
      isSuperior: false
    };
  }

  componentDidMount() {
    const { userReducers, match, step } = this.props;
    const { params } = match;
    const { user } = userReducers.result;
    if (user.userId === params.userId) {
      if (step.currentStep === stepKpi[0] || step.currentStep === stepKpi[1]) {
        this.props.history.push('/planning/kpi');
      } else if(step.currentStep === stepKpi[2]) {
        this.props.history.push('/monitoring');
      } else {
        this.props.history.push('/appraisal');
      }
    } else {
      this.getAllData();
    }
  }

  getAllData = async () => {
    const { userReducers, getKpiList, getLatestGoalKpi, match } = this.props;
    const { params } = match;
    const { userId } = params;
    const { user } = userReducers.result;
    getLatestGoalKpi();
    if (userId) {
      await getKpiList(userId);
      this.setState({
        isSuperior: true
      })
    } else {
      await getKpiList(user.userId);
      this.setState({
        isSuperior: false
      })
    }
    const { kpiReducers } = this.props;
    const { dataKpi, challenge, dataKpiMetrics, status } = kpiReducers;
    const newData = [];
    if (status === Success) {
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    dataKpi.map((itemKpi) => {
      if (itemKpi.othersRatingComments.id) {
        this.setState({ isFeedback: true });
      }
      let dataMetrics = itemKpi.metricLookup.map((metric) => {
        return `{"${metric.label}":""}`;
      });
      dataMetrics = JSON.parse(`[${dataMetrics.toString()}]`);
      dataMetrics = dataMetrics.reduce((result, current) => {
        return Object.assign(result, current);
      }, {});
      Object.keys(dataMetrics).map((newDataMetric, newIndex) => {
        return itemKpi.metricLookup.map((metric) => {
          if (newDataMetric === metric.label) {
            dataMetrics[newDataMetric] = `${itemKpi.achievementType === 0 ?
              metric.achievementText : metric.achievementNumeric}`;
            return dataMetrics;
          }
          return null;
        });
      });
      const data = {
        key: itemKpi.id,
        id: itemKpi.id,
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        // typeKpi: itemKpi.cascadeType === 0 ? 'Self KPI' : `Cascade From ${itemKpi.cascadeName}`,
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: parseFloat(itemKpi.weight),
        achievementType: itemKpi.achievementType,
        metrics: dataKpiMetrics,
        ...dataMetrics,
        // feedback: itemKpi.othersRatingComments.comment
      };
      newData.push(data);
    });
    this.setState({
      dataSource: newData,
      userId: user.userId,
      challengeYour: challenge === '----------' ? '' : challenge
    });
    this.liveCount(newData);
    }
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
        weight: parseFloat(itemKpi.weight),
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        achievementType: itemKpi.achievementType,
        metricLookup: newMetricValue
      };
      newDataKpi.push(data);
    });
    const data = {
      kpiList: newDataKpi,
      challengeYourSelf: challengeYour || '----------'
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
    const { form } = this.props;
    const { dataSource } = this.state;
    const data = [...dataSource];
    const newData = data.filter((item) => item.key !== key);
    this.setState({
      dataSource: newData
    });
    const dataKpiCheck = form.getFieldsValue(['dataKpi']);
    if (dataKpiCheck) {
      form.setFieldsValue({
        dataKpi: newData
      });
    }
    this.liveCount(newData);
  };

  handleSaveDraft = (type) => async () => {
    const {
      doSavingKpi, userReducers, form, kpiReducers
    } = this.props;
    const { dataKpi } = kpiReducers;
    const { user } = userReducers.result;
    const {
      dataSource,
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
        weight: parseFloat(itemKpi.weight),
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        achievementType: itemKpi.achievementType,
        metricLookup: newMetricValue
      };
      newDataKpi.push(data);
    });
    const data = {
      kpiList: newDataKpi,
      challengeYourSelf: challengeYour || '----------'
    };
    if (type === 'save') {
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
    } else {
      form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          await doSavingKpi(data, user.userId);
          this.props.history.push('/monitoring/add');
        }
      });
    }
  };

  gotToAppraisal = () => {
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
        weight: parseFloat(itemKpi.weight),
        cascadeType: itemKpi.cascadeType,
        cascadeName: itemKpi.cascadeName,
        achievementType: itemKpi.achievementType,
        metricLookup: newMetricValue
      };
      newDataKpi.push(data);
    });
    const data = {
      kpiList: newDataKpi,
      challengeYourSelf: challengeYour || '----------'
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, user.userId);
            // eslint-disable-next-line react/destructuring-assignment
            if (this.props.kpiReducers.statusSaveKPI === Success || FAILED_SAVE_CHALLENGE_YOURSELF) {
              message.success('Success saving KPI and navigate to appraisal');
              this.props.history.push('/appraisal');
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
    const { loadingKpi, dataKpiMetrics, dataGoal, currentStep, user, holderUserId, status, errMessage } = kpiReducers;
    const { name  } = dataGoal;
    const stafname = isSuperior ? `${user.firstName} ${user.lastName}` : '';
    const stafid = holderUserId;
    if (status === Success || loadingKpi) {
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
        {!loadingKpi ?
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
              isEditable={currentStep === stepKpi[2]}
              isSuperior={isSuperior}
              stafid={stafid}
            />
            <div>
              <Text strong className='label-challenge'>Challenge Yourself :</Text>
              {(!isSuperior && (currentStep === stepKpi[2])) ?
                <TextArea
                  autoSize={{minRows: 3}}
                  placeholder="Challenge yourself"
                  value={challengeYour}
                  onChange={changeChallenge}
                />:
                <TextArea
                  autoSize={{minRows: 3}}
                  className="challenge-input-disabled"
                  value={challengeYour}
                  readOnly
                />}
            </div>
            <div style={{ textAlign: 'center' }}>
              {
                isSuperior ?
                <div>
                  <Button type="default" onClick={()=> this.props.history.push('/my-team/monitoring/')}>
                    Back
                  </Button>
                </div>:
                <div>
                {(currentStep === stepKpi[2]) ? 
                <div>
                  <Button
                    id="add-kpi"
                  // eslint-disable-next-line react/jsx-no-bind
                    onClick={handleSaveDraft('add')}
                    style={{ margin: 10 }}
                    disabled={currentStep !== stepKpi[2]}
                    loading={kpiReducers.loadingSaveKPI}
                  >
                  Add KPI
                  </Button>
                  <Button
                    id="save-draft"
                    onClick={handleSaveDraft('save')}
                    style={{ margin: 10 }}
                    disabled={currentStep !== stepKpi[2]}
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
                </div>:<div>
                  <Button
                    id="submit-superior"
                    onClick={() => this.props.history.push('/appraisal')}
                    type="primary" style={{ margin: 10 }}
                  >
                    Go To Appraisal
                  </Button>
                  </div>}
                </div>
                }
            </div>
          </div> : <center><Spin /></center>}
      </div>
    );} else {
      return (
        <div style={globalStyle.contentContainer}>
        <Result
          status={'error'}
          title={status}
          subTitle={`Sorry, ${errMessage}`}
          extra={[
            <Button key="back" onClick={() => this.props.history.push('/my-team/appraisal/')}>Back</Button>,
          ]}
        />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers,
  step: state.userKpiStateReducers
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
