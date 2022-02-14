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
            ranking: item?.postRanking || " ",
            directorate: item?.directorate || " ",
            number: index + 1,
            name: item?.firstName + " " + item?.lastName,
            managerName: item?.managerFirstName + " " + item?.managerLastName,
            kpiAchievementScore: item?.kpiAchievementScore,
            userId: item?.userId ?? " ",
            postAlignment: parseInt(item?.postAlignmentNumeric || 0),
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

        totalNeedImprovement:
          alignmentReducer?.dataDetail?.totalActualNeedImprovement,
        totalWellDone: alignmentReducer?.dataDetail?.totalActualWellDone,
        totalOutstanding: alignmentReducer?.dataDetail?.totalActualOutstanding,

        totalMaximumOutstanding:
          alignmentReducer?.dataDetail?.totalRequirementOutstanding,
      });
    }
  };

  handleChangeTable = (pagination, filters, sorter, extra) => {
    const { alignmentReducer } = this.props;
    const totalData = Array.from(this.state.dataTable || []).filter((item) =>
      filters?.managerName && filters.managerName.length !== 0
        ? filters.managerName.includes(item.managerName)
        : true
    );
    const totalMaximumOutstanding =
      Math.round(parseFloat(alignmentReducer?.dataDetail?.outstandingPercentage) * (totalData.length / 100));
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      totalNeedImprovement: totalData.filter((item) => item.postAlignment === 1)
        .length,
      totalWellDone: totalData.filter((item) => item.postAlignment === 2)
        .length,
      totalOutstanding: totalData.filter((item) => item.postAlignment === 3)
        .length,
      totalFiltered:
        totalData.length === this.state.totalData ? null : totalData.length,

      totalMaximumOutstanding: totalMaximumOutstanding,
    });
  };

  clearAll = () => {
    const { alignmentReducer } = this.props;

    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      totalFiltered: null,

      totalNeedImprovement:
        alignmentReducer?.dataDetail?.totalActualNeedImprovement,
      totalWellDone: alignmentReducer?.dataDetail?.totalActualWellDone,
      totalOutstanding: alignmentReducer?.dataDetail?.totalActualOutstanding,

      totalMaximumOutstanding:
        alignmentReducer?.dataDetail?.totalRequirementOutstanding,
    });
  };

  getAlignmentItemText = (i) => {
    if (i) {
      const fields = [
        { id: 0, name: "" },
        { id: 1, name: "Need Improvement" },
        { id: 2, name: "Well Done" },
        { id: 3, name: "Outstanding" },
      ];
      return fields.filter((item) => item.id === i)?.[0]?.name || "";
    }
    return "";
  };

  handleSave = () => {
    const { dataTable } = this.state;
    const { match, saveAlignment } = this.props;
    const callibrationsInitData =
      this.props.alignmentReducer?.dataDetail?.usersCalibration;
    let callibrations = dataTable.map((item, index) => {
      let callibration = {
        ...item,
        preAlignment: callibrationsInitData?.[index]?.preAlignment,
        directorate: callibrationsInitData?.[index]?.directorate,
        userId: callibrationsInitData?.[index]?.userId,

        postAlignmentNumeric: item?.postAlignment
          ? parseInt(item?.postAlignment)
          : 0,
        postAlignment: this.getAlignmentItemText(item?.postAlignment),
        postRanking:
          item?.ranking && item?.ranking !== " " ? parseInt(item?.ranking) : 0,
      };
      delete callibration.name;
      delete callibration.ranking;
      delete callibration.managerName;
      delete callibration.number;
      return callibration;
    });
    const outstandings = callibrations.filter(
      (item) => item?.postAlignmentNumeric === 3
    );
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

  handleChange = (row, update, id, value) => {
    const { dataTable } = this.state;
    const newData = [...dataTable];
    if (update === "ranking") {
      const indexRanking = newData.findIndex(
        (item) =>
          parseInt(row?.ranking || 0) === parseInt(item?.ranking || 0) &&
          row?.postAlignment === item?.postAlignment
      );
      const itemRanking = newData?.[indexRanking];
      if (itemRanking) {
        newData.splice(indexRanking, 1, {
          ...itemRanking,
          ranking: " ",
        });
      }
      if (indexRanking >= 0) {
        this.props.form.setFieldsValue({
          [`dataGeneral[${indexRanking}].ranking`]: " ",
        });
      }
    }
    const index = newData.findIndex(
      (item) => row.formDataId === item.formDataId
    );
    const item = newData[index];
    if (update === "postAlignment") {
      newData.splice(index, 1, {
        ...item,
        ...row,
        ranking: " ",
      });
      this.props.form.setFieldsValue({
        [`dataGeneral[${index}].ranking`]: "",
      });
    } else {
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    }
    if (id) {
      this.props.form.setFieldsValue({
        [`${id}`]: value,
      });
    }
    this.setState({ dataTable: newData, hasChange: true });
  };

  exportToXLSX = async () => {
    const { alignmentReducer } = this.props;
    const timeStamp = moment().format("YYYY-MM-DD HH-mm-ss");
    let settings = {
      fileName: `PRA_${this.props.match?.params?.sessionId}_${timeStamp}`,
      extraLength: 3,
      writeOptions: {},
    };

    const newData = alignmentReducer?.dataDetail?.usersCalibration?.map(
      (item, index) => {
        return {
          ...item,
          ranking: item?.postRanking || " ",
          directorate: item?.directorate || " ",
          number: index + 1,
          name: item?.firstName + " " + item?.lastName,
          managerName: item?.managerFirstName + " " + item?.managerLastName,
          kpiAchievementScore: item?.kpiAchievementScore,
          userId: item?.userId ?? " ",
          postAlignment: parseInt(item?.postAlignmentNumeric || 0),
          preAlignment: item?.preAlignment ?? "Unrated",
        };
      }
    );
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
                    return "";
                }
              },
            },
            {
              label: "Ranking",
              value: "ranking",
            },
          ],
          content: newData,
        },
      ],
      settings
    );
  };

  render() {
    const { alignmentReducer, kpiReducer, form } = this.props;
    const { dataProposeRating } = kpiReducer;
    const {
      sortedInfo,
      filteredInfo,
      dataTable,
      totalData,
      totalFiltered,
      totalNeedImprovement,
      totalWellDone,
      totalOutstanding,
      totalMaximumOutstanding,
    } = this.state;
    const contentChart = {
      ...options,
      series: [
        {
          name: "Maximum",
          data: [0, 0, totalMaximumOutstanding],
          stack: "Maximum",
          color: "#324aa8",
        },
        {
          name: "Actual",
          data: [totalNeedImprovement, totalWellDone, totalOutstanding],
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
        <div>
          <div>
            <Divider />
            <Text strong style={{ fontSize: 20 }}>
              Performance Review Alignment :
            </Text>
            <Divider />
          </div>
          <Spin spinning={alignmentReducer?.loadingDetail}>
            <>
              {alignmentReducer?.dataDetail && (
                <div style={{ width: "40vw", marginBottom: 20 }}>
                  <HighchartsReact
                    containerProps={{ style: { height: "250px" } }}
                    highcharts={Highcharts}
                    options={contentChart}
                  />
                </div>
              )}
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                  <Button
                    style={{
                      fontWeight: "500",
                    }}
                    onClick={this.clearAll}
                  >
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
                  icon="download"
                  style={{
                    borderColor: "#40a9ff",
                    color: "#40a9ff",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    confirm({
                      title: "Please make sure you have save all data",
                      okText: "Yes",
                      cancelText: "No",
                      onOk: async () => {
                        this.exportToXLSX();
                      },
                      onCancel() {},
                    });
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
                  icon="save"
                  disabled={!isCanEdit}
                  onClick={this.handleSave}
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    color: isCanEdit ? "#52c41a" : undefined,
                    borderColor: isCanEdit ? "#52c41a" : undefined,
                    fontWeight: "bold",
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </>
          </Spin>
        </div>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  getProposeRating: () => dispatch(doGetProposeRating()),
  saveAlignment: (data) => dispatch(postAlignmentSessionDetail(data)),
  doGetAlignmentDetail: (sessionId) =>
    dispatch(getAlignmentSessionDetail(sessionId)),
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
