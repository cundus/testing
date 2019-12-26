import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Popconfirm, Tooltip, Icon
} from 'antd';
import { DataTable } from '../../../../../components';

class CreateOwn extends Component {
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
    const { dataMetrics } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        editable: true
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        width: 200,
        editable: true
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        type: 'number',
        width: 90,
        editable: true
      }
    ];
    // eslint-disable-next-line array-callback-return
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.index}`,
        align: 'center',
        width: 200,
        editable: true
      };
      newColumns.push(data);
    });
    const action = {
      title: 'Action',
      align: 'center',
      editable: false,
      width: 100,
      dataIndex: 'action',
      render: (text, record) => {
        const { dataSource, handleDelete } = this.props;
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
    };
    await newColumns.push(action);
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      handleAddRow,
      handleChangeField,
      handleSaveDraft,
      handleError,
      loading,
      form
    } = this.props;
    return (
      <div>
        <DataTable
          form={form}
          columns={columns}
          loading={loading}
          datasource={dataSource}
          handleerror={handleError}
          handlechange={handleChangeField}
        />
        <div style={{ textAlign: 'center' }}>
          <Button
            id="add-row-crate-own"
            onClick={handleAddRow}
            style={{ margin: 10 }}
          >
            Add a row
          </Button>
          <Button
            id="save-draft"
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
  dataMetrics: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  form: PropTypes.instanceOf(Object)
};
