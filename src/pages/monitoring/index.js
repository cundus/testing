import React, { Component } from "react";
import {
  Button,
  Modal,
  Typography,
  Divider,
  Input,
  Spin,
  Form,
  Result,
  Icon,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TableKPI from "./kpi";
import { doGetKpiList, doGetLatestGoalKpi } from "../../redux/actions/kpi";
import {
  FAILED_SAVE_CHALLENGE_YOURSELF,
  Success,
} from "../../redux/status-code-type";
import globalStyle from "../../styles/globalStyles";
import stepKpi, { stepKpiMonitoring } from "../../utils/stepKpi";
import { doReviseKPI } from "../../redux/actions/monitoring";
import { toast } from "react-toastify";

import { sendChallengeYourselfChecker } from "../../utils/challengeYourselfChecker";
import kpiSendProcess from "../../utils/kpiSendProcess";
import "./style.css";
import { actionSaveKpiPartial } from "../../redux/actions/kpi/saveKpi";

const { confirm } = Modal;
const { Text, Title } = Typography;
const { TextArea } = Input;

class MonitorKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0,
      weightTotalErr: false,
      challengeYour: "",
      kpiErr: false,
      isFeedback: false,
      userId: "",
      isSuperior: false,
      editableRow: null,
    };
  }

  componentDidMount() {
    const { authReducer, match, step } = this.props;
    const { params } = match;
    if (authReducer?.userId === params.userId) {
      if (step.currentStep === stepKpi[0] || step.currentStep === stepKpi[1]) {
        this.props.history.push("/planning/kpi");
      } else if (step.currentStep === stepKpi[2]) {
        this.props.history.push("/monitoring");
      } else {
        this.props.history.push("/appraisal");
      }
    } else {
      this.getAllData();
    }
  }

  getAllData = async () => {
    const { authReducer, getKpiList, getLatestGoalKpi, match } = this.props;
    const { params } = match;
    const { userId } = params;
    getLatestGoalKpi();
    if (userId) {
      await getKpiList(userId);
      await this.setState({
        isSuperior: true,
      });
    } else {
      await getKpiList(authReducer?.userId);
      this.setState({
        isSuperior: false,
      });
    }
    const { kpiReducer } = this.props;
    const { dataKpi, challenge, dataKpiMetrics, status } = kpiReducer;
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
              dataMetrics[newDataMetric] = `${
                itemKpi.achievementType === 0
                  ? metric.achievementText
                  : metric.achievementNumeric
              }`;
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
          weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat("0"),
          achievementType: itemKpi.achievementType,
          metrics: dataKpiMetrics,
          ...dataMetrics,
          // feedback: itemKpi.othersRatingComments.comment
        };
        newData.push(data);
      });
      this.setState({
        dataSource: newData,
        userId: authReducer?.userId,
        challengeYour: challenge === "----------" ? "" : challenge,
      });
      this.liveCount(newData);
    } else {
      this.props.history.push("/my-team/monitoring");
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
    if (typeof totalWeight === "number") {
      if (totalWeight === 100) {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: false,
          kpiErr: false,
          kpiErrMessage: "",
        });
      } else {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: true,
          kpiErr: true,
          kpiErrMessage: "Sorry, Total KPI Weight must be 100%",
        });
      }
    }
  };

  handleChange = (row) => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
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
        kpiErrMessage: "Sorry, Total KPI Weight must be 100%",
      });
    } else {
      this.setState({
        kpiErr: false,
        kpiErrMessage: "",
      });
    }
  };

  handleDelete = (key) => {
    const { form } = this.props;
    const { dataSource } = this.state;
    const data = [...dataSource];
    const newData = data.filter((item) => item.key !== key);
    this.setState({
      dataSource: newData,
    });
    const dataKpiCheck = form.getFieldsValue(["dataKpi"]);
    if (dataKpiCheck) {
      form.setFieldsValue({
        dataKpi: newData,
      });
    }
    this.liveCount(newData);
  };

  handleConfirm = (id) => {
    confirm({
      content:
        "By edit this KPI, system will remove selected KPI result data. Are you sure want to continue ?",
      title: "Are you sure you want to edit this KPI?",
      icon: <Icon type="exclamation-circle" />,
      className: "editMonitoringModal",
      okButtonProps: {
        style: {
          backgroundColor: "#FF2222",
          color: "white",
          border: "1px solid #FF2222",
          marginLeft: "45px",
        },
      },
      cancelButtonProps: {
        style: {
          marginRight: "45px",
        },
      },
      onOk: async () => {
        await this.setState({
          editableRow: id,
        });
      },
      onCancel() {},
    });
  };

  handleRevise = () => {
    const { doRevisingKPI, kpiReducer } = this.props;
    confirm({
      title: "Are you sure?",
      onOk: async () => {
        await doRevisingKPI(kpiReducer?.user?.userId);
        // eslint-disable-next-line react/destructuring-assignment
        if (this.props.monitoring.status === Success) {
          toast.success("Your employee KPI has been sent to revise");
          this.getAllData();
        } else {
          toast.warn(`Sorry, ${this.props.monitoring.message}`);
        }
      },
      onCancel() {},
    });
  };

  handleCancel = async () => {
    await this.setState({
      editableRow: null,
    });
  };

  handleSave = async (index) => {
    const { doSavingKpi, authReducer, form, ownkpiReducer } = this.props;
    const { dataSource, weightTotalErr } = this.state;
    const { challenge, dataKpi, dataKpiMetrics } = ownkpiReducer;
    let dataSaving = [...dataSource];
    const newDataKpi = kpiSendProcess(dataSaving, dataKpi, dataKpiMetrics);
    const data = {
      kpiList: [...newDataKpi[index]],
      challengeYourSelf: sendChallengeYourselfChecker(challenge),
    };
    if (weightTotalErr) {
      toast.warn("Sorry, Total KPI Weight must be 100%");
    } else {
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          confirm({
            content:
              "By saving this KPI, system will remove selected KPI result data. Are you sure want to continue ?",
            title: "Are you sure you want to save this changes KPI?",
            icon: <Icon type="exclamation-circle" />,
            className: "editAppraisalModal",
            onOk: async () => {
              try {
                await doSavingKpi(data, authReducer.userId);
                const { savekpiReducer } = this.props;
                const { status, statusMessage } = savekpiReducer;
                if (
                  status === Success ||
                  status === FAILED_SAVE_CHALLENGE_YOURSELF
                ) {
                  toast.success("Your KPI has been saved");
                  this.setState({ editableRow: null });
                } else {
                  toast.warn(`Sorry, ${statusMessage}`);
                }
              } catch (error) {
                console.log(error);
              }
            },
            onCancel() {},
          });
        } else if (err.dataKpi) {
          toast.warn(`Please correctly fill your KPI`);
        }
      });
    }
  };

  render() {
    const {
      dataSource,
      weightTotal,
      weightTotalErr,
      challengeYour,
      isFeedback,
      userId,
      isSuperior,
      editableRow,
    } = this.state;
    const {
      handleChange,
      handleDelete,
      handleError,
      handleSave,
      handleCancel,
      handleConfirm,
    } = this;
    const { kpiReducer, form } = this.props;
    const {
      loadingKpi,
      dataKpiMetrics,
      dataGoal,
      currentStep,
      user,
      status,
      errMessage,
    } = kpiReducer;
    const { name } = dataGoal;
    const stafname = isSuperior ? `${user?.firstName} ${user?.lastName}` : "";
    const stafid = user?.userId;

    if (status === Success || loadingKpi) {
      return (
        <div style={globalStyle.contentContainer}>
          <div>
            <Divider />
            <Text strong> Monitoring KPI - {stafname} </Text>
            <Text>{` Monitoring your KPI.`}</Text>
            <Divider />
            <center>
              <Title level={4}>{name || ""}</Title>
              <br />
            </center>
          </div>
          {!loadingKpi ? (
            <div style={{ marginBottom: 5 }}>
              <Text type={weightTotalErr ? "danger" : ""}>
                Total KPI Weight :{` ${weightTotal}%`}
              </Text>
              <TableKPI
                form={form}
                dataMetrics={dataKpiMetrics}
                isFeedback={isFeedback}
                dataSource={dataSource}
                handleError={handleError}
                handleChange={handleChange}
                handleSave={handleSave}
                handleDelete={handleDelete}
                userId={userId}
                isEditable={currentStep === stepKpiMonitoring[0]}
                isSuperior={isSuperior}
                stafid={stafid}
                editableRow={editableRow}
                // handleEditRow={(id) => this.setState({ editableRow: id })}
                handleEditRow={handleConfirm.bind(this)}
                handleCancel={handleCancel}
              />
              <div>
                <Text strong className="label-challenge">
                  Challenge Yourself :
                </Text>
                <TextArea
                  autoSize={{ minRows: 3 }}
                  className="challenge-input-disabled"
                  value={challengeYour}
                  readOnly
                />
              </div>
              <div style={{ textAlign: "center" }}>
                {isSuperior && (
                  <Button
                    style={{ margin: 10, marginRight: 0 }}
                    type="default"
                    onClick={() =>
                      this.props.history.push("/my-team/monitoring/")
                    }
                  >
                    Back
                  </Button>
                )}
                {isSuperior && currentStep === stepKpiMonitoring[0] && (
                  <Button
                    style={{ margin: 10 }}
                    type="primary"
                    onClick={this.handleRevise}
                  >
                    Revise KPI
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <center>
              <Spin />
            </center>
          )}
        </div>
      );
    } else {
      return (
        <div style={globalStyle.contentContainer}>
          <Result
            status={"error"}
            title={status}
            subTitle={`Sorry, ${errMessage}`}
            extra={[
              <Button
                key="back"
                onClick={() => this.props.history.push("/my-team/appraisal/")}
              >
                Back
              </Button>,
            ]}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  ownkpiReducer: state.ownKpi,
  savekpiReducer: state.saveKpi,
  kpiReducer: state.kpiReducer,
  authReducer: state.authReducer,
  step: state.userKpiStateReducer,
  monitoring: state.monitoringReducer,
});

const mapDispatchToProps = (dispatch) => ({
  doSavingKpi: (data, id) => dispatch(actionSaveKpiPartial(data, id)),
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi()),
  doRevisingKPI: (id) => dispatch(doReviseKPI(id)),
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorKPI);

export default Form.create({})(withRouter(connectToComponent));

MonitorKPI.propTypes = {
  kpiReducer: PropTypes.instanceOf(Object).isRequired,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  submitNext: PropTypes.func,
  userReducer: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  form: PropTypes.instanceOf(Object),
};
