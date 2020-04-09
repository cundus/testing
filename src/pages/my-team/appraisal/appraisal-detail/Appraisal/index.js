
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Form,
  Typography,
  Divider,
  Col,
  Row,
  Modal,
  Input,
  Skeleton,
  Button,
  message,
  // Spin,
  // Icon,
  Select,
  Checkbox,
  Spin,
  Icon,
  Result
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './ components/kpi';
import TableValue from './ components/value';
import CardRating from './ components/cardRating';
import {
  doGetKpiList,
  doAssessment,
  getValueList,
  getRatings,
  saveValueList,
  doGetKpiRating,
  doSubmitNext,
  doGetProposeRating,
  doApproveAppraisal,
  doSendBackAppraisal,
  doTeamAcknowledge
} from '../../../../../redux/actions/kpi';
import { actionGetNotifications } from '../../../../../redux/actions';
import { Success } from '../../../../../redux/status-code-type';
import globalStyle from '../../../../../styles/globalStyles';
import stepKpi from '../../../../../utils/stepKpi';

const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { confirm } = Modal;
const { Option } = Select;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: false,
      teamName: '',
      dataValueList: [],
      optionRating: [],
      loadingMyValue: false,
      challengeYour: '',
      tab: '1',
      myStep: false,
      isFeedback: false,
      generalFeedbackState: '',
      checkedFinal: false,
      acknowledgement: '',
      loadingSubmit: false
    };
  }

  componentDidMount() {
    const { userReducers, match, step } = this.props;
    const { params } = match;
    const { user } = userReducers.result;
    if (user.userId === params.userId) {
      if (step.currentStep === stepKpi[0] || step.currentStep === stepKpi[1]) {
        this.props.history.push('/planning/kpi');
      } else {
        this.props.history.push('/appraisal');
      }
    } else {
      this.getData();
    }
  }

  getData = async (e) => {
    const {
      match,
      getKpiRating,
      getProposeRating
    } = this.props;
    const { params } = match;
    this.getOwnKpiList(params.userId);
    this.getOwnValues(params.userId);
    getProposeRating();
    await getKpiRating(params.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList, form } = this.props;
    this.setState({
      loadingKpis: true
    });
    await getKpiList(id);
    const { kpiReducers } = this.props;
    const {
      dataKpi, dataKpiMetrics, challenge, currentStep, generalFeedback, user, status
    } = kpiReducers;
    if (status === Success) {
      const newData = [];
      // for fetching data metrics API
      // eslint-disable-next-line array-callback-return
      await dataKpi.map((itemKpi, index) => {
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
        const dataKeyMetric = Object.keys(dataMetrics);
        const newOption = [];
        dataKeyMetric.map((item) => {
          const data = dataMetrics[item];
          newOption.push(data);
          return data;
        });
        const data = {
          key: itemKpi.id,
          id: itemKpi.id,
          cascadeType: itemKpi.cascadeType,
          cascadeName: itemKpi.cascadeName,
          kpi: itemKpi.name,
          baseline: itemKpi.baseline,
          weight: itemKpi.weight,
          rating: itemKpi.rating,
          index,
          achievementType: itemKpi.achievementType,
          assessment: itemKpi.achievementType ? itemKpi.actualAchievement : itemKpi.actualAchievementText,
          qualitativeOption: newOption,
          metrics: dataKpiMetrics,
          ...dataMetrics,
          feedback: itemKpi.othersRatingComments.comment
        };
        newData.push(data);
      });
      const dataOrdered = await newData.sort((a, b) => {
        return a.id - b.id;
      });
      const dataGen = dataOrdered.map((item, i) => {
        return {
          assesment: item.assesment
        };
      });
      const dataKpiCheck = form.getFieldsValue(['dataKpi']);
      if (dataKpiCheck) {
        form.setFieldsValue({
          dataKpi: dataGen
        });
      }
      this.setState({
        myStep: currentStep === 'Performance Review Manager',
        dataKpis: dataOrdered,
        challengeYour: challenge === '----------' ? '' : challenge,
        generalFeedbackState: generalFeedback.comment,
        // eslint-disable-next-line max-len
        acknowledgement: `I have had feedback session with ${`${user.firstName} ${user.lastName}`} on his/her Performance Review Result.`,
        teamName: `${user.firstName} ${user.lastName}`
      });
    }
    this.setState({
      loadingKpis: false
    });
  }

  getOwnValues = async (id, noLoading) => {
    if (!noLoading) {
      this.setState({
        loadingMyValue: true
      });
    }
    const {
      getValues, getRatingList, form
    } = this.props;
    if (!noLoading) {
      await getRatingList();
    }
    await getValues(id);
    const { kpiReducers } = this.props;
    const { dataValues, dataRating, statusValues } = kpiReducers;
    if (statusValues === Success) {
      const newData = [];
      // for fetching data metrics API
      // eslint-disable-next-line array-callback-return
      await dataValues.map((itemValues, index) => {
        const newFiles = [];
        // eslint-disable-next-line no-unused-expressions
        itemValues.attachments && itemValues.attachments.map((files) => {
          const data = {
            uid: files.id,
            id: files.id,
            valueId: files.valueId,
            name: files.fileName,
            status: 'done',
            url: 'download'
          };
          newFiles.push(data);
          return data;
        });
        const ratingCheck = dataRating.filter((itemRating) => itemRating.id === itemValues.valuesRatingDTO.rating);
        const data = {
          key: itemValues.id,
          valueId: itemValues.id,
          index,
          orderId: itemValues.orderId,
          name: itemValues.name,
          rating: ratingCheck.length < 1 ? undefined : itemValues.valuesRatingDTO.rating,
          comment: itemValues.valuesRatingDTO.comment,
          attachments: newFiles,
          feedback: itemValues.otherValuesRatingDTO.comment
        };
        newData.push(data);
      });
      let dataOrdered = await newData.sort((a, b) => {
        return a.orderId - b.orderId;
      });
      dataOrdered = dataOrdered.map((item, index) => {
        return {
          ...item,
          index
        };
      });
      const dataGen = dataOrdered.map((item, i) => {
        return {
          rating: item.rating,
          comment: item.comment
        };
      });
      const dataGeneral = form.getFieldsValue(['dataGeneral']);
      if (dataGeneral) {
        form.setFieldsValue({
          dataGeneral: dataGen
        });
      }
      this.setState({
        loadingSubmit: false,
        optionRating: dataRating,
        dataValueList: dataOrdered
      });
    }
    this.setState({
      loadingMyValue: false
    });
  }

  handleSendBack = () => {
    const {
      sendBackAppraisal, match, getNotifications, form
    } = this.props;
    const { params } = match;
    const {
      dataKpis, dataValueList, generalFeedbackState, teamName
    } = this.state;
    const kpiFeedbacks = dataKpis.map((data, index) => {
      return {
        id: data.id,
        comment: data.feedback
      };
    });
    const valuesFeedbacks = dataValueList.map((data, index) => {
      return {
        id: data.valueId,
        comment: data.feedback
      };
    });
    let rating = form.getFieldValue('proposeRating');
    // eslint-disable-next-line react/destructuring-assignment
    if (rating === this.props.kpiReducers.dataKpiRating.rating) {
      // eslint-disable-next-line react/destructuring-assignment
      rating = this.props.kpiReducers.dataKpiRating.id;
    }
    const data = {
      challengeOthersRatingComments: generalFeedbackState,
      kpiFeedbacks,
      rating,
      valuesFeedbacks
    };
    confirm({
      title: 'Are you sure?',
      content: "Make sure you have given feedback on both KPI's & Values before sending the feedback",
      okText: 'Send Feedback',
      onOk: async () => {
        await sendBackAppraisal(params.userId, data);
        const {
          kpiReducers,
          history
        } = this.props;
        const {
          loadingSendBackAppraisal,
          statusSendBackAppraisal,
          messageSendBackAppraisal
        } = kpiReducers;
        if (!loadingSendBackAppraisal) {
          if (statusSendBackAppraisal === Success) {
            history.push('/my-team/appraisal/');
            message.success(`${teamName}'s Appraisal has given feedback`);
            getNotifications();
          } else {
            message.warning(`Sorry ${messageSendBackAppraisal}`);
          }
        }
      },
      onCancel() {}
    });
  };


  handleApprove = () => {
    const {
      form, approveAppraisal, match, getNotifications
    } = this.props;
    const { params } = match;
    const {
      dataKpis, dataValueList, generalFeedbackState, teamName
    } = this.state;
    const kpiFeedbacks = dataKpis.map((data, index) => {
      return {
        id: data.id,
        comment: data.feedback
      };
    });
    const valuesFeedbacks = dataValueList.map((data, index) => {
      return {
        valueId: data.valueId,
        rating: data.rating,
        comment: data.feedback
      };
    });
    let rating = form.getFieldValue('proposeRating');
    // eslint-disable-next-line react/destructuring-assignment
    if (rating === this.props.kpiReducers.dataKpiRating.rating) {
      // eslint-disable-next-line react/destructuring-assignment
      rating = this.props.kpiReducers.dataKpiRating.id;
    }
    const data = {
      challengeOthersRatingComments: generalFeedbackState,
      kpiFeedbacks,
      rating,
      valuesFeedbacks
    };
    form.validateFieldsAndScroll(['proposeRating'], (errors, values) => {
      if (!errors) {
        confirm({
          title: 'Are you sure?',
          content: `Are you sure want to approve ${teamName}'s Appraisal?`,
          okText: 'Approve',
          onOk: async () => {
            await approveAppraisal(params.userId, data);
            const {
              kpiReducers
            } = this.props;
            const {
              loadingApproveAppraisal,
              statusApproveAppraisal,
              messageApproveAppraisal
            } = kpiReducers;
            if (!loadingApproveAppraisal) {
              if (statusApproveAppraisal === Success) {
                this.getData();
                message.success(`${teamName}'s Appraisal has been send to system`);
                getNotifications();
              } else {
                message.warning(`Sorry ${messageApproveAppraisal}`);
              }
            }
          },
          onCancel() {}
        });
      } else {
        message.warning('Please, give your Propose Rating');
      }
    });
  };

  changeGeneralFeedback = ({ target: { value } }) => {
    this.setState({ generalFeedbackState: value });
  };

  changeTab = (activeKey) => {
    this.setState({ tab: activeKey });
  };

  handleChangeAssessment = (row) => {
    const { dataKpis } = this.state;
    const newData = [...dataKpis];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataKpis: newData });
  };

  handleChangeValues = (row) => {
    const { dataValueList } = this.state;
    const newData = [...dataValueList];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataValueList: newData });
  };

  onCheckResult = (e) => {
    const { checked } = e.target;
    this.setState({ checkedFinal: checked });
  }

  doAcknowledge = async () => {
    const {
      match, teamAck, getNotifications
    } = this.props;
    const { params } = match;
    const { acknowledgement, teamName } = this.state;
    const data = {
      userId: params.userId,
      acknowledgement
    };
    confirm({
      title: 'Are you sure?',
      content: `Are you sure want to approve ${teamName}'s Appraisal?`,
      okText: 'Approve',
      onOk: async () => {
        await teamAck(data);
        const { kpiReducers } = this.props;
        if (!kpiReducers.loadingTeamAck) {
          if (kpiReducers.statusTeamAck === Success) {
            this.setState({
              loadingSubmit: true
            });
            this.getData();
            getNotifications();
            message.success(`${teamName}'s Final Result has been sent`);
          } else {
            message.warning(`Sorry, ${kpiReducers.messageTeamAck}`);
          }
        }
      },
      onCancel() {}
    });
  }

  render() {
    const {
      loadingKpis,
      dataKpis,
      dataValueList,
      optionRating,
      loadingMyValue,
      challengeYour,
      tab,
      myStep,
      isFeedback,
      generalFeedbackState,
      teamName,
      checkedFinal,
      acknowledgement,
      loadingSubmit
    } = this.state;
    const {
      form,
      kpiReducers,
      history
    } = this.props;
    const {
      dataKpiMetrics,
      dataProposeRating,
      dataKpiRating,
      currentStep,
      formStatusId,
      status,
      errMessage,
      statusValues,
      messageValues
    } = kpiReducers;
    return (
      <div>
        <div style={{
          ...globalStyle.contentContainer,
          borderRadius: 0,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          paddingBottom: 0
        }}
        >
          <Divider />
          <Skeleton loading={loadingKpis} active paragraph={false} title={{ width: 400 }}>
            <Text strong>{`Appraisal - ${teamName} `}</Text>
            <Text>
              Final end year appraisal score & ratings
            </Text>
          </Skeleton>
          <Divider />
          <center>
            <Row>
              <Col xl={24} md={24} xs={24}>
                <CardRating
                  boxRateColor="inherit"
                  title="Your Rating"
                  rate={dataKpiRating.rating}
                  desc="Your final Rating based on Score"
                />
              </Col>
            </Row>
          </center>
          <br />
          <div>
            <Tabs defaultActiveKey="1" activeKey={tab} onChange={this.changeTab} type="card">
              <TabPane tab="KPI" key="1">
                {(status === Success) || loadingKpis ?
                  <div>
                    <TableKPI
                      form={form}
                      loading={loadingKpis}
                      dataSource={dataKpis}
                      dataMetrics={dataKpiMetrics}
                      isFeedback={isFeedback}
                      myStep={myStep}
                      handleChangeField={this.handleChangeAssessment}
                    />
                    <Form>
                      <Text strong>
                        {(currentStep === stepKpi[5] ||
                        currentStep === stepKpi[6] || formStatusId === '3') ? 'Final Rating : ' : 'Propose Rating : '}
                      </Text>
                      <Form.Item>
                        {dataKpiRating.rating ? form.getFieldDecorator('proposeRating', {
                          rules: [{ required: true, message: 'Propose Rating is required' }],
                          initialValue: dataKpiRating.rating || undefined
                        })(
                          <Select
                            disabled={(currentStep === stepKpi[4] || currentStep === stepKpi[5] ||
                              currentStep === stepKpi[6]) || formStatusId === '3'}
                            style={{ width: 200 }}
                            placeholder="Propose Rating"
                          >
                            {dataProposeRating.map((item, index) => {
                              return <Option key={index} value={item.id}>{item.name}</Option>;
                            })}
                          </Select>
                          ) : <Skeleton active title={{ width: 200 }} paragraph={false} />}
                      </Form.Item>
                    </Form>
                  </div> :
                  <Result
                    status={'error'}
                    title={status}
                    subTitle={`Sorry, ${errMessage}`}
                    extra={[
                      <Button key="back" onClick={() => this.props.history.push('/my-team/appraisal/')}>Back</Button>,
                    ]}
                  />}
              </TabPane>
              <TabPane tab="Values" key="2">
                {(statusValues === Success) || loadingMyValue ?
                  <div>
                    <TableValue
                      form={form}
                      loading={loadingMyValue}
                      dataSource={dataValueList}
                      getOwnValues={this.getOwnValues}
                      handleChangeField={this.handleChangeValues}
                      handleSubmit={this.handleSubmit}
                      goToMonitoring={this.goToMonitoring}
                      handleSave={this.handleSave}
                      myStep={myStep}
                      optionRating={optionRating}
                    />
                    <Form>
                      <Text strong>
                        {(currentStep === stepKpi[5] ||
                        currentStep === stepKpi[6] || formStatusId === '3') ? 'Final Rating : ' : 'Propose Rating : '}
                      </Text>
                      <Form.Item>
                        {dataKpiRating.rating ? form.getFieldDecorator('proposeRating', {
                          rules: [{ required: true, message: 'Propose Rating is required' }],
                          initialValue: dataKpiRating.rating || undefined
                        })(
                          <Select
                            disabled={(currentStep === stepKpi[4] || currentStep === stepKpi[5] ||
                              currentStep === stepKpi[6]) || formStatusId === '3'}
                            style={{ width: 200 }} placeholder="Propose Rating"
                          >
                            {dataProposeRating.map((item, index) => {
                              return <Option key={index} value={item.id}>{item.name}</Option>;
                            })}
                          </Select>
                          ) : <Skeleton active title={{ width: 200 }} paragraph={false} />}
                      </Form.Item>
                    </Form>
                  </div> :
                  <Result
                    status={'error'}
                    title={statusValues}
                    subTitle={`Sorry, ${messageValues}`}
                    extra={[
                      <Button key="back" onClick={() => this.props.history.push('/my-team/appraisal/')}>Back</Button>,
                    ]}
                  />}
              </TabPane>
            </Tabs>
          </div>
        </div>
        {status === Success &&
        <div style={{
          ...globalStyle.contentContainer,
          borderRadius: 0,
          paddingBottom: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          paddingTop: 0
        }}
        >
          <Skeleton loading={loadingKpis} title={{ width: 100 }} paragraph={{ rows: 1 }} active>
            <Text strong>Challenge yourself :</Text>
            <TextArea
              autoSize
              placeholder="Challenge yourself"
              label="Challenge yourself"
              className="challenge-input-disabled"
              value={challengeYour}
            />
          </Skeleton>
        </div>}
        {(currentStep === stepKpi[5] || currentStep === stepKpi[6]) &&
        <div style={{
          ...globalStyle.contentContainer,
          borderRadius: 0,
          paddingTop: 0,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}
        >
          <Spin spinning={loadingSubmit} indicator={<Icon type="loading" />}>
            <div style={{ textAlign: 'left' }}>
              <Checkbox
                onChange={this.onCheckResult}
                checked={currentStep === stepKpi[6] || checkedFinal}
                disabled={currentStep === stepKpi[6]}
              >
                <Text strong>{acknowledgement}</Text>
              </Checkbox>
            </div>
            <br />
            <center>
              <Button
                id="send-final"
                type="primary"
                onClick={this.doAcknowledge}
                style={{ textAlign: 'center' }}
                disabled={currentStep === stepKpi[6] || !checkedFinal}
              >
                {currentStep === stepKpi[5] ? `Send final result to ${teamName}` :
                  stepKpi[6] && `Final result has been sent to ${teamName}`}
              </Button>
            </center>
          </Spin>
        </div> }
        {status === Success &&
        <div style={{
          ...globalStyle.contentContainer,
          background: 'rgb(250, 247, 187)',
          borderRadius: 0,
          paddingTop: 10,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}
        >
          <Text strong>General Feedback :</Text>
          {(myStep) ?
            <TextArea
              autoSize
              placeholder="General Feedback"
              value={generalFeedbackState}
              onChange={this.changeGeneralFeedback}
            />:
            <TextArea
              autoSize
              className="challenge-input-disabled"
              value={generalFeedbackState}
            />}
        </div>}
        {status === Success &&
        <div style={{
          ...globalStyle.contentContainer,
          borderRadius: 0,
          paddingTop: 20,
          paddingBottom: 20
        }}
        >
          <center>
            <Skeleton active loading={loadingKpis || loadingMyValue} paragraph={false} title={{ width: '60%' }}>
              {myStep &&
                <div style={{ textAlign: 'center' }}>
                  <Button
                    id="go-back"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => history.push('/my-team/appraisal/')}
                    style={{ margin: 10 }}
                  >
                    Back
                  </Button>
                  <Button
                    id="save-assessment"
                    onClick={this.handleSendBack}
                    style={{ margin: 10 }}
                  >
                    Send Feedback
                  </Button>
                  <Button
                    id="send-manager"
                    type="primary"
                    onClick={this.handleApprove}
                    style={{ margin: 10 }}
                  >
                    Approve
                  </Button>
                </div>}
              {currentStep === stepKpi[4] &&
                <div style={{
                  textAlign: 'center', paddingTop: 10, lineHeight: 0, margin: 0
                }}
                >
                  <Title
                    level={4}
                    style={{ color: '#61C761', margin: 0 }}
                    ghost
                    strong
                  >
                    {`${teamName}'s Appraisal has been sent to system .`}
                    <br />
                    Waiting for the final Result
                  </Title>
                </div>}
            </Skeleton>
          </center>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers,
  userReducers: state.userReducers,
  step: state.userKpiStateReducers
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  doAssess: (data) => dispatch(doAssessment(data)),
  getValues: (id) => dispatch(getValueList(id)),
  getRatingList: () => dispatch(getRatings()),
  getKpiRating: (id) => dispatch(doGetKpiRating(id)),
  doSaveValues: (id, data) => dispatch(saveValueList(id, data)),
  submitNext: (id) => dispatch(doSubmitNext(id)),
  getProposeRating: () => dispatch(doGetProposeRating()),
  sendBackAppraisal: (id, data) => dispatch(doSendBackAppraisal(id, data)),
  approveAppraisal: (id, data) => dispatch(doApproveAppraisal(id, data)),
  teamAck: (data) => dispatch(doTeamAcknowledge(data)),
  getNotifications: () => dispatch(actionGetNotifications())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appraisal);

export default Form.create({})(withRouter(connectToComponent));

Appraisal.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object),
  getRatingList: PropTypes.func,
  getValues: PropTypes.func,
  getKpiList: PropTypes.func,
  getKpiRating: PropTypes.func,
  match: PropTypes.instanceOf(Object),
  teamAck: PropTypes.func,
  approveAppraisal: PropTypes.func,
  sendBackAppraisal: PropTypes.func,
  getProposeRating: PropTypes.func,
  getNotifications: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object)
};
