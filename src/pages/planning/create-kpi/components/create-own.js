import React, { Component } from 'react';
import {
  Button,
  Popconfirm,
  Tooltip,
  Icon
} from 'antd';
import { DataTable } from '../../../../components';

class CreateOwn extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter 2019 baseline',
        editable: true
      },
      {
        title: '2019 Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline',
        editable: true
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        editable: true
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1',
        editable: true
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2',
        editable: true
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        placeholder: 'Enter Level 3',
        editable: true
      },
      {
        title: '',
        dataIndex: 'action',
        action: true,
        render: (text, record) =>
          this.props.dataOwn.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.props.handleDeleteRow(record.key)}
            >
              <Tooltip placement="bottomRight" title={'delete'}>
                <Button>
                  <Icon type="delete" />
                </Button>
              </Tooltip>
            </Popconfirm>
          ) : null
      }
    ];
  }

  render() {
    const { columns } = this;
    const {
      dataOwn,
      handleAddRow,
      handleChangeField,
      handleSaveDraft
    } = this.props;
    return (
      <div>
        <DataTable
          columns={columns}
          dataSource={dataOwn}
          handleChange={handleChangeField}
        />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleAddRow} type="primary" style={{ margin: 10 }}>
            Add a row
          </Button>
          <Button onClick={handleSaveDraft} style={{ margin: 10 }}>
            Save Draft
          </Button>
        </div>
      </div>
    );
  }
}
export default CreateOwn;
