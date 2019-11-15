import React, { Component } from "react";
import CreateOwn from "./components/create-own";
import CascadePartner from "./components/cascade-partner";
import CascadePrevious from "./components/cascade-previous";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class CreateKPI extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Creat Own KPI" key="1">
            <CreateOwn
              addRow
              saveDraft
              handleSaveDraft={this.handleSaveDraft}
            />
          </TabPane>
          <TabPane tab="Cascade From Supervisor" key="2">
            <CascadePartner saveDraft handleSaveDraft={this.handleSaveDraft} />
          </TabPane>
          <TabPane tab="Cascade From Previous Year" key="3">
            <CascadePrevious saveDraft handleSaveDraft={this.handleSaveDraft} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default CreateKPI;
