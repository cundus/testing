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
  message
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableKPI from './ components/kpi';
import TableValue from './ components/value';
import CardRating from './ components/cardRating';
import {
  doGetKpiList, doAssessment
} from '../../redux/actions/kpi';
import ModalAssessment from './ components/modalAssesment';
import { Success } from '../../redux/status-code-type';

const { Text } = Typography;
const { TabPane } = Tabs;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: true,
      isModalShow: false,
      assessment: '',
      modalRecord: {},
      loadingResult: '',
      qualitativeOption: []
    };
  }

  componentDidMount() {
    this.getKPIData();
  }

  getKPIData = async (e) => {
    const {
      userReducers
    } = this.props;
    const { user } = userReducers.result;
    this.getOwnKpiList(user.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList } = this.props;
    await getKpiList(id);
    const { kpiReducers } = this.props;
    const { dataKpi, dataKpiMetrics } = kpiReducers;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    await dataKpi.map((itemKpi) => {
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
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        rating: itemKpi.rating,
        achievementType: itemKpi.achievementType,
        actualAchievement: itemKpi.actualAchievement,
        actualAchievementText: itemKpi.actualAchievementText,
        metrics: dataKpiMetrics,
        dataMetrics,
        ...dataMetrics
      };
      newData.push(data);
    });
    this.setState({
      dataKpis: newData,
      loadingKpis: false,
      loadingResult: ''
    });
  }

  handleChangeAssessment = (data) => {
    this.setState({ assessment: data.assessment });
  };

  handleSaveAssessment = async (row) => {
    const { assessment } = this.state;
    const { doAssess, form} = this.props;
    const data = {
      achievementType: row.achievementType,
      actualAchievementText: row.achievementType === 0 ? assessment : '',
      actualAchievement: parseFloat(row.achievementType === 1 ? assessment : ''),
      id: row.id
    };
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await doAssess(data);
        const { kpiReducers } = this.props;
        const { loadingAssess, statusAssess, messageAssess } = kpiReducers;
        if (!loadingAssess) {
          if (statusAssess === Success) {
            this.showHideModal(false);
            this.setState({ loadingResult: row.id });
            this.getKPIData();
            message.success('Success Self Assesment');
          } else {
            message.warning(`Sorry, ${messageAssess}`);
          }
        }
      }
    });
  };

  showHideModal = async (isShow, record) => {
    const { form } = this.props;
    if (isShow && record) {
      if (record.achievementType === 0) {
        const dataKeyMetric = Object.keys(record.dataMetrics);
        const newData = [];
        dataKeyMetric.map((item, index) => {
          const data = record[item];
          newData.push(data);
          return data;
        });
        this.setState({
          qualitativeOption: newData
        });
      }
      const data = {
        assessment: record.achievementType === 0 ?
          record.actualAchievementText :
          record.actualAchievement
      };
      this.handleChangeAssessment(data);
      this.setState({
        modalRecord: record
      });
    } else {
      form.resetFields();
    }
    this.setState({
      isModalShow: isShow
    });
  };

  goToMonitoring = () => {
    const { history } = this.props;
    history.push('/monitoring');
  }

  render() {
    const {
      loadingKpis,
      dataKpis,
      isModalShow,
      assessment,
      modalRecord,
      loadingResult,
      qualitativeOption
    } = this.state;
    const {
      form,
      kpiReducers
    } = this.props;
    const {
      dataKpiMetrics,
      loadingAssess
    } = kpiReducers;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Final Appraisal</Text>
          <Text>
            {' Final end year appraisal score & ratings'}
          </Text>
          <Divider />
          <center>
            <Row>
              <Col xl={12} md={12} xs={12} style={{ paddingRight: 10 }}>
                <CardRating boxRateColor="#57EA91" title="Your Score" rate="2.2" desc="Your final KPI Score" />
              </Col>
              <Col xl={12} md={12} xs={12} style={{ paddingLeft: 10 }}>
                <CardRating boxRateColor="#F666B5" title="Your Rating" rate="2.2" desc="Your final Rating" />
              </Col>
            </Row>
          </center>
          <br />
          <div>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="KPI" key="1">
                {!loadingKpis ?
                  <TableKPI
                    form={form}
                    goToMonitoring={this.goToMonitoring}
                    loadingResult={loadingResult}
                    showHideModal={this.showHideModal}
                    dataSource={dataKpis}
                    dataMetrics={dataKpiMetrics}
                  /> : <center><Spin /></center>}
              </TabPane>
              <TabPane tab="VALUE" key="2">
                <TableValue
                  dataOwn={[]}
                />
              </TabPane>
            </Tabs>
            <ModalAssessment
              form={form}
              isModalShow={isModalShow}
              assessment={assessment}
              loadingAssess={loadingAssess}
              qualitativeOption={qualitativeOption}
              modalRecord={modalRecord}
              showHideModal={this.showHideModal}
              handleChangeAssessment={this.handleChangeAssessment}
              handleSaveAssessment={this.handleSaveAssessment}
            />
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
  doAssess: (data) => dispatch(doAssessment(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appraisal);

export default Form.create({})(withRouter(connectToComponent));

Appraisal.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired
};
