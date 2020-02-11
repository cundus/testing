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
import TableDrafKPI from './table-draf-kpi';
import { actionGetKPI, actionSaveKpi, actionSubmitKpi } from '../../../../redux/actions';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../../../redux/status-code-type';
import globalStyle from '../../../../styles/globalStyles';

const { confirm } = Modal;
const { Text, Paragraph } = Typography;
const { TextArea } = Input;

class DraftKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0,
      weightTotalErr: false,
      challengeYour: '',
      kpiErr: false,
      isFeedback: false
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const {
      userReducers, getKpiList, form, access, setAccess
    } = this.props;
    const { user } = userReducers.result;
    if (access) {
      await getKpiList(user.userId);
    }
    setAccess(true);
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
        feedback: itemKpi.othersRatingComments.comment
      };
      newData.push(data);
    });
    form.getFieldValue({
      dataKpi: newData
    });
    this.setState({
      dataSource: newData,
      challengeYour: challenge || ' '
    });
    this.liveCount(newData);
  };

  liveCount = (data) => {
    let totalWeight = 0;
    // eslint-disable-next-line array-callback-return
    data.map((itemKpi) => {
      if (itemKpi.weight) {
        const weight = parseFloat(itemKpi.weight);
        if (weight) {
          totalWeight += weight;
        }
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
      doSubmitKpi, userReducers, form, kpiReducers, stepChange
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
      challengeYourSelf: challengeYour || ' '
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
              await doSubmitKpi(data, user.userId);
              // eslint-disable-next-line react/destructuring-assignment
              if (this.props.kpiReducers.statusSaveKPI === Success || this.props.kpiReducers.statusSaveKPI === FAILED_SAVE_CHALLENGE_YOURSELF) {
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
      challengeYourSelf: challengeYour || ' '
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

  render() {
    const {
      dataSource, weightTotal, weightTotalErr, challengeYour, isFeedback
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
    const { loadingKpi, dataKpiMetrics, generalFeedback } = kpiReducers;
    return (
      <div>
        <div style={{ ...globalStyle.contentContainer, borderRadius: 0 }}>
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
            {!loadingKpi ?
              <div>
                <TableDrafKPI
                  form={form}
                  dataMetrics={dataKpiMetrics}
                  isFeedback={isFeedback}
                  dataSource={dataSource}
                  handleError={handleError}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                />
                <Text strong>Challenge yourself :</Text>
                <TextArea
                  id="challenge-input"
                  placeholder="Challenge yourself"
                  label="Challenge yourself"
                  value={challengeYour}
                  onChange={changeChallenge}
                />
              </div> : <center><Spin /></center>}
          </div>
        </div>
        {generalFeedback.comment &&
          <div style={{ ...globalStyle.contentContainer, background: 'rgb(250, 247, 187)', borderRadius: 0 }}>
            <Text strong>General Feedback :</Text>
            <Paragraph>{generalFeedback.comment}</Paragraph>
          </div>}
        <div style={{
          ...globalStyle.contentContainer,
          textAlign: 'center',
          borderRadius: 0,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}
        >
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
            type="primary" style={{ margin: 10 }}
          >
            Submit To Superior
          </Button>
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
  doSavingKpi: (data, id) => dispatch(actionSaveKpi(data, id)),
  doSubmitKpi: (data, id) => dispatch(actionSubmitKpi(data, id)),
  getKpiList: (id) => dispatch(actionGetKPI(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftKPI);

export default Form.create({})(withRouter(connectToComponent));

DraftKPI.propTypes = {
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  userReducers: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
