import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Form,
  Typography,
  Divider,
  Col,
  Row,
  message,
  Modal,
  Checkbox,
  Radio,
  Button,
  Spin,
  Skeleton,
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
  doEmpAcknowledge,
  doEmpAcknowledgeList,
  doAssessmentAll
} from '../../redux/actions/kpi';
import { actionGetNotifications } from '../../redux/actions';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../redux/status-code-type';
import globalStyle from '../../styles/globalStyles';
import stepKpi from '../../utils/stepKpi';
import TextArea from 'antd/lib/input/TextArea';

const { Text, Paragraph, Title } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: true,
      isModalShow: 0,
      loadingResult: 0,
      dataValueList: [],
      optionRating: [],
      loadingMyValue: false,
      challengeYour: '',
      tab: '1',
      myStep: false,
      isFeedback: false,
      dataEmpAckOptions: [],
      finalAck: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (e) => {
    const {
      authReducer
    } = this.props;
    this.getOwnKpiList(authReducer?.userId);
    this.getOwnValues(authReducer?.userId);
  };

  getOwnKpiList = async (id) => {
    const {
      getKpiList, getKpiRating, form, empAcknowledgeList
    } = this.props;
    await getKpiList(id);
    getKpiRating(id);
    const { kpiReducer } = this.props;
    const {
      dataKpi, dataKpiMetrics, challenge, currentStep, formStatusId, status
    } = kpiReducer;
    if (status === Success) {
    if (currentStep === stepKpi[6] || formStatusId === '3') {
      await empAcknowledgeList();
      // eslint-disable-next-line react/destructuring-assignment
      const dataEmpAcks = this.props.kpiReducer.dataEmpAckList.list.map((ack) => {
        return {
          label: ack.value,
          value: ack.value
        };
      });
      this.setState({
        dataEmpAckOptions: dataEmpAcks,
        // eslint-disable-next-line react/destructuring-assignment
        dataEmpAckName: this.props.kpiReducer.dataEmpAckList.name
      });
    }
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
        weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat("0"),
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
      myStep: currentStep !== 'Performance Review Employee',
      dataKpis: dataOrdered,
      challengeYour: challenge === '----------' ? '' : challenge,
      loadingKpis: false,
      loadingResult: 0
    });
    } else {
      this.setState({
        loadingKpis: false,
      })
    }
  }

  getOwnValues = async (id, noLoading) => {
    if (!noLoading) {
      this.setState({
        loadingMyValue: true
      });
    }
    const { getValues, getRatingList, form } = this.props;
    if (!noLoading) {
      await getRatingList();
    }
    await getValues(id);
    const { kpiReducer } = this.props;
    const { dataValues, dataRating } = kpiReducer;
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
      loadingMyValue: false,
      optionRating: dataRating,
      dataValueList: dataOrdered
    });
  }

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

  handleSaveAssessment = async () => {
    const { dataKpis, challengeYour } = this.state;
    const { doAssessAll, form } = this.props;
    const assessment = [];
    dataKpis.map((item) => {
      const data = {
        achievementType: item.achievementType,
        actualAchievementText: item.achievementType === 0 ? item.assessment : '',
        actualAchievement: item.achievementType === 1 ? parseFloat(item.assessment) : 0,
        id: item.id
      };
      assessment.push(data);
      return data;
    });
    const data = {
      assesments: assessment,
      challengeYourself: challengeYour || '----------'
    };
    form.validateFieldsAndScroll(['dataKpi'], async (err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doAssessAll(data);
            const { kpiReducer, authReducer } = this.props;
            const { loadingAssess, statusAssess, messageAssess } = kpiReducer;
            if (!loadingAssess) {
              if (statusAssess === Success || statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                this.setState({
                  loadingKpis: true
                });
                this.getOwnKpiList(authReducer?.userId);
                message.success('Your Assessment has been saved');
                if (statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                  message.warning(`Sorry, ${messageAssess}`);
                }
              } else {
                message.warning(`Sorry, ${messageAssess}`);
              }
            }
          },
          onCancel() {}
        });
      } else {
        message.warning('Sorry, Please fill out all your assessment');
      }
    });
  };

  showHideModal = async (id) => {
    this.setState({
      isModalShow: id
    });
  };

  changeTab = (activeKey) => {
    this.setState({ tab: activeKey });
  };

  feedShow = (status) => {
    this.setState({ isFeedback: status });
  };

  handleChange = (row) => {
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

  handleAssesLoading = (id) => {
    this.setState({
      loadingResult: id
    });
  }


  handleSave = () => {
    const {
      doSaveValues, authReducer, form
    } = this.props;
    const {
      dataValueList
    } = this.state;
    const newData = [];
    dataValueList.map((item) => {
      const data = {
        comment: item.comment,
        rating: item.rating,
        valueId: item.valueId
      };
      newData.push(data);
      return data;
    });
    const data = {
      ratings: newData
    };
    form.validateFieldsAndScroll(['dataGeneral'], (err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSaveValues(authReducer?.userId, data);
            const { kpiReducer } = this.props;
            if (!kpiReducer.loadingSaveValues) {
              if (kpiReducer.statusSaveValues === Success) {
                message.success('Your Values has been saved');
                this.getOwnValues(authReducer?.userId);
              } else {
                message.warning(`Sorry, ${kpiReducer.messageSaveValues}`);
              }
            }
          },
          onCancel() {}
        });
      }
    });
  };

  handleSubmit = async () => {
    const { dataKpis, challengeYour } = this.state;
    const {
      doSaveValues, authReducer, form, doAssessAll, submitNext, getNotifications
    } = this.props;
    // assessment
    const assessment = [];
    dataKpis.map((item) => {
      const data = {
        achievementType: item.achievementType,
        actualAchievementText: item.achievementType === 0 ? item.assessment : '',
        actualAchievement: item.achievementType === 1 ? parseFloat(item.assessment) : 0,
        id: item.id
      };
      assessment.push(data);
      return data;
    });
    const dataAssessment = {
      assesments: assessment,
      challengeYourself: challengeYour || '----------'
    };
    // values
    const {
      dataValueList
    } = this.state;
    const newData = [];
    let valuesErr = false;
    dataValueList.map((item) => {
      const data = {
        comment: item.comment,
        rating: item.rating,
        valueId: item.valueId
      };
      if (!item.rating) {
        valuesErr = true;
      }
      newData.push(data);
      return data;
    });
    const dataValues = {
      ratings: newData
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (valuesErr) {
          message.warning('You need to fill Values before submiting to the manager');
          this.changeTab('2');
          form.validateFields(['dataGeneral']);
        } else {
          confirm({
            title: 'Are you sure?',
            onOk: async () => {
              await doAssessAll(dataAssessment);
              await doSaveValues(authReducer?.userId, dataValues);
              this.setState({
                loadingKpis: true
              });
              const { kpiReducer } = this.props;
              const {
                loadingAssess,
                statusAssess,
                messageAssess
              } = kpiReducer;
              const {
                loadingSaveValues,
                statusSaveValues,
                messageSaveValues
              } = kpiReducer;
              if (!loadingAssess && !loadingSaveValues) {
                if (statusAssess === Success || statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                  if (statusSaveValues === Success) {
                    await submitNext(authReducer?.userId);
                    this.getData();
                    getNotifications();
                    message.success('Your Appraisal has been sent to your Manager');
                    if (statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                      message.warning(`Sorry, ${messageAssess}`);
                    }
                  } else {
                    message.warning(`Sorry, ${messageSaveValues}`);
                  }
                } else {
                  message.warning(`Sorry, ${messageAssess}`);
                }
              }
            },
            onCancel() {}
          });
        }
      } else if (err.dataKpi) {
        message.warning('Please fill out your Assessment');
        this.changeTab('1');
      } else if (err.dataGeneral) {
        message.warning('You need to fill Values before submiting to the manager');
        this.changeTab('2');
      }
    });
  };

  changeChallenge = ({ target: { value } }) => {
    this.setState({ challengeYour: value });
  };

  onCheckFinal = (e) => {
    const { checked } = e.target;
    this.setState({ checkedFinal: checked });
  };

  onChooseFinalAck = (e) => {
    this.setState({
      finalAck: e.target.value
    });
  };

  handleSubmitAck = async () => {
    const { finalAck } = this.state;
    const { empAcknowledge, getNotifications } = this.props;
    confirm({
      title: 'Are you sure?',
      content: '',
      onOk: async () => {
        await empAcknowledge(finalAck);
        const { kpiReducer } = this.props;
        const {
          loadingEmpAck,
          statusEmpAck,
          messageEmpAck
        } = kpiReducer;
        if (!loadingEmpAck) {
          if (statusEmpAck === Success) {
            this.setState({
              loadingKpis: true
            });
            this.getData();
            getNotifications();
            message.success('Your Acknowledgement has been sent');
          } else {
            message.warning(`Sorry, ${messageEmpAck}`);
          }
        }
      },
      onCancel() {}
    });
  };

  render() {
    const {
      loadingKpis,
      dataKpis,
      isModalShow,
      loadingResult,
      dataValueList,
      optionRating,
      loadingMyValue,
      challengeYour,
      tab,
      myStep,
      isFeedback,
      dataEmpAckOptions,
      dataEmpAckName,
      checkedFinal,
      finalAck
    } = this.state;
    const {
      form,
      kpiReducer
    } = this.props;
    const {
      dataKpiMetrics,
      dataKpiRating,
      loadingKpiRating,
      generalFeedback,
      currentStep,
      formStatusId,
      loadingEmpAck,
      status,
      errMessage,
      statusValues,
      messageValues
    } = kpiReducer;
    return (
      <div>
        <div style={{ ...globalStyle.contentContainer, borderRadius: 0, paddingBottom: 10 }}>
          <Divider />
          <Text strong>Final Appraisal </Text>
          <Divider />
          <center>
            <Row>
              <Col xl={24} md={24} xs={24}>
                <CardRating
                  boxRateColor="inherit"
                  title="Your Rating"
                  loading={!loadingKpiRating && dataKpiRating.rating}
                  rate={(currentStep === stepKpi[6] || formStatusId === '3') ? dataKpiRating.rating : 'N/A'}
                  desc="Your final Rating based on Score"
                />
              </Col>
            </Row>
          </center>
          <br />
          <div>
            <Tabs defaultActiveKey="1" activeKey={tab} onChange={this.changeTab} type="card">
              <TabPane tab="KPI" key="1">
                <div>
                {(status === Success) || loadingKpis ?
                  <TableKPI
                    form={form}
                    loading={loadingKpis}
                    isModalShow={isModalShow}
                    handleSubmit={this.handleSubmit}
                    changeChallenge={this.changeChallenge}
                    challengeYour={challengeYour}
                    handleAssesLoading={this.handleAssesLoading}
                    getOwnKpiList={this.getOwnKpiList}
                    loadingResult={loadingResult}
                    showHideModal={this.showHideModal}
                    dataSource={dataKpis}
                    dataMetrics={dataKpiMetrics}
                    myStep={myStep}
                    currentStep={currentStep}
                    isFeedback={isFeedback}
                    formStatusId={formStatusId}
                    feedShow={this.feedShow}
                    proposeRating={dataKpiRating.rating}
                    handleChangeField={this.handleChangeAssessment}
                    handleSaveAssessment={this.handleSaveAssessment}
                  /> :
                  <Result
                    status={'error'}
                    title={status}
                    subTitle={`Sorry, ${errMessage}`}
                    extra={[
                      <Button key="back" onClick={() => this.props.history.push('/my-team/appraisal/')}>Back</Button>,
                    ]}
                  />}
                </div>
              </TabPane>
              <TabPane tab="Values" key="2">
                {(statusValues === Success) || loadingMyValue ?
                <TableValue
                  form={form}
                  loading={loadingMyValue}
                  dataSource={dataValueList}
                  getOwnValues={this.getOwnValues}
                  handleChangeField={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleSave={this.handleSave}
                  currentStep={currentStep}
                  myStep={myStep}
                  optionRating={optionRating}
                /> :
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
        {generalFeedback && generalFeedback.id &&
          <div style={{ ...globalStyle.contentContainer, background: 'rgb(250, 247, 187)', borderRadius: 0 }}>
            <Text strong>General Feedback :</Text>
            <TextArea
              autoSize={{minRows: 3}}
              className="challenge-input-disabled"
              value={generalFeedback.comment}
              readOnly
            />
          </div>}
        <div style={{ ...globalStyle.contentContainer, borderRadius: 0, paddingTop: 5 }}>
          <center>
            {((loadingKpis || loadingMyValue) || (status === Success)) &&
            <Skeleton active loading={loadingMyValue || loadingKpis} paragraph={false} title={{ width: '60%' }}>
              {myStep ?
                <div style={{ textAlign: 'center', margin: 40 }}>
                  {currentStep === stepKpi[3] ?
                    <Title
                      level={4}
                      type="warning"
                      ghost
                      strong
                    >
                      Your Appraisal has been sent to your Manager
                    </Title> : (currentStep === stepKpi[4] || currentStep === stepKpi[5]) &&
                    <Title
                      level={4}
                      style={{ color: '#61C761', margin: 0 }}
                      ghost
                      strong
                    >
                      Your Self Assessment and Values has been approved
                    </Title>}
                </div> :
                <div style={{ textAlign: 'center' }}>
                  {tab === '1' ?
                    <Button
                      id="save-assessment"
                      onClick={this.handleSaveAssessment}
                      style={{ margin: 10 }}
                    >
                      Save Assessment
                    </Button> : tab === '2' &&
                    <Button
                      id="save-values"
                      onClick={this.handleSave}
                      style={{ margin: 10 }}
                    >
                      Save Values
                    </Button>}
                  <Button
                    id="send-manager"
                    type="primary"
                    onClick={this.handleSubmit}
                    style={{ margin: 10 }}
                  >
                    Send To Manager
                  </Button>
                </div>}
            </Skeleton>}
          </center>
          {!loadingEmpAck && currentStep === stepKpi[6] &&
            <Skeleton active loading={loadingKpis} paragraph={false} title={{ width: '40%' }}>
              <Checkbox
                onChange={this.onCheckFinal}
                checked={checkedFinal}
              >
                <Text strong>I fully aware about the final score and rating given from My Supervisor to me</Text>
              </Checkbox>
            </Skeleton>}
          {formStatusId === '3' &&
          <center>
            <Title
              level={4}
              style={{ color: '#61C761', margin: 0 }}
              ghost
              strong
            >
                Your KPI has been completed
            </Title>
          </center>}
        </div>
        {!loadingKpis && currentStep === stepKpi[6] &&
        <Spin spinning={loadingEmpAck}>
          <div style={{
            ...globalStyle.contentContainer,
            borderRadius: 0,
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <Text strong style={{ fontSize: 18 }}>{dataEmpAckName}</Text>
            <br />
            <div>
              <Radio.Group
                value={finalAck}
                onChange={this.onChooseFinalAck}
                disabled={!checkedFinal}
                size="large"
                buttonStyle="solid"
              >
                {dataEmpAckOptions.map((ack) => (
                  <div
                    style={{
                      whiteSpace: 'break-spaces',
                      display: 'flex',
                      alignSelf: 'center'
                    }}
                  >
                    <Radio
                      value={ack.value}
                    >
                      {ack.label}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <br />
            <br />
            <Button
              onClick={this.handleSubmitAck}
              type="primary"
              disabled={finalAck === '' && !checkedFinal}
            >
              Submit
            </Button>
          </div>
        </Spin>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducer: state.kpiReducer,
  authReducer: state.authReducer
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  doAssess: (data) => dispatch(doAssessment(data)),
  doAssessAll: (data) => dispatch(doAssessmentAll(data)),
  getValues: (id) => dispatch(getValueList(id)),
  getRatingList: () => dispatch(getRatings()),
  getNotifications: () => dispatch(actionGetNotifications()),
  getKpiRating: (id) => dispatch(doGetKpiRating(id)),
  doSaveValues: (id, data) => dispatch(saveValueList(id, data)),
  submitNext: (id) => dispatch(doSubmitNext(id)),
  empAcknowledge: (data) => dispatch(doEmpAcknowledge(data)),
  empAcknowledgeList: () => dispatch(doEmpAcknowledgeList())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appraisal);

export default Form.create({})(withRouter(connectToComponent));

Appraisal.propTypes = {
  kpiReducer: PropTypes.instanceOf(Object),
  doSaveValues: PropTypes.func,
  // doAssess: PropTypes.func,
  getRatingList: PropTypes.func,
  getValues: PropTypes.func,
  getKpiList: PropTypes.func,
  getKpiRating: PropTypes.func,
  submitNext: PropTypes.func,
  empAcknowledge: PropTypes.func,
  getNotifications: PropTypes.func,
  empAcknowledgeList: PropTypes.func,
  userReducer: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object),
  doAssessAll: PropTypes.func
};
