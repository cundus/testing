import React, { Component } from "react";
import  { connect } from 'react-redux';
import  { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { GetMyTeamKPIApraisal } from '../../../redux/actions/user';
import TableMonitoring from './table-appraisal';
import TableAppraisal from "./table-appraisal";

const { Text } = Typography;

class Appraisal extends Component {
  componentDidMount() {
    const { getMyTeamKPIApraisal } = this.props;
    getMyTeamKPIApraisal(_.get(this, 'props.user.result.user.userId', []));
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
                <Text strong>Appraisal My Team KPI & Non-KPI Status </Text>
                <Text>
                  {`Appraisal your team KPI and Non-KPI`}
                </Text>
                <Divider />
              </div>
             <TableAppraisal team={myteam} />
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
  getMyTeamKPIApraisal: (idUser) => dispatch(GetMyTeamKPIApraisal(idUser))
});

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  user: state.userReducers,
  myteam: state.myteamReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Appraisal);

export default withRouter(connectToComponent);
