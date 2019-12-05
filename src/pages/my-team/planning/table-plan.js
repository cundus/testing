import React, { Component } from "react";
import DataTable from '../../../components/dataTable/index';
import {Avatar, Tag, Button} from 'antd';
import { Link } from 'react-router-dom';
const {
  REACT_APP_API_URL
} = process.env;

class TablePlan extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Profile Pic",
        dataIndex: "userId",
        placeholder: "Profile",
        action: true,
        render:(text) => (<Avatar src={`${REACT_APP_API_URL}/user/photo/${text}`}/>)
      },
      {
        title: "Name",
        dataIndex: "firstName",
        placeholder: "name"
      },
      {
        title: "KPI Title",
        dataIndex: "title",
        placeholder: "KPI Title"
      },
      {
        title: "KPI Score",
        dataIndex: "score",
        placeholder: "Score",
      },
      {
        title: "KPI Rating",
        dataIndex: "ratting",
        placeholder: "Rating",
      },
      {
        title: "Non-KPI Result",
        dataIndex: "result",
        placeholder: "Non-KPI Result",
      },
      {
        title: "Status",
        dataIndex: "status",
        placeholder: "Status",
        action: true,
        render: (text) => {
          let status;
          let color;
          if (text === 0) {
            status = 'On Progress';
            color = '#ffb822';
          } else if (text === 1) {
            status = 'Submitted';
            color = '#fd27eb';
          } else if (text === 2) {
            status = 'Completed';
            color = '#1dc9b7';
          }
          return (<Tag color={color}>{status}</Tag>);
        }
      },
      {
        title: "Action",
        dataIndex: "userId",
        placeholder: "action",
        action: true,
        render: (text) => (<Button type={'primary'}><Link to={`/my-team/planning/${text}`}>View</Link></Button>)
      }
    ];

    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    this.setState(
      {
        dataSource: this.props.team.result,
      }
    );
  }

  render() {
    const { dataSource } = this.state;
    console.log('ds', dataSource)
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          datasource={dataSource}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TablePlan;