import Text from "antd/lib/typography/Text";
import React from "react";
import { useMediaQuery } from 'react-responsive';
import TableSSR, {
  sorterChecker,
} from "../../../components/dataTable/ssrTable";

const TableLandingUserOnBehalf = (props) => {
  const isScroll = useMediaQuery({ maxWidth: 1444 });
  const {pagination, onChoose, sort } = props
  const { size, page } = pagination;
  const sorterInfo = String(sort || "").split(",");

  const columns = [
    {
      title: "No",
      width: 40,
      fixed: isScroll ? true : false,
      dataIndex: "no",
      render: (row, data, index) => {
        return index + 1 + size * (page + 1) - size;
      },
    },
    {
      title: "Form Title",
      dataIndex: "formTitle",
      fixed: isScroll ? true : false,
      sorter: true,
      width: 400,
      sortOrder: sorterChecker("formTitle", sorterInfo),
      render: (row, data) => {
        return (
          <Text
            strong
            style={{
              color: "#591DF1",
              textDecoration: "underline",
              cursor: "pointer",
            }}
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
      sortOrder: sorterChecker("currentStep", sorterInfo),
      sorter: true,
    },
    {
      title: "Date Assigned",
      width: 100,
      dataIndex: "dateAssigned",
      sortOrder: sorterChecker("dateAssigned", sorterInfo),
      sorter: true,
    },
    {
      title: "Step due Date",
      width: 120,
      dataIndex: "stepDueDate",
      sortOrder: sorterChecker("stepDueDate", sorterInfo),
      sorter: true,
      render: (row, data) => {
        return <div style={{ color: "red", fontWeight: "bold" }}>{row}</div>;
      },
    },
    {
      title: "Form Start Date",
      width: 120,
      dataIndex: "formReviewStartDate",
      sortOrder: sorterChecker("formReviewStartDate", sorterInfo),
      sorter: true,
    },
    {
      title: "Form End Date",
      width: 100,
      dataIndex: "formReviewEndDate",
      sortOrder: sorterChecker("formReviewEndDate", sorterInfo),
      sorter: true,
    },
    {
      title: "Form Due Date",
      width: 100,
      dataIndex: "formReviewDueDate",
      sortOrder: sorterChecker("formReviewDueDate", sorterInfo),
      sorter: true,
    },
    {
      title: "Last Modified",
      width: 100,
      dataIndex: "formLastModifiedDate",
      sortOrder: sorterChecker("formLastModifiedDate", sorterInfo),
      sorter: true,
    },
  ];
  return <TableSSR rowKey={"formDataId"} {...props} columns={columns} />;
};

export default TableLandingUserOnBehalf;
