import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Input,
  Spin,
  Button,
  Icon
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableSubmitedKPI from './table-submited-kpi';
import { actionGetKPI } from '../../../../redux/actions';
import globalStyle from '../../../../styles/globalStyles';
import stepKpi from '../../../../utils/stepKpi';
import { getChallengeYourselfChecker } from '../../../../utils/challengeYourselfChecker';

const { Text } = Typography;
const { TextArea } = Input;

class SubmitedKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      weightTotal: 0,
      challengeYour: '',
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
      await getKpiList(authReducer.userId);
    }
    setAccess(true);
    const { ownkpiReducer } = this.props;
    const { dataKpiFiltered, challenge, isFeedback } = ownkpiReducer;
    this.setState({
      dataSource: dataKpiFiltered,
      isFeedback,
      challengeYour: getChallengeYourselfChecker(challenge)
    });
    this.weightCount(dataKpiFiltered);
  };

  weightCount = (data) => {
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
          weightTotalErr: false
        });
      } else {
        this.setState({
          weightTotal: totalWeight,
          weightTotalErr: true
        });
      }
    }
  }

  render() {
    const {
      dataSource, weightTotal, weightTotalErr, challengeYour, isFeedback
    } = this.state;
    const { ownkpiReducer } = this.props;
    const {
      loadingKpi, dataKpiMetrics, generalFeedback, currentStep
    } = ownkpiReducer;
    return (
      <div>
        <div style={{ ...globalStyle.contentContainer, borderRadius: 0 }}>
          <div>
            <Divider />
            <Text strong>Submit KPI </Text>
            <Text>Submit KPI to your Superior</Text>
            <br />
            <Text type={weightTotalErr ? 'danger' : ''}>
              Total KPI Weight :
              {` ${weightTotal}%`}
            </Text>
            <Divider />
          </div>
          {!loadingKpi ?
            <div>
              <TableSubmitedKPI
                dataMetrics={dataKpiMetrics}
                dataSource={dataSource}
                loading={loadingKpi}
                isFeedback={isFeedback}
              />
              <div>
                <Text strong>Challenge yourself :</Text>
                <TextArea
                  autoSize={{minRows: 3}}
                  className="challenge-input-disabled"
                  value={challengeYour}
                  readOnly
                />
              </div>
            </div> : <center><Spin /></center>}
        </div>
        {generalFeedback.comment &&
          <div style={{ ...globalStyle.contentContainer, background: 'rgb(250, 247, 187)', borderRadius: 0 }}>
            <Text strong>General Feedback :</Text>
            <TextArea
              autoSize={{minRows: 3}}
              className="challenge-input-disabled"
              value={generalFeedback.comment}
              readOnly
            />
          </div>}
        <center>
          <div style={{
            ...globalStyle.contentContainer,
            textAlign: 'center',
            borderRadius: 0,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
          }}
          >
            {currentStep === stepKpi[1] &&
              <Button
                style={{ margin: 10, borderColor: 'yellow' }}
              >
                <Text strong warning>Waiting for Review</Text>
              </Button>}
            {currentStep !== stepKpi[0] && currentStep !== stepKpi[1] &&
              <Button
                style={{ margin: 10, borderColor: '#52c41a' }}
              >
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                <Text strong>Your KPI Approved</Text>
              </Button>}
          </div>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  authReducer: state.authReducer,
  ownkpiReducer: state.ownKpi
});

const mapDispatchToProps = (dispatch) => ({
  getKpiList: (id) => dispatch(actionGetKPI(id))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitedKPI);

export default withRouter(connectToComponent);

SubmitedKPI.propTypes = {
  getKpiList: PropTypes.func,
  userReducer: PropTypes.instanceOf(Object),
  ownkpiReducer: PropTypes.instanceOf(Object),
  access: PropTypes.bool,
  setAccess: PropTypes.func
};
