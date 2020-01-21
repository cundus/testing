import React, { Component } from 'react';
import {
  Modal, Form, Select, InputNumber, Typography
} from 'antd';

const { Option } = Select;
const { Text } = Typography;


class modalAssessment extends Component {

  componentDidMount() {
    //
  }

  change = (field) => {
    const { assesment, handleChangeAssessment, form } = this.props;
    setTimeout(() => form.validateFields(field, (errors, values) => {
      handleChangeAssessment({
        ...assesment,
        ...values
      });
    }), 100);
  };

  render() {
    const {
      assessment, form, isModalShow, handleSaveAssessment, showHideModal, modalRecord, qualitativeOption, loadingAssess
    } = this.props;
    return (
      <Modal
        title="Result"
        visible={isModalShow}
        confirmLoading={loadingAssess}
        onOk={() => handleSaveAssessment(modalRecord)}
        onCancel={() => showHideModal(false)}
      >
        <Text strong>KPI Subject</Text>
        <br />
        <Text>{modalRecord.kpi}</Text>
        <br />
        <br />
        <Form>
          {modalRecord.achievementType === 1 ?
          <Form.Item label="Value">
            {form.getFieldDecorator('assessment', {
              rules: [
                { required: true, message: 'Value is required' },
                { type: 'number', message: 'Value must be a number' }
              ],
              initialValue: assessment
            })(<InputNumber size="large" style={{ width: '100%' }} onChange={() => this.change(['assessment'])} />)}
          </Form.Item> :
          <Form.Item label="Value">
            {form.getFieldDecorator('assessment', {
              rules: [{ required: true, message: 'Value is required' }],
              initialValue: assessment
            })(
              <Select onChange={() => this.change(['assessment'])}>
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
