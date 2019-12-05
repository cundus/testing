import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
 Button, Popconfirm, Tooltip, Icon
} from 'antd';
import { DataTable } from '../../../components';

class TableDrafKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
    this.getColumns();
  }

  getColumns = async () => {
    const { kpiReducers } = this.props;
    const { dataMetrics } = kpiReducers;
    const newColumns = [
      {
        title: 'Cascading / Self KPI',
        dataIndex: 'typeKpi',
        align: 'center',
        width: 200,
        placeholder: 'Cascading/Self KPI',
        editable: false
      },
      {
        title: 'KPI Subject',
        dataIndex: 'description',
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
        width: 90,
        type: 'number',
        editable: true
      }
    ];
    // eslint-disable-next-line array-callback-return
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.orderNo}`,
        align: 'center',
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
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      handleChangeField,
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers
});

const mapDispatchToProps = (dispatch) => ({});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableDrafKPI);

export default connectToComponent;

TableDrafKPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChangeField: PropTypes.func,
  handleError: PropTypes.func,
  handleDelete: PropTypes.func,
  kpiReducers: PropTypes.func,
  loading: PropTypes.bool
};
