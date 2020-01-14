import React, { Component } from "react";
import { Modal, Button, Form, Select, Input } from 'antd';
const { Option } = Select;


class form extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const { statusActivity } = this.props;
    if(statusActivity !== undefined) {
      return (
        <Modal
        title={this.props.titleForm}
          visible={this.props.visible}
          //  onOk={this.handleOk}
          onCancel={() => this.props.hide()}
        >
        <Form>
        <Form.Item label="Status">
        <Select>
          {statusActivity.map((value, index) => {
            return <Option value={value.id}>{value.name}</Option>
          })}
        </Select>
        </Form.Item>
        </Form>
        </Modal>
      )
    } else {
      return(<div></div>)
    }
  }
};

export default form