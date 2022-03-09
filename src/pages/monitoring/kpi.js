import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { DataTable } from "../../components";
import { Link } from "react-router-dom";
import { Color, color } from "highcharts";
import "./style.css";
import {
  metricValidator,
  validator,
  weightValidator,
  metricValidatorText,
  kpiValidator,
  achievementScoreValidator,
} from "../../utils/validator";

const { TextArea } = Input;

class TableMonitorKPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      isModalConfirmationEdit: true,
    };
    // change = this.change.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.getColumns(), 10);
    // the settimeout would leaking memory (showing warn)
    // but i have to make it for getting a newest feedback props
  }

  // getColumns = async () => {
  //   // the async await on this function would leaking memory (showing warn)
  //   // but i have to async await for making it table
  //   const {
  //     dataMetrics,
  //     userId,
  //     isSuperior,
  //     isEditable,
  //     stafid,
  //     isRowEdit,
  //     dataSource,
  //   } = this.props;
  //   let newColumns;
  //   // console.log(this.props.isRowEdit);
  //   // const some = dataSource.filter((e) => e.key === this.props.isRowEdit.rowId);
  //   // console.log(some);
  //   // if (record !== undefined || record !== null) {
  //   if (
  //     this.props.isRowEdit.doInlineEdit
  //     // record !== "" &&
  //     // record?.id !== "" &&
  //     // record === this.props.isRowEdit.rowId
  //   ) {
  //     newColumns = [
  //       {
  //         title: "KPI Subject",
  //         dataIndex: "kpi",
  //         placeholder: "Enter KPI Subject",
  //         align: "center",
  //         width: 200,
  //         className: "td-top",
  //         editable: false,
  //       },
  //       {
  //         title: "Baseline",
  //         dataIndex: "baseline",
  //         placeholder: "Enter baseline",
  //         align: "center",
  //         className: "td-top",
  //         width: 200,
  //         editable: true,
  //       },
  //       {
  //         title: "Weight (%)",
  //         dataIndex: "weight",
  //         placeholder: "Enter KPI Weight",
  //         align: "center",
  //         className: "td-top",
  //         type: "number",
  //         width: 90,
  //         editable: true,
  //       },
  //     ];
  //     // eslint-disable-next-line array-callback-return
  //     await dataMetrics.map((itemMetric) => {
  //       const data = {
  //         title: itemMetric.label,
  //         dataIndex: itemMetric.label,
  //         placeholder: `Enter Level ${itemMetric.index}`,
  //         align: "center",
  //         className: "td-top",
  //         width: 150,
  //         type: "number",
  //         editable: true,
  //         // render: (val, record) => {
  //         //   if (record?.isInlineEdit) {
  //         //     console.log("dataMetrics", record);
  //         //     console.log("dataMetrics", dataSource);
  //         //     let some = dataSource.filter((e) => e.id === record.id);
  //         //     console.log("dataMetrics", some);
  //         //     if (some.achievementType === 1) {
  //         //       return <InputNumber min={1} onChange={}/>;
  //         //     } else {
  //         //       return <Input type="text" />;
  //         //     }
  //         //   } else {
  //         //     return <span>{val}</span>;
  //         //   }
  //         // },
  //       };
  //       newColumns.push(data);
  //     });
  //     if (isEditable) {
  //       const action = {
  //         title: "Progress Tracking",
  //         align: "center",
  //         editable: false,
  //         width: 250,
  //         dataIndex: "action",
  //         render: (text, record) => {
  //           const { dataSource } = this.props;
  //           return dataSource.length >= 1 ? (
  //             <div>
  //               {!record?.isInlineEdit ? (
  //                 <div>
  //                   <Button
  //                     key={"a" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     disabled={record?.isInlineEdit ? true : false}
  //                   >
  //                     <Link
  //                       to={`/Activity/${record.key}/${
  //                         !isSuperior ? userId : stafid
  //                       }`}
  //                     >
  //                       Activity
  //                     </Link>
  //                   </Button>
  //                   <Button
  //                     key={"b" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     disabled={record?.isInlineEdit ? true : false}
  //                   >
  //                     <Link
  //                       to={`/Achievement/${record.key}/${
  //                         !isSuperior ? userId : stafid
  //                       }`}
  //                     >
  //                       Achievement
  //                     </Link>
  //                   </Button>
  //                   <Button
  //                     style={{ marginRight: 5 }}
  //                     icon="edit"
  //                     type="danger"
  //                     onClick={() =>
  //                       this.props.editRow(true, record, this.getColumns)
  //                     }
  //                   ></Button>
  //                 </div>
  //               ) : (
  //                 <div>
  //                   <Button
  //                     key={"c" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     icon="save"
  //                     type="primary"
  //                     onClick={() => this._onSaveButton()}
  //                   ></Button>
  //                   <Button
  //                     key={"d" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     icon="close-circle"
  //                     type="danger"
  //                     onClick={() =>
  //                       this.props.cancelEditRow(false, record, this.getColumns)
  //                     }
  //                   ></Button>
  //                 </div>
  //               )}
  //             </div>
  //           ) : null;
  //         },
  //       };
  //       await newColumns.push(action);
  //     }
  //     // }
  //   } else {
  //     newColumns = [
  //       {
  //         title: "KPI Subject",
  //         dataIndex: "kpi",
  //         placeholder: "Enter KPI Subject",
  //         align: "center",
  //         width: 200,
  //         className: "td-top",
  //         editable: false,
  //       },
  //       {
  //         title: "Baseline",
  //         dataIndex: "baseline",
  //         placeholder: "Enter baseline",
  //         align: "center",
  //         className: "td-top",
  //         width: 200,
  //         editable: false,
  //       },
  //       {
  //         title: "Weight (%)",
  //         dataIndex: "weight",
  //         placeholder: "Enter KPI Weight",
  //         align: "center",
  //         className: "td-top",
  //         type: "number",
  //         width: 90,
  //         editable: false,
  //       },
  //     ];
  //     // eslint-disable-next-line array-callback-return
  //     await dataMetrics.map((itemMetric) => {
  //       const data = {
  //         title: itemMetric.label,
  //         dataIndex: itemMetric.label,
  //         placeholder: `Enter Level ${itemMetric.index}`,
  //         align: "center",
  //         className: "td-top",
  //         width: 150,
  //         type: "number",
  //         editable: false,
  //         // render: (val, record) => {
  //         //   if (record?.isInlineEdit) {
  //         //     console.log("dataMetrics", record);
  //         //     console.log("dataMetrics", dataSource);
  //         //     let some = dataSource.filter((e) => e.id === record.id);
  //         //     console.log("dataMetrics", some);
  //         //     if (some.achievementType === 1) {
  //         //       return <InputNumber min={1} onChange={}/>;
  //         //     } else {
  //         //       return <Input type="text" />;
  //         //     }
  //         //   } else {
  //         //     return <span>{val}</span>;
  //         //   }
  //         // },
  //       };
  //       newColumns.push(data);
  //     });
  //     if (isEditable) {
  //       const action = {
  //         title: "Progress Tracking",
  //         align: "center",
  //         editable: false,
  //         width: 250,
  //         dataIndex: "action",
  //         render: (text, record) => {
  //           const { dataSource } = this.props;
  //           return dataSource.length >= 1 ? (
  //             <div>
  //               {!record?.isInlineEdit ? (
  //                 <div>
  //                   <Button
  //                     key={"a" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     disabled={record?.isInlineEdit ? true : false}
  //                   >
  //                     <Link
  //                       to={`/Activity/${record.key}/${
  //                         !isSuperior ? userId : stafid
  //                       }`}
  //                     >
  //                       Activity
  //                     </Link>
  //                   </Button>
  //                   <Button
  //                     key={"b" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     disabled={record?.isInlineEdit ? true : false}
  //                   >
  //                     <Link
  //                       to={`/Achievement/${record.key}/${
  //                         !isSuperior ? userId : stafid
  //                       }`}
  //                     >
  //                       Achievement
  //                     </Link>
  //                   </Button>
  //                   <Button
  //                     style={{ marginRight: 5 }}
  //                     icon="edit"
  //                     type="danger"
  //                     onClick={() =>
  //                       this.props.editRow(true, record, this.getColumns)
  //                     }
  //                   ></Button>
  //                 </div>
  //               ) : (
  //                 <div>
  //                   <Button
  //                     key={"c" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     icon="save"
  //                     type="primary"
  //                     onClick={() => this._onSaveButton()}
  //                   ></Button>
  //                   <Button
  //                     key={"d" + record.key}
  //                     style={{ marginRight: 5 }}
  //                     icon="close-circle"
  //                     type="danger"
  //                     onClick={() =>
  //                       this.props.cancelEditRow(false, record, this.getColumns)
  //                     }
  //                   ></Button>
  //                 </div>
  //               )}
  //             </div>
  //           ) : null;
  //         },
  //       };
  //       await newColumns.push(action);
  //     }
  //   }

  //   this.setState({
  //     columns: newColumns,
  //   });
  // };

  change = (index, field, record) => {
    console.log("change index", index);
    console.log("change field", field);
    console.log("change record", record);
    const { handlechange, form } = this.props;
    let checkField = field;
    setTimeout(() => {
      if (field.length > 1) {
        checkField = form.getFieldValue(field);
        console.log(checkField);
      }
      form.validateFields(checkField, (errors, values) => {
        console.log(values);
        let item = {};
        if (record.cascadeType === 1) {
          console.log(values);
        } else if (record.cascadeType === 0) {
          console.log(values);
        } else {
          console.log(values);
        }
        // handlechange({
        //   ...record,
        //   ...item,
        // });
      });
    }, 100);
  };

  getColumns = async () => {
    // the async await on this function would leaking memory (showing warn)
    // but i have to async await for making it table
    const {
      dataMetrics,
      userId,
      isSuperior,
      isEditable,
      stafid,
      isRowEdit,
      dataSource,
      form,
    } = this.props;
    const { getFieldDecorator, getFieldError, getFieldValue } = form;
    let newColumns;
    // console.log(this.props.isRowEdit);
    // const some = dataSource.filter((e) => e.key === this.props.isRowEdit.rowId);
    // console.log(some);
    // if (record !== undefined || record !== null) {

    newColumns = [
      {
        title: "KPI Subject",
        dataIndex: "kpi",
        placeholder: "Enter KPI Subject",
        align: "center",
        width: 200,
        className: "td-top",
        editable: false,
      },
      {
        title: "Baseline",
        dataIndex: "baseline",
        placeholder: "Enter baseline",
        align: "center",
        className: "td-top",
        width: 200,
        editable: false,
      },
      {
        title: "Weight (%)",
        dataIndex: "weight",
        placeholder: "Enter KPI Weight",
        align: "center",
        className: "td-top",
        type: "number",
        width: 90,
        editable: false,
      },
    ];
    // eslint-disable-next-line array-callback-return
    await dataMetrics.map((itemMetric) => {
      const data = {
        title: itemMetric.label,
        dataIndex: itemMetric.label,
        placeholder: `Enter Level ${itemMetric.index}`,
        align: "center",
        className: "td-top",
        width: 150,
        type: "number",
        // editable: false,
        render: (val, record, index) => {
          // console.log(index);
          // console.log(record);
          // console.log(val);
          const data = {
            record: record,
            title: `${itemMetric.label}`,
          };
          if (record?.isInlineEdit) {
            // console.log("dataMetrics", record);
            // console.log("dataMetrics", dataSource);
            let some = dataSource.filter((e) => e.id === record.id);
            // console.log("dataMetrics", some);
            // if (some.achievementType === 1) {
            //   return <Input type={"text"} />;
            // } else {
            //   return <Input type={"text"} />;
            // }
            let fieldName = `dataKpi[${index}].${itemMetric.label}`;
            return (
              <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(
                  `dataKpi[${index}].${itemMetric.label}`,
                  {
                    rules:
                      record.achievementType === 1
                        ? metricValidator(data)
                        : metricValidatorText(data),
                    initialValue: val,
                  }
                )(
                  <TextArea
                    id={`${itemMetric.label}-${itemMetric.index}`}
                    placeholder={`Enter '${itemMetric.label}' point`}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={() => this.change(index, fieldName, record)}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    // disabled={!record?.isInlineEdit}
                  />
                )}
              </Form.Item>
            );
          } else {
            return <span>{val}</span>;
          }
        },
      };
      newColumns.push(data);
    });
    if (isEditable) {
      const action = {
        title: "Progress Tracking",
        align: "center",
        editable: false,
        width: 250,
        dataIndex: "action",
        render: (text, record) => {
          const { dataSource } = this.props;
          return dataSource.length >= 1 ? (
            <div>
              {!record?.isInlineEdit ? (
                <div>
                  <Button
                    key={"a" + record.key}
                    style={{ marginRight: 5 }}
                    disabled={record?.isInlineEdit ? true : false}
                  >
                    <Link
                      to={`/Activity/${record.key}/${
                        !isSuperior ? userId : stafid
                      }`}
                    >
                      Activity
                    </Link>
                  </Button>
                  <Button
                    key={"b" + record.key}
                    style={{ marginRight: 5 }}
                    disabled={record?.isInlineEdit ? true : false}
                  >
                    <Link
                      to={`/Achievement/${record.key}/${
                        !isSuperior ? userId : stafid
                      }`}
                    >
                      Achievement
                    </Link>
                  </Button>
                  <Button
                    style={{ marginRight: 5 }}
                    icon="edit"
                    type="danger"
                    onClick={() =>
                      this.props.editRow(true, record, this.getColumns)
                    }
                  ></Button>
                </div>
              ) : (
                <div>
                  <Button
                    key={"c" + record.key}
                    style={{ marginRight: 5 }}
                    icon="save"
                    type="primary"
                    onClick={() => this._onSaveButton()}
                  ></Button>
                  <Button
                    key={"d" + record.key}
                    style={{ marginRight: 5 }}
                    icon="close-circle"
                    type="danger"
                    onClick={() =>
                      this.props.cancelEditRow(false, record, this.getColumns)
                    }
                  ></Button>
                </div>
              )}
            </div>
          ) : null;
        },
      };
      await newColumns.push(action);
    }
    this.setState({
      columns: newColumns,
    });
  };

  _toggleModalConfirmationEdit = () => {
    const { isModalConfirmationEdit } = this.state;
    const modalConfirmationEdit = !isModalConfirmationEdit;
    this.setState({
      isModalConfirmationEdit: modalConfirmationEdit,
    });
  };

  render() {
    const { columns } = this.state;
    const { dataSource, handleChange, handleError, loading, form } = this.props;
    return (
      <div>
        <DataTable
          form={form}
          columns={columns}
          loading={loading}
          datasource={dataSource}
          handleerror={handleError}
          // it (lowercase) handle vdom warn, but another vdom valid function err show
          handlechange={handleChange}
        />
      </div>
    );
  }
}

export default TableMonitorKPI;

TableMonitorKPI.propTypes = {
  dataSource: PropTypes.instanceOf(Array),
  handleChange: PropTypes.func,
  handleError: PropTypes.func,
  handleDelete: PropTypes.func,
  isFeedback: PropTypes.bool,
  dataMetrics: PropTypes.instanceOf(Array),
  form: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
};
