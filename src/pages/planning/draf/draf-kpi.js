import React, { Component } from "react";
import Layout from "../../../layout/dashboard";
import TableDrafKPI from "./table-draf-kpi";

class DrafKPI extends Component {
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
        <Layout>
            <TableDrafKPI/>
        </Layout>
      </div>
    );
  }
}
export default DrafKPI;
