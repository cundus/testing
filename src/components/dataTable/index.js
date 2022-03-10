import React from "react";
import { Table, Input, Form, Select, Empty, Typography } from "antd";
import PropTypes from "prop-types";
// import { useMediaQuery } from "react-responsive";
import {
  metricValidator,
  validator,
  weightValidator,
  metricValidatorText,
  kpiValidator,
  achievementScoreValidator,
} from "../../utils/validator";

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  change = (index, field) => {
    const { record, handlechange, form } = this.props;
    let checkField = field;
    setTimeout(() => {
      if (field.length > 1) {
        checkField = field.filter((item) => form.getFieldValue(item));
      }
      form.validateFields(checkField, (errors, values) => {
        let item = {};
        if (record.cascadeType === 1) {
          item = values.dataManagerKpi[index];
        } else if (record.cascadeType === 0) {
          item = values.dataKpi[index];
        } else {
          item = values.dataGeneral[index];
        }
        handlechange({
          ...record,
          ...item,
        });
      });
    }, 100);
  };

  changeSwitch = (field, index) => async (value) => {
    const { record, handlechange, form } = this.props;
    handlechange({
      ...record,
      achievementType: value === "Qualitative" ? 0 : 1,
    });
    const dataFieldKPI = form.getFieldsValue(["dataKpi"]);
    await form.setFieldsValue({
      dataKpi: dataFieldKPI.dataKpi,
    });
    const checkField = field.filter((item) => form.getFieldValue(item));
    form.validateFields(checkField);
  };

  renderCell = () => {
    const {
      editable,
      dataindex,
      record,
      placeholder,
      indexarr,
      indexlength,
      title,
      form,
    } = this.props;
    const index = dataindex;
    const { cascadeType, metrics } = record;
    let isMetric = [];
    if (metrics) {
      isMetric = metrics.filter((metric) => metric.label === index);
    }
    let type = "";
    if (cascadeType === 1) {
      type = "dataManagerKpi";
    } else if (cascadeType === 0) {
      type = "dataKpi";
    } else {
      type = "dataGeneral";
    }
    let valueType = "Select type";
    if (record.achievementType === 0) {
      valueType = "Qualitative";
    } else if (record.achievementType === 1) {
      valueType = "Quantitative";
    }
    const data = {
      index,
      title,
      type,
      indexlength,
      indexarr,
      form,
      record,
    };

    if (index === "kpi") {
      // kpi contain type of metrics
      const field = [];
      for (let a = 0; a < data.indexlength; a++) {
        const datas = `${data.type}[${a}].${data.index}`;
        field.push(datas);
      }
      const metricField = [];
      for (let a = 0; a < data.indexlength; a++) {
        record.metrics.map((metricLabel) => {
          return metricField.push(`${type}[${a}].${metricLabel.label}`);
        });
      }
      return (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={{ width: "20%" }}>Type:</Text>
            <Select
              size="small"
              defaultValue={valueType}
              placeholder="Select type"
              onChange={this.changeSwitch(metricField, indexarr, indexlength)}
              style={{
                width: "80%",
                color: valueType === "Quantitative" ? "#52c41a" : "#",
              }}
            >
              <Option key="Qualitative">
                <Text style={{}}>Qualitative</Text>
              </Option>
              <Option key="Quantitative">
                <Text style={{ color: "#52c41a" }}>Quantitative</Text>
              </Option>
            </Select>
          </div>
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
              rules: kpiValidator(data),
              initialValue: record[index],
            })(
              <TextArea
                id={`${title}-${index}`}
                placeholder={placeholder}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={() => this.change(indexarr, field)}
                autoSize={{ minRows: 2, maxRows: 4 }}
                disabled={!editable}
              />
            )}
          </Form.Item>
        </div>
      );
    } else if (index === "feedback") {
      // Feedback
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            // rules: validator(data),
            initialValue: record[index],
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              style={{ background: "#EDEAA6", border: 0 }}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() =>
                this.change(indexarr, [`${type}[${indexarr}].${index}`])
              }
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    } else if (index === "comment") {
      // Comment
      return (
        <>
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
              // rules: validator(data),
              initialValue: record[index],
            })(
              <TextArea
                id={`${title}-${index}`}
                placeholder={placeholder}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={() =>
                  this.change(indexarr, [`${type}[${indexarr}].${index}`])
                }
                autoSize={{ minRows: 3, maxRows: 5 }}
                disabled={!editable}
              />
            )}
          </Form.Item>
        </>
      );
    } else if (index === "weight") {
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: weightValidator(),
            initialValue: record[index],
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() =>
                this.change(indexarr, [`${type}[${indexarr}].${index}`])
              }
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    } else if (isMetric.length !== 0) {
      const field = [];
      record.metrics.map((metricLabel) => {
        return field.push(`${type}[${indexarr}].${metricLabel.label}`);
      });
      // console.log(record[index]);
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(`${type}[${indexarr}].${title}`, {
            rules:
              record.achievementType === 1
                ? metricValidator(data)
                : metricValidatorText(data),
            initialValue: record[index],
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() => this.change(indexarr, field)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    } else if (index === "kpiScore") {
      const result = record?.rating || "";
      const kpiScorePlaceholder = () => {
        switch (result) {
          case "Below":
            return "Input range is between >= 1.0 until < 2.0";
          case "Meet":
            return "Input range is between >= 2.0 until < 3.0";
          case "Exceed":
            return "Input range is between >= 3.0 until <= 4.0";
          default:
            return "KPI Achievement Score";
        }
      };
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: achievementScoreValidator(result),
            initialValue: record[index],
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={kpiScorePlaceholder()}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() =>
                this.change(indexarr, [`${type}[${indexarr}].${index}`])
              }
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    } else {
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(`${type}[${indexarr}].${index}`, {
            rules: validator(data),
            initialValue: record[index],
          })(
            <TextArea
              id={`${title}-${index}`}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={() =>
                this.change(indexarr, [`${type}[${indexarr}].${index}`])
              }
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={!editable}
            />
          )}
        </Form.Item>
      );
    }
  };

  disableCell = () => {
    const { dataindex, record, children, indexarr, isManager } = this.props;
    const index = dataindex;
    let valueType = 'Select type"';
    if (record.achievementType === 0) {
      valueType = "Qualitative";
    } else if (record.achievementType === 1) {
      valueType = "Quantitative";
    }
    if (index === "kpi") {
      return (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={{ width: "20%" }}>Type:</Text>
            <Select
              size="small"
              id="type-kpi"
              defaultValue={valueType}
              placeholder="Select type"
              style={{
                width: "80%",
                color: valueType === "Quantitative" ? "#9ced74" : "#",
              }}
              disabled
            >
              <Option id="type-kpi-qualitative" key="Qualitative">
                Qualitative
              </Option>
              <Option id="type-kpi-quantitative" key="Quantitative">
                <Text style={{ color: "#52c41a" }}>Quantitative</Text>
              </Option>
            </Select>
          </div>
          <div className="editable-cell-value-wrap">{record[index]}</div>
        </div>
      );
    } else if (index === "comment") {
      // Comment
      return (
        <>
          {indexarr === 0 && isManager && (
            <div
              style={{
                marginBottom: 5,
                backgroundColor: "#EDEAA6",
                textAlign: "left",
                padding: 5,
                borderRadius: 4,
              }}
            >
              <span style={{}}>
                Uncomprimising Integrity is a hygiene factor in an Employee's
                Performance Review. If an Employee is rated low in
                Uncompromising Integrity, it will be further followed-up, and
                may lead to discplinary action.
              </span>
            </div>
          )}
          <div className="editable-cell-value-wrap">{children}</div>
        </>
      );
    } else {
      return (
        <div>
          <div className="editable-cell-value-wrap">{children}</div>
        </div>
      );
    }
  };

  render() {
    const { editable, verticalAlign, align, ...restProps } = this.props;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <td
        {...restProps}
        style={{ verticalAlign: verticalAlign, textAlign: align }}
      >
        {!editable ? (
          <div>
            <EditableContext.Consumer>
              {this.disableCell}
            </EditableContext.Consumer>
          </div>
        ) : (
          <div>
            <EditableContext.Consumer>
              {this.renderCell}
            </EditableContext.Consumer>
          </div>
        )}
      </td>
    );
  }
}

EditableCell.propTypes = {
  indexarr: PropTypes.number,
  indexlength: PropTypes.number,
  color: PropTypes.string,
  editable: PropTypes.bool,
  dataindex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.instanceOf(Object),
  index: PropTypes.string,
  handlechange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  col: PropTypes.instanceOf(Array),
  children: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
};

const DataTable = (props) => {
  const {
    datasource,
    handlechange,
    columns,
    loading,
    form,
    emptytext,
    handleChangeTable,
    editableRow,
  } = props;

  // const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const components = {
    body: {
      cell: EditableCell,
    },
  };
  const columnList = columns.map((col) => {
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        form,
        datasource,
        indexlength: datasource.length,
        indexarr: index,
        editable: editableRow ? Boolean(!col.noEditableRow && (editableRow === record?.id)) : col.editable,
        dataindex: col.dataIndex,
        title: col.title,
        type: col.type,
        placeholder: col.placeholder,
        verticalAlign: col.verticalAlign,
        align: col.align,
        isManager: col.isManager,
        col: columnList,
        color: col.color,
        handlechange,
      }),
    };
  });

  return (
    <div>
      <Table
        form={form}
        size="small"
        loading={loading}
        components={components}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={emptytext || "No Data"}
            />
          ),
        }}
        rowClassName="editable-row"
        bordered
        onChange={handleChangeTable}
        dataSource={datasource}
        columns={columnList}
        scroll={{ x: true }}
        pagination={false}
        style={{ marginBottom: 10 }}
      />
    </div>
  );
};

export default DataTable;

DataTable.propTypes = {
  emptytext: PropTypes.string,
  datasource: PropTypes.instanceOf(Array),
  handlechange: PropTypes.func,
  loading: PropTypes.bool,
  columns: PropTypes.instanceOf(Array),
  form: PropTypes.instanceOf(Object),
};
