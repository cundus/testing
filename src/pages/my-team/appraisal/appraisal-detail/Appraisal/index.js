
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
  Input,
  Skeleton,
  Button,
  Spin,
  Icon
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './ components/kpi';
import TableValue from './ components/value';
import CardRating from './ components/cardRating';
import {
  doGetKpiList, doAssessment, getValueList, getRatings, saveValueList, doGetKpiRating, doSubmitNext
} from '../../../../../redux/actions/kpi';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../../../../redux/status-code-type';
import globalStyle from '../../../../../styles/globalStyles';

const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;
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
      isFeedback: false,
      generalFeedbackState: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (e) => {
    const {
      match
    } = this.props;
    const { params } = match;
    console.log(match);
    
    this.getOwnKpiList(params.userId);
    this.getOwnValues(params.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList, getKpiRating, form } = this.props;
    await getKpiList(id);
    getKpiRating();
    const { kpiReducers } = this.props;
    const {
      dataKpi, dataKpiMetrics, challenge, currentStep, generalFeedback
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
      generalFeedbackState: generalFeedback.comment,
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

  changeGeneralFeedback = ({ target: { value } }) => {
    this.setState({ generalFeedbackState: value });
  };

  changeTab = (activeKey) => {
    this.setState({ tab: activeKey });
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
      generalFeedbackState
    } = this.state;
    const {
      form,
      kpiReducers
    } = this.props;
    const {
      dataKpiMetrics,
      generalFeedback
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
        <div style={{
          ...globalStyle.contentContainer,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0
        }}
        >
          <center>
            <Skeleton active loading={loadingKpis || loadingMyValue} paragraph={false} title={{ width: '60%' }}>
              <div style={{ textAlign: 'center' }}>
                <Button
                  id="go-monitoring"
                  // onClick={goToMonitoring}
                  style={{ margin: 10 }}
                >
                  Back
                </Button>
                <Button
                  id="save-assessment"
                  // onClick={handleSaveAssessment}
                  style={{ margin: 10 }}
                >
                  Save & Send Feedback
                </Button>
                <Button
                  id="send-manager"
                  type="primary"
                  // onClick={handleSubmit}
                  style={{ margin: 10 }}
                >
                  Approve
                </Button>
              </div>
            </Skeleton>
          </center>
        </div>
        <Spin spinning={loadingKpis && loadingMyValue} indicator={<Icon type="" />}>
          <div style={{
            ...globalStyle.contentContainer,
            borderRadius: 0,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingTop: 0,
            paddingBottom: 10
          }}
          >
            <Text strong>Challenge yourself :</Text>
            {/* <Paragraph>{generalFeedback.comment}</Paragraph> */}
            <TextArea
              id="challenge-input"
              placeholder="Challenge yourself"
              label="Challenge yourself"
              value={challengeYour}
              disabled
              // onChange={changeChallenge}
            />
          </div>
          <div style={{
            ...globalStyle.contentContainer,
            background: 'rgb(250, 247, 187)',
            borderRadius: 0,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
          }}
          >
            <Text strong>General Feedback :</Text>
            <TextArea
              id="challenge-input"
              placeholder="General Feedback"
              label="Challenge yourself"
              style={{ background: '#EDEAA6', border: 0 }}
              value={generalFeedbackState}
              // disabled
              onChange={this.changeGeneralFeedback}
            />
            {/* <Paragraph>{generalFeedback.comment}</Paragraph> */}
          </div>
        </Spin>
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
  match: PropTypes.instanceOf(Object),
  userReducers: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object)
};
