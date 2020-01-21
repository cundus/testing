import React, { Component } from 'react';
import {
  Modal, Form, Select, InputNumber
} from 'antd';

const { Option } = Select;


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
        title={'Assesment'}
        visible={isModalShow}
        confirmLoading={loadingAssess}
        onOk={() => handleSaveAssessment(modalRecord)}
        onCancel={() => showHideModal(false)}
      >
        <Form>
          {modalRecord.achievementType === 1 ?
          <Form.Item label="Assessment">
            {form.getFieldDecorator('assessment', {
              rules: [{
                required: true, message: 'required',
                type: 'number', message: 'number',
                min: 1, message: 'dont zero'
              }],
              initialValue: assessment
            })(<InputNumber size="large" style={{ width: '100%' }} onChange={() => this.change(['assessment'])} />)}
          </Form.Item> :
          <Form.Item label="Status">
            {form.getFieldDecorator('assessment', {
              rules: [{ required: true }],
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
