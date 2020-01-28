import React, { Component } from 'react';
import {
  Modal, Form, Select, InputNumber, Typography
} from 'antd';
import PropTypes from 'prop-types';

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
      showHideModal
    } = this.props;
    form.validateFields([`dataKpi[${modalRecord.index}].assessment`], (errors, values) => {
      if (!errors) {
        const item = values.dataKpi[modalRecord.index];
        handleChangeAssessment({
          ...modalRecord,
          ...item
        });
        showHideModal(0);
      }
    });
  }

  handleCancel = () => {
    const { modalRecord, form, showHideModal } = this.props;
    form.resetFields([`dataKpi[${modalRecord.index}].assessment`]);
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
                  { type: 'number', message: 'Value must be a number' }
                ],
                initialValue: assessment
              })(<InputNumber size="large" style={{ width: '100%' }} />)}
            </Form.Item> :
            <Form.Item label="Value">
              {form.getFieldDecorator(`dataKpi[${modalRecord.index}].assessment`, {
                rules: [{ required: true, message: 'Value is required' }],
                initialValue: assessment
              })(
                <Select>
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

export default modalAssessment;


modalAssessment.propTypes = {
  qualitativeOption: PropTypes.instanceOf(Array),
  showHideModal: PropTypes.func,
  handleChangeAssessment: PropTypes.func,
  modalRecord: PropTypes.instanceOf(Array),
  isModalShow: PropTypes.bool,
  // loadingAssess: PropTypes.bool,
  assessment: PropTypes.string || PropTypes.number,
  form: PropTypes.instanceOf(Object)
};
