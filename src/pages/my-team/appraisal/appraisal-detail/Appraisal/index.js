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
  Input,
  Skeleton,
  Button,
  Select,
  Checkbox,
  Spin,
  Icon,
  Result,
} from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TableKPI from "./components/kpi";
import TableValue from "./components/value";
import CardRating from "./components/cardRating";
import {
  doGetKpiList,
  doAssessment,
  getValueList,
  getRatings,
  saveValueList,
  doGetKpiRating,
  doSubmitNext,
  doGetProposeRating,
  doApproveAppraisal,
  doSendBackAppraisal,
  doTeamAcknowledge,
  doSaveAppraisal,
} from "../../../../../redux/actions/kpi";
import { actionGetNotifications } from "../../../../../redux/actions";
import { Success } from "../../../../../redux/status-code-type";
import globalStyle from "../../../../../styles/globalStyles";
import stepKpi, {
  PERFORMANCE_REVIEW_MANAGER,
} from "../../../../../utils/stepKpi";
import { toast } from "react-toastify";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { confirm } = Modal;
const { Option } = Select;

class Appraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKpis: [],
      loadingKpis: false,
      teamName: "",
      dataValueList: [],
      optionRating: [],
      loadingMyValue: false,
      challengeYour: "",
      tab: "1",
      myStep: false,
      isFeedback: false,
      generalFeedbackState: "",
      checkedFinal: false,
      acknowledgement: "",
      loadingSubmit: false,
      scoreTotal: 0,
    };
  }

  componentDidMount() {
    const { authReducer, match, step } = this.props;
    const { params } = match;
    if (authReducer.userId === params.userId) {
      if (step.currentStep === stepKpi[0] || step.currentStep === stepKpi[1]) {
        this.props.history.push("/planning/kpi");
      } else {
        this.props.history.push("/appraisal");
      }
    } else {
      this.getData();
    }
  }

  liveSUMkpiCount = (data) => {
    let totalScore = 0;
    // eslint-disable-next-line array-callback-return
    data.map((itemKpi) => {
      if (itemKpi?.kpiScore && itemKpi?.weight) {
        let score = parseFloat(itemKpi.kpiScore);
        score = (parseFloat(itemKpi.weight) / 100) * score;
        if (score) {
          totalScore += score;
        }
      } else {
        totalScore += 0;
      }
    });
    totalScore = parseFloat(totalScore);
    if (typeof totalScore === "number") {
      this.setState({
        scoreTotal: totalScore?.toFixed(2),
      });
    }
  };

  getData = async (e) => {
    const { match, getKpiRating, getProposeRating } = this.props;
    const { params } = match;
    this.getOwnKpiList(params.userId);
    this.getOwnValues(params.userId);
    getProposeRating();
    await getKpiRating(params.userId);
  };

  getOwnKpiList = async (id) => {
    const { getKpiList, form } = this.props;
    this.setState({
      loadingKpis: true,
    });
    await getKpiList(id);
    const { kpiReducer } = this.props;
    const {
      dataKpi,
      dataKpiMetrics,
      challenge,
      currentStep,
      generalFeedback,
      user,
      status,
    } = kpiReducer;
    if (status === Success) {
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
          weight: itemKpi.weight ? parseFloat(itemKpi.weight) : parseFloat("0"),
          rating: itemKpi.rating,
          index,
          achievementType: itemKpi.achievementType,
          kpiScore:
            itemKpi?.officialRating?.kpiScore <= 0
              ? 0
              : itemKpi?.officialRating?.kpiScore,
          actualAchievement: itemKpi.actualAchievement,
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
      const dataKpiCheck = form.getFieldsValue(["dataKpi"]);
      if (dataKpiCheck) {
        form.setFieldsValue({
          dataKpi: dataGen,
        });
      }
      this.setState({
        myStep: currentStep === "Performance Review Manager",
        dataKpis: dataOrdered,
        challengeYour: challenge === "----------" ? "" : challenge,
        generalFeedbackState: generalFeedback.comment,
        // eslint-disable-next-line max-len
        acknowledgement: `I have had feedback session with ${`${user.firstName} ${user.lastName}`} on his/her Performance Review Result.`,
        teamName: `${user.firstName} ${user.lastName}`,
      });
      this.liveSUMkpiCount(dataOrdered);
    }
    this.setState({
      loadingKpis: false,
    });
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
    const { dataValues, dataRating, statusValues } = kpiReducer;
    if (statusValues === Success) {
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
        loadingSubmit: false,
        optionRating: dataRating,
        dataValueList: dataOrdered,
      });
    }
    this.setState({
      loadingMyValue: false,
    });
  };

  handleSendBack = () => {
    const { sendBackAppraisal, match, getNotifications, form } = this.props;
    const { params } = match;
    const { dataKpis, dataValueList, generalFeedbackState, teamName } =
      this.state;
    const kpiFeedbacks = dataKpis.map((data, index) => {
      return {
        id: data.id,
        comment: data.feedback,
        kpiScore: data?.kpiScore ? parseFloat(data?.kpiScore) : 0,
      };
    });
    const valuesFeedbacks = dataValueList.map((data, index) => {
      return {
        id: data.valueId,
        comment: data.feedback,
      };
    });
    let rating = form.getFieldValue("proposeRating");
    // eslint-disable-next-line react/destructuring-assignment
    if (rating === this.props.kpiReducer.dataKpiRating.rating) {
      // eslint-disable-next-line react/destructuring-assignment
      rating = this.props.kpiReducer.dataKpiRating.id;
    }
    const data = {
      challengeOthersRatingComments: generalFeedbackState,
      kpiFeedbacks,
      rating,
      valuesFeedbacks,
    };
    confirm({
      title: "Are you sure?",
      content:
        "Make sure you have given feedback on both KPI's & Values before sending the feedback",
      okText: "Send Feedback",
      onOk: async () => {
        await sendBackAppraisal(params.userId, data);
        const { kpiReducer, history } = this.props;
        const {
          loadingSendBackAppraisal,
          statusSendBackAppraisal,
          messageSendBackAppraisal,
        } = kpiReducer;
        if (!loadingSendBackAppraisal) {
          if (statusSendBackAppraisal === Success) {
            history.push("/my-team/appraisal/");
            toast.success(`${teamName}'s Appraisal has given feedback`);
            getNotifications();
          } else {
            toast.warn(`Sorry ${messageSendBackAppraisal}`);
          }
        }
      },
      onCancel() {},
    });
  };

  handleSave = () => {
    const { form, saveAppraisal, match, getNotifications } = this.props;
    const { params } = match;
    const { dataKpis, dataValueList, generalFeedbackState, teamName } =
      this.state;
    const kpiFeedbacks = dataKpis.map((data, index) => {
      return {
        id: data.id,
        comment: data.feedback,
        kpiScore: data?.kpiScore ? parseFloat(data?.kpiScore) : 0,
      };
    });
    const valuesFeedbacks = dataValueList.map((data, index) => {
      return {
        valueId: data.valueId,
        rating: data.rating,
        comment: data.feedback,
      };
    });
    let rating = form.getFieldValue("proposeRating");
    // eslint-disable-next-line react/destructuring-assignment
    if (rating === this.props.kpiReducer.dataKpiRating.rating) {
      // eslint-disable-next-line react/destructuring-assignment
      rating = this.props.kpiReducer.dataKpiRating.id;
    }
    const data = {
      challengeOthersRatingComments: generalFeedbackState,
      kpiFeedbacks,
      rating,
      valuesFeedbacks,
    };
    form.validateFieldsAndScroll((errors, values) => {
      const errRequires = errors?.dataKpi
        ? errors?.dataKpi.filter(
            (er) => !er.kpiScore.errors[0].message.includes("required")
          )
        : 0;
      if (!dataKpis[0]?.rating) {
        toast.warn(
          `Sorry, Result's assesment is empty, please send back to ${teamName}​​​​​​​​ first before saving it`
        );
      } else if (!errors || errRequires.length === 0) {
        confirm({
          title: `Are you sure want to save ${teamName}'s Appraisal?`,
          okText: "Save",
          onOk: async () => {
            await saveAppraisal(params.userId, data, true);
            const { kpiReducer } = this.props;
            const {
              loadingApproveAppraisal,
              statusApproveAppraisal,
              messageApproveAppraisal,
            } = kpiReducer;
            if (!loadingApproveAppraisal) {
              if (statusApproveAppraisal === Success) {
                this.getData();
                toast.success(`${teamName}'s Appraisal feedback has been save`);
                getNotifications();
              } else {
                toast.warn(`Sorry ${messageApproveAppraisal}`);
              }
            }
          },
          onCancel() {},
        });
      } else if (errors.dataKpi) {
        toast.warn("Please, correctly fill the KPI Achievement Score", 200);
      }
    });
  };

  handleApprove = () => {
    const { form, approveAppraisal, match, getNotifications } = this.props;
    const { params } = match;
    const { dataKpis, dataValueList, generalFeedbackState, teamName } =
      this.state;
    const kpiFeedbacks = dataKpis.map((data, index) => {
      return {
        id: data.id,
        comment: data.feedback,
        kpiScore: data?.kpiScore ? parseFloat(data?.kpiScore) : 0,
      };
    });
    const valuesFeedbacks = dataValueList.map((data, index) => {
      return {
        valueId: data.valueId,
        rating: data.rating,
        comment: data.feedback,
      };
    });
    let rating = form.getFieldValue("proposeRating");
    // eslint-disable-next-line react/destructuring-assignment
    if (rating === this.props.kpiReducer.dataKpiRating.rating) {
      // eslint-disable-next-line react/destructuring-assignment
      rating = this.props.kpiReducer.dataKpiRating.id;
    }
    const data = {
      challengeOthersRatingComments: generalFeedbackState,
      kpiFeedbacks,
      rating,
      valuesFeedbacks,
    };
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        confirm({
          title: `Are you sure want to approve ${teamName}'s Appraisal?`,
          content:
            "Make sure you have given feedback on both KPI's & Values before approving it",
          onOk: async () => {
            await approveAppraisal(params.userId, data);
            const { kpiReducer } = this.props;
            const {
              loadingApproveAppraisal,
              statusApproveAppraisal,
              messageApproveAppraisal,
            } = kpiReducer;
            if (!loadingApproveAppraisal) {
              if (statusApproveAppraisal === Success) {
                this.getData();
                toast.success(
                  `${teamName}'s Appraisal has been send to system`
                );
                getNotifications();
              } else {
                toast.warn(`Sorry ${messageApproveAppraisal}`);
              }
            }
          },
          onCancel() {},
        });
      } else if (!dataKpis[0]?.rating) {
        toast.warn(
          `Sorry, Result's assesment is empty, please send back to ${teamName} first before saving it`
        );
      } else if (errors.proposeRating) {
        toast.warn("Please, give your Propose Rating");
      } else if (errors.dataKpi) {
        toast.warn("Please, fill your KPI Achievement Score");
      }
    });
  };

  changeGeneralFeedback = ({ target: { value } }) => {
    this.setState({ generalFeedbackState: value });
  };

  changeTab = (activeKey) => {
    this.setState({ tab: activeKey });
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
    this.liveSUMkpiCount(newData);
  };

  handleChangeValues = (row) => {
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

  onCheckResult = (e) => {
    const { checked } = e.target;
    this.setState({ checkedFinal: checked });
  };

  doAcknowledge = async () => {
    const { match, teamAck, getNotifications } = this.props;
    const { params } = match;
    const { acknowledgement, teamName } = this.state;
    const data = {
      userId: params.userId,
      acknowledgement,
    };
    confirm({
      title: "Are you sure?",
      content: `Are you sure want to send ${teamName}'s Appraisal?`,
      okText: "Send",
      onOk: async () => {
        await teamAck(data);
        const { kpiReducer } = this.props;
        if (!kpiReducer.loadingTeamAck) {
          if (kpiReducer.statusTeamAck === Success) {
            this.setState({
              loadingSubmit: true,
            });
            this.getData();
            getNotifications();
            toast.success(`${teamName}'s Final Result has been sent`);
          } else {
            toast.warn(`Sorry, ${kpiReducer.messageTeamAck}`);
          }
        }
      },
      onCancel() {},
    });
  };

  render() {
    const {
      loadingKpis,
      dataKpis,
      dataValueList,
      optionRating,
      loadingMyValue,
      challengeYour,
      tab,
      myStep,
      isFeedback,
      generalFeedbackState,
      teamName,
      checkedFinal,
      acknowledgement,
      loadingSubmit,
    } = this.state;
    const { form, kpiReducer, history } = this.props;
    const {
      dataKpiMetrics,
      dataProposeRating,
      dataKpiRating,
      currentStep,
      formStatusId,
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
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            paddingBottom: 0,
          }}
        >
          <Divider />
          <Skeleton
            loading={loadingKpis}
            active
            paragraph={false}
            title={{ width: 400 }}
          >
            <Text strong>{`Appraisal - ${teamName} `}</Text>
            <Text>Final appraisal</Text>
          </Skeleton>
          <Divider />
          <center>
            {(currentStep === stepKpi[5] ||
              currentStep === stepKpi[6] ||
              formStatusId === "3") && (
              <Row>
                <Col xl={24} md={24} xs={24}>
                  <CardRating
                    boxRateColor="inherit"
                    title={`${teamName && teamName + "'s"} Rating`}
                    rate={dataKpiRating.rating}
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
                {status === Success || loadingKpis ? (
                  <div>
                    <TableKPI
                      form={form}
                      loading={loadingKpis}
                      dataSource={dataKpis}
                      dataMetrics={dataKpiMetrics}
                      isFeedback={isFeedback}
                      myStep={myStep}
                      handleChangeField={this.handleChangeAssessment}
                    />
                    {!(
                      currentStep === stepKpi[5] ||
                      currentStep === stepKpi[6] ||
                      formStatusId === "3"
                    ) && (
                      <Form style={{ marginBottom: 10 }}>
                        <Text strong>Propose Rating</Text>
                        <Form.Item>
                          {dataKpiRating.rating ? (
                            form.getFieldDecorator("proposeRating", {
                              rules: [
                                {
                                  required: true,
                                  message: "Propose Rating is required",
                                },
                              ],
                              initialValue:
                                dataKpiRating.rating &&
                                dataKpiRating.id !== "-1972.0"
                                  ? dataKpiRating.rating
                                  : undefined,
                            })(
                              <Select
                                disabled={
                                  currentStep !== PERFORMANCE_REVIEW_MANAGER
                                }
                                style={{ width: 200 }}
                                placeholder="Propose Rating"
                              >
                                {dataProposeRating.map((item, index) => {
                                  return (
                                    <Option key={index} value={item.id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            )
                          ) : (
                            <Skeleton
                              active
                              title={{ width: 200 }}
                              paragraph={false}
                            />
                          )}
                        </Form.Item>
                        <Text strong>
                          SUM of Weighted KPI Score :
                          {` ${this.state.scoreTotal}`}
                        </Text>
                        <br />
                      </Form>
                    )}
                  </div>
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
              </TabPane>
              <TabPane tab="Values" key="2">
                {statusValues === Success || loadingMyValue ? (
                  <div>
                    <TableValue
                      form={form}
                      loading={loadingMyValue}
                      dataSource={dataValueList}
                      getOwnValues={this.getOwnValues}
                      handleChangeField={this.handleChangeValues}
                      handleSubmit={this.handleSubmit}
                      goToMonitoring={this.goToMonitoring}
                      handleSave={this.handleSave}
                      myStep={myStep}
                      optionRating={optionRating}
                    />
                    {!(
                      currentStep === stepKpi[5] ||
                      currentStep === stepKpi[6] ||
                      formStatusId === "3"
                    ) && (
                      <Form style={{ marginBottom: 10 }}>
                        <Text strong>Propose Rating</Text>
                        <Form.Item>
                          {dataKpiRating.rating ? (
                            form.getFieldDecorator("proposeRating", {
                              rules: [
                                {
                                  required: true,
                                  message: "Propose Rating is required",
                                },
                              ],
                              initialValue:
                                dataKpiRating.rating &&
                                dataKpiRating.id !== "-1972.0"
                                  ? dataKpiRating.rating
                                  : undefined,
                            })(
                              <Select
                                disabled={
                                  currentStep !== PERFORMANCE_REVIEW_MANAGER
                                }
                                style={{ width: 200 }}
                                placeholder="Propose Rating"
                              >
                                {dataProposeRating.map((item, index) => {
                                  return (
                                    <Option key={index} value={item.id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            )
                          ) : (
                            <Skeleton
                              active
                              title={{ width: 200 }}
                              paragraph={false}
                            />
                          )}
                        </Form.Item>
                        <Text strong>
                          SUM of Weighted KPI Score :
                          {` ${this.state.scoreTotal}`}
                        </Text>
                      </Form>
                    )}
                  </div>
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
        {status === Success && (
          <div
            style={{
              ...globalStyle.contentContainer,
              borderRadius: 0,
              paddingBottom: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingTop: 0,
            }}
          >
            <Skeleton
              loading={loadingKpis}
              title={{ width: 100 }}
              paragraph={{ rows: 1 }}
              active
            >
              <Text strong>Challenge yourself :</Text>
              <TextArea
                autoSize={{ minRows: 3 }}
                placeholder="Challenge yourself"
                label="Challenge yourself"
                className="challenge-input-disabled"
                value={challengeYour}
                readOnly
              />
            </Skeleton>
          </div>
        )}
        {(currentStep === stepKpi[5] || currentStep === stepKpi[6]) && (
          <div
            style={{
              ...globalStyle.contentContainer,
              borderRadius: 0,
              paddingTop: 0,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Spin spinning={loadingSubmit} indicator={<Icon type="loading" />}>
              <div style={{ textAlign: "left" }}>
                <Checkbox
                  onChange={this.onCheckResult}
                  checked={currentStep === stepKpi[6] || checkedFinal}
                  disabled={currentStep === stepKpi[6]}
                >
                  <Text strong>{acknowledgement}</Text>
                </Checkbox>
              </div>
              <br />
              <center>
                <Button
                  id="send-final"
                  type="primary"
                  onClick={this.doAcknowledge}
                  style={{ textAlign: "center" }}
                  disabled={currentStep === stepKpi[6] || !checkedFinal}
                >
                  {currentStep === stepKpi[5]
                    ? `Send final result to ${teamName}`
                    : stepKpi[6] && `Final result has been sent to ${teamName}`}
                </Button>
              </center>
            </Spin>
          </div>
        )}
        {status === Success && (
          <div
            style={{
              ...globalStyle.contentContainer,
              background: "rgb(250, 247, 187)",
              borderRadius: 0,
              paddingTop: 10,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Text strong>General Feedback :</Text>
            {myStep ? (
              <TextArea
                autoSize={{ minRows: 3 }}
                placeholder="General Feedback"
                style={{ background: "#EDEAA6", border: 0 }}
                value={generalFeedbackState}
                onChange={this.changeGeneralFeedback}
              />
            ) : (
              <TextArea
                autoSize={{ minRows: 3 }}
                className="challenge-input-disabled"
                style={{ background: "#EDEAA6" }}
                value={generalFeedbackState}
                readOnly
              />
            )}
          </div>
        )}
        {status === Success && (
          <div
            style={{
              ...globalStyle.contentContainer,
              borderRadius: 0,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <center>
              <Skeleton
                active
                loading={loadingKpis || loadingMyValue}
                paragraph={false}
                title={{ width: "60%" }}
              >
                {myStep && (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      id="go-back"
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={() => history.push("/my-team/appraisal/")}
                      style={{ margin: 10 }}
                    >
                      Back
                    </Button>
                    <Button
                      id="save-assessment"
                      onClick={this.handleSendBack}
                      style={{ margin: 10 }}
                    >
                      Send Feedback
                    </Button>
                    <Button
                      id="save"
                      onClick={this.handleSave}
                      style={{ margin: 10 }}
                    >
                      Save
                    </Button>
                    <Button
                      id="send-manager"
                      type="primary"
                      onClick={this.handleApprove}
                      style={{ margin: 10 }}
                    >
                      Approve
                    </Button>
                  </div>
                )}
                {currentStep === stepKpi[4] && (
                  <div
                    style={{
                      textAlign: "center",
                      paddingTop: 10,
                      lineHeight: 0,
                      margin: 0,
                    }}
                  >
                    <Title
                      level={4}
                      style={{ color: "#61C761", margin: 0 }}
                      ghost
                      strong
                    >
                      {`${teamName}'s Appraisal has been sent to system .`}
                      <br />
                      Waiting for the final Result
                    </Title>
                  </div>
                )}
              </Skeleton>
            </center>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducer: state.kpiReducer,
  authReducer: state.authReducer,
  step: state.userKpiStateReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(doGetKpiList(id)),
  doAssess: (data) => dispatch(doAssessment(data)),
  getValues: (id) => dispatch(getValueList(id)),
  getRatingList: () => dispatch(getRatings()),
  getKpiRating: (id) => dispatch(doGetKpiRating(id)),
  doSaveValues: (id, data) => dispatch(saveValueList(id, data)),
  submitNext: (id) => dispatch(doSubmitNext(id)),
  getProposeRating: () => dispatch(doGetProposeRating()),
  sendBackAppraisal: (id, data) => dispatch(doSendBackAppraisal(id, data)),
  approveAppraisal: (id, data) => dispatch(doApproveAppraisal(id, data)),
  saveAppraisal: (id, data) => dispatch(doSaveAppraisal(id, data)),
  teamAck: (data) => dispatch(doTeamAcknowledge(data)),
  getNotifications: () => dispatch(actionGetNotifications()),
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appraisal);

export default Form.create({})(withRouter(connectToComponent));

Appraisal.propTypes = {
  kpiReducer: PropTypes.instanceOf(Object),
  getRatingList: PropTypes.func,
  getValues: PropTypes.func,
  getKpiList: PropTypes.func,
  getKpiRating: PropTypes.func,
  match: PropTypes.instanceOf(Object),
  teamAck: PropTypes.func,
  approveAppraisal: PropTypes.func,
  sendBackAppraisal: PropTypes.func,
  getProposeRating: PropTypes.func,
  getNotifications: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.instanceOf(Object),
};
