import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DataTable } from '../../components';
import { Button } from  'antd';
import FormSend from './component/form';
import  { Link } from  'react-router-dom';

class TableActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      visible: false,
      titleForm: '',
    };
  }

  componentDidMount(){
    this.getColumns();
  }

  getColumns = async () => {
    const { editable } = this.props;
    const newColumns = [
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        align: 'center'
      },
      {
        title: 'Achievement Name',
        dataIndex: 'achievementName',
        align: 'center',
        placeholder: 'Enter baseline'
      },
      {
        title: 'Achievement Date',
        align: 'center',
        dataIndex: 'achievementDate'
      }
    ];
    if (this.props.isSuperior === false && editable) {
        newColumns.push({
          title: 'Action',
          dataIndex: 'actions',
          align: 'center',
          render: (text, record) => {
            return (
              <div>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <Button icon="edit" disabled={!editable} onClick={() => this.props.showModalForm(record.key)} />
              </div>
            );
          }
        })
    }
    this.setState({columns: newColumns});
  }

  render() {
    const { dataSource, loading } = this.props;
    const { columns } = this.state;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          datasource={dataSource}
          loading={loading}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

const connectToComponent = connect(
  mapDispatchToProps
)(TableActivity);

export default connectToComponent;
