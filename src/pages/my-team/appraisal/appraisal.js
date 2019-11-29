import React, { Component } from "react";
import  { GetMyTeamKPI } from  '../../../redux/actions/user';
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import TableAppraisal from './table-appraisal';
const { Text } = Typography;

class Appraisal extends Component {
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
                <Text strong>Final Appraisal for My Team's KPI & Non-KPI Status</Text>
                <Text>
                  {`Give final Score and Rating for your team KPI and Non-KPI`}
                </Text>
                <Divider />
              </div>
             <TableAppraisal team={this.props.myteam} />
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
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Appraisal);

export default withRouter(connectToComponent);
