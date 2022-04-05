import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Typography, Skeleton
} from 'antd';
import { DataTable } from '../../../../../../components';

const { Text } = Typography;

class KPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      metrics: [],
      myStepState: true
    };
  }

  componentDidMount() {
    this.getColumns();
  }

  componentDidUpdate() {
    const { metrics, myStepState } = this.state;
    const { dataMetrics, myStep } = this.props;
    if (metrics !== dataMetrics) {
      this.getColumns();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        metrics: dataMetrics
      });
    }
    if (myStepState !== myStep) {
      this.getColumns();
    }
  }

  getColumns = async () => {
     // the async await on this function would leaking memory (showing warn)
     // but i have to async await for making it table
    const { dataMetrics, myStep } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
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
        width: 150,
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        type: 'number',
        width: 90,
        editable: false
      }
    ];
    // eslint-disable-next-line array-callback-return
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.index}`,
        align: 'center',
        width: 190,
        editable: false
      };
      newColumns.push(data);
    });
    const result = {
      title: 'Result',
      align: 'center',
      editable: false,
      width: 100,
      dataIndex: 'result',
      render: (text, record) => {
        const { loadingResult } = this.props;
        let colorring = 'default';
        if (record.rating === 'Below') {
          colorring = '#d1a145';
        } else if (record.rating === 'Meet') {
          colorring = '#4ebf37';
        } else if (record.rating === 'Exceed') {
          colorring = '#484ef0';
        }
        return (
          <Skeleton active loading={loadingResult} paragraph={false} title={{ width: 'auto' }}>
            <Text strong style={{ color: colorring }}>{record.rating}</Text><br />
            <span>{record.actualAchievement ? `(${record.actualAchievement})` : ''}</span>
          </Skeleton>
        );
      }
    };
    const KPIAchievementScore = {
      title: 'KPI Achievement Score',
      dataIndex: 'kpiScore',
      align: 'center',
      width: 130,
      editable: myStep
    };
    const Feedback = {
      title: 'Feedback',
      dataIndex: 'feedback',
      placeholder: 'Enter KPI Feedback',
      align: 'center',
      width: 110,
      className: 'ant-table-th-yellow',
      editable: myStep
    };
    await newColumns.push(result);
    await newColumns.push(KPIAchievementScore);
    // await newColumns.push(action);
    await newColumns.push(Feedback);
    this.setState({
      columns: newColumns,
      myStepState: myStep
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      loading,
      form,
      handleChangeField
    } = this.props;
    return (
      <div>
        <DataTable
          form={form}
          columns={columns}
          loading={loading}
          handlechange={handleChangeField}
          datasource={dataSource}
        />
      </div>
    );
  }
}

export default KPI;

KPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChangeField: PropTypes.func,
  loadingResult: PropTypes.bool,
  dataMetrics: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  form: PropTypes.instanceOf(Object)
};
