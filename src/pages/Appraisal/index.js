import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Form,
  Typography,
  Divider,
  Col,
  Row,
  Modal,
  Checkbox,
  Radio,
  Button,
  Spin,
  Skeleton,
  Result,
  Icon,
} from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TableKPI from "./ components/kpi";
import TableValue from "./ components/value";
import CardRating from "./ components/cardRating";
import {
  doGetKpiList,
  doAssessment,
  getValueList,
  getRatings,
  saveValueList,
  doGetKpiRating,
  doSubmitNext,
  doEmpAcknowledge,
  doEmpAcknowledgeList,
  doAssessmentAll,
} from "../../redux/actions/kpi";
import { actionGetNotifications } from "../../redux/actions";
import {
  Success,
  FAILED_SAVE_CHALLENGE_YOURSELF,
} from "../../redux/status-code-type";
import globalStyle from "../../styles/globalStyles";
import stepKpi from "../../utils/stepKpi";
import TextArea from "antd/lib/input/TextArea";
import { toast } from "react-toastify";
import kpiSendProcess from "../../utils/kpiSendProcess";
import { sendChallengeYourselfChecker } from "../../utils/challengeYourselfChecker";
import "./style.css";
import { actionSaveKpiPartial } from "../../redux/actions/kpi/saveKpi";

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: true,
      isModalShow: 0,
      loadingResult: 0,
      dataValueList: [],
      optionRating: [],
      loadingMyValue: false,
      challengeYour: "",
      tab: "1",
      myStep: false,
      isFeedback: false,
      dataEmpAckOptions: [],
      finalAck: "",
      editableRow: null,
      weightTotal: 0,
      weightTotalErr: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (e) => {
    const { authReducer } = this.props;
    this.getOwnKpiList(authReducer?.userId);
    this.getOwnValues(authReducer?.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList, getKpiRating, form, empAcknowledgeList } = this.props;
    await getKpiList(id);
    getKpiRating(id);
    const { kpiReducer } = this.props;
    const {
      dataKpi,
      dataKpiMetrics,
      challenge,
      currentStep,
      formStatusId,
      status,
    } = kpiReducer;
    if (status === Success) {
      if (currentStep === stepKpi[6] || formStatusId === "3") {
        await empAcknowledgeList();
        // eslint-disable-next-line react/destructuring-assignment
        const dataEmpAcks = this.props.kpiReducer.dataEmpAckList.list.map(
          (ack) => {
            return {
              label: ack.value,
              value: ack.value,
            };
          }
        );
        this.setState({
          dataEmpAckOptions: dataEmpAcks,
          // eslint-disable-next-line react/destructuring-assignment
          dataEmpAckName: this.props.kpiReducer.dataEmpAckList.name,
        });
      }
      const newData = [];
      // for fetching data metrics API
      // eslint-disable-next-line array-callback-return
      await dataKpi.map((itemKpi, index) => {
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
        const dataKeyMetric = Object.keys(dataMetrics);
        const newOption = dataKeyMetric.map((item) => {
          return dataMetrics[item];
        });
        const data = {
          key: itemKpi.id,
          id: itemKpi.id,
          cascadeType: itemKpi.cascadeType,
          cascadeName: itemKpi.cascadeName,
          kpi: itemKpi.name,
          baseline: itemKpi.baseline,
          weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat("0"),
          rating: itemKpi.rating,
          index,
          achievementType: itemKpi.achievementType,
          assessment: itemKpi.achievementType
            ? itemKpi.actualAchievement
            : itemKpi.actualAchievementText,
          qualitativeOption: newOption,
          metrics: dataKpiMetrics,
          ...dataMetrics,
          feedback: itemKpi.othersRatingComments.comment,
        };
        newData.push(data);
      });
      const dataOrdered = await newData.sort((a, b) => {
        return a.id - b.id;
      });
      const dataGen = dataOrdered.map((item, i) => {
        return {
          assesment: item.assesment,
        };
      });
      form.setFieldsValue({
        dataKpi: dataGen,
      });
      this.liveCount(dataOrdered);
      const dataKpiCheck = form.getFieldsValue(["dataKpi"]);
      if (dataKpiCheck) {
        form.setFieldsValue({
          dataKpi: dataGen,
        });
      }
      this.setState({
        myStep: currentStep !== "Performance Review Employee",
        dataKpis: dataOrdered,
        challengeYour: challenge === "----------" ? "" : challenge,
        loadingKpis: false,
        loadingResult: 0,
      });
    } else {
      this.setState({
        loadingKpis: false,
      });
    }
  };

  getOwnValues = async (id, noLoading) => {
    if (!noLoading) {
      this.setState({
        loadingMyValue: true,
      });
    }
    const { getValues, getRatingList, form } = this.props;
    if (!noLoading) {
      await getRatingList();
    }
    await getValues(id);
    const { kpiReducer } = this.props;
    const { dataValues, dataRating } = kpiReducer;
    const newData = [];
    // for fetching data metrics API
    // eslint-disable-next-line array-callback-return
    await dataValues.map((itemValues, index) => {
      const newFiles = [];
      // eslint-disable-next-line no-unused-expressions
      itemValues.attachments &&
        itemValues.attachments.map((files) => {
          const data = {
            uid: files.id,
            id: files.id,
            valueId: files.valueId,
            name: files.fileName,
            status: "done",
            url: "download",
          };
          newFiles.push(data);
          return data;
        });
      const ratingCheck = dataRating.filter(
        (itemRating) => itemRating.id === itemValues.valuesRatingDTO.rating
      );
      const data = {
        key: itemValues.id,
        valueId: itemValues.id,
        index,
        orderId: itemValues.orderId,
        name: itemValues.name,
        rating:
          ratingCheck.length < 1
            ? undefined
            : itemValues.valuesRatingDTO.rating,
        comment: itemValues.valuesRatingDTO.comment,
        attachments: newFiles,
        feedback: itemValues.otherValuesRatingDTO.comment,
      };
      newData.push(data);
    });
    let dataOrdered = await newData.sort((a, b) => {
      return a.orderId - b.orderId;
    });
    dataOrdered = dataOrdered.map((item, index) => {
      return {
        ...item,
        index,
      };
    });
    const dataGen = dataOrdered.map((item, i) => {
      return {
        rating: item.rating,
        comment: item.comment,
      };
    });
    const dataGeneral = form.getFieldsValue(["dataGeneral"]);
    if (dataGeneral) {
      form.setFieldsValue({
        dataGeneral: dataGen,
      });
    }
    this.setState({
      loadingMyValue: false,
      optionRating: dataRating,
      dataValueList: dataOrdered,
    });
  };

  handleChangeAssessment = (row) => {
    const { dataKpis } = this.state;
    const newData = [...dataKpis];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataKpis: newData });
  };

  handleSaveAssessment = async () => {
    const { dataKpis, challengeYour } = this.state;
    const { doAssessAll, form } = this.props;
    const assessment = [];
    dataKpis.map((item) => {
      const data = {
        achievementType: item.achievementType,
        actualAchievementText:
          item.achievementType === 0 ? item.assessment : "",
        actualAchievement:
          item.achievementType === 1 ? parseFloat(item.assessment) : 0,
        id: item.id,
      };
      assessment.push(data);
      return data;
    });
    const data = {
      assesments: assessment,
      challengeYourself: challengeYour || "----------",
    };
    form.validateFieldsAndScroll(["dataKpi"], async (err, values) => {
      if (!err) {
        confirm({
          title: "Are you sure?",
          onOk: async () => {
            await doAssessAll(data);
            const { kpiReducer, authReducer } = this.props;
            const { loadingAssess, statusAssess, messageAssess } = kpiReducer;
            if (!loadingAssess) {
              if (
                statusAssess === Success ||
                statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF
              ) {
                this.setState({
                  loadingKpis: true,
                });
                this.getOwnKpiList(authReducer?.userId);
                toast.success("Your Assessment has been saved");
                if (statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                  toast.warn(`Sorry, ${messageAssess}`);
                }
              } else {
                toast.warn(`Sorry, ${messageAssess}`);
              }
            }
          },
          onCancel() {},
        });
      } else {
        toast.warn("Sorry, Please fill out all your assessment");
      }
    });
  };

  showHideModal = async (id) => {
    this.setState({
      isModalShow: id,
    });
  };

  changeTab = (activeKey) => {
    this.setState({ tab: activeKey });
  };

  feedShow = (status) => {
    this.setState({ isFeedback: status });
  };

  handleChange = (row) => {
    const { dataValueList } = this.state;
    const newData = [...dataValueList];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataValueList: newData });
  };

  handleAssesLoading = (id) => {
    this.setState({
      loadingResult: id,
    });
  };

  handleSave = () => {
    const { doSaveValues, authReducer, form } = this.props;
    const { dataValueList } = this.state;
    const newData = [];
    dataValueList.map((item) => {
      const data = {
        comment: item.comment,
        rating: item.rating,
        valueId: item.valueId,
      };
      newData.push(data);
      return data;
    });
    const data = {
      ratings: newData,
    };
    form.validateFieldsAndScroll(["dataGeneral"], (err, values) => {
      if (!err) {
        confirm({
          title: "Are you sure?",
          onOk: async () => {
            await doSaveValues(authReducer?.userId, data);
            const { kpiReducer } = this.props;
            if (!kpiReducer.loadingSaveValues) {
              if (kpiReducer.statusSaveValues === Success) {
                toast.success("Your Values has been saved");
                this.getOwnValues(authReducer?.userId);
              } else {
                toast.warn(`Sorry, ${kpiReducer.messageSaveValues}`);
              }
            }
          },
          onCancel() {},
        });
      }
    });
  };

  handleSubmit = async () => {
    const { dataKpis, challengeYour } = this.state;
    const {
      doSaveValues,
      authReducer,
      form,
      doAssessAll,
      submitNext,
      getNotifications,
    } = this.props;
    // assessment
    const assessment = [];
    dataKpis.map((item) => {
      const data = {
        achievementType: item.achievementType,
        actualAchievementText:
          item.achievementType === 0 ? item.assessment : "",
        actualAchievement:
          item.achievementType === 1 ? parseFloat(item.assessment) : 0,
        id: item.id,
      };
      assessment.push(data);
      return data;
    });
    const dataAssessment = {
      assesments: assessment,
      challengeYourself: challengeYour || "----------",
    };
    // values
    const { dataValueList } = this.state;
    const newData = [];
    let valuesErr = false;
    dataValueList.map((item) => {
      const data = {
        comment: item.comment,
        rating: item.rating,
        valueId: item.valueId,
      };
      if (!item.rating) {
        valuesErr = true;
      }
      newData.push(data);
      return data;
    });
    const dataValues = {
      ratings: newData,
    };
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (valuesErr) {
          toast.warn("You need to fill Values before submiting to the manager");
          this.changeTab("2");
          form.validateFields(["dataGeneral"]);
        } else {
          confirm({
            title: "Are you sure?",
            onOk: async () => {
              await doAssessAll(dataAssessment);
              await doSaveValues(authReducer?.userId, dataValues);
              this.setState({
                loadingKpis: true,
              });
              const { kpiReducer } = this.props;
              const { loadingAssess, statusAssess, messageAssess } = kpiReducer;
              const { loadingSaveValues, statusSaveValues, messageSaveValues } =
                kpiReducer;
              if (!loadingAssess && !loadingSaveValues) {
                if (
                  statusAssess === Success ||
                  statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF
                ) {
                  if (statusSaveValues === Success) {
                    await submitNext(authReducer?.userId);
                    this.getData();
                    getNotifications();
                    toast.success(
                      "Your Appraisal has been sent to your Manager"
                    );
                    if (statusAssess === FAILED_SAVE_CHALLENGE_YOURSELF) {
                      toast.warn(`Sorry, ${messageAssess}`);
                    }
                  } else {
                    toast.warn(`Sorry, ${messageSaveValues}`);
                  }
                } else {
                  toast.warn(`Sorry, ${messageAssess}`);
                }
              }
            },
            onCancel() {},
          });
        }
      } else if (err.dataKpi) {
        toast.warn("Please fill out your Assessment");
        this.changeTab("1");
      } else if (err.dataGeneral) {
        toast.warn("You need to fill Values before submiting to the manager");
        this.changeTab("2");
      }
    });
  };

  changeChallenge = ({ target: { value } }) => {
    this.setState({ challengeYour: value });
  };

  onCheckFinal = (e) => {
    const { checked } = e.target;
    this.setState({ checkedFinal: checked });
  };

  onChooseFinalAck = (e) => {
    this.setState({
      finalAck: e.target.value,
    });
  };

  handleSubmitAck = async () => {
    const { finalAck } = this.state;
    const { empAcknowledge, getNotifications } = this.props;
    confirm({
      title: "Are you sure?",
      content: "",
      onOk: async () => {
        await empAcknowledge(finalAck);
        const { kpiReducer } = this.props;
        const { loadingEmpAck, statusEmpAck, messageEmpAck } = kpiReducer;
        if (!loadingEmpAck) {
          if (statusEmpAck === Success) {
            this.setState({
              loadingKpis: true,
            });
            this.getData();
            getNotifications();
            toast.success("Your Acknowledgement has been sent");
          } else {
            toast.warn(`Sorry, ${messageEmpAck}`);
          }
        }
      },
      onCancel() {},
    });
  };

  handleChangeRow = (row) => {
    const { dataKpis } = this.state;
    const newData = [...dataKpis];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataKpis: newData });
    this.liveCount(newData);
  };

  handleErrorRow = () => {
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

  handleSaveRow = async (index) => {
    try {
      const { doSavingKpi, authReducer, form, ownkpiReducer } = this.props;
      const { dataKpis, weightTotalErr } = this.state;
      const { challenge, dataKpi, dataKpiMetrics } = ownkpiReducer;
      let dataSaving = [...dataKpis];
      const newDataKpi = kpiSendProcess(dataSaving, dataKpi, dataKpiMetrics);
      const data = {
        kpiList: [newDataKpi[index]],
        challengeYourSelf: sendChallengeYourselfChecker(challenge),
      };
      if (weightTotalErr) {
        toast.warn("Sorry, Total KPI Weight must be 100%");
      } else {
        form.validateFieldsAndScroll([`dataKpi[${index}]`], (err, values) => {
          let errs = err?.dataKpi?.[index];
          if (errs?.assessment) {
            delete errs.assessment;
          }

          if (errs ? Object.keys(errs).length === 0 : true) {
            confirm({
              content:
                "By saving this KPI, system will remove selected KPI result data. Are you sure want to continue ?",
              title: "Are you sure you want to save this changes KPI?",
              icon: <Icon type="exclamation-circle" />,
              className: "editAppraisalModal",
              okText: "Yes",
              cancelText: "No",
              onOk: async () => {
                try {
                  await doSavingKpi(data, authReducer.userId);
                  const { savekpiReducer, kpiReducer } = this.props;
                  const { status, statusMessage } = savekpiReducer;
                  if (
                    status === Success ||
                    status === FAILED_SAVE_CHALLENGE_YOURSELF
                  ) {
                    toast.success("Your KPI has been saved");
                    const rowData = dataKpis[index]
                    const newOption = Array.from(rowData?.metrics||[]).map((item) => {
                      return rowData[item?.label];
                    });
                    let newData = dataSaving.map((item, idx) => {
                      if (index === idx) {
                        return {
                          ...item,
                          qualitativeOption: newOption,
                          assessment: "",
                          rating: ""
                        }
                      }
                      return item
                    })
                    this.setState({ editableRow: null, dataKpis: newData, editableRowData: null});
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
    } catch (error) {
      console.log(error);
    }
  };

  handleConfirm = (data) => {
    confirm({
      content:
        "By edit this KPI, system will remove selected KPI result data. Are you sure want to continue ?",
      title: "Are you sure you want to edit this KPI?",
      icon: <Icon type="exclamation-circle" />,
      className: "editAppraisalModal",
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
          editableRow: data?.id,
          editableRowData: data
        });
      },
      onCancel() {},
      okText: "Yes",
      cancelText: "No",
    });
  };

  handleCancel = async () => {
    if (this.state?.editableRowData?.id) {
      this.handleChangeRow(this.state?.editableRowData)
    }
    await this.setState({
      editableRow: null,
      editableRowData: null
    });
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
      dataEmpAckOptions,
      dataEmpAckName,
      checkedFinal,
      finalAck,

      editableRow,
      weightTotalErr,
      weightTotal,
    } = this.state;
    const { form, kpiReducer } = this.props;
    const {
      dataKpiMetrics,
      dataKpiRating,
      loadingKpiRating,
      generalFeedback,
      currentStep,
      formStatusId,
      loadingEmpAck,
      status,
      errMessage,
      statusValues,
      messageValues,
    } = kpiReducer;

    return (
      <div>
        <div
          style={{
            ...globalStyle.contentContainer,
            borderRadius: 0,
            paddingBottom: 10,
          }}
        >
          <Divider />
          <Text strong>Final Appraisal </Text>
          <Divider />
          <Text type={weightTotalErr ? "danger" : ""}>
            Total KPI Weight :{` ${weightTotal}%`}
          </Text>
          <center>
            {(currentStep === stepKpi[5] ||
              currentStep === stepKpi[6] ||
              formStatusId === "3") && (
              <Row>
                <Col xl={24} md={24} xs={24}>
                  <CardRating
                    boxRateColor="inherit"
                    title="Your Rating"
                    loading={!loadingKpiRating && dataKpiRating.rating}
                    rate={
                      currentStep === stepKpi[6] || formStatusId === "3"
                        ? dataKpiRating.rating
                        : "N/A"
                    }
                  />
                </Col>
              </Row>
            )}
          </center>
          <br />
          <div>
            <Tabs
              defaultActiveKey="1"
              activeKey={tab}
              onChange={this.changeTab}
              type="card"
            >
              <TabPane tab="KPI" key="1">
                <div>
                  {status === Success || loadingKpis ? (
                    <TableKPI
                      form={form}
                      loading={loadingKpis}
                      isModalShow={isModalShow}
                      handleSubmit={this.handleSubmit}
                      changeChallenge={this.changeChallenge}
                      challengeYour={challengeYour}
                      handleAssesLoading={this.handleAssesLoading}
                      getOwnKpiList={this.getOwnKpiList}
                      loadingResult={loadingResult}
                      showHideModal={this.showHideModal}
                      dataSource={dataKpis}
                      dataMetrics={dataKpiMetrics}
                      myStep={myStep}
                      currentStep={currentStep}
                      isFeedback={isFeedback}
                      formStatusId={formStatusId}
                      feedShow={this.feedShow}
                      proposeRating={dataKpiRating.rating}
                      handleChangeField={this.handleChangeAssessment}
                      handleSaveAssessment={this.handleSaveAssessment}
                      handleEditRow={this.handleConfirm}
                      handleCancel={this.handleCancel}
                      handleChangeRow={this.handleChangeRow}
                      handleSaveRow={this.handleSaveRow}
                      editableRow={editableRow}
                      handleErrorRow={this.handleErrorRow}
                    />
                  ) : (
                    <Result
                      status={"error"}
                      title={status}
                      subTitle={`Sorry, ${errMessage}`}
                      extra={[
                        <Button
                          key="back"
                          onClick={() =>
                            this.props.history.push("/my-team/appraisal/")
                          }
                        >
                          Back
                        </Button>,
                      ]}
                    />
                  )}
                </div>
              </TabPane>
              <TabPane tab="Values" key="2">
                {statusValues === Success || loadingMyValue ? (
                  <TableValue
                    form={form}
                    loading={loadingMyValue}
                    dataSource={dataValueList}
                    getOwnValues={this.getOwnValues}
                    handleChangeField={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleSave={this.handleSave}
                    currentStep={currentStep}
                    myStep={myStep}
                    optionRating={optionRating}
                  />
                ) : (
                  <Result
                    status={"error"}
                    title={statusValues}
                    subTitle={`Sorry, ${messageValues}`}
                    extra={[
                      <Button
                        key="back"
                        onClick={() =>
                          this.props.history.push("/my-team/appraisal/")
                        }
                      >
                        Back
                      </Button>,
                    ]}
                  />
                )}
              </TabPane>
            </Tabs>
          </div>
        </div>
        {generalFeedback && generalFeedback.id && (
          <div
            style={{
              ...globalStyle.contentContainer,
              background: "rgb(250, 247, 187)",
              borderRadius: 0,
            }}
          >
            <Text strong>General Feedback :</Text>
            <TextArea
              autoSize={{ minRows: 3 }}
              className="challenge-input-disabled"
              value={generalFeedback.comment}
              readOnly
            />
          </div>
        )}
        <div
          style={{
            ...globalStyle.contentContainer,
            borderRadius: 0,
            paddingTop: 5,
          }}
        >
          <center>
            {(loadingKpis || loadingMyValue || status === Success) && (
              <Skeleton
                active
                loading={loadingMyValue || loadingKpis}
                paragraph={false}
                title={{ width: "60%" }}
              >
                {myStep ? (
                  <div style={{ textAlign: "center", margin: 40 }}>
                    {currentStep === stepKpi[3] ? (
                      <Title level={4} type="warning" ghost strong>
                        Your Appraisal has been sent to your Manager
                      </Title>
                    ) : (
                      (currentStep === stepKpi[4] ||
                        currentStep === stepKpi[5]) && (
                        <Title
                          level={4}
                          style={{ color: "#61C761", margin: 0 }}
                          ghost
                          strong
                        >
                          Your Self Assessment and Values has been approved
                        </Title>
                      )
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    {tab === "1" ? (
                      <Button
                        id="save-assessment"
                        onClick={this.handleSaveAssessment}
                        style={{ margin: 10 }}
                        type={"primary"}
                        ghost
                      >
                        Save Assessment
                      </Button>
                    ) : (
                      tab === "2" && (
                        <Button
                          id="save-values"
                          onClick={this.handleSave}
                          style={{ margin: 10 }}
                        >
                          Save Values
                        </Button>
                      )
                    )}
                    <Button
                      id="send-manager"
                      type="primary"
                      onClick={this.handleSubmit}
                      style={{ margin: 10 }}
                    >
                      Send To Manager
                    </Button>
                  </div>
                )}
              </Skeleton>
            )}
          </center>
          {!loadingEmpAck && currentStep === stepKpi[6] && (
            <Skeleton
              active
              loading={loadingKpis}
              paragraph={false}
              title={{ width: "40%" }}
            >
              <Checkbox onChange={this.onCheckFinal} checked={checkedFinal}>
                <Text strong>
                  I'm fully aware about the final score and rating given from My
                  Supervisor to me
                </Text>
              </Checkbox>
            </Skeleton>
          )}
          {formStatusId === "3" && (
            <center>
              <Title
                level={4}
                style={{ color: "#61C761", margin: 0 }}
                ghost
                strong
              >
                Your KPI has been completed
              </Title>
            </center>
          )}
        </div>
        {!loadingKpis && currentStep === stepKpi[6] && (
          <Spin spinning={loadingEmpAck}>
            <div
              style={{
                ...globalStyle.contentContainer,
                borderRadius: 0,
                background: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text strong style={{ fontSize: 18 }}>
                {dataEmpAckName}
              </Text>
              <br />
              <div>
                <Radio.Group
                  value={finalAck}
                  onChange={this.onChooseFinalAck}
                  disabled={!checkedFinal}
                  size="large"
                  buttonStyle="solid"
                >
                  {dataEmpAckOptions.map((ack) => (
                    <div
                      style={{
                        whiteSpace: "break-spaces",
                        display: "flex",
                        alignSelf: "center",
                      }}
                    >
                      <Radio value={ack.value}>{ack.label}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <br />
              <br />
              <Button
                onClick={this.handleSubmitAck}
                type="primary"
                disabled={!finalAck || !checkedFinal}
              >
                Submit
              </Button>
            </div>
          </Spin>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducer: state.kpiReducer,
  authReducer: state.authReducer,

  ownkpiReducer: state.ownKpi,
  savekpiReducer: state.saveKpi,
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  doAssess: (data) => dispatch(doAssessment(data)),
  doAssessAll: (data) => dispatch(doAssessmentAll(data)),
  getValues: (id) => dispatch(getValueList(id)),
  getRatingList: () => dispatch(getRatings()),
  getNotifications: () => dispatch(actionGetNotifications()),
  getKpiRating: (id) => dispatch(doGetKpiRating(id)),
  doSaveValues: (id, data) => dispatch(saveValueList(id, data)),
  submitNext: (id) => dispatch(doSubmitNext(id)),
  empAcknowledge: (data) => dispatch(doEmpAcknowledge(data)),
  empAcknowledgeList: () => dispatch(doEmpAcknowledgeList()),
  doSavingKpi: (data, id) => dispatch(actionSaveKpiPartial(data, id)),
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appraisal);

export default Form.create({})(withRouter(connectToComponent));

Appraisal.propTypes = {
  kpiReducer: PropTypes.instanceOf(Object),
  doSaveValues: PropTypes.func,
  // doAssess: PropTypes.func,
  getRatingList: PropTypes.func,
  getValues: PropTypes.func,
  getKpiList: PropTypes.func,
  getKpiRating: PropTypes.func,
  submitNext: PropTypes.func,
  empAcknowledge: PropTypes.func,
  getNotifications: PropTypes.func,
  empAcknowledgeList: PropTypes.func,
  userReducer: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object),
  doAssessAll: PropTypes.func,
};
