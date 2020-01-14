import React, { Component } from 'react';
import {
  Modal, Button, Form, DatePicker, Input
} from 'antd';


class form extends Component {

  componentDidMount() {
    //
  }

  change = (field) => {
    const { dataModal, handleModalChangeForm, form } = this.props;
    setTimeout(() => form.validateFields(field, (errors, values) => {
      handleModalChangeForm({
        ...dataModal,
        ...values
      });
    }), 100);
  };

  render() {
    const {
      statusActivity, form, dataModal, handleModalChangeForm
    } = this.props;
    return (
      <Modal
        title={this.props.titleForm}
        visible={this.props.visible}
        onOk={this.props.handleModalSubmit}
        onCancel={this.props.hideModalForm}
        confirmLoading={this.props.confirmLoading}
      >
        <Form>
          <Form.Item label="Activity Name">
            {form.getFieldDecorator('Achievement name', {
              rules: [{ required: true }],
              initialValue: dataModal.achievementName
            })(<Input size="large" onChange={() => this.change(['achievementName'])} />)}
          </Form.Item>
          <Form.Item label="Status">
            {form.getFieldDecorator('Achievement Date', {
              rules: [{ required: true }],
              initialValue: dataModal.achievementDate
            })(
              <DatePicker onChange={() => this.change(['achievementDate'])}>
              </DatePicker>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default form;
