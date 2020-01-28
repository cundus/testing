import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Typography, Skeleton, Input, Spin
} from 'antd';
import { DataTable } from '../../../components';
import ModalAssessment from './modalAssesment';

const { Text, Title } = Typography;
const { TextArea } = Input;

class KPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      metrics: []
    };
  }

  componentDidUpdate() {
    const { metrics } = this.state;
    const { dataMetrics } = this.props;
    if (metrics !== dataMetrics) {
      this.getColumns();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        metrics: dataMetrics
      });
    }
  }

  getColumns = async () => {
     // the async await on this function would leaking memory (showing warn)
     // but i have to async await for making it table
    const { dataMetrics } = this.props;
    const newColumns = [
      {
        title: 'KPI Subject',
        dataIndex: 'kpi',
        placeholder: 'Enter KPI Subject',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'Baseline',
        dataIndex: 'baseline',
        placeholder: 'Enter baseline',
        align: 'center',
        width: 200,
        editable: false
      },
      {
        title: 'Weight (%)',
        dataIndex: 'weight',
        placeholder: 'Enter KPI Weight',
        align: 'center',
        type: 'number',
        width: 90,
        editable: false
      }
    ];
    // eslint-disable-next-line array-callback-return
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.index}`,
        align: 'center',
        width: 200,
        editable: false
      };
      newColumns.push(data);
    });
    const result = {
      title: 'Result',
      align: 'center',
      editable: false,
      width: 100,
      dataIndex: 'result',
      render: (text, record) => {
        const { loadingResult } = this.props;
        let colorring = 'default';
        if (record.rating === 'Below') {
          colorring = '#d1a145';
        } else if (record.rating === 'Meet') {
          colorring = '#4ebf37';
        } else if (record.rating === 'Exceed') {
          colorring = '#484ef0';
        }
        return (
          <Skeleton active loading={loadingResult} paragraph={false} title={{ width: 'auto' }}>
            <Text strong style={{ color: colorring }}>{record.rating}</Text>
          </Skeleton>
        );
      }
    };
    const action = {
      title: 'Action',
      align: 'center',
      editable: false,
      width: 100,
      dataIndex: 'action',
      render: (text, record) => {
        const {
          form,
          isModalShow,
          showHideModal,
          handleChangeField,
          myStep,
          dataSource
        } = this.props;
        let error = false;
        const field = form.getFieldsError([`dataKpi[${record.index}].assessment`]);
        if (field.dataKpi[record.index].assessment) {
          error = true;
        } else {
          error = false;
        }
        return (
          <div>
            <Button
              disabled={myStep}
              type={error ? 'danger' : 'primary'}
              ghost
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => showHideModal(record.id)}
            >
              Assess
            </Button>
            <ModalAssessment
              form={form}
              dataSource={dataSource}
              isModalShow={isModalShow === record.id}
              assessment={record.assessment}
              qualitativeOption={record.qualitativeOption}
              modalRecord={record}
              showHideModal={showHideModal}
              handleChangeAssessment={handleChangeField}
            />
            <br />
            {error && <Text type="danger">is required</Text>}
          </div>
        );
      }
    };
    await newColumns.push(result);
    await newColumns.push(action);
    this.setState({
      columns: newColumns
    });
  }

  render() {
    const { columns } = this.state;
    const {
      dataSource,
      loading,
      form,
      challengeYour,
      myStep,
      goToMonitoring,
      handleSubmit,
      changeChallenge,
      handleSaveAssessment
    } = this.props;
    return (
      <div>
        <div>
          <Spin
            spinning={loading}
          >
            <DataTable
              form={form}
              columns={columns}
              // loading={loading}
              datasource={dataSource}
            />
            <Text strong>Challenge yourself :</Text>
            <TextArea
              id="challenge-input"
              placeholder="Challenge yourself"
              label="Challenge yourself"
              value={challengeYour}
              disabled={myStep}
              onChange={changeChallenge}
            />
          </Spin>
        </div>
        <center>
          <Skeleton active loading={loading} paragraph={false} title={{ width: '60%' }}>
            {myStep ?
              <div style={{ textAlign: 'center', margin: 40 }}>
                <Title
                  level={4}
                  type="warning"
                  ghost
                  strong
                >
                  Your Appraisal has been sent to your Manager
                </Title>
              </div> :
              <div style={{ textAlign: 'center' }}>
                <Button
                  id="go-monitoring"
                  onClick={goToMonitoring}
                  style={{ margin: 10 }}
                >
                  Go To Monitoring
                </Button>
                <Button
                  id="save-assessment"
                  onClick={handleSaveAssessment}
                  style={{ margin: 10 }}
                >
                  Save Assessment
                </Button>
                <Button
                  id="send-manager"
                  type="primary"
                  onClick={handleSubmit}
                  style={{ margin: 10 }}
                >
                  Send To Manager
                </Button>
              </div>}
          </Skeleton>
        </center>
      </div>
    );
  }
}

export default KPI;

KPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChangeField: PropTypes.func,
  showHideModal: PropTypes.func,
  loadingResult: PropTypes.bool,
  isModalShow: PropTypes.number,
  dataMetrics: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  myStep: PropTypes.bool,
  form: PropTypes.instanceOf(Object),
  challengeYour: PropTypes.string,
  goToMonitoring: PropTypes.func,
  handleSubmit:  PropTypes.func,
  changeChallenge: PropTypes.func,
  handleSaveAssessment:  PropTypes.func
};
