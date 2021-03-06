import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Popconfirm, Tooltip, Icon
} from 'antd';
import { DataTable } from '../../../../components';

class TableDrafKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
  }

  componentDidMount() {
    setTimeout(() => this.getColumns(), 10);
    // the settimeout would leaking memory (showing warn)
    // but i have to make it for getting a newest feedback props
  }

  getColumns = async () => {
     // the async await on this function would leaking memory (showing warn)
     // but i have to async await for making it table
    const { dataMetrics, isFeedback } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        className: 'td-top',
        editable: true
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        className: 'td-top',
        width: 200,
        editable: true
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        className: 'td-top',
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
        className: 'td-top',
        width: 150,
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
    const Feedback = {
      title: 'Feedback',
      dataIndex: 'feedback',
      placeholder: 'Enter KPI Feedback',
      align: 'center',
      width: 100,
      className: 'ant-table-th-yellow',
      editable: false
    };
    if (isFeedback) {
      await newColumns.push(Feedback);
    }
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      handleChange,
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
          // it (lowercase) handle vdom warn, but another vdom valid function err show
          handlechange={handleChange}
        />
      </div>
    );
  }
}

export default TableDrafKPI;

TableDrafKPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChange: PropTypes.func,
  handleError: PropTypes.func,
  handleDelete: PropTypes.func,
  isFeedback: PropTypes.bool,
  dataMetrics: PropTypes.instanceOf(Array),
  form: PropTypes.instanceOf(Object),
  loading: PropTypes.bool
};
