import React, { Component } from "react";
import DataTable from '../../../components/dataTable/index';
import {Avatar, Tag, Button} from 'antd';
import { Link } from 'react-router-dom';

class TablePlan extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Profile Pic",
        dataIndex: "profile",
        placeholder: "Profile",
        action: true,
        render:(text) =>
        (<Avatar src={text}/>),
      },
      {
        title: "Name",
        dataIndex: "name",
        placeholder: "name"
      },
      {
        title: "KPI Title",
        dataIndex: "kpi",
        placeholder: "KPI Title"
      },
      {
        title: "KPI Score",
        dataIndex: "kpiScore",
        placeholder: "Score",
      },
      {
        title: "KPI Rating",
        dataIndex: "kpiRating",
        placeholder: "Rating",
      },
      {
        title: "Non-KPI Result",
        dataIndex: "nonkpiResult",
        placeholder: "Non-KPI Result",
      },
      {
        title: "Status",
        dataIndex: "status",
        placeholder: "Status",
        action: true,
        render: (text) => (<Tag color={'yellow'}>{text}</Tag>)
      },
      {
        title: "Action",
        dataIndex: "action",
        placeholder: "action",
        action: true,
        render: (text) => (<Button type={'primary'}><Link to={`/my-team/planning/${text}`}>View</Link></Button>)
      }
    ];

    this.state = {
      dataSource: [
        {
          profile: "test-img",
          name: "Cascading from Superior",
          kpi: "Create datawarehouse for HC Analytics purposes",
          kpiScore: "Ready in Q3 2019",
          kpiRating: 20,
          nonkpiResult: "Ready in Q2 2019",
          status: "Pending",
          action: "1231"
        },
      ],
      count: 1
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    // dummy data
    this.setState(
      {
        dataSource:[
          {
            key: 1,
            profile: "test-img",
            name: "Cascading from Superior",
            kpi: "Create datawarehouse for HC Analytics purposes",
            kpiScore: "Ready in Q3 2019",
            kpiRating: "0",
            nonkpiResult: "Ready in Q2 2019",
            status: "Pending",
            action: "1231"
          }
        ]
      }
    );
  }

  render() {
    const { dataSource } = this.state;
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          dataSource={dataSource}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TablePlan;