import Text from "antd/lib/typography/Text";
import React, { Component } from "react";
import TableSSR, { sorterChecker } from "../../../components/dataTable/ssrTable";

class TableLandingUserOnBehalf extends Component {
  render() {
    const { pagination, onChoose, sort } = this.props;
    const { size, page } = pagination;
    const sorterInfo = String(sort || "").split(",");
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
        sortOrder: sorterChecker("userId", sorterInfo),
        render: (row) => {
          return (
            <Text
              strong
              style={{
                color: "#591DF1",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => onChoose(row)}
            >
              {row}
            </Text>
          );
        },
      },
      {
        title: "First Name",
        width: 120,
        dataIndex: "firstName",
        sorter: true,
        sortOrder: sorterChecker("firstName", sorterInfo),
      },
      {
        title: "Last Name",
        width: 120,
        dataIndex: "lastName",
        sorter: true,
        sortOrder: sorterChecker("lastName", sorterInfo),
      },
      {
        title: "Email",
        width: 200,
        dataIndex: "email",
        sorter: true,
        sortOrder: sorterChecker("email", sorterInfo),
      },
      {
        title: "Manager ID",
        width: 100,
        dataIndex: "managerId",
        sorter: true,
        sortOrder: sorterChecker("managerId", sorterInfo),
      },
      {
        title: "Directorate",
        width: 200,
        dataIndex: "directorate",
        sorter: true,
        sortOrder: sorterChecker("directorate", sorterInfo),
      },
      {
        title: "Department",
        width: 200,
        dataIndex: "department",
        sorter: true,
        sortOrder: sorterChecker("department", sorterInfo),
      },
    ];
    return <TableSSR rowKey="userId" {...this.props} columns={columns} />;
  }
}

export default TableLandingUserOnBehalf;
