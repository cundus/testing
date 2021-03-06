import React, { Component } from "react";
import { Avatar, Button, Skeleton, Typography, Tag } from "antd";
import { withRouter } from "react-router-dom";
import DataTable from "../../../components/dataTable";
import apiUrl from "../../../utils/apiUrl";

const { Text } = Typography;

class TableAppraisal extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Profile Pic",
        dataIndex: "userId",
        placeholder: "Profile",
        width: 100,
        align: "center",
        action: true,
        render: (text) => <Avatar src={`${apiUrl()}/user/photo/${text}`} />,
      },
      {
        title: "Name",
        dataIndex: "firstName",
        placeholder: "name",
        align: "center",
        width: 150,
        sorter: (a, b) => {
          return a.firstName.localeCompare(b.firstName);
        },
      },
      {
        title: "KPI Title",
        dataIndex: "kpiTitle",
        align: "center",
        placeholder: "KPI Title",
        width: 300,
        sorter: (a, b) => {
          return a.kpiTitle.localeCompare(b.kpiTitle);
        },
        render: (text) => {
          return (
            <Skeleton
              active
              loading={text === "loading"}
              paragraph={false}
              title={{ width: "100%" }}
            >
              <Text>{text || "(none)"}</Text>
            </Skeleton>
          );
        },
      },
      {
        title: "KPI Score",
        dataIndex: "score",
        placeholder: "Score",
        width: 100,
        align: "center",
        render: (text) => {
          return (
            <Skeleton
              active
              loading={text === "loading"}
              paragraph={false}
              title={{ width: "100%" }}
            >
              <Text>{text || "(none)"}</Text>
            </Skeleton>
          );
        },
      },
      {
        title: "KPI Rating",
        dataIndex: "rating",
        placeholder: "Rating",
        width: 100,
        align: "center",
        sorter: (a, b) => {
          return a.rating.localeCompare(b.rating);
        },
        render: (text) => {
          return (
            <Skeleton
              active
              loading={text === "loading"}
              paragraph={false}
              title={{ width: "100%" }}
            >
              <Text>{text || "(none)"}</Text>
            </Skeleton>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        placeholder: "Status",
        width: 100,
        align: "center",
        sorter: (a, b) => {
          return a.status.localeCompare(b.status);
        },
        render: (text, record) => {
          let color = "";
          if (record.statusNumber === 8) {
            color = "#4CAF50";
          } else if (record.statusNumber === 7) {
            color = "#FFA000";
          } else if (record.statusNumber === 6) {
            color = "#8BC34A";
          } else if (record.statusNumber === 4) {
            color = "#FFEB3B";
          } else if (record.statusNumber === 3) {
            color = "#607D8B";
          } else {
            color = "#ccc";
          }
          return (
            <Skeleton
              active
              loading={text === "loading"}
              paragraph={false}
              title={{ width: "100%" }}
            >
              <Tag color={color}>{record.status || "N/A"}</Tag>
            </Skeleton>
          );
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        placeholder: "action",
        width: 100,
        align: "center",
        action: true,
        render: (text, record) => {
          let access = false;
          if (
            // Sundus Change from
            // record.statusNumber !== 1 &&
            // record.statusNumber !== 2 &&
            // record.statusNumber !== 3 &&
            // record.statusNumber !== 5
            // to
            record.statusNumber === 4
          ) {
            access = true;
          }
          return (
            <Button
              type="primary"
              disabled={!access}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() =>
                this.props.history.push(`/my-team/appraisal/${record.userId}`)
              }
            >
              View
            </Button>
          );
        },
      },
    ];
  }

  render() {
    const { dataSource, loading } = this.props;
    const { columns } = this;
    return (
      <div>
        <DataTable
          columns={columns}
          loading={loading}
          datasource={dataSource}
        />
      </div>
    );
  }
}

export default withRouter(TableAppraisal);
