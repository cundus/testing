import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Divider, Typography, Form } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import TablePlanning from './table-plan';
import { GetMyTeamKPI } from '../../../redux/actions/user';

const { Text } = Typography;

class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  async componentDidMount() {
    const { getMyTeamKPI } = this.props;
    await getMyTeamKPI(_.get(this, 'props.user.result.user.userId', []));
    const newData = this.props.myteam.result.map( d => {
      d.costumAction = {
        idUser: d.userId,
        status: d.status
      };
      return d;
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { myteam } = this.props;
    const { dataSource, form } = this.state;
    return(
      <div>
        {
          (Object.keys(dataSource).length > 0 )?
            <div>
              <div>
                <Divider />
                <Text strong>View My Team KPI & Non-KPI Status </Text>
                <Text>
                  View your team KPI and Non-KPI status
                </Text>
                <Divider />
              </div>
              <TablePlanning form={form} team={dataSource} />
            </div>:
            <center>
              <Spin />
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
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(Planning);

export default Form.create({})(withRouter(connectToComponent));
