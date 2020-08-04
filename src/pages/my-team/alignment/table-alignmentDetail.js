import React, { Component } from 'react';
import {
  Select, Form
} from 'antd';
import DataTable from '../../../components/dataTable/index';

class TableAlignmentDetail extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Employee ID',
        dataIndex: 'userId',
        align: 'center',
        placeholder: 'Employee ID'
      },
      {
        title: 'Employee Name',
        dataIndex: 'firstName',
        align: 'center',
        placeholder: 'Employee Name',
        render: (text, record) => {
          return (
            <span>{text}&nbsp;{record?.lastName}</span>
          )
        }
      },
      {
        title: 'Superior',
        dataIndex: 'managerFirstName',
        align: 'center',
        placeholder: 'Superior',
        render: (text, record) => {
          return (
            <span>{text}&nbsp;{record?.managerLastName}</span>
          )
        }
      },
      {
        title: 'KPI Achievement Score',
        dataIndex: 'kpiAchievementScore',
        align: 'center',
        placeholder: 'KPI Achievement Score'
      },
      {
        title: 'Pre Alignment',
        dataIndex: 'preAlignment',
        align: 'center',
        placeholder: 'Pre Alignment'
      },
      {
        title: 'Post Alignment',
        dataIndex: 'postAlignment',
        align: 'center',
        placeholder: 'Post Alignment',
        render: (text, record) => {
          const { optionRating, form } = this.props;
          return (
            <Form>
              <Form.Item style={{ width: '100%' }}>
                {/* {form.getFieldDecorator(`dataGeneral[${record.index}].rating`, {
                  rules: [{ required: true, message: 'Post Alignment is required' }],
                  initialValue: text
                })( */}
                  <Select
                    placeholder="Choose Value"
                    // disabled={myStep}
                    // eslint-disable-next-line react/jsx-no-bind
                    // onChange={() => this.change(record, [`dataGeneral[${record.index}].rating`])}
                  >
                    <Select.Option key={'high'} value='hight'>Need Improvement</Select.Option>
                    <Select.Option key={'low'} value='low'>Well Done</Select.Option>
                    <Select.Option key={'mid'} value='mid'>Outstanding</Select.Option>
                  </Select>
                {/* )} */}
              </Form.Item>
            </Form>
          );
        }
      },
    ];

    this.state = {
      dataSource: []
    };
  }


  render() {
    const { team } = this.props;
    const { columns } = this;
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          datasource={team}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableAlignmentDetail;
