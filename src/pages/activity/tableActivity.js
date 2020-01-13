import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DataTable } from '../../components';
import { Button } from  'antd';

class TableActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
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
        placeholder: 'Enter baseline'
      },
      {
        title: 'Last Reply',
        dataIndex: 'lastMessage'
      },
      {
        title: 'Action',
        dataIndex: 'id',
        render: (text) => (
          <div>
            <Button icon='eye' ></Button>
            <Button icon='edit'></Button>
          </div>
        )
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
        {/* </Layout> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

const connectToComponent = connect(
  mapDispatchToProps
)(TableActivity);

export default connectToComponent;
