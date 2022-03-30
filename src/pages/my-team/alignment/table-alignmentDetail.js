import React, { Component } from "react";
import { Select, Form } from "antd";
import DataTable from "../../../components/dataTable/index";
import { orderBy, uniqBy } from "../../../utils/lodash";

class TableAlignmentDetail extends Component {
  render() {
    const { dataSource, filteredInfo, sortedInfo, handleChangeTable, form } =
      this.props;
    const userIds = dataSource.map((item) => {
      return { text: item?.userId, value: item?.userId };
    });
    let names = dataSource.map((item) => {
      return { text: item?.name, value: item?.name };
    });
    names = orderBy(names, ["text"], ["asc"]);
    let rankings = dataSource.map((item) => {
      return { text: item?.ranking, value: item?.ranking };
    });
    rankings = orderBy(rankings, ["text"], ["asc"]);
    let managerNames = dataSource.map((item) => {
      return { text: item?.managerName, value: item?.managerName };
    });
    managerNames = orderBy(managerNames, ["text"], ["asc"]);
    let kpiAchievementScores = dataSource.map((item) => {
      return {
        text: item?.kpiAchievementScore,
        value: item?.kpiAchievementScore,
      };
    });
    kpiAchievementScores = orderBy(kpiAchievementScores, ["text"], ["asc"]);
    const preAlignments = [
      { text: "Unrated", value: "Unrated" },
      { text: "Need Improvement", value: "Need Improvement" },
      { text: "Well Done", value: "Well Done" },
      { text: "Outstanding", value: "Outstanding" },
    ];
    const postAlignments = [
      { text: "", value: "0" },
      { text: "Need Improvement", value: "1" },
      { text: "Well Done", value: "2" },
      { text: "Outstanding", value: "3" },
    ];
    // let departments = dataSource.map((item) => {
    //   return { text: item?.department, value: item?.department };
    // });
    // departments = orderBy(departments, ["text"], ["asc"]);
    let directorates = dataSource.map((item) => {
      return { text: item?.directorate, value: item?.directorate };
    });
    directorates = orderBy(directorates, ["text"], ["asc"]);
    const columns = [
      {
        title: "No",
        dataIndex: "number",
        align: "center",
        width: 50,
        sortOrder: sortedInfo?.columnKey === "number" && sortedInfo?.order,
        sorter: (a, b) => a.number - b.number,
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: "Employee ID",
        dataIndex: "userId",
        align: "left",
        width: 100,
        placeholder: "Employee ID",
        filters: uniqBy(userIds, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.userId || null,
        sortOrder: sortedInfo?.columnKey === "userId" && sortedInfo?.order,
        onFilter: (value, record) => record.userId === value,
        sorter: (a, b) => a.userId - b.userId,
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        align: "left",
        width: 130,
        placeholder: "Employee Name",
        sortOrder: sortedInfo?.columnKey === "name" && sortedInfo?.order,
        filters: uniqBy(names, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.name ?? null,
        onFilter: (value, record) => record.name === value,
        sorter: (a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
        },
      },
      {
        title: "Superior",
        dataIndex: "managerName",
        align: "left",
        width: 130,
        placeholder: "Superior",
        sortOrder: sortedInfo?.columnKey === "managerName" && sortedInfo?.order,
        filters: uniqBy(managerNames, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.managerName ?? null,
        onFilter: (value, record) => record.managerName === value,
        sorter: (a, b) => {
          if (a.managerName && b.managerName) {
            return a.managerName.localeCompare(b.managerName);
          }
        },
      },
      {
        title: "KPI Achievement Score",
        dataIndex: "kpiAchievementScore",
        align: "left",
        width: 130,
        placeholder: "KPI Achievement Score",
        sortOrder:
          sortedInfo?.columnKey === "kpiAchievementScore" && sortedInfo?.order,
        filters: uniqBy(kpiAchievementScores, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.kpiAchievementScore ?? null,
        onFilter: (value, record) => record.kpiAchievementScore === value,
        sorter: (a, b) => a.kpiAchievementScore - b.kpiAchievementScore,
      },
      {
        title: "Pre Alignment",
        dataIndex: "preAlignment",
        align: "left",
        width: 110,
        placeholder: "Pre Alignment",
        sortOrder:
          sortedInfo?.columnKey === "preAlignment" && sortedInfo?.order,
        filters: uniqBy(preAlignments, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.preAlignment ?? null,
        onFilter: (value, record) => record.preAlignment === value,
        sorter: (a, b) => {
          if (a.preAlignment && b.preAlignment) {
            return a.preAlignment.localeCompare(b.preAlignment);
          }
        },
        render: (text) => {
          if (text !== "Unrated") {
            return <span>{text}</span>;
          } else {
            return <span style={{ color: "#d7d7d7" }}>Unrated</span>;
          }
        },
      },
      {
        title: "Directorate",
        dataIndex: "directorate",
        align: "left",
        placeholder: "Directorate",
        width: 110,
        sortOrder: sortedInfo?.columnKey === "Directorate" && sortedInfo?.order,
        filters: uniqBy(directorates, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.directorate ?? null,
        onFilter: (value, record) => record.directorate === value,
        sorter: (a, b) => {
          if (a.directorate && b.directorate) {
            return a.directorate.localeCompare(b.directorate);
          }
        },
      },
      {
        title: "Post Alignment",
        dataIndex: "postAlignment",
        align: "left",
        width: 100,
        sortOrder:
          sortedInfo?.columnKey === "postAlignment" && sortedInfo?.order,
        filters: uniqBy(postAlignments, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.postAlignment ?? null,
        onFilter: (value, record) =>
          record?.postAlignment || record?.postAlignment === 0
            ? record.postAlignment.toString().includes(value)
            : true,
        sorter: (a, b) => a.postAlignment - b.postAlignment,
        placeholder: "Post Alignment",
        render: (text, record, index) => {
          const { isCanEdit, handleChange } = this.props;
          const dataOptionRating = [
            { id: 0, name: "" },
            { id: 1, name: "Need Improvement" },
            { id: 2, name: "Well Done" },
            { id: 3, name: "Outstanding" },
          ];
          return (
            <Form>
              <Form.Item style={{ width: "100%", margin: 0 }}>
                {/* {form.getFieldDecorator(`dataGeneral[${index}].postAlignment`, {
                  // rules: [{ required: true, message: 'Post Alignment is required' }],
                  initialValue: text ?? undefined
                })( */}
                <Select
                  placeholder="Choose value"
                  disabled={!isCanEdit}
                  style={{
                    cursor: !isCanEdit ? "not-allowed" : "pointer",
                  }}
                  value={text}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={(value) =>
                    handleChange(
                      { ...record, postAlignment: value },
                      "postAlignment",
                      this.props.recalculatePostAlignment(record, value)
                    )
                  }
                >
                  {dataOptionRating.map((item, index) => {
                    return (
                      <Select.Option
                        key={index}
                        value={parseInt(item.id)}
                        style={{ height: 30 }}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
                {/* )} */}
              </Form.Item>
            </Form>
          );
        },
      },
      {
        title: "Ranking",
        dataIndex: "ranking",
        align: "left",
        width: 100,
        placeholder: "Ranking",
        sortOrder: sortedInfo?.columnKey === "ranking" && sortedInfo?.order,
        filters: uniqBy(rankings, (e) => {
          return e.text;
        }),
        filteredValue: filteredInfo?.ranking ?? null,
        onFilter: (value, record) => record.ranking === value,
        sorter: (a, b) => a.ranking - b.ranking,
        render: (text, record, index) => {
          const { isCanEdit, handleChange } = this.props;
          const dataOptions = dataSource.filter((item) => {
            return item?.postAlignment === record?.postAlignment;
          });
          if (!record?.postAlignment) {
            return <span></span>;
          } else {
            return (
              <Form>
                <Form.Item style={{ width: "100%", margin: 0 }}>
                  {form.getFieldDecorator(
                    `dataGeneral[${record?.number - 1}].ranking`,
                    {
                      rules: [
                        {
                          required: record?.postAlignment === 3,
                          message: "Ranking for Outstanding is required",
                        },
                      ],
                      initialValue: text !== " " ? text : "",
                    }
                  )(
                    <Select
                      placeholder="Choose value"
                      disabled={!isCanEdit}
                      style={{
                        cursor: !isCanEdit ? "not-allowed" : "pointer",
                      }}
                      // eslint-disable-next-line react/jsx-no-bind
                      onChange={(value) =>
                        handleChange(
                          { ...record, ranking: value },
                          "ranking",
                          this.props.form.setFieldsValue({
                            [`dataGeneral[${record?.number - 1}].ranking`]:
                              value,
                          })
                        )
                      }
                    >
                      {dataOptions.map((item, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={parseInt(index + 1)}
                          >
                            {index + 1}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Form>
            );
          }
        },
      },
    ];

    return (
      <div id="table-alignment">
        {/* <Layout> */}
        <DataTable
          columns={columns}
          datasource={dataSource}
          handleChangeTable={handleChangeTable}
          loading={this.props.loadingRankingSequenceAdjustment}
        />
        {/* </Layout> */}
      </div>
    );
  }
}

export default TableAlignmentDetail;
