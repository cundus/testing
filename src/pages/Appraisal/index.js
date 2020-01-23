import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Form,
  Typography,
  Divider,
  Col,
  Row,
  Spin,
  message,
  Modal,
  Button,
  Input
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './ components/kpi';
import TableValue from './ components/value';
import CardRating from './ components/cardRating';
import {
  doGetKpiList, doAssessment, getValueList, getRatings, saveValueList
} from '../../redux/actions/kpi';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../redux/status-code-type';

const { Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;
const { TextArea } = Input;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: true,
      isModalShow: false,
      loadingResult: '',
      dataValueList: [],
      optionRating: [],
      loadingMyValue: false,
      challengeYour: ''
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
    const { getKpiList } = this.props;
    await getKpiList(id);
    const { kpiReducers } = this.props;
    const { dataKpi, dataKpiMetrics, challenge } = kpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    await dataKpi.map((itemKpi, index) => {
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
        ...dataMetrics
      };
      newData.push(data);
    });
    const dataOrdered = await newData.sort((a, b) => {
      return a.id - b.id;
    });
    this.setState({
      dataKpis: dataOrdered,
      challengeYour: challenge,
      loadingKpis: false,
      loadingResult: false
    });
  }

  getOwnValues = async (id) => {
    this.setState({
      loadingMyValue: true
    });
    const { getValues, getRatingList } = this.props;
    await getValues(id);
    await getRatingList();
    const { kpiReducers } = this.props;
    const { dataValues, dataRating } = kpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    await dataValues.map((itemValues, index) => {
      const ratingCheck = dataRating.filter((itemRating) => itemRating.id === itemValues.valuesRatingDTO.rating);
      const data = {
        key: itemValues.id,
        valueId: itemValues.id,
        index,
        orderId: itemValues.orderId,
        name: itemValues.name,
        rating: ratingCheck.length < 1 ? '' : itemValues.valuesRatingDTO.rating,
        comment: itemValues.valuesRatingDTO.comment
      };
      newData.push(data);
    });
    const dataOrdered = await newData.sort((a, b) => {
      return a.orderId - b.orderId;
    });
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
            const { kpiReducers } = this.props;
            await doSaveValues(user.userId, data);
            // eslint-disable-next-line react/destructuring-assignment
            if (this.props.kpiReducers.statusSaveValues === Success) {
              message.success('Your Values has been saved');
              this.getOwnValues(user.userId);
            } else {
              message.warning(`Sorry, ${kpiReducers.messageSaveValues}`);
            }
          },
          onCancel() {}
        });
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
      challengeYour
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
                  rate="2.2"
                  desc="Your final Rating based on Score"
                />
              </Col>
            </Row>
          </center>
          <br />
          <div>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="KPI" key="1">
                {!loadingKpis ?
                  <div>
                    <TableKPI
                      form={form}
                      isModalShow={isModalShow}
                      goToMonitoring={this.goToMonitoring}
                      loadingResult={loadingResult}
                      showHideModal={this.showHideModal}
                      dataSource={dataKpis}
                      dataMetrics={dataKpiMetrics}
                      handleChangeField={this.handleChangeAssessment}
                    />
                    <div>
                      <Text strong>Challenge yourself :</Text>
                      <TextArea
                        id="challenge-input"
                        placeholder="Challenge yourself"
                        label="Challenge yourself"
                        value={challengeYour}
                        onChange={this.changeChallenge}
                      />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Button
                        id="go-monitoring"
                        onClick={this.goToMonitoring}
                        style={{ margin: 10 }}
                      >
                        Go To Monitoring
                      </Button>
                      <Button
                        id="save-assessment"
                        onClick={this.handleSaveAssessment}
                        style={{ margin: 10 }}
                      >
                        Save Assessment
                      </Button>
                      <Button
                        id="send-manager"
                        type="primary"
                        style={{ margin: 10 }}
                      >
                        Send To Manager
                      </Button>
                    </div>
                  </div> : <center><Spin /></center>}
              </TabPane>
              <TabPane tab="Values" key="2">
                {!loadingMyValue ? <TableValue
                  form={form}
                  loading={loadingMyValue}
                  dataSource={dataValueList}
                  handleChangeField={this.handleChange}
                  goToMonitoring={this.goToMonitoring}
                  handleSave={this.handleSave}
                  optionRating={optionRating}
                /> : <center><Spin /></center>}
              </TabPane>
            </Tabs>
            {/* <ModalAssessment
              form={form}
              isModalShow={isModalShow}
              assessment={assessment}
              loadingAssess={loadingAssess}
              qualitativeOption={qualitativeOption}
              modalRecord={modalRecord}
              showHideModal={this.showHideModal}
              handleChangeAssessment={this.handleChangeAssessment}
              handleSaveAssessment={this.handleSaveAssessment}
            /> */}
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
  doSaveValues: (id, data) => dispatch(saveValueList(id, data))
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
  userReducers: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object)
};
