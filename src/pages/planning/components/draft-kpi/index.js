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
import {
  actionGetKPI, actionSaveKpi, actionSubmitKpi, actionGetNotifications
} from '../../../../redux/actions';
import { Success, FAILED_SAVE_CHALLENGE_YOURSELF } from '../../../../redux/status-code-type';
import globalStyle from '../../../../styles/globalStyles';
import { getChallengeYourselfChecker, sendChallengeYourselfChecker } from '../../../../utils/challengeYourselfChecker';
import kpiSendProcess from '../../../../utils/kpiSendProcess';
import { toast } from 'react-toastify'

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
      isFeedback: true
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const {
      authReducer, getKpiList, access, setAccess
    } = this.props;
    if (access) {
      await getKpiList(authReducer?.userId);
    }
    setAccess(true);
    const { ownkpiReducer } = this.props;
    const { dataKpiFiltered, challenge, isFeedback } = ownkpiReducer;
    this.setState({
      dataSource: dataKpiFiltered,
      isFeedback,
      challengeYour: getChallengeYourselfChecker(challenge)
    });
    this.liveCount(dataKpiFiltered);
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
      doSubmitKpi, authReducer, form, ownkpiReducer, stepChange, getNotifications, doSavingKpi
    } = this.props;
    const { dataKpi, dataKpiMetrics } = ownkpiReducer;
    const {
      dataSource,
      kpiErr,
      kpiErrMessage,
      challengeYour
    } = this.state;
    const newDataKpi = kpiSendProcess(dataSource, dataKpi, dataKpiMetrics);
    const data = {
      kpiList: newDataKpi,
      challengeYourSelf: sendChallengeYourselfChecker(challengeYour)
    };
    if (newDataKpi.length > 20) {
      toast.warn('Maximum KPI is 20');
    } else if (kpiErr) {
      toast.warn(kpiErrMessage);
    } else {
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          confirm({
            title: 'Are you sure?',
            onOk: async () => {
              if (authReducer?.managerId) {
                await doSubmitKpi(data, authReducer?.userId);
                const { submitKpi } = this.props;
                const { status, statusMessage } = submitKpi;
                if (status === Success) {
                  stepChange(2, true); // go to submit page
                  getNotifications();
                  toast.success('Your KPI has been submitted to your superior');
                } else {
                  toast.warn(`Sorry, ${statusMessage}`);
                }
              } else {
                await doSavingKpi(data, authReducer?.userId);
                const { saveKpi } = this.props;
                const { status, statusMessage } = saveKpi;
                if (status === Success || status === FAILED_SAVE_CHALLENGE_YOURSELF) {
                  toast.success('Your KPI has been saved');
                  this.getAllData();
                  if (status === FAILED_SAVE_CHALLENGE_YOURSELF) {
                    toast.warn(`Sorry, ${statusMessage}`);
                  }
                } else {
                  toast.warn(`Sorry, ${statusMessage}`);
                }
              }
            },
            onCancel() {}
          });
        }
      });
    }
  };

  handleChange = (row) => {
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

  handleSaveDraft = () => {
    const {
      doSavingKpi, authReducer, form, ownkpiReducer
    } = this.props;
    const { dataKpi, dataKpiMetrics } = ownkpiReducer;
    const {
      dataSource,
      challengeYour
    } = this.state;
    const newDataKpi = kpiSendProcess(dataSource, dataKpi, dataKpiMetrics);
    const data = {
      kpiList: newDataKpi,
      challengeYourSelf: sendChallengeYourselfChecker(challengeYour)
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: 'Are you sure?',
          onOk: async () => {
            await doSavingKpi(data, authReducer?.userId);
            const { saveKpi } = this.props;
            const { status, statusMessage } = saveKpi;
            if (status === Success || status === FAILED_SAVE_CHALLENGE_YOURSELF) {
              toast.success('Your KPI has been saved');
              this.getAllData();
              if (status === FAILED_SAVE_CHALLENGE_YOURSELF) {
                toast.warn(`Sorry, ${statusMessage}`);
              }
            } else {
              toast.warn(`Sorry, ${statusMessage}`);
            }
          },
          onCancel() {}
        });
      } else if (err.dataKpi) {
        toast.warn(`Please correctly fill your KPI`);
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
    const {
      ownkpiReducer, stepChange, form, authReducer
    } = this.props;
    const { loadingKpi, dataKpiMetrics, generalFeedback } = ownkpiReducer;
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
                  autoSize={{ minRows: 3 }}
                  placeholder="Challenge yourself"
                  value={challengeYour}
                  onChange={changeChallenge}
                />
              </div> : <center><Spin /></center>}
          </div>
        </div>
        {generalFeedback.comment &&
          <div style={{ ...globalStyle.contentContainer, background: 'rgb(250, 247, 187)', borderRadius: 0 }}>
            <Text strong>General Feedback :</Text>
            <TextArea
              autoSize={{ minRows: 3 }}
              className="challenge-input-disabled"
              value={generalFeedback.comment}
              readOnly
            />
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
          {authReducer?.managerId &&
          <Button
            id="submit-superior"
            onClick={handleSubmit}
            type="primary" style={{ margin: 10 }}
          >
            Submit To Superior
          </Button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ownkpiReducer: state.ownKpi,
  managerkpiReducer: state.managerKpi,
  savekpiReducer: state.saveKpi,
  authReducer: state.authReducer,
  submitKpi: state.submitKpi,
  saveKpi: state.saveKpi
});

const mapDispatchToProps = (dispatch) => ({
  doSavingKpi: (data, id) => dispatch(actionSaveKpi(data, id)),
  doSubmitKpi: (data, id) => dispatch(actionSubmitKpi(data, id)),
  getKpiList: (id) => dispatch(actionGetKPI(id)),
  getNotifications: () => dispatch(actionGetNotifications())
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftKPI);

export default Form.create({})(withRouter(connectToComponent));

DraftKPI.propTypes = {
  ownkpiReducer: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getNotifications: PropTypes.func,
  getKpiList: PropTypes.func,
  doSubmitKpi: PropTypes.func,
  setAccess: PropTypes.func,
  access: PropTypes.bool,
  saveKpi: PropTypes.instanceOf(Object),
  submitKpi: PropTypes.instanceOf(Object),
  authReducer: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object)
};
