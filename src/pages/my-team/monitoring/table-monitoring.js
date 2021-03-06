import React, { Component } from "react";
import { Avatar, Button } from "antd";
import DataTable from "../../../components/dataTable/index";
import { Link } from "react-router-dom";
import apiUrl from "../../../utils/apiUrl";

class TableMonitoring extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Profile Pic",
        dataIndex: "userId",
        placeholder: "Profile",
        align: "center",
        action: true,
        render: (text) => <Avatar src={`${apiUrl()}/user/photo/${text}`} />,
      },
      {
        title: "Name",
        dataIndex: "firstName",
        align: "center",
        placeholder: "name",
        sorter: (a, b) => {
          return a.firstName.localeCompare(b.firstName);
        },
      },
      {
        title: "KPI Title",
        dataIndex: "title",
        align: "center",
        placeholder: "KPI Title",
        sorter: (a, b) => {
          return a.title.localeCompare(b.title);
        },
      },
      // {
      //   title: 'KPI Score',
      //   dataIndex: 'score',
      //   placeholder: 'Score',
      // },
      // {
      //   title: 'KPI Rating',
      //   dataIndex: 'ratting',
      //   placeholder: 'Rating',
      // },
      // {
      //   title: 'Non-KPI Result',
      //   dataIndex: 'result',
      //   placeholder: 'Non-KPI Result',
      // },
      {
        title: "Action",
        dataIndex: "userId",
        align: "center",
        placeholder: "action",
        action: true,
        render: (text) => (
          <Button type={"primary"}>
            <Link to={`/my-team/monitoring/${text}`}>View Monitoring</Link>
          </Button>
        ),
      },
    ];

    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    const { team } = this.props;
    this.setState({
      dataSource: team?.result || [],
    });
  };

  render() {
    const { dataSource } = this.state;
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable columns={columns} datasource={dataSource} />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableMonitoring;
