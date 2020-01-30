import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { GetMyTeamKPIMonitoring } from '../../../redux/actions/user';
import TableMonitoring from './table-monitoring';
import globalStyle from "../../../styles/globalStyles";

const { Text } = Typography;

class Monitoring extends Component {
  componentDidMount() {
    const { getMyTeamKPIMonitoring } = this.props;
    getMyTeamKPIMonitoring(_.get(this, 'props.user.result.user.userId', []));
  }

  render() {
    const { myteam } = this.props;
    return(
      <div style={globalStyle.contentContainer}>
        {
          (Object.keys(myteam).length)?
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
  getMyTeamKPIMonitoring: (idUser) => dispatch(GetMyTeamKPIMonitoring(idUser))
});

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers,
  myteam: state.myteamReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Monitoring);

export default withRouter(connectToComponent);
