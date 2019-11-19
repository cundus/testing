import React, { Component } from 'react';
import { Tabs, Modal } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { doSaveDraft } from '../../../redux/actions/kpiPlanning';
import CreateOwn from './components/create-own';
import CascadePartner from './components/cascade-partner';
import CascadePrevious from './components/cascade-previous';

const { TabPane } = Tabs;
const { confirm } = Modal;

class CreateKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOwn: [
        {
          key: 1,
          kpi: '',
          baseline: '',
          weight: '',
          l1: '',
          l2: '',
          l3: ''
        }
      ],
      dataOwnId: 2,
      cascadePrevious: false,
      dataCascadePartner: [],
      dataCascadePrevious: [],
      dataSelectedCascade: []
    };
  }

  handleSaveDraft = () => {
    const { history, doSavingDraft } = this.props;
    const { dataOwn, dataSelectedCascade } = this.state;
    const dataSaving = dataOwn.concat(dataSelectedCascade);
    confirm({
      title: 'Are u sure?',
      async onOk() {
        await doSavingDraft(dataSaving);
        history.push('/planning/kpi/draft-planning');
      },
      onCancel() {}
    });
  };

  handleSelectData = (record) => {
    const { dataSelectedCascade } = this.state;
    const dataChecking = dataSelectedCascade.filter(
      (item) => item.key === record.key
    );
    if (dataChecking.length !== 0) {
      this.setState({
        dataSelectedCascade: dataSelectedCascade.filter(
          (item) => item.key !== record.key
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
      kpi: '',
      baseline: '',
      weight: '',
      l1: '',
      l2: '',
      l3: ''
    };
    this.setState({
      dataOwn: [...dataOwn, newData],
      dataOwnId: dataOwnId + 1
    });
  };

  handleDeleteRow = (key) => {
    const dataOwn = [...this.state.dataOwn];
    this.setState({ dataOwn: dataOwn.filter((item) => item.key !== key) });
  };

  handleChangeField = (row) => {
    const newData = [...this.state.dataOwn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataOwn: newData });
  };

  render() {
    const {
      cascadePrevious,
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
          {cascadePrevious && (
            <TabPane tab="Cascade From Previous Year" key="3">
              <CascadePrevious
                dataCascadePrevious={dataCascadePrevious}
                dataSelectedCascade={dataSelectedCascade}
                handleSaveDraft={handleSaveDraft}
                handleSelectData={handleSelectData}
              />
            </TabPane>
          )}
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  draft: state.draft
});

const mapDispatchToProps = (dispatch) => ({
  doSavingDraft: (data) => dispatch(doSaveDraft(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKPI);

export default withRouter(connectToComponent);
