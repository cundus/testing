import Text from "antd/lib/typography/Text";
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
        fixed: true,
        dataIndex: "no",
        render: (row, data, index) => {
          return index + 1 + size * (page + 1) - size;
        },
      },
      {
        title: "Form Title",
        dataIndex: "formTitle",
        fixed: true,
        sorter: true,
        width: 400,
        render: (row, data) => {
          return (
            <Text
              strong
              style={{color: "#591DF1", textDecoration: 'underline', cursor: 'pointer'}}
              onClick={() =>
                onChoose({
                  formDataId: data?.formDataId,
                  formTitle: row,
                })
              }
            >
              {row}
            </Text>
          );
        },
      },
      {
        title: "Employee",
        width: 120,
        dataIndex: "formSubject",
        sorter: true,
        render: (row, data) => {
          return (
            <div>
              {row?.firstName} {row?.lastName}
            </div>
          );
        },
      },
      {
        title: "Step",
        width: 200,
        dataIndex: "currentStep",
        sorter: true,
      },
      {
        title: "Date Assigned",
        width: 100,
        dataIndex: "dateAssigned",
        sorter: true,
      },
      {
        title: "Step due Date",
        width: 100,
        dataIndex: "stepDueDate",
        sorter: true,
      },
      {
        title: "Form Start Date",
        width: 120,
        dataIndex: "formReviewStartDate",
        sorter: true,
      },
      {
        title: "Form End Date",
        width: 100,
        dataIndex: "formReviewEndDate",
        sorter: true,
      },
      {
        title: "Form Due Date",
        width: 100,
        dataIndex: "formReviewDueDate",
        sorter: true,
      },
      {
        title: "Last Modified",
        width: 100,
        dataIndex: "formLastModifiedDate",
        sorter: true,
      },
    ];
    return <TableSSR {...this.props} columns={columns} />;
  }
}

export default TableLandingUserOnBehalf;
