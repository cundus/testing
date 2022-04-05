import React, { Component } from "react";
import { Modal, Form, Select, Input } from "antd";

const { Option } = Select;

class FormSend extends Component {
  componentDidMount() {
    //
  }

  change = (field) => {
    const { dataModal, handleModalChangeForm, form } = this.props;
    setTimeout(
      () =>
        form.validateFields(field, (errors, values) => {
          handleModalChangeForm({
            ...dataModal,
            ...values,
          });
        }),
      100
    );
  };

  render() {
    const { statusActivity, form, dataModal } = this.props;
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
            {form.getFieldDecorator("name", {
              rules: [{ required: true }],
              initialValue: dataModal.name,
            })(<Input size="large" onChange={() => this.change(["name"])} />)}
          </Form.Item>
          <Form.Item label="Status">
            {form.getFieldDecorator("status", {
              rules: [{ required: true }],
              initialValue: dataModal.status,
            })(
              <Select onChange={() => this.change(["status"])}>
                {statusActivity &&
                  statusActivity.map((value, index) => {
                    return <Option value={value.id}>{value.name}</Option>;
                  })}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default FormSend;
