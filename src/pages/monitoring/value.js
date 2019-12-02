import React, { Component } from 'react';
import {
  Button,
  Popconfirm,
  Tooltip,
  Icon
} from 'antd';
import DataTable from '../../components/dataTable';

class Value extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Section',
        dataIndex: 'description',
        placeholder: 'Enter 2019 baseline'
      },
      {
        title: 'Ratings',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline'
      },
      {
        title: 'Remarks',
        dataIndex: 'Upload',
        placeholder: 'Enter KPI Weight'
      },
      {
        title: 'Upload',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1'
      },
      {
        title: 'Feedbacks',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2'
      }
    ];
  }

  render() {
    const { columns } = this;
    const {
      dataOwn,
      handleChangeField,
    } = this.props;
    return (
      <div>
        <DataTable
          columns={columns}
          dataSource={dataOwn}
          handleChange={handleChangeField}
        />
      </div>
    );
  }
}
export default Value;
