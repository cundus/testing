import React, { Component } from "react";
import { DataTable } from "../../../../components";
import { Button, Checkbox } from "antd";

class CascadePrevious extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      ...this.props.columnList,
      {
        title: "",
        dataIndex: "action",
        action: true,
        render: (text, record) =>
          this.props.dataCascadePartner.length >= 1 ? (
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
