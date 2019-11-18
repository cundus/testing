import React, { Component } from "react";
import { DataTable } from "../../../../components";
import { Button, Checkbox } from "antd";

class CascadePrevious extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "KPI",
        dataIndex: "kpi",
        placeholder: "Enter KPI subject",
        editable: false
      },
      {
        title: "2020 Baseline",
        dataIndex: "baseline",
        placeholder: "Enter 2020 baseline",
        editable: false
      },
      {
        title: "Weight (%)",
        dataIndex: "weight",
        placeholder: "Enter KPI Weight",
        type: "number",
        editable: false
      },
      {
        title: "L1",
        dataIndex: "l1",
        placeholder: "Enter Level 1",
        editable: false
      },
      {
        title: "L2",
        dataIndex: "l2",
        placeholder: "Enter Level 2",
        editable: false
      },
      {
        title: "L3",
        dataIndex: "l3",
        placeholder: "Enter Level 3",
        editable: false
      },
      {
        title: "",
        dataIndex: "action",
        action: true,
        render: (text, record) =>
          this.props.dataCascadePrevious.length >= 1 ? (
            <Checkbox
              onChange={e => this.props.handleSelectData(record)}
              checked={this.checkStatus(record)}
            />
          ) : null
      }
    ];
  }

  checkStatus = record => {
    const { dataSelectedCascade } = this.props;
    const dataChecking = dataSelectedCascade.filter(item => item.key === record.key);
    if (dataChecking.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { dataCascadePrevious, handleSaveDraft } = this.props;
    const { columns } = this;

    return (
      <div>
        <DataTable
          columns={columns}
          dataSource={dataCascadePrevious}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handleSaveDraft}
            style={{ margin: 10 }}
          >
            Save Draft
          </Button>
        </div>
      </div>
    );
  }
}
export default CascadePrevious;
