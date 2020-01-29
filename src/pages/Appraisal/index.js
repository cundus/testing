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
  Modal
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './ components/kpi';
import TableValue from './ components/value';
import CardRating from './ components/cardRating';
import {
  doGetKpiList, doAssessment, getValueList, getRatings, saveValueList, doGetKpiRating, doSubmitNext
} from '../../redux/actions/kpi';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../redux/status-code-type';

const { Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: true,
      isModalShow: 0,
      loadingResult: false,
      dataValueList: [],
      optionRating: [],
      loadingMyValue: false,
      challengeYour: '',
      tab: '1',
      myStep: false,
      isFeedback: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (e) => {
    const {
      userReducers
    } = this.props;
    const { user } = userReducers.result;
    this.getOwnKpiList(user.userId);
    this.getOwnValues(user.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList, getKpiRating, form } = this.props;
    await getKpiList(id);
    getKpiRating();
    const { kpiReducers } = this.props;
    const {
      dataKpi, dataKpiMetrics, challenge, currentStep
    } = kpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    await dataKpi.map((itemKpi, index) => {
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
      challengeYour: challenge,
      loadingKpis: false,
      loadingResult: false
    });
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
    const { kpiReducers } = this.props;
    const { dataValues, dataRating } = kpiReducers;
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
          url: files.fileContent
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
        rating: ratingCheck.length < 1 ? 'Choose Value' : itemValues.valuesRatingDTO.rating,
        comment: itemValues.valuesRatingDTO.comment,
        attachments: newFiles
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
    const { doAssess, form } = this.props;
    const assessment = [];
    dataKpis.map((item) => {
      const data = {
        achievementType: item.achievementType,
        actualAchievementText: item.achievementType === 0 ? item.assessment : '',
        actualAchievement: parseFloat(item.achievementType === 1 ? item.assessment : ''),
        id: item.id
      };
      assessment.push(data);
      return data;
    });
    const data = {
      assesments: assessment,
      challengeYourself: challengeYour
    };
    form.validateFieldsAndScroll(['dataKpi'], async (err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doAssess(data);
            const { kpiReducers, userReducers } = this.props;
            const { user } = userReducers.result;
            const { loadingAssess, statusAssess, messageAssess } = kpiReducers;
            if (!loadingAssess) {
              if (statusAssess === Success || statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                this.setState({ loadingResult: true });
                this.getOwnKpiList(user.userId);
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

  goToMonitoring = () => {
    const { history } = this.props;
    history.push('/monitoring');
  }

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


  handleSave = () => {
    const {
      doSaveValues, userReducers, form
    } = this.props;
    const { user } = userReducers.result;
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
            await doSaveValues(user.userId, data);
            const { kpiReducers } = this.props;
            if (!kpiReducers.loadingSaveValues) {
              if (kpiReducers.statusSaveValues === Success) {
                message.success('Your Values has been saved');
                this.getOwnValues(user.userId);
              } else {
                message.warning(`Sorry, ${kpiReducers.messageSaveValues}`);
              }
            }
          },
          onCancel() {}
        });
      }
    });
  };


  handleSubmit = () => {
    const { dataKpis, challengeYour } = this.state;
    const {
      doSaveValues, userReducers, form, doAssess, submitNext
    } = this.props;
    const { user } = userReducers.result;
    // assessment
    const assessment = [];
    dataKpis.map((item) => {
      const data = {
        achievementType: item.achievementType,
        actualAchievementText: item.achievementType === 0 ? item.assessment : '',
        actualAchievement: parseFloat(item.achievementType === 1 ? item.assessment : ''),
        id: item.id
      };
      assessment.push(data);
      return data;
    });
    const dataAssessment = {
      assesments: assessment,
      challengeYourself: challengeYour
    };
    // values
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
    const dataValues = {
      ratings: newData
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doAssess(dataAssessment);
            await doSaveValues(user.userId, dataValues);
            const { kpiReducers } = this.props;
            const {
              loadingAssess,
              statusAssess,
              messageAssess
            } = kpiReducers;
            const {
              loadingSaveValues,
              statusSaveValues,
              messageSaveValues
            } = kpiReducers;
            if (!loadingAssess && !loadingSaveValues) {
              if (statusAssess === Success || statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                if (statusSaveValues === Success) {
                  await submitNext(user.userId);
                  this.getData();
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
      isFeedback
    } = this.state;
    const {
      form,
      kpiReducers
    } = this.props;
    const {
      dataKpiMetrics
    } = kpiReducers;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Final Appraisal </Text>
          <Text>
            Final end year appraisal score & ratings
          </Text>
          <Divider />
          <center>
            <Row>
              <Col xl={24} md={24} xs={24}>
                <CardRating
                  boxRateColor="#F666B5"
                  title="Your Rating"
                  rate=""
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
                  <TableKPI
                    form={form}
                    loading={loadingKpis}
                    isModalShow={isModalShow}
                    goToMonitoring={this.goToMonitoring}
                    handleSubmit={this.handleSubmit}
                    changeChallenge={this.changeChallenge}
                    challengeYour={challengeYour}
                    loadingResult={loadingResult}
                    showHideModal={this.showHideModal}
                    dataSource={dataKpis}
                    dataMetrics={dataKpiMetrics}
                    myStep={myStep}
                    isFeedback={isFeedback}
                    handleChangeField={this.handleChangeAssessment}
                    handleSaveAssessment={this.handleSaveAssessment}
                  />
                </div>
              </TabPane>
              <TabPane tab="Values" key="2">
                <TableValue
                  form={form}
                  loading={loadingMyValue}
                  dataSource={dataValueList}
                  getOwnValues={this.getOwnValues}
                  handleChangeField={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  goToMonitoring={this.goToMonitoring}
                  handleSave={this.handleSave}
                  myStep={myStep}
                  optionRating={optionRating}
                />
              </TabPane>
            </Tabs>
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
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  doAssess: (data) => dispatch(doAssessment(data)),
  getValues: (id) => dispatch(getValueList(id)),
  getRatingList: () => dispatch(getRatings()),
  getKpiRating: () => dispatch(doGetKpiRating()),
  doSaveValues: (id, data) => dispatch(saveValueList(id, data)),
  submitNext: (id) => dispatch(doSubmitNext(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appraisal);

export default Form.create({})(withRouter(connectToComponent));

Appraisal.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object),
  doSaveValues: PropTypes.func,
  doAssess: PropTypes.func,
  getRatingList: PropTypes.func,
  getValues: PropTypes.func,
  getKpiList: PropTypes.func,
  getKpiRating: PropTypes.func,
  submitNext: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object)
};
