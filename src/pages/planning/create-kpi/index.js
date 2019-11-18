import React, { Component } from "react";
import CreateOwn from "./components/create-own";
import CascadePartner from "./components/cascade-partner";
import CascadePrevious from "./components/cascade-previous";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class CreateKPI extends Component {
  state = {
    dataDraft: [],
    dataOwn: [
      {
        key: 1,
        kpi: "",
        baseline: "",
        weight: "",
        l1: "",
        l2: "",
        l3: ""
      }
    ],
    dataOwnId: 2,
    dataCascadePartner: [{key: 13}, {key: 12}],
    dataCascadePrevious: [{key: 11}, {key: 1212}],
    dataSelectedCascade: []
  };

  handleSaveDraft = () => {
    const { dataOwn, dataSelectedCascade } = this.state;
    const dataSaving = dataOwn.concat(dataSelectedCascade);
    this.setState({ dataDraft: dataSaving });
  };

  handleSelectData = record => {
    const { dataSelectedCascade } = this.state;
    const dataChecking = dataSelectedCascade.filter(
      item => item.key === record.key
    );
    if (dataChecking.length !== 0) {
      this.setState({
        dataSelectedCascade: dataSelectedCascade.filter(
          item => item.key !== record.key
        )
      });
    } else {
      this.setState({
        dataSelectedCascade: [...dataSelectedCascade, record]
      });
    }
  };

  handleAddRow = () => {
    const { dataOwnId, dataOwn } = this.state;
    const newData = {
      key: dataOwnId,
      kpi: "",
      baseline: "",
      weight: "",
      l1: "",
      l2: "",
      l3: ""
    };
    this.setState({
      dataOwn: [...dataOwn, newData],
      dataOwnId: dataOwnId + 1
    });
  };

  handleDeleteRow = key => {
    const dataOwn = [...this.state.dataOwn];
    this.setState({ dataOwn: dataOwn.filter(item => item.key !== key) });
  };

  handleChangeField = row => {
    const newData = [...this.state.dataOwn];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataOwn: newData });
  };

  render() {
    const {
      dataOwn,
      dataCascadePrevious,
      dataCascadePartner,
      dataSelectedCascade
    } = this.state;
    const {
      handleAddRow,
      handleChangeField,
      handleDeleteRow,
      handleSaveDraft,
      handleSelectData
    } = this;
    console.log(this.state.dataDraft);
    
    return (
      <div>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Creat Own KPI" key="1">
            <CreateOwn
              dataOwn={dataOwn}
              handleSaveDraft={handleSaveDraft}
              handleAddRow={handleAddRow}
              handleChangeField={handleChangeField}
              handleDeleteRow={handleDeleteRow}
            />
          </TabPane>
          <TabPane tab="Cascade From Supervisor" key="2">
            <CascadePartner
              dataCascadePartner={dataCascadePartner}
              dataSelectedCascade={dataSelectedCascade}
              handleSaveDraft={handleSaveDraft}
              handleSelectData={handleSelectData}
            />
          </TabPane>
          <TabPane tab="Cascade From Previous Year" key="3">
            <CascadePrevious
              dataCascadePrevious={dataCascadePrevious}
              dataSelectedCascade={dataSelectedCascade}
              handleSaveDraft={handleSaveDraft}
              handleSelectData={handleSelectData}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default CreateKPI;
