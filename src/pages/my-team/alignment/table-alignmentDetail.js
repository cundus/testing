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
        placeholder: 'Employee ID',
        sorter: (a, b) => a.userId - b.userId,
      },
      {
        title: 'Employee Name',
        dataIndex: 'name',
        align: 'center',
        placeholder: 'Employee Name',
        sorter: (a, b) => {
          if(a.name && b.name){
            return a.name.localeCompare(b.name);
          }
        },
      },
      {
        title: 'Superior',
        dataIndex: 'managerName',
        align: 'center',
        placeholder: 'Superior',
        sorter: (a, b) => {
          if(a.managerName && b.managerName){
            return a.managerName.localeCompare(b.managerName);
          }
        },
      },
      {
        title: 'KPI Achievement Score',
        dataIndex: 'kpiAchievementScore',
        align: 'center',
        placeholder: 'KPI Achievement Score',
        sorter: (a, b) => a.kpiAchievementScore - b.kpiAchievementScore,
      },
      {
        title: 'Pre Alignment',
        dataIndex: 'preAlignment',
        align: 'center',
        placeholder: 'Pre Alignment',
        sorter: (a, b) => {
          if(a.preAlignment && b.preAlignment){
            return a.preAlignment.localeCompare(b.preAlignment);
          }
        },
      },
      {
        title: 'Directorat',
        dataIndex: 'department',
        align: 'center',
        placeholder: 'Pre Alignment',
        sorter: (a, b) => {
          if(a.department && b.department){
            return a.department.localeCompare(b.department);
          }
        },
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
