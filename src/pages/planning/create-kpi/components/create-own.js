import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Popconfirm, Tooltip, Icon
} from 'antd';
import { DataTable } from '../../../../components';

class CreateOwn extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        editable: true
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        editable: true
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        width: 90,
        type: 'number',
        editable: true
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1',
        align: 'center',
        editable: true
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2',
        align: 'center',
        editable: true
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        placeholder: 'Enter Level 3',
        align: 'center',
        editable: true
      },
      {
        title: 'Action',
        align: 'center',
        editable: false,
        dataIndex: 'action',
        render: (text, record) => {
          const { handleDelete, dataSource } = this.props;
          return (
            dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                // eslint-disable-next-line react/jsx-no-bind
                onConfirm={() => handleDelete(record.key)}
              >
                <Tooltip placement="bottomRight" title="delete">
                  <Button type="danger" ghost>
                    <Icon type="delete" />
                  </Button>
                </Tooltip>
              </Popconfirm>
            ) : null
          );
        }
      }
    ];
  }

  render() {
    const { columns } = this;
    const {
      dataSource,
      handleAddRow,
      handleChangeField,
      handleSaveDraft,
      handleError,
      loading
    } = this.props;
    return (
      <div>
        <DataTable
          columns={columns}
          loading={loading}
          datasource={dataSource}
          handleerror={handleError}
          handlechange={handleChangeField}
        />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleAddRow} style={{ margin: 10 }}>
            Add a row
          </Button>
          <Button
            onClick={handleSaveDraft}
            type="primary"
            style={{ margin: 10 }}
          >
            Save Draft
          </Button>
        </div>
      </div>
    );
  }
}
export default CreateOwn;

CreateOwn.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleAddRow: PropTypes.func,
  handleChangeField: PropTypes.func,
  handleSaveDraft: PropTypes.func,
  handleError: PropTypes.func,
  handleDelete: PropTypes.func,
  loading: PropTypes.bool
};
