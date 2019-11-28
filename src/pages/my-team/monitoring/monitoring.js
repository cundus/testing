import React, { Component } from "react";
import  { GetMyTeamKPI } from  '../../../redux/actions/user';
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import TableMonitoring from './table-monitoring';
const { Text } = Typography;

class Monitoring extends Component {
  componentDidMount() {
    this.props.getMyTeamKPI(_.get(this, 'props.user.result.user.userId', []));
  }

  render() {
    return(
      <div>
        {
          (Object.keys(this.props.myteam).length)?
            <div>
               <div>
                <Divider />
                <Text strong>Monitoring My Team KPI & Non-KPI Status</Text>
                <Text>
                  {`Monitoring your team KPI and Non-KPI`}
                </Text>
                <Divider />
              </div>
             <TableMonitoring team={this.props.myteam} />
            </div>:
            <center>
              <Spin/>
            </center>
        }
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => ({
  getMyTeamKPI: (idUser) => dispatch(GetMyTeamKPI(idUser))
});

const mapStateToProps = state => ({
  auth: state.authReducer,
  user: state.userReducers,
  myteam: state.myteamReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Monitoring);

export default withRouter(connectToComponent);
