import { DatePicker, Input, Select } from "antd";
import React, { Component } from "react";

class FilterTableSSR extends Component {
  render() {
    const { filters, value, onChange, onFilter } = this.props;
    const selectedFilter = Array.from(filters || []).filter(
      (item) => item.value === value
    )?.[0];
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select
          value={value}
          onChange={async(value) => {
            await onChange('')
            onChange(value)
          }}
          placeholder="Search By"
          style={{
            minWidth: 200,
          }}
        >
          <Select.Option disabled value={"none"}>
            Search By
          </Select.Option>
          {Array.from(filters || []).map((item) => {
            return (
              <Select.Option key={item.name} value={item.value}>{item.name}</Select.Option>
            );
          })}
        </Select>
        <div style={{ flex: 1, marginLeft: 20 }}>
          <FilterInput
            type={selectedFilter?.type}
            name={selectedFilter?.name}
            value={selectedFilter?.value}
            data={selectedFilter?.data}
            onFilter={(val) => {
              onFilter({
                [selectedFilter?.value]: val,
              });
            }}
            onFilterFull={onFilter}
          />
        </div>
      </div>
    );
  }
}

const FilterInput = ({ onFilter, type, name, data, onFilterFull, value}) => {
  switch (type) {
    case "FREE_TEXT":
      return (
        <Input.Search
          placeholder={`Search by ${name}`}
          onSearch={(val) => onFilter(val)}
        />
      );

    case "DROPDOWN":
      return (
        <Select
          onChange={(val) => onFilter(val)}
          placeholder={`Search By ${name}`}
          style={{
            width: "100%",
          }}
        >
          <Select.Option disabled value={"none"}>
            Search By {name}
          </Select.Option>
          {Array.from(data || []).map(item => {
            return (
              <Select.Option key={item.name} value={item.value}>{item.name}</Select.Option>
            );
          })}
        </Select>
      );
    case "DATEPICKER":
      return (
        <DatePicker
          style={{
            width: "100%",
          }}
          placeholder={`Search By ${name}`}
          onChange={(date, dateString) => onFilter(dateString)}
        />
      );
    case "RANGE_DATE":
      return (
        <DatePicker.RangePicker
          style={{
            width: "100%",
          }}
          placeholder={`Search By ${name}`}
          onChange={(date, dateString) => onFilterFull({
            [`start${value}`]: dateString[0],
            [`end${value}`]: dateString[1]
          })}
        />
      );
    default:
      return <Input.Search disabled />;
  }
};

export default FilterTableSSR;
