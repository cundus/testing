import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Divider,
  Select,
  Spin,
  Form,
  Result,
  Row,
  Col
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
  SUCCESS
} from "../../redux/status-code-type";
import globalStyle from "../../styles/globalStyles";
import { kpiGetProcess } from "../../utils/kpiGetProcess";
import Previous from "./previous";

const { Text, Title } = Typography;

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
    const { authReducer, match, history} = this.props;
    if((match?.params?.userId === authReducer?.userId) && (history.location.pathname.includes("/my-team/previous-kpi"))) {
      this.props.history.push('/previous-kpi')
    } else {
      this.fetchAllData();
    }
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
    const { previousKpiReducer, history } = this.props;
    return (
      <div style={{ ...globalStyle.contentContainer, borderRadius: 0 }}>
        <div>
          <Divider />
          {history.location.pathname.includes("/my-team/previous-kpi")?
          <Text strong>{`Previous KPI ${previousKpiReducer?.dataKpiByForm?.user?.firstName ? "- "+previousKpiReducer?.dataKpiByForm?.user?.firstName : ""} ${previousKpiReducer?.dataKpiByForm?.user?.lastName || ""} `}</Text>:
          <Text strong>Previous KPI </Text>}
          <Divider />
        </div>
        <div>

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
        </div>

        <Row>
          <Col
            xs={{ span: 12, offset: 12 }}
            md={{ span: 15, offset: 15 }}>
            <Text strong>Final KPI Rating</Text>
            <Title level={4}
              className="mt-0">
                {previousKpiReducer?.dataKpiByForm?.kpiRating}
              </Title>
          </Col>
        </Row>

          {!loading ? 
          (previousKpiReducer?.statusKpiByForm !== SUCCESS ? 
            <div style={{marginTop: 40, marginBottom: 40}}>
              <Result 
                status={'error'}
                title={previousKpiReducer?.statusKpiByForm}
                subTitle={"Sorry, "+previousKpiReducer?.messageKpiByForm}
              />
            </div>
            :
            <Previous
              dataSource={dataKpiByForm}
              dataMetrics={previousKpiReducer?.dataKpiByForm?.labelList || []}
            />
          ) : (
            <div style={{marginTop: 40, marginBottom: 40}}>
            <center>
              <Spin />
            </center>
            </div>
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
  doGetKpiFormId: (userId, formId) => dispatch(actionGetPrevKpiByFormId(userId, formId)),
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
