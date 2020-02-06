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
          if (text === 6) {
            color = '#4CAF50';
          } else if (text === 5) {
            color = '#FFA000';
          } else if (text === 4) {
            color = '#8BC34A';
          } else if (text === 3) {
            color = '#FFEB3B';
          } else if (text === 2) {
            color = '#607D8B';
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
        render: (text, record) => {
          let access = false;
          if (record.statusNumber === 6) {
            access = true;
          } else if (record.statusNumber === 5) {
            access = true;
          } else if (record.statusNumber === 4) {
            access = true;
          } else if (record.statusNumber === 3) {
            access = false;
          } else if (record.statusNumber === 1 || record.statusNumber === 2) {
            access = false;
          } else {
            access = false;
          }
          return (
            <Button
              type="primary"
              disabled={!access}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => this.props.history.push(`/my-team/appraisal/${record.userId}`)}
            >
              View
            </Button>
          );
        }
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
