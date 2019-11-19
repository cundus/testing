import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TableDrafKPI from './table-draf-kpi';

class DraftKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: 1,
          typeKpi: 'Cascading from Superior',
          kpi: 'Create datawarehouse for HC Analytics purposes',
          baseline: 'Ready in Q3 2019',
          weight: 20,
          l1: 'Ready in Q2 2019',
          l2: 'Ready in Q3 2019',
          l3: 'Ready in Q4 2019'
        }
      ],
      isEditable: false
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
    // const { isEditable } = this.state;
    // this.setState({ isEditable: true });
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
    const { dataSource, isEditable } = this.state;
    const { handleChange, handleDelete, handleSubmit } = this;
    return (
      <div>
        <TableDrafKPI
          dataSource={dataSource}
          handleChange={handleChange}
          handleDelete={handleDelete}
          isEditable={isEditable}
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

const mapDispatchToProps = (dispatch) => ({});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftKPI);

export default withRouter(connectToComponent);
