import React, { Component } from 'react';
import {
  Select, Form
} from 'antd';
import DataTable from '../../../components/dataTable/index';
import _ from 'lodash';

class TableAlignmentDetail extends Component {
  render() {
    const { dataSource, filteredInfo, sortedInfo, handleChangeTable } = this.props;
    const userIds = dataSource.map((item)=> {
      return { text: item?.userId, value: item?.userId}
    })
    let names = dataSource.map((item)=> {
      return { text: item?.name, value: item?.name}
    })
    names = _.orderBy(names, ['text'],['asc']);
    let managerNames = dataSource.map((item)=> {
      return { text: item?.managerName, value: item?.managerName}
    })
    managerNames = _.orderBy(managerNames, ['text'],['asc']);
    const kpiAchievementScores = dataSource.map((item)=> {
      return { text: item?.kpiAchievementScore, value: item?.kpiAchievementScore}
    })
    const preAlignments = [
      { text: 'Unrated', value: ''},
      { text: 'Need Improvement', value: 'Need Improvement'},
      { text: 'Well Done', value: 'Well Done'},
      { text: 'Outstanding', value: 'Outstanding'}
    ]
    const postAlignments = [
      { text: 'Unrated', value: '0'},
      { text: 'Need Improvement', value: '1'},
      { text: 'Well Done', value: '2'},
      { text: 'Outstanding', value: '3'}
    ]
    let departments = dataSource.map((item)=> {
      return { text: item?.department, value: item?.department}
    })
    departments = _.orderBy(departments, ['text'],['asc']);
    const columns = [
      {
        title: 'Employee ID',
        dataIndex: 'userId',
        align: 'center',
        width: 200,
        placeholder: 'Employee ID',
        filters: _.uniqBy(userIds, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.userId || null,
        sortOrder: sortedInfo?.columnKey === 'userId' && sortedInfo?.order,
        onFilter: (value, record) => record.userId.includes(value),
        sorter: (a, b) => a.userId - b.userId,
      },
      {
        title: 'Employee Name',
        dataIndex: 'name',
        align: 'center',
        width: 200,
        placeholder: 'Employee Name',
        sortOrder: sortedInfo?.columnKey === 'name' && sortedInfo?.order,
        filters: _.uniqBy(names, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.name ?? null,
        onFilter: (value, record) => record.name.includes(value),
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
        width: 200,
        placeholder: 'Superior',
        sortOrder: sortedInfo?.columnKey === 'managerName' && sortedInfo?.order,
        filters: _.uniqBy(managerNames, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.managerName ?? null,
        onFilter: (value, record) => record.managerName.includes(value),
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
        width: 250,
        placeholder: 'KPI Achievement Score',
        sortOrder: sortedInfo?.columnKey === 'kpiAchievementScore' && sortedInfo?.order,
        filters: _.uniqBy(kpiAchievementScores, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.kpiAchievementScore ?? null,
        onFilter: (value, record) => record.kpiAchievementScore.includes(value),
        sorter: (a, b) => a.kpiAchievementScore - b.kpiAchievementScore,
      },
      {
        title: 'Pre Alignment',
        dataIndex: 'preAlignment',
        align: 'center',
        width: 200,
        placeholder: 'Pre Alignment',
        sortOrder: sortedInfo?.columnKey === 'preAlignment' && sortedInfo?.order,
        filters: _.uniqBy(preAlignments, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.preAlignment ?? null,
        onFilter: (value, record) => record.preAlignment.includes(value),
        sorter: (a, b) => {
          if(a.preAlignment && b.preAlignment){
            return a.preAlignment.localeCompare(b.preAlignment);
          }
        },
        render: (text) => {
          if (text !== 'Unrated') {
            return(
              <span>{text}</span>
            )
          } else {
            return(
              <span style={{color: '#d7d7d7'}}>Unrated</span>
            )
          }
        }
      },
      {
        title: 'Directorate',
        dataIndex: 'department',
        align: 'center',
        placeholder: 'Directorate',
        width: 250,
        sortOrder: sortedInfo?.columnKey === 'Directorate' && sortedInfo?.order,
        filters: _.uniqBy(departments, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.department ?? null,
        onFilter: (value, record) => record.department.includes(value),
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
        width: 200,
        sortOrder: sortedInfo?.columnKey === 'postAlignment' && sortedInfo?.order,
        filters: _.uniqBy(postAlignments, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.postAlignment ?? null,
        onFilter: (value, record) => record?.postAlignment ? record.postAlignment.toString().includes(value) : true,
        sorter: (a, b) => {
          if(a.postAlignment && b.postAlignment){
            return a.postAlignment.localeCompare(b.postAlignment);
          }
        },
        placeholder: 'Post Alignment',
        render: (text, record, index) => {
          const { dataProposeRating, isCanEdit, form, handleChange } = this.props;
          const dataOptionRating = [
            {id: 1, name: 'Need Improvement'},
            {id: 2, name: 'Well Done'},
            {id: 3, name: 'Outstanding'}
          ]
          return (
            <Form>
              <Form.Item style={{ width: '100%', margin: 0 }}>
                {/* {form.getFieldDecorator(`dataGeneral[${index}].postAlignment`, {
                  // rules: [{ required: true, message: 'Post Alignment is required' }],
                  initialValue: text ?? undefined
                })( */}
                  <Select
                    placeholder="Choose value"
                    disabled={!isCanEdit}
                    value={text || undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={(value) => handleChange({...record, postAlignment: value})}
                  >
                    {dataOptionRating.map((item, index) => {
                      return <Select.Option key={index} value={parseInt(item.id)}>{item.name}</Select.Option>;
                    })}
                  </Select>
                {/* )} */}
              </Form.Item>
            </Form>
          );
        }
      },
    ];
    return (
      <div>
        {/* <Layout> */}
        <DataTable
          columns={columns}
          datasource={dataSource}
          handleChangeTable={handleChangeTable}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableAlignmentDetail;
