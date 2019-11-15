import React, { Component } from "react";
import Layout from "../../../layout/dashboard";
import TableDrafKpi from "./table-draf-kpi";

class CreateKPI extends Component {
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
        <Layout>
            <TableDrafKpi/>
        </Layout>
      </div>
    );
  }
}
export default CreateKPI;
