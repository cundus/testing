import React, { Component } from 'react';
import {
  Modal, Form, Select, InputNumber, Typography, Button
} from 'antd';

const { Option } = Select;
const { Text } = Typography;


class modalAssessment extends Component {

  componentDidMount() {
    // this.setState({ assessment: modalRecord.assessment});
  }

  change = (field) => {
    const { modalRecord, handleChangeAssessment, form } = this.props;
    setTimeout(() => form.validateFields(field, (errors, values) => {
      const item = values.dataKpi[modalRecord.index];
      handleChangeAssessment({
        ...modalRecord,
        ...item
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
        // onOk={() => showHideModal(0)}
        // onCancel={() => showHideModal(0)}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={() => showHideModal(0)}>
            Save
          </Button>
        ]}
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
            })(<InputNumber size="large" style={{ width: '100%' }} onChange={() => this.change([`dataKpi[${modalRecord.index}].assessment`])} />)}
          </Form.Item> :
          <Form.Item label="Value">
            {form.getFieldDecorator(`dataKpi[${modalRecord.index}].assessment`, {
              rules: [{ required: true, message: 'Value is required' }],
              initialValue: assessment
            })(
              <Select onChange={() => this.change([`dataKpi[${modalRecord.index}].assessment`])}>
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
