import React, { Component } from "react";
import { DataTable } from "../../../components";

class TableSubmitedKPI extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Cascading/Self KPI",
        dataIndex: "typeKpi",
        placeholder: "Cascading/Self KPI",
      },
      {
        title: "KPI Subject",
        dataIndex: "kpi",
        placeholder: "Enter 2020 baseline"
      },
      {
        title: "2019 Baseline",
        dataIndex: "baseline",
        placeholder: "Enter 2019 baseline"
      },
      {
        title: "Weight (100%)",
        dataIndex: "weight",
        placeholder: "Enter KPI Weight",
        type: "number"
      },
      {
        title: "L1",
        dataIndex: "l1",
        placeholder: "Enter Level 1"
      },
      {
        title: "L2",
        dataIndex: "l2",
        placeholder: "Enter Level 2"
      },
      {
        title: "L3",
        dataIndex: "l3",
        placeholder: "Enter Level 3"
      },
    ];

    this.state = {
      dataSource: [
        {
          key: 0,
          typeKpi: "",
          kpi: "",
          baseline: "",
          weight: "",
          l1: "",
          l2: "",
          l3: ""
        }
      ],
      count: 1
    };
  }

  componentDidMount(){
    this.getAllData()
  }

  getAllData =() =>{
    // dummy data
    this.setState({dataSource:[
      {
        key: 1,
        typeKpi: "Cascading from Superior",
        kpi: "Create datawarehouse for HC Analytics purposes",
        baseline: "Ready in Q3 2019",
        weight: 20,
        l1: "Ready in Q2 2019",
        l2: "Ready in Q3 2019",
        l3: "Ready in Q4 2019"
      },
      {
        key: 2,
        typeKpi: "Cascading from Superior",
        kpi: "Create datawarehouse for HC Analytics purposes",
        baseline: "Ready in Q3 2019",
        weight: 20,
        l1: "Ready in Q2 2019",
        l2: "Ready in Q3 2019",
        l3: "Ready in Q4 2019"
      },
      {
        key: 1,
        typeKpi: "Cascading from Superior",
        kpi: "Create datawarehouse for HC Analytics purposes",
        baseline: "Ready in Q3 2019",
        weight: 20,
        l1: "Ready in Q2 2019",
        l2: "Ready in Q3 2019",
        l3: "Ready in Q4 2019"
      }
    ]});
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      typeKpi: "",
      kpi: "",
      baseline: "",
      weight: "",
      l1: "",
      l2: "",
      l3: ""
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleChange = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const { columns, handleAdd, handleChange, handleDelete } = this;
    return (
      <div>
        {/* <Layout> */}
          <DataTable
            columns={columns}
            dataSource={dataSource}
            handleAdd={handleAdd}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        {/* </Layout> */}
      </div>
    );
  }
}
export default TableSubmitedKPI;
