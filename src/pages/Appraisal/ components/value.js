import React, { Component } from 'react';
import { Select, Button, Form } from 'antd';
import DataTable from '../../../components/dataTable';

const { Option } = Select;

class Value extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Section',
        dataIndex: 'name'
        // align: 'center'
      },
      {
        title: 'Ratings',
        dataIndex: 'rating',
        align: 'center',
        render: (text, record) => {
          const { optionRating, form } = this.props;
          return (
            <Form>
              <Form.Item style={{ width: '100%' }}>
                {form.getFieldDecorator(`dataKpi[${record.index}].rating`, {
                  rules: [{ required: true, message: 'Rating is required' }],
                  initialValue: record.rating
                })(
                  <Select placeholder="Choose Value" onChange={() => this.change(record, [`dataKpi[${record.index}].rating`])}>
                    {optionRating && optionRating.map((value, index) => {
                      return <Option key={index} value={value.id}>{value.rating}</Option>;
                    })}
                  </Select>
                )}
              </Form.Item>
            </Form>
          );
        }
      },
      {
        title: 'Remarks/Evidence',
        dataIndex: 'comment',
        align: 'center',
        placeholder: 'Enter your Remarks here',
        editable: true
      },
      {
        title: 'Upload',
        dataIndex: 'upload',
        align: 'center'
      },
      {
        title: 'Feedback',
        dataIndex: 'feedback',
        placeholder: 'Enter Level 2',
        align: 'center',
        className: 'ant-table-th-yellow'
      }
    ];
  }

  change = (record, field) => {
    const { handleChangeField, form } = this.props;
    setTimeout(() => form.validateFields(field, (errors, values) => {
      const item = values.dataKpi[record.index];
      handleChangeField({
        ...record,
        ...item
      });
    }), 100);
  };

  render() {
    const { columns } = this;
    const {
      dataSource,
      handleChangeField,
      form,
      loading,
      goToMonitoring,
      handleSave
    } = this.props;
    return (
      <div>
        <div>
          <DataTable
            form={form}
            columns={columns}
            datasource={dataSource}
            loading={loading}
            handlechange={handleChangeField}
          />
        </div>
      </div>
    );
  }
}
export default Value;
