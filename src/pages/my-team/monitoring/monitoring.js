import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { GetMyTeamKPIMonitoring } from '../../../redux/actions/user';
import TableMonitoring from './table-monitoring';
import globalStyle from "../../../styles/globalStyles";

const { Text } = Typography;

class Monitoring extends Component {
  async componentDidMount() {
    this.setState({loading: true})
    const { getMyTeamKPIMonitoring, authReducer } = this.props;
    await getMyTeamKPIMonitoring(authReducer?.userId);
    this.setState({loading:false})
  }

  render() {
    const { myteam } = this.props;
    return(
      <div style={globalStyle.contentContainer}>
        {
          !this.state?.loading?
            <div>
               <div>
                <Divider />
                <Text strong>Monitoring My Team KPI & Non-KPI Status </Text>
                <Text>
                  {`Monitoring your team KPI and Non-KPI`}
                </Text>
                <Divider />
              </div>
             <TableMonitoring team={myteam} />
            </div>:
            <center>
              <Spin/>
            </center>
        }
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => ({
  getMyTeamKPIMonitoring: (idUser) => dispatch(GetMyTeamKPIMonitoring(idUser)),
});

const mapStateToProps = (state) => ({
  auth: state.activeDirectoryReducer,
  authReducer: state.authReducer,
  myteam: state.myteamReducer
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Monitoring);

export default withRouter(connectToComponent);
