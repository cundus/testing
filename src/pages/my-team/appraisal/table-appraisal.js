import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import  { Link } from 'react-router-dom';
import DataTable from '../../../components/dataTable/index';

const {
  REACT_APP_API_URL
} = process.env;

class TableAppraisal extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Profile Pic',
        dataIndex: 'userId',
        placeholder: 'Profile',
        action: true,
        render: (text) => (<Avatar src={`${REACT_APP_API_URL}/user/photo/${text}`}/>)
      },
      {
        title: 'Name',
        dataIndex: 'firstName',
        placeholder: 'name'
      },
      {
        title: 'KPI Title',
        dataIndex: 'title',
        placeholder: 'KPI Title'
      },
      {
        title: 'KPI Score',
        dataIndex: 'score',
        placeholder: 'Score'
      },
      {
        title: 'KPI Rating',
        dataIndex: 'ratting',
        placeholder: 'Rating'
      },
      {
        title: 'Non-KPI Result',
        dataIndex: 'result',
        placeholder: 'Non-KPI Result'
      },
      {
        title: 'Action',
        dataIndex: 'userId',
        placeholder: 'action',
        action: true,
        render: (text) => (
          <Button type={'primary'}>
            <Link to={`/my-team/appraisal/${text}`}>
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

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    const { team } = this.props;
    const { result } = team;
    this.setState(
      {
        dataSource: result,
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
          columns={columns}
          datasource={dataSource}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableAppraisal;
