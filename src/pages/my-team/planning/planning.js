import React, { Component } from "react";
import  { connect } from  'react-redux';
import  { GetMyTeamKPI } from  '../../../redux/actions/user';
import TablePlanning from './table-plan';
import  { Spin} from  'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Planning extends Component {
  componentDidMount() {
    this.props.getMyTeamKPI(_.get(this, 'props.user.result.user.userId', []));
  }

  render() {
    return(
      <div>
        {
          (Object.keys(this.props.myteam).length)?
          <TablePlanning team={this.props.myteam} />:
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
