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
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TableKPI from "./kpi";
import { doGetKpiList, doGetLatestGoalKpi } from "../../redux/actions/kpi";
import { Success } from "../../redux/status-code-type";
import globalStyle from "../../styles/globalStyles";
import stepKpi, { stepKpiMonitoring } from "../../utils/stepKpi";
import { doReviseKPI, doInlineEdit } from "../../redux/actions/monitoring";
import { toast } from "react-toastify";

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
      rowEdit: false,
      agreeToEdit: false,
      dataSourceNonEdit: [],
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
          isInlineEdit: false,
          ...dataMetrics,
          // feedback: itemKpi.othersRatingComments.comment
        };
        newData.push(data);
      });
      this.setState({
        dataSource: newData,
        dataSourceNonEdit: newData,
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

  aggreToEdit = (val) => {
    this.setState({
      agreeToEdit: val,
    });
  };

  _showConfirm = (val, record, refetch) => {
    Modal.confirm({
      title: "Are you sure to edit this KPI?",
      content:
        "By edit this KPI, system will remove selected KPI result data. Are you sure want to continue ?",
      onOk: async () => {
        await this._onEditButton(val, record);
        refetch()
      },
      onCancel: () => {
        this._onEditButton(val, record);
      },
      autoFocusButton: "ok",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        style: {
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
          color: "white",
          marginLeft: "30px",
        },
      },
      cancelButtonProps: {
        style: {
          marginRight: "30px",
        },
      },
      className: "editMonitoringModal",
    });
  };

  _cancelEditRow = (val, record) => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex(
      (item) => item?.isInlineEdit && item?.isInlineEdit === true
    );
    let item = newData[index];
    newData.splice(index, 1, {
      ...item,
      isInlineEdit: false,
    });
    this.setState({
      dataSource: newData,
      rowEdit: false,
    });
  };

  _onEditButton = (val, record) => {
    // this.showConfirm();
    console.log("_onEditButton", val);
    // console.log(record);
    if (val) {
      console.log("_onEditButton INSIDE", val);
      const { dataSource } = this.state;
      const { doInlineEdit } = this.props;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => record.key === item.key);
      let item = newData[index];
      newData.splice(index, 1, {
        ...item,
        isInlineEdit: true,
      });
      doInlineEdit(record.id, val);
      console.log("on edit", newData);
      this.setState({
        dataSource: newData,
        rowEdit: true,
      });
    } else {
      const { dataSource } = this.state;
      const { doInlineEdit } = this.props;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => record.key === item.key);
      let item = newData[index];
      newData.splice(index, 1, {
        ...item,
        isInlineEdit: false,
      });
      doInlineEdit(record.id, val);
      console.log("on edit", newData);
      this.setState({
        dataSource: newData,
        rowEdit: false,
      });
    }
  };

  _onSaveButton() {
    this.setState({
      inlineEditId: "",
      isInlineEdit: false,
    });
    // alert("Yeay!");
  }

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

  render() {
    // console.log("index render", this.state.rowEdit);
    console.log("on render", this.props.monitoring);
    const {
      dataSource,
      weightTotal,
      weightTotalErr,
      challengeYour,
      isFeedback,
      userId,
      isSuperior,
    } = this.state;
    const { handleChange, handleDelete, handleError } = this;
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
            <div>
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
                handleDelete={handleDelete}
                userId={userId}
                isEditable={currentStep === stepKpiMonitoring[0]}
                isSuperior={isSuperior}
                stafid={stafid}
                //new
                refetch={this.getAllData.bind(this)}
                editRow={this._showConfirm.bind(this)}
                cancelEditRow={this._onEditButton.bind(this)}
                isRowEdit={this.props.monitoring}
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
  kpiReducer: state.kpiReducer,
  authReducer: state.authReducer,
  step: state.userKpiStateReducer,
  monitoring: state.monitoringReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  getLatestGoalKpi: () => dispatch(doGetLatestGoalKpi()),
  doRevisingKPI: (id) => dispatch(doReviseKPI(id)),
  doInlineEdit: (id, val) => dispatch(doInlineEdit(id, val)),
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
