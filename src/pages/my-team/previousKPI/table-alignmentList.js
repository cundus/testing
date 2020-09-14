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
        placeholder: 'userId',
        render: (text) => (<Avatar src={`${apiUrl()}/user/photo/${text}`}/>)
      },
      {
        title: `Employee's Name`,
        dataIndex: 'firstName',
        align: 'center',
        placeholder: 'Name',
        render: (text,record) => (
        <p>{text} {record?.lastName}</p>
        )
      },
      {
        title: 'Action',
        dataIndex: 'userId',
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
