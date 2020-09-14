import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Modal,
  Typography,
  Divider,
  message,
  Select,
  Spin,
  Form,
  Result
} from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  actionGetKPI,
  actionGetLatestGoalKPI,
  actionGetManagerKPI,
  actionSaveKpi,
} from "../../redux/actions";
import { actionGetFormTemplates, actionGetPrevKpiByFormId } from "../../redux/actions/previousKpi";
import {
  Success,
  FAILED_SAVE_CHALLENGE_YOURSELF,
} from "../../redux/status-code-type";
import globalStyle from "../../styles/globalStyles";
import kpiSendProcess from "../../utils/kpiSendProcess";
import { kpiGetProcess } from "../../utils/kpiGetProcess";
import { sendChallengeYourselfChecker } from "../../utils/challengeYourselfChecker";
import Previous from "./previous";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class CreateKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedForm: '',
      dataKpiByForm: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = async () => {
    const { doGetFormTemplates } = this.props;
    await doGetFormTemplates(false);
    const { previousKpiReducer } = this.props;
    this.selectFormTemplate(previousKpiReducer?.dataFormTemplates[0]?.formTemplateId)
  };

  getKpiList = async (userId, formId) => {
    this.setState({
      loading: true,
    });
    const { doGetKpiFormId } = this.props;
    await doGetKpiFormId(userId, formId);
    const { previousKpiReducer } = this.props;
    const newData = kpiGetProcess(
      previousKpiReducer?.dataKpiByForm?.kpiList || [],
      previousKpiReducer?.dataKpiByForm?.labelList || []
    );
    this.setState({
      dataKpiByForm: newData,
      loading: false,
    });
  };

  selectFormTemplate = (value) =>{
    const { authReducer, match} = this.props;
    this.getKpiList(match?.params?.userId || authReducer?.userId, value)
    this.setState({
      selectedForm: value
    })
  }

  render() {
    const {
      selectedForm,
      dataKpiByForm,
      loading
    } = this.state;
    const {
      selectFormTemplate
    } = this;
    const { previousKpiReducer } = this.props;
    return (
      <div style={{ ...globalStyle.contentContainer, borderRadius: 0 }}>
        <div>
          <Divider />
          <Text strong>Previous KPI </Text>
          <Divider />
        </div>
        <div>
        <Select
          placeholder="Select Performance"
          style={{minWidth: 500}}
          value={selectedForm||undefined}
          onChange={selectFormTemplate}
        >
          {previousKpiReducer?.dataFormTemplates && previousKpiReducer?.dataFormTemplates.map((item, index) =>(
            <Select.Option value={item?.formTemplateId}>{item?.formTemplateName}</Select.Option>))}
        </Select>
          {!loading ? 
          (previousKpiReducer?.errorKpiByForm ? 
            <Result 
              status={'error'}
              title={previousKpiReducer?.statusKpiByForm}
              subTitle={"Sorry, "+previousKpiReducer?.messageKpiByForm}
            />
            :
            <Previous
              dataSource={dataKpiByForm}
              dataMetrics={previousKpiReducer?.dataKpiByForm?.labelList || []}
            />
          ) : (
            <center>
              <Spin />
            </center>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ownkpiReducer: state.ownKpi,
  managerkpiReducer: state.managerKpi,
  savekpiReducer: state.saveKpi,
  kpiReducer: state.kpiReducer,
  authReducer: state.authReducer,
  previousKpiReducer: state.previousKpiReducer
});

const mapDispatchToProps = (dispatch) => ({
  doSavingKpi: (data, id) => dispatch(actionSaveKpi(data, id)),
  getKpiList: (id) => dispatch(actionGetKPI(id)),
  getKpiManagerList: (id) => dispatch(actionGetManagerKPI(id)),
  getLatestGoalKpi: () => dispatch(actionGetLatestGoalKPI()),
  doGetFormTemplates: (ellgibleToCopy) =>
    dispatch(actionGetFormTemplates(ellgibleToCopy)),
  doGetKpiFormId: (userId, formId) => dispatch(actionGetPrevKpiByFormId(userId, formId))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKPI);

export default Form.create({})(withRouter(connectToComponent));

CreateKPI.propTypes = {
  ownkpiReducer: PropTypes.instanceOf(Object),
  managerkpiReducer: PropTypes.instanceOf(Object),
  access: PropTypes.bool,
  setAccess: PropTypes.func,
  savekpiReducer: PropTypes.instanceOf(Object),
  stepChange: PropTypes.func,
  doSavingKpi: PropTypes.func,
  getKpiList: PropTypes.func,
  getLatestGoalKpi: PropTypes.func,
  getKpiManagerList: PropTypes.func,
  form: PropTypes.instanceOf(Object),
  userReducer: PropTypes.instanceOf(Object).isRequired,
};
