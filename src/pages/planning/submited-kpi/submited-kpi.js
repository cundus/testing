import React, { Component } from "react";
import Layout from "../../../layout/dashboard";
import TableSubmitedKPI from "./table-submited-kpi";

class SubmitedKPI extends Component {
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
        <Layout>
            <TableSubmitedKPI/>
        </Layout>
      </div>
    );
  }
}
export default SubmitedKPI;
