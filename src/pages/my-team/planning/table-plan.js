import React, { Component } from 'react';
import {Avatar, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/dataTable/index';
import apiUrl from '../../../utils/apiUrl';

class TablePlan extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Profile Pic',
        dataIndex: 'userId',
        align: 'center',
        placeholder: 'Profile',
        action: true,
        render: (text) => (<Avatar src={`${apiUrl()}/user/photo/${text}`} />)
      },
      {
        title: 'Name',
        dataIndex: 'firstName',
        align: 'center',
        placeholder: 'name'
      },
      {
        title: 'KPI Title',
        dataIndex: 'title',
        align: 'center',
        placeholder: 'KPI Title'
      },
      // {
      //   title: 'KPI Score',
      //   dataIndex: 'score',
      //   placeholder: 'Score'
      // },
      // {
      //   title: 'KPI Rating',
      //   dataIndex: 'ratting',
      //   placeholder: 'Rating'
      // },
      // {
      //   title: 'Non-KPI Result',
      //   dataIndex: 'result',
      //   placeholder: 'Non-KPI Result'
      // },
      {
        title: 'Status',
        dataIndex: 'statusNumber',
        align: 'center',
        placeholder: 'Status',
        action: true,
        render: (text) => {
          let status;
          let color;
          if (text === 0) {
            status = 'On Progress';
            color = '#ffb822';
          } else if (text === 1) {
            status = 'Submitted';
            color = '#fd27eb';
          } else if (text === 2) {
            status = 'Completed';
            color = '#1dc9b7';
          } else {
            status = 'N/A';
            color = '#ccc';
          }
          // else if (text === 3) {
          //   status = 'Review';
          //   color = 'blue';
          // }
          return (<Tag color={color}>{status}</Tag>);
        }
      },
      {
        title: 'Action',
        dataIndex: 'costumAction',
        align: 'center',
        placeholder: 'action',
        action: true,
        render: (text) => (
          <Button type="primary" disabled={isNaN(text.status) || text.status !== 1}>
            <Link to={`/my-team/planning/${text.idUser}`}>
              View
            </Link>
          </Button>)
      }
    ];

    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    const { team } = this.props;
    this.setState(
      {
        dataSource: team,
      }
    );
  }

  render() {
    const { dataSource } = this.state;
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          form={this.props.form}
          columns={columns}
          datasource={dataSource}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TablePlan;
