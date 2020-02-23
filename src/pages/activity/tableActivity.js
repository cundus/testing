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
    const newColumns = [
      {
        title: 'Created at',
        dataIndex: 'creationDate',
        align: 'center'
      },
      {
        title: 'Thread',
        dataIndex: 'name',
        align: 'center',
        placeholder: 'Enter baseline'
      },
      {
        title: 'Last Reply',
        align: 'center',
        dataIndex: 'lastMessage'
      },
      {
        title: 'Status',
        align: 'center',
        dataIndex: 'status'
      },
      {
        title: 'Action',
        dataIndex: 'actions',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Link to={`/Activity/Chat/${text.idActivity}/${text.threadId}/${this.props.userId}`}>
                <Button icon="wechat" />
              </Link>
              {/* eslint-disable-next-line react/jsx-no-bind */}
              {
                !this.props.isSuperior?
                <Button icon="edit" onClick={() => this.props.showModalForm(record.key)} />: <div></div>
              }
            </div>
          );
        }
      }
    ];
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
