import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, Divider, Typography, Button, message, Modal, Form } from "antd";
import { withRouter } from "react-router-dom";
import TableAlignmentDetail from "./table-alignmentDetail";
import globalStyle from "../../../styles/globalStyles";
import {
  getAlignmentSessionDetail,
  postAlignmentSessionDetail,
} from "../../../redux/actions/alignment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { doGetProposeRating } from "../../../redux/actions/kpi";
import { Success } from "../../../redux/status-code-type";
import { toast } from "react-toastify";
import actionGetCurrStep from "../../../redux/actions/auth/actionGetCurrentStep";
import JSONtoXLSX from "json-as-xlsx";
import moment from "moment";

const { confirm } = Modal;

const { Text } = Typography;

const options = {
  chart: {
    type: "column",
  },

  title: {
    text: " ",
  },

  xAxis: {
    categories: ["Need Improvement", "Well Done", "Outstanding"],
  },

  yAxis: {
    allowDecimals: false,
    min: 0,
    title: {
      text: " ",
    },
  },

  tooltip: {
    formatter: function () {
      return (
        "<b>" +
        this.x +
        "</b><br/>" +
        this.series.name +
        ": " +
        this.y +
        "<br/>"
      );
    },
  },

  plotOptions: {
    column: {
      stacking: "normal",
    },
  },
  credits: {
    enabled: false,
  },
};

class AlignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCalibration: [],
      dataTable: [],
      autoCompleteDataSource: [],
      sortedInfo: {},
      filteredInfo: {},
    };
  }
  componentDidMount() {
    this.getData();
    this.props.doGetCurrStep();
  }

  getData = async () => {
    const { doGetAlignmentDetail, history } = this.props;
    const { match } = this.props;
    await doGetAlignmentDetail(match?.params?.sessionId);
    const { alignmentReducer } = this.props;
    if (!alignmentReducer?.dataDetail?.usersCalibration) {
      history.push("/my-team/performance-review-alignment");
    } else {
      const newData = alignmentReducer?.dataDetail?.usersCalibration?.map(
        (item, index) => {
          return {
            ...item,
            directorate: item?.directorate || "",
            number: index + 1,
            name: item?.firstName + " " + item?.lastName,
            managerName: item?.managerFirstName + " " + item?.managerLastName,
            kpiAchievementScore: item?.kpiAchievementScore,
            userId: item?.userId ?? "",
            prePostAlignment:
              item?.postAlignmentNumeric &&
              item?.postAlignmentNumeric > 0 &&
              item?.postAlignmentNumeric < 4
                ? item?.postAlignmentNumeric
                : "",
            postAlignment:
              item?.postAlignmentNumeric &&
              item?.postAlignmentNumeric > 0 &&
              item?.postAlignmentNumeric < 4
                ? item?.postAlignmentNumeric
                : "",
            preAlignment: item?.preAlignment ?? "Unrated",
          };
        }
      );

      const dataGeneral = this.props.form.getFieldsValue(["dataGeneral"]);
      if (dataGeneral) {
        this.props.form.setFieldsValue({
          dataGeneral: newData,
        });
      }
      this.setState({
        usersCalibration: newData,
        dataTable: newData,
        totalData: newData.length,
      });
    }
  };

  handleChangeTable = (pagination, filters, sorter, extra) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      totalFiltered:
        extra.currentDataSource.length === this.state.totalData
          ? null
          : extra.currentDataSource.length,
    });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  handleSave = () => {
    const { dataTable } = this.state;
    const { match, saveAlignment } = this.props;
    let callibrations = dataTable.map((item) => {
      return {
        formDataId: item?.formDataId,
        userId: item?.userId,
        rating: item?.postAlignment ? parseInt(item?.postAlignment) : 0,
      };
    });
    const outstandings = callibrations.filter((item) => item?.rating === 3);
    // callibrations = callibrations.filter((item)=> item?.rating)
    const requestBody = {
      calibration: callibrations,
      sessionId: match?.params?.sessionId,
    };
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
      } else if (callibrations.length > 0) {
        confirm({
          title:
            outstandings.length >
            this.props.alignmentReducer?.dataDetail?.totalRequirementOutstanding
              ? "Outstanding rating allocated is over Quota? Do you want to save?"
              : "Are you sure?",
          okText: "Save",
          onOk: async () => {
            await saveAlignment(requestBody);
            const { alignmentReducer } = this.props;
            if (alignmentReducer?.statusPostDetail === Success) {
              this.getData();
              toast.success(
                "Success, your Performance Alignment Review has been saved"
              );
            } else {
              toast.warn(`Sorry, ${alignmentReducer?.messagePostDetail}`);
            }
          },
          onCancel() {},
        });
      } else {
        message.info("Nothing changes");
      }
    });
  };

  handleChange = (row) => {
    const { dataTable } = this.state;
    const newData = [...dataTable];
    const index = newData.findIndex(
      (item) => row.formDataId === item.formDataId
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataTable: newData, hasChange: true });
  };

  exportToXLSX = async () => {
    const { dataTable } = this.state;
    const timeStamp = moment().format("YYYY-MM-DD HH-mm-ss");
    let settings = {
      fileName: `performance_review_alignment ${timeStamp}`,
      extraLength: 3,
      writeOptions: {},
    };

    await JSONtoXLSX(
      [
        {
          sheet: "Sheets 1",
          columns: [
            {
              label: "No",
              value: "number",
            },
            {
              label: "Employee ID",
              value: "userId",
            },
            {
              label: "Employee Name",
              value: "name",
            },
            {
              label: "Superior",
              value: "managerName",
            },
            {
              label: "KPI Achievement Score",
              value: "kpiAchievementScore",
            },
            {
              label: "Pre Alignment",
              value: "preAlignment",
            },
            {
              label: "Directorate",
              value: "directorate",
            },
            {
              label: "Post Alignment",
              value: (row) => {
                const postAlignment = row?.postAlignment;
                switch (postAlignment) {
                  case 1:
                    return "Need Improvement";
                  case 2:
                    return "Well Done";
                  case 3:
                    return "Outstanding";
                  default:
                    return "Unrated";
                }
              },
            },
          ],
          content: dataTable,
        },
      ],
      settings
    );
  };

  render() {
    const { alignmentReducer, kpiReducer, form } = this.props;
    const { dataProposeRating } = kpiReducer;
    const { sortedInfo, filteredInfo, dataTable, totalData, totalFiltered } =
      this.state;
    const contentChart = {
      ...options,
      series: [
        {
          name: "Maximum",
          data: [
            0,
            0,
            alignmentReducer?.dataDetail?.totalRequirementOutstanding,
          ],
          stack: "Maximum",
          color: "#324aa8",
        },
        {
          name: "Actual",
          data: [
            alignmentReducer?.dataDetail?.totalActualNeedImprovement,
            alignmentReducer?.dataDetail?.totalActualWellDone,
            alignmentReducer?.dataDetail?.totalActualOutstanding,
          ],
          stack: "Actual",
          color: "orange",
        },
      ],
    };

    const isCanEdit =
      alignmentReducer?.dataDetail?.userRole?.isFacilitator ||
      alignmentReducer?.dataDetail?.userRole?.isOwner;
    return (
      <div style={globalStyle.contentContainer}>
        {!alignmentReducer?.loadingDetail ? (
          <div>
            <div>
              <Divider />
              <Text strong style={{ fontSize: 20 }}>
                Performance Review Alignment :{" "}
              </Text>
              <Divider />
            </div>
            <div style={{ width: "50vw", marginBottom: 20 }}>
              <HighchartsReact highcharts={Highcharts} options={contentChart} />
            </div>
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                <Button onClick={this.clearAll}>
                  Clear filters and sorters
                </Button>
                <Text style={{ marginLeft: 10 }}>
                  Total Data : {totalData || 0} records
                </Text>
                {totalFiltered && (
                  <Text style={{ marginLeft: 10 }}>
                    <span>|</span>
                    <span style={{ marginLeft: 10 }}>
                      Filtered Data : {totalFiltered} records
                    </span>
                  </Text>
                )}
              </div>
              <Button
                onClick={() => {
                  if (this.state.hasChange) {
                    confirm({
                      title: "Please make sure you have save all data",
                      okText: "Yes, Export it",
                      onOk: async () => {
                        this.exportToXLSX();
                      },
                      onCancel() {},
                    });
                  } else {
                    this.exportToXLSX();
                  }
                }}
              >
                Export
              </Button>
            </div>
            <TableAlignmentDetail
              isCanEdit={isCanEdit}
              handleChange={this.handleChange}
              handleChangeTable={this.handleChangeTable}
              sortedInfo={sortedInfo}
              dataProposeRating={dataProposeRating}
              filteredInfo={filteredInfo}
              dataSource={dataTable ?? []}
              form={form}
            />
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Button
                disabled={!isCanEdit}
                onClick={this.handleSave}
                style={{ marginLeft: 10, marginRight: 10 }}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <center>
            <Spin />
          </center>
        )}
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  getProposeRating: () => dispatch(doGetProposeRating()),
  saveAlignment: (data) => dispatch(postAlignmentSessionDetail(data)),
  doGetAlignmentDetail: (sessionId) =>
    dispatch(getAlignmentSessionDetail(sessionId)),
  doGetCurrStep: () => dispatch(actionGetCurrStep()),
});

const mapStateToProps = (state) => ({
  kpiReducer: state.kpiReducer,
  alignmentReducer: state.alignmentReducer,
});
const connectToComponent = connect(
  mapStateToProps,
  mapDispatchtoProps
)(AlignmentList);

export default Form.create({})(withRouter(connectToComponent));
