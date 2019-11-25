import React, { Component } from "react";
import  { connect } from  'react-redux';
import  { GetMyTeamKPI } from  '../../../redux/actions/user';
import TablePlanning from './table-plan';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
const {Text} = Typography;

class Planning extends Component {
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
                <Text strong>View My Team KPI & Non-KPI Status </Text>
                <Text>
                  {`View your team KPI and Non-KPI status`}
                </Text>
                <Divider />
              </div>
             <TablePlanning team={this.props.myteam} />
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
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Planning);

export default withRouter(connectToComponent);
