import React, { Component } from "react";
import Layout from '../../../layout/dashboard';
import { DataTable } from "../../../components";

class CreatePlanning extends Component {
  render() {
    return (
      <div>
        <Layout>
          <DataTable />
        </Layout>
      </div>
    );
  }
}
export default CreatePlanning;
