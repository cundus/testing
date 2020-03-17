import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Typography, Skeleton, Input, Spin, Checkbox
} from 'antd';
import { DataTable } from '../../../components';
import ModalAssessment from './modalAssesment';
import stepKpi from '../../../utils/stepKpi';

const { Text, Title } = Typography;
const { TextArea } = Input;

class KPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      metrics: [],
      myStepState: null
    };
  }

  componentDidMount() {
    this.getColumns();
  }

  componentDidUpdate() {
    const { metrics, myStepState } = this.state;
    const {
      dataMetrics, isFeedback, feedShow, myStep
    } = this.props;
    if (metrics !== dataMetrics) {
      this.getColumns();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        metrics: dataMetrics
      });
    }
    if (myStepState !== myStep) {
      this.getColumns();
    }
    if (isFeedback) {
      this.getColumns();
      feedShow(false);
    }
  }

  getColumns = async () => {
     // the async await on this function would leaking memory (showing warn)
     // but i have to async await for making it table
    const { dataMetrics, isFeedback, myStep } = this.props;
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
        width: 150,
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
          <Skeleton active loading={loadingResult === record.id} paragraph={false} title={{ width: 'auto' }}>
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
          dataSource,
          handleAssesLoading,
          getOwnKpiList
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
              handleAssesLoading={handleAssesLoading}
              getOwnKpiList={getOwnKpiList}
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
    const Feedback = {
      title: 'Feedback',
      dataIndex: 'feedback',
      placeholder: 'Enter KPI Feedback',
      align: 'center',
      width: 100,
      className: 'ant-table-th-yellow',
      editable: false
    };
    if (isFeedback) {
      await newColumns.push(Feedback);
    }
    this.setState({
      columns: newColumns,
      myStepState: myStep
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
      handleSaveAssessment,
      currentStep,
      formStatusId,
      proposeRating
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
            {(currentStep === stepKpi[6] || currentStep === stepKpi[7] || formStatusId === '3') &&
            <div>
              <Text>
                {(currentStep === stepKpi[5] ||
                currentStep === stepKpi[6] || formStatusId === '3') ? 'Final Rating : ' : 'Propose Rating : '}
              </Text>
              <br />
              <Text strong>{proposeRating}</Text>
              <br />
              <br />
            </div>}
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
  currentStep: PropTypes.string,
  isModalShow: PropTypes.number,
  dataMetrics: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  isFeedback: PropTypes.bool,
  myStep: PropTypes.bool,
  form: PropTypes.instanceOf(Object),
  challengeYour: PropTypes.string,
  goToMonitoring: PropTypes.func,
  handleSubmit:  PropTypes.func,
  changeChallenge: PropTypes.func,
  feedShow: PropTypes.func,
  handleAssesLoading: PropTypes.func,
  getOwnKpiList: PropTypes.func,
  handleSaveAssessment:  PropTypes.func
};
