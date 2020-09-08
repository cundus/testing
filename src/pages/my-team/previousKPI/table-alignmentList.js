import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import DataTable from '../../../components/dataTable/index';
import  { Link } from 'react-router-dom';
import apiUrl from '../../../utils/apiUrl';


class TableAlignment extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Avatar',
        align: 'center',
        placeholder: 'Session ID'
      },
      {
        title: 'Name',
        dataIndex: 'sessionName',
        align: 'center',
        placeholder: 'Session Name',
        render: (text) => (
          <p>Brooke Brown</p>
        )
      },
      {
        title: 'Action',
        dataIndex: 'sessionId',
        align: 'center',
        placeholder: 'action',
        action: true,
        render: (text) => (
          <Button type={'primary'}>
            <Link to={`/my-team/previous-kpi/${text}`}>
              View
            </Link>
          </Button>
        )
      }
    ];

    this.state = {
      dataSource: []
    };
  }


  render() {
    const { team } = this.props;
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          datasource={team}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableAlignment;
