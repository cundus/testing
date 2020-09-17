import React, { Component } from 'react';
import {
  Modal, Form, Select, InputNumber, Typography, message
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doAssessment } from '../../../redux/actions/kpi';
import { FAILED_SAVE_CHALLENGE_YOURSELF, Success } from '../../../redux/status-code-type';

const { Option } = Select;
const { Text } = Typography;


class modalAssessment extends Component {

  componentDidMount() {
    // this.setState({ assessment: modalRecord.assessment});
  }

  handleOk = () => {
    const {
      modalRecord,
      handleChangeAssessment,
      form,
      showHideModal,
      handleAssesLoading,
      doAssess
    } = this.props;
    form.validateFields([`dataKpi[${modalRecord.index}].assessment`], async (errors, values) => {
      if (!errors) {
        const item = values.dataKpi[modalRecord.index];
        const data = {
          achievementType: modalRecord.achievementType,
          actualAchievementText: modalRecord.achievementType === 0 ? item.assessment : '',
          actualAchievement: modalRecord.achievementType === 1 ? parseFloat(item.assessment) : 0,
          id: modalRecord.id
        };
        handleAssesLoading(modalRecord.id);
        showHideModal(0);
        await doAssess(data);
        const { kpiReducer } = this.props;
        const {
          loadingAssessOne, statusAssessOne, messageAssessOne, dataAssessOne
        } = kpiReducer;
        if (!loadingAssessOne) {
          if (statusAssessOne === Success) {
            handleChangeAssessment({
              ...modalRecord,
              ...item,
              rating: dataAssessOne.rating
            });
            handleAssesLoading(0);
          } else {
            handleChangeAssessment({
              ...modalRecord,
              ...item
            });
            handleAssesLoading(0);
            message.warning(`Sorry, ${messageAssessOne}`);
          }
        }
      }
    });
  }

  handleCancel = () => {
    const { dataSource, form, showHideModal } = this.props;
    const dataKpi = [];
    dataSource.map((item) => {
      const data = {
        assessment: item.assessment
      };
      dataKpi.push(data);
      return data;
    });
    form.setFieldsValue({
      dataKpi
    });
    showHideModal(0);
  }

  render() {
    const {
      assessment, form, isModalShow, modalRecord, qualitativeOption
    } = this.props;
    return (
      <Modal
        title="Result"
        visible={isModalShow}
        // confirmLoading={loadingAssess}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        // afterClose={this.handleCancel}
      >
        <Text strong>KPI Subject</Text>
        <br />
        <Text>{modalRecord.kpi}</Text>
        <br />
        <br />
        <Form>
          {modalRecord.achievementType === 1 ?
            <Form.Item label="Value">
              {form.getFieldDecorator(`dataKpi[${modalRecord.index}].assessment`, {
                rules: [
                  { required: true, message: 'Value is required' },
                  { type: 'number', message: 'Value must be a number' },
                  {
                    validator: async (rule, value, callback, source) => {
                      if (value === 0) {
                        callback('Value must be more than 0');
                      }
                    }
                  }
                ],
                initialValue: assessment
              })(<InputNumber size="large" style={{ width: '100%' }} />)}
            </Form.Item> :
            <Form.Item label="Value">
              {form.getFieldDecorator(`dataKpi[${modalRecord.index}].assessment`, {
                rules: [{ required: true, message: 'Value is required' }],
                initialValue: assessment || undefined
              })(
                <Select placeholder="Select Value">
                  {qualitativeOption.map((value, index) => {
                    return <Option key={index} value={value}>{value}</Option>;
                  })}
                </Select>
              )}
            </Form.Item>}
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  kpiReducer: state.kpiReducer,
  userReducer: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  doAssess: (data) => dispatch(doAssessment(data))
});

const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(modalAssessment);

export default connectToComponent;


modalAssessment.propTypes = {
  qualitativeOption: PropTypes.instanceOf(Array),
  showHideModal: PropTypes.func,
  handleChangeAssessment: PropTypes.func,
  modalRecord: PropTypes.instanceOf(Object),
  dataSource: PropTypes.instanceOf(Array),
  isModalShow: PropTypes.bool,
  handleAssesLoading: PropTypes.func,
  assessment: PropTypes.string || PropTypes.number,
  doAssess: PropTypes.func,
  getOwnKpiList: PropTypes.func,
  kpiReducer: PropTypes.instanceOf(Object),
  userReducer: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object)
};
