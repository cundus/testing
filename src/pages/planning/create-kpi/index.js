import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Modal,
  Typography,
  Divider
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { doSaveDraft } from '../../../redux/actions/kpi';
import CreateOwn from './components/create-own';
import CascadePartner from './components/cascade-partner';
import CascadePrevious from './components/cascade-previous';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;

class CreateKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOwn: [
        {
          key: 1,
          typeKpi: 'Self KPI',
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
    const { history /* , doSavingDraft */ } = this.props;
    // const { dataOwn, dataSelectedCascade } = this.state;
    // const dataSaving = dataOwn.concat(dataSelectedCascade);
    confirm({
      title: 'Are u sure?',
      async onOk() {
        // await doSavingDraft(dataSaving);
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
    const { dataOwn } = this.state;
    const data = [...dataOwn];
    this.setState({ dataOwn: data.filter((item) => item.key !== key) });
  };

  handleChangeField = (row) => {
    const { dataOwn } = this.state;
    const newData = [...dataOwn];
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
    const { kpiReducers } = this.props;
    const { dataGoal } = kpiReducers;
    const { name } = dataGoal;
    return (
      <div>
        <div>
          <Divider />
          <Text strong>Create New KPI </Text>
          <Text>
            {`Please complete the following form. You can create your own KPI or
            cascade from your Superior's KPI.`}
          </Text>
          <Divider />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>{`Performance Management - ${name}`}</Title>
        </div>
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
  kpiReducers: state.kpiReducers
});

const mapDispatchToProps = (dispatch) => ({
  doSavingDraft: (data) => dispatch(doSaveDraft(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateKPI);

export default withRouter(connectToComponent);

CreateKPI.propTypes = {
  // doSavingDraft: PropTypes.func,
  kpiReducers: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};
