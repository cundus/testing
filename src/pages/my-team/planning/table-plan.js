import React, { Component } from "react";
import DataTable from '../../../components/dataTable/index';
import {Avatar, Tag, Button} from 'antd';

class TablePlan extends Component{
  constructor(props){
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
        placeholder: "name",
        action: true
      },
      {
        title: "KPI Title",
        dataIndex: "kpi",
        placeholder: "KPI Title",
        action: true
      },
      {
        title: "KPI Score",
        dataIndex: "kpiScore",
        placeholder: "Score",

        action: true
      },
      {
        title: "KPI Rating",
        dataIndex: "kpiRating",
        placeholder: "Rating",
        action: true
      },
      {
        title: "Non-KPI Result",
        dataIndex: "nonkpiResult",
        placeholder: "Non-KPI Result",
        action: true
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
      render: (text) => (<Button type={'primary'}>{text}</Button>)
      },
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
          action: "View"
        },
      ],
      count: 1
    };
  }
  componentDidMount(){
    this.getAllData();
  }
  getAllData = () =>{
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
          action: "View"
        },
      ]
    }
  );
  }
  render(){
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
    )
  }
}

export default TablePlan;