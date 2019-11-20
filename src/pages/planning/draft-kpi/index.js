import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableDrafKPI from './table-draf-kpi';
import { doSaveDraft } from '../../../redux/actions/kpiPlanning';

const { confirm } = Modal;

class DraftKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    const { draft } = this.props;
    const { data } = draft.draftData;
    this.setState({
      dataSource: data
    });
  };

  handleSubmit = () => {
    const { history, doSavingDraft } = this.props;
    const { dataSource } = this.state;
    confirm({
      title: 'Are u sure?',
      async onOk() {
        await doSavingDraft(dataSource);
        history.push('/planning/kpi/submit-planning');
      },
      onCancel() {}
    });
  };

  handleChange = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key)
    });
  };

  render() {
    const { dataSource } = this.state;
    const { handleChange, handleDelete, handleSubmit } = this;
    return (
      <div>
        <TableDrafKPI
          dataSource={dataSource}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleSubmit} type="primary" style={{ margin: 10 }}>
            Submit To Superior
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  draft: state.draft
});

const mapDispatchToProps = (dispatch) => ({
  doSavingDraft: (data) => dispatch(doSaveDraft(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftKPI);

export default withRouter(connectToComponent);
