import { Button } from "antd";
import React, { Component } from "react";
import TableSSR from "../../../components/dataTable/ssrTable";

class TableLandingUserOnBehalf extends Component {
  render() {
    const { pagination, onChoose } = this.props;
    const { size, page } = pagination;

    const columns = [
      {
        title: "No",
        width: 40,
        dataIndex: "no",
        render: (row, data, index) => {
          return index + 1 + size * (page + 1) - size;
        },
      },
      {
        title: "User ID",
        dataIndex: "userId",
        width: 100,
        sorter: true,
        render: (row) => {
          return <Button type="link" onClick={() => onChoose(row)}>{row}</Button>
        },
      },
      {
        title: "First Name",
        width: 120,
        dataIndex: "firstName",
        sorter: true,
      },
      {
        title: "Last Name",
        width: 120,
        dataIndex: "lastName",
        sorter: true,
      },
      {
        title: "Email",
        width: 200,
        dataIndex: "email",
        sorter: true,
      },
      {
        title: "Manager ID",
        width: 100,
        dataIndex: "managerId",
        sorter: true,
      },
      {
        title: "Directorate",
        width: 200,
        dataIndex: "directorate",
        sorter: true,
      },
      {
        title: "Department",
        width: 200,
        dataIndex: "department",
        sorter: true,
      },
    ];
    return <TableSSR {...this.props} columns={columns} />
  }
}

export default TableLandingUserOnBehalf;
