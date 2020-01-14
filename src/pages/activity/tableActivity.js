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

  showModalForm = () => {
    this.setState({ visible: true, titleForm: 'Edit Activity'});
  };

  hideModalForm = e => {
    this.setState({
      visible: false,
    });
  };

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
        dataIndex: 'actions',
        render: (text) => (
          <div>
            <Link to={`/Activity/Chat/${text.idActivity}/${text.threadId}`}><Button icon='eye'></Button></Link>
            <Button icon='edit' onClick={this.showModalForm.bind(this)}></Button>
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
        <FormSend visible={this.state.visible} hide={this.hideModalForm} titleForm={this.state.titleForm} statusActivity={this.props.statusActivity}/>
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
