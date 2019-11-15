import React, { Component } from "react";
import Layout from "../../../layout/dashboard";
import TableMyKPI from "./table-my-kpi";
import { Button } from 'antd';
import {Link}  from 'react-router-dom';

class MyKPI extends Component {
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
        <Layout>
            <TableMyKPI/>
            <Link to={'/planning/kpi-planning/edit'}>
                <Button type='primary'>Edit My KPI</Button>
            </Link>
        </Layout>
      </div>
    );
  }
}
export default MyKPI;
