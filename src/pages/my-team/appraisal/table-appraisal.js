import React, { Component } from 'react';
import {
  Avatar, Button, Skeleton, Typography
} from 'antd';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/dataTable/index';

const { Text } = Typography;

const {
  REACT_APP_API_URL
} = process.env;

class TableAppraisal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
  }

  componentDidMount() {
    this.getColumns();
  }

  getColumns = async () => {
    const newColumns = [
      {
        title: 'Profile Pic',
        dataIndex: 'userId',
        placeholder: 'Profile',
        action: true,
        render: (text) => (<Avatar src={`${REACT_APP_API_URL}/user/photo/${text}`} />)
      },
      {
        title: 'Name',
        dataIndex: 'firstName',
        placeholder: 'name'
      },
      {
        title: 'KPI Title',
        dataIndex: 'kpiTitle',
        placeholder: 'KPI Title',
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'KPI Score',
        dataIndex: 'score',
        placeholder: 'Score',
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'KPI Rating',
        dataIndex: 'rating',
        placeholder: 'Rating',
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        placeholder: 'Status',
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'Action',
        dataIndex: 'userId',
        placeholder: 'action',
        action: true,
        render: (text) => (
          <Button type="primary">
            <Link to={`/my-team/appraisal/${text}`}>
            View
            </Link>
          </Button>
        )
      }
    ];
    this.setState({ columns: newColumns });
  }

  render() {
    const { dataSource, loading } = this.props;
    const { columns } = this.state;
    return (
      <div>
        <DataTable
          columns={columns}
          loading={loading}
          datasource={dataSource}
        />
      </div>
    );
  }
}

export default TableAppraisal;
