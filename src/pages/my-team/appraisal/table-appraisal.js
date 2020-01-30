import React, { Component } from 'react';
import {
  Avatar, Button, Skeleton, Typography, Tag
} from 'antd';
import { withRouter } from 'react-router-dom';
import DataTable from '../../../components/dataTable';

const { Text } = Typography;

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
        width: 100,
        align: 'center',
        action: true,
        render: (text) => (<Avatar src={`${REACT_APP_API_URL}/user/photo/${text}`} />)
      },
      {
        title: 'Name',
        dataIndex: 'firstName',
        placeholder: 'name',
        width: 150
      },
      {
        title: 'KPI Title',
        dataIndex: 'kpiTitle',
        placeholder: 'KPI Title',
        width: 300,
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text || '(none)'}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'KPI Score',
        dataIndex: 'score',
        placeholder: 'Score',
        width: 100,
        align: 'center',
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text || '(none)'}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'KPI Rating',
        dataIndex: 'rating',
        placeholder: 'Rating',
        width: 100,
        align: 'center',
        render: (text) => {
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Text>{text || '(none)'}</Text>
            </Skeleton>
          );
        }
      },
      {
        title: 'Status',
        dataIndex: 'statusNumber',
        placeholder: 'Status',
        width: 100,
        align: 'center',
        render: (text, record) => {
          let color = '';
          if (text === 3) {
            color = '#ffb822';
          } else if (text === 1) {
            color = '#fd27eb';
          } else if (text === 2) {
            color = '#1dc9b7';
          } else {
            color = '#ccc';
          }
          return (
            <Skeleton active loading={text === 'loading'} paragraph={false} title={{ width: '100%' }}>
              <Tag color={color}>{record.status || 'N/A'}</Tag>
            </Skeleton>
          );
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        placeholder: 'action',
        width: 100,
        align: 'center',
        action: true,
        render: (text, record) => (
          <Button
            type="primary"
            disabled={record.statusNumber !== 3}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => this.props.history.push(`/my-team/appraisal/${record.userId}`)}
          >
            View
          </Button>
        )
      }
    ];
  }

  render() {
    const { dataSource, loading } = this.props;
    const { columns } = this;
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

export default withRouter(TableAppraisal);
