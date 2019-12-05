import React, { Component } from 'react';
import DataTable from '../../components/dataTable';

class KPI extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter 2019 baseline'
      },
      {
        title: '2019 Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter 2019 baseline'
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number'
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1'
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2'
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        placeholder: 'Enter Level 3'
      },
      // {
      //   title: '',
      //   dataIndex: 'action',
      //   action: true,
      //   render: (text, record) =>
      //     this.props.dataOwn.length >= 1 ? (
      //       <Popconfirm
      //         title="Sure to delete?"
      //         onConfirm={() => this.props.handleDeleteRow(record.key)}
      //       >
      //         <Tooltip placement="bottomRight" title={'delete'}>
      //           <Button>
      //             <Icon type="delete" />
      //           </Button>
      //         </Tooltip>
      //       </Popconfirm>
      //     ) : null
      // }
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
          datasource={dataOwn}
          handlechange={handleChangeField}
        />
      </div>
    );
  }
}
export default KPI;
