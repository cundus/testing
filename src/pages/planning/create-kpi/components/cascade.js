import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Checkbox } from 'antd';
import { DataTable } from '../../../../components';

class Cascade extends Component {
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
        title: 'Supervisor\'s Name',
        dataIndex: 'typeKpi',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        width: 80,
        type: 'number',
        editable: false
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
        editable: false
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
        const { dataSource, handleSelectData } = this.props;
        return (
          dataSource.length >= 1 ? (
            <Checkbox
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(e) => handleSelectData(record)}
              checked={this.checkStatus(record)}
            />
          ) : null
        );
      }
    };
    await newColumns.push(action);
    this.setState({
      columns: newColumns
    });
  }


  checkStatus = (record) => {
    const { dataSelectedCascade } = this.props;
    const dataChecking = dataSelectedCascade.filter((item) => item.description === record.description);
    if (dataChecking.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      dataSource, handleSaveDraft, handleError, loading
    } = this.props;
    const { columns } = this.state;

    return (
      <div>
        <DataTable
          columns={columns}
          loading={loading}
          datasource={dataSource}
          handleerror={handleError}
        />
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={handleSaveDraft}
            style={{ margin: 10 }}
          >
            Save Draft
          </Button>
        </div>
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
)(Cascade);

export default connectToComponent;

Cascade.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  dataSelectedCascade: PropTypes.instanceOf(Array),
  handleSaveDraft: PropTypes.func,
  handleSelectData: PropTypes.func,
  handleError: PropTypes.func,
  kpiReducers: PropTypes.func,
  loading: PropTypes.bool
};
