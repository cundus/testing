import React, { Component } from "react";
import { Button } from "antd";
import DataTable from "../../../components/dataTable/index";
import { Link } from "react-router-dom";

class TableAlignment extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Session ID",
        dataIndex: "sessionId",
        align: "center",
        placeholder: "Session ID",
        sorter: (a, b) => {
          return a.sessionId - b.sessionId;
        },
      },
      {
        title: "Session Name",
        dataIndex: "sessionName",
        align: "center",
        placeholder: "Session Name",
        sorter: (a, b) => {
          return a.sessionName.localeCompare(b.sessionName);
        },
      },
      {
        title: "Action",
        dataIndex: "sessionId",
        align: "center",
        placeholder: "action",
        action: true,
        render: (text) => (
          <Button type={"primary"}>
            <Link to={`/my-team/performance-review-alignment/${text}`}>
              View Session
            </Link>
          </Button>
        ),
      },
    ];

    this.state = {
      dataSource: [],
    };
  }

  render() {
    const { team } = this.props;
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable columns={columns} datasource={team} />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableAlignment;
