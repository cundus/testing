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
import { doSaveKpi, doGetKpiList, doSubmitNext } from '../../../../redux/actions/kpi';
import { Success } from '../../../../redux/status-code-type';

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
    const { userReducers, getKpiList, form } = this.props;
    const { user } = userReducers.result;
    await getKpiList(user.userId);
    const { kpiReducers } = this.props;
    const { dataKpi, challenge } = kpiReducers;
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
        typeKpi: 'Self KPI',
        kpi: itemKpi.name,
        baseline: itemKpi.baseline,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
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
      challengeYour: challenge
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
      doSavingKpi, userReducers, stepChange, form, submitNext
    } = this.props;
    const { user } = userReducers.result;
    const {
      dataSource,
      kpiErr,
      kpiErrMessage,
      challengeYour
    } = this.state;
    const newDataKpi = [];
    // eslint-disable-next-line array-callback-return
    dataSource.map((itemKpi) => {
      const data = {
        id: itemKpi.id,
        baseline: itemKpi.baseline,
        name: itemKpi.kpi,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metricLookup: [
          {
            label: 'L1',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L1 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L1 : '')
          },
          {
            label: 'L2',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L2 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L2 : '')
          },
          {
            label: 'L3',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L3 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L1 : '')
          }]
      };
      newDataKpi.push(data);
    });
    const data = {
      challangeYourSelf: challengeYour,
      kpiList: newDataKpi
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
              const { kpiReducers } = this.props;
              if (kpiReducers.statusSaveKPI === Success) {
                message.success('Your KPI has been submitted to supervisor');
                submitNext(user.userId);
                stepChange(2, true); // go to submit page
              } else {
                message.warning(`Sorry, ${kpiReducers.messageSaveKPI}`);
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
    const { doSavingKpi, userReducers, form } = this.props;
    const { user } = userReducers.result;
    const {
      dataSource,
      challengeYour
    } = this.state;
    const newDataKpi = [];
    // eslint-disable-next-line array-callback-return
    dataSource.map((itemKpi) => {
      const data = {
        id: itemKpi.id,
        baseline: itemKpi.baseline,
        name: itemKpi.kpi,
        weight: itemKpi.weight,
        achievementType: itemKpi.achievementType,
        metricLookup: [
          {
            label: 'L1',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L1 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L1 : '')
          },
          {
            label: 'L2',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L2 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L2 : '')
          },
          {
            label: 'L3',
            achievementText: itemKpi.achievementType === 0 ? itemKpi.L3 : '',
            achievementNumeric: parseFloat(itemKpi.achievementType === 1 ? itemKpi.L1 : '')
          }]
      };
      newDataKpi.push(data);
    });
    const data = {
      challangeYourSelf: challengeYour,
      kpiList: newDataKpi
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, user.userId);
            this.getAllData();
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
            <TableDrafKPI
              form={form}
              dataMetrics={dataKpiMetrics}
              isFeedback={isFeedback}
              dataSource={dataSource}
              handleError={handleError}
              handleChange={handleChange}
              handleDelete={handleDelete}
            /> : <center><Spin /></center>}
          <div>
            <Text>Challenge yourself :</Text>
            <TextArea
              id="challenge-input"
              placeholder="Challenge yourself"
              label="Challenge yourself"
              value={challengeYour}
              onChange={changeChallenge}
            />
          </div>
          {isFeedback &&
            <div style={{
              marginTop: 20,
              paddingBottom: 10,
              paddingTop: 10,
              backgroundColor: 'rgb(250, 247, 187)',
              overflow: 'hidden'
            }}
            >
              <Text strong>General Feedback :</Text>
              <Paragraph>{generalFeedback.comment}</Paragraph>
            </div>}
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
              type="primary" style={{ margin: 10 }}
            >
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
  doSavingKpi: (data, id) => dispatch(doSaveKpi(data, id)),
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  submitNext: (id) => dispatch(doSubmitNext(id))
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
