import React, { Component } from "react";
import TableEditMyKPI from "./table-edit-my-kpi";
import { Button } from 'antd';
import {Link}  from 'react-router-dom';

class EditMyKPI extends Component {
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
          <TableEditMyKPI/>
          <Link to={'/planning/kpi-planning/'}>
              <Button type='default'>Submit To Superior</Button>
          </Link>
      </div>
    );
  }
}
export default EditMyKPI;
