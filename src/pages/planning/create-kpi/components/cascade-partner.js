import React, { Component } from "react";
import { DataTable } from "../../../../components";
import { Button, Checkbox } from "antd";

class CascadePartner extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'KPI Subject',
        dataIndex: 'description',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        type: 'number',
        editable: false
      },
      {
        title: 'L1',
        dataIndex: 'L1',
        placeholder: 'Enter Level 1',
        align: 'center',
        editable: false
      },
      {
        title: 'L2',
        dataIndex: 'L2',
        placeholder: 'Enter Level 2',
        align: 'center',
        editable: false
      },
      {
        title: 'L3',
        dataIndex: 'L3',
        placeholder: 'Enter Level 3',
        align: 'center',
        editable: false
      },
      {
        title: "Action",
        align: 'center',
        dataIndex: "action",
        action: false,
        render: (text, record) =>
          // eslint-disable-next-line react/destructuring-assignment
          (this.props.dataCascadePartner.length >= 1 ? (
            <Checkbox
              // eslint-disable-next-line react/jsx-no-bind
              onChange={e => this.props.handleSelectData(record)}
              checked={this.checkStatus(record)}
            />
          ) : null)
      }
    ];
  }

  checkStatus = (record) => {
    const { dataSelectedCascade } = this.props;
    const dataChecking = dataSelectedCascade.filter(item => item.description === record.description);
    if (dataChecking.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { dataCascadePartner, handleSaveDraft, handleError } = this.props;
    const { columns } = this;

    return (
      <div>
        <DataTable
          columns={columns}
          handleError={handleError}
          dataSource={dataCascadePartner}
        />
        <div style={{ textAlign: 'center' }}>
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
export default CascadePartner;
