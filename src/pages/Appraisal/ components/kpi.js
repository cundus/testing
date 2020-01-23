import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Typography, Skeleton
} from 'antd';
import { DataTable } from '../../../components';
import ModalAssessment from './modalAssesment';

const { Text } = Typography;
class KPI extends Component {
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
     // the async await on this function would leaking memory (showing warn)
     // but i have to async await for making it table
    const { dataMetrics } = this.props;
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
        width: 200,
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
        width: 200,
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
            <Text strong style={{ color: colorring }}>{record.rating}</Text>
          </Skeleton>
        );
      }
    };
    const action = {
      title: 'Action',
      align: 'center',
      editable: false,
      width: 100,
      dataIndex: 'action',
      render: (text, record) => {
        const {
          form,
          isModalShow,
          showHideModal,
          handleChangeField
        } = this.props;
        let error = false;
        const field = form.getFieldsError([`dataKpi[${record.index}].assessment`]);
        if (field.dataKpi[record.index].assessment) {
          error = true;
        } else {
          error = false;
        }
        return (
          <div>
            <Button type={error ? 'danger' : 'primary'} ghost onClick={() => this.props.showHideModal(record.id)}>Assess</Button>
            <ModalAssessment
              form={form}
              isModalShow={isModalShow === record.id}
              assessment={record.assessment}
              qualitativeOption={record.qualitativeOption}
              modalRecord={record}
              showHideModal={showHideModal}
              handleChangeAssessment={handleChangeField}
            /> <br />
            {error && <Text type="danger">is required</Text>}
          </div>
        );
      }
    };
    await newColumns.push(result);
    await newColumns.push(action);
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      loading,
      form,
      goToMonitoring
    } = this.props;
    return (
      <div>
        <DataTable
          form={form}
          columns={columns}
          loading={loading}
          datasource={dataSource}
        />
      </div>
    );
  }
}

export default KPI;

KPI.propTypes = {
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
