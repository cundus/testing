import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Icon
} from 'antd';
import { DataTable } from '../../components';
import { Link } from  'react-router-dom';
class TableMonitorKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
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
    const { dataMetrics, userId, isSuperior, isEditable, stafid } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        className: 'td-top',
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        className: 'td-top',
        width: 200,
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        className: 'td-top',
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
        className: 'td-top',
        width: 150,
        editable: false
      };
      newColumns.push(data);
    });
    if (isEditable){
    const action = {
      title: 'Progress Tracking',
      align: 'center',
      editable: false,
      noEditableRow: true,
      width: 250,
      dataIndex: 'action',
      render: (text, record) => {
        const { dataSource, handleSave, handleEditRow } = this.props;
        if (this.props.editableRow === record?.id) {
          return (
            <div>
              <Button style={{ marginBottom: 5 }} onClick={() => {
                handleSave()
                this.setState({editableRow:null})
              }}>
                  Save
              </Button>
            </div>)
        }
        return (
          dataSource.length >= 1 ? (
            <div>
              <Button 
                type={'primary'}
                ghost
                style={{ marginRight: 5, marginBottom: 5 }
              }>
                <Link to={`/Activity/${record.key}/${!isSuperior ? userId : stafid}`}>
                  Activity
                </Link>
              </Button>
              <Button 
                type={'primary'}
                ghost
                style={{ marginRight: 5, marginBottom: 5 }
              }>
                <Link to={`/Achievement/${record.key}/${ !isSuperior ? userId : stafid}`}>
                  Achievement
                </Link>
              </Button>
              <Button 
                icon={"edit"}
                shape="shape"
                style={{ marginRight: 5, marginBottom: 5, color: "#FF2222", border: '1px solid #FF2222' }}
                onClick={() => handleEditRow(record?.id)}
              />
            </div>
          ) : null
        );
      }
    }
    await newColumns.push(action);
    };
    this.setState({
      columns: newColumns,
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      handleChange,
      handleError,
      loading,
      form,
      editableRow
    } = this.props;
    return (
      <div>
        <DataTable
          editableRow={editableRow}
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

export default TableMonitorKPI;

TableMonitorKPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChange: PropTypes.func,
  handleError: PropTypes.func,
  handleDelete: PropTypes.func,
  isFeedback: PropTypes.bool,
  dataMetrics: PropTypes.instanceOf(Array),
  form: PropTypes.instanceOf(Object),
  loading: PropTypes.bool
};
