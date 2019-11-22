import React, { Component } from "react";
import { Typography, Divider } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TableSubmitedKPI from "./table-submited-kpi";

const { Text } = Typography;

class SubmitedKPI extends Component {
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
    // const { draft } = this.props;
    this.setState({
      // dataSource: draft.draftData
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Submit KPI </Text>
          <Text>Submit KPI to your Superior</Text>
          <Divider />
        </div>
        <TableSubmitedKPI dataSource={dataSource} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  draft: state.draft
});

const mapDispatchToProps = dispatch => ({});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitedKPI);

export default withRouter(connectToComponent);
