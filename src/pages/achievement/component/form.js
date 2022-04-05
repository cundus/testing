import React, { Component } from "react";
import { Modal, Form, DatePicker, Input } from "antd";

class Form extends Component {
  componentDidMount() {}

  change = (field) => {
    const { dataModal, handleModalChangeForm, form } = this.props;
    setTimeout(
      () =>
        form.validateFields(field, (errors, values) => {
          handleModalChangeForm({
            ...dataModal,
            ...values,
            achievementDate: values["achievementDate"].format("YYYY-MM-DD"),
          });
        }),
      100
    );
  };

  render() {
    const { form, dataModal } = this.props;
    return (
      <Modal
        title={this.props.titleForm}
        visible={this.props.visible}
        onOk={this.props.handleModalSubmit}
        onCancel={this.props.hideModalForm}
        confirmLoading={this.props.confirmLoading}
      >
        <Form>
          <Form.Item label="Achievement Name">
            {form.getFieldDecorator("achievementName", {
              rules: [
                { required: true, message: "achievement name required!" },
              ],
              initialValue: dataModal.achievementName,
            })(
              <Input
                size="large"
                onChange={() =>
                  this.change(["achievementName", "achievementDate"])
                }
              />
            )}
          </Form.Item>
          <Form.Item label="Achievement Date">
            {form.getFieldDecorator("achievementDate", {
              rules: [{ required: true }],
              initialValue: dataModal.achievementDate,
            })(
              <DatePicker
                onChange={() =>
                  this.change(["achievementName", "achievementDate"])
                }
                disabledDate={(current) => {
                  return current && current > new Date();
                }}
              ></DatePicker>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form;
