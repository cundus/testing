import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { GetMyTeamKPI } from '../../../redux/actions/user';
import TableMonitoring from './table-monitoring';

const { Text } = Typography;

class Monitoring extends Component {
  componentDidMount() {
    const { getMyTeamKPI } = this.props;
    getMyTeamKPI(_.get(this, 'props.user.result.user.userId', []));
  }

  render() {
    const { myteam } = this.props;
    return(
      <div>
        {
          (Object.keys(myteam).length)?
            <div>
               <div>
                <Divider />
                <Text strong>Monitoring My Team KPI & Non-KPI Status</Text>
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
  getMyTeamKPI: (idUser) => dispatch(GetMyTeamKPI(idUser))
});

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers,
  myteam: state.myteamReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Monitoring);

export default withRouter(connectToComponent);
