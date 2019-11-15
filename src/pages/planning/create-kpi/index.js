import React, { Component } from "react";
import Layout from "../../../layout/dashboard";
import CreateOwn from "./create-own";
import CascadePartner from "./cascade-partner";
import CascadePrevious from "./cascade-previous";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class CreateKPI extends Component {
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
        <Layout>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Creat Own KPI" key="1">
              <CreateOwn />
            </TabPane>
            <TabPane tab="Cascade From Supervisor" key="2">
              <CascadePartner />
            </TabPane>
            <TabPane tab="Cascade From Previous Year" key="3">
              <CascadePrevious />
            </TabPane>
          </Tabs>
        </Layout>
      </div>
    );
  }
}
export default CreateKPI;
