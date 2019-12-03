import React, { Component } from "react";
import { DataTable } from "../../../../components";
import { Button, Checkbox } from "antd";

class CascadePrevious extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter KPI Subject',
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        type: 'number',
        editable: false
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1',
        editable: false
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2',
        editable: false
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        placeholder: 'Enter Level 3',
        editable: false
      },
      {
        title: "Action",
        dataIndex: "action",
        action: false,
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
      return false;
    } else {
      return false;
    }
  };

  render() {
    const { dataCascadePrevious, handleSaveDraft, handleError } = this.props;
    const { columns } = this;

    return (
      <div>
        <DataTable
          columns={columns}
          handleError={handleError}
          dataSource={dataCascadePrevious}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
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
