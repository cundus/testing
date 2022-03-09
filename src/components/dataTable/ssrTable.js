import { Pagination, Select, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { Component } from "react";

export const sorterChecker = (index, sorterInfo) =>
  sorterInfo?.[0] === index &&
  (sorterInfo?.[1]
    ? sorterInfo?.[1] === "desc"
      ? "descend"
      : "ascend"
    : null);
class TableSSR extends Component {
  render() {
    const { dataSource, loading, pagination, fetchData, columns, sort, rowKey } =
      this.props;
    const { total, size, page } = pagination;

    return (
      <div id="table-ssr">
        <Table
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          size={"small"}
          loading={loading}
          scroll={{
            x: true,
          }}
          pagination={false}
          onChange={(p, f, sorters) => {
            fetchData({
              page: page,
              size: 10,
              sort: `${sorters.field},${
                sorters.order === "descend" ? "desc" : "asc"
              }`,
            });
          }}
        />
        <div style={{ display: "flex", marginTop: 20 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Text style={{ marginRight: 10 }}>Items per page</Text>
            <Select
              value={size}
              style={{ width: 120 }}
              onChange={(value) => {
                fetchData({
                  page: 0,
                  size: value,
                  resetFilter: true,
                });
              }}
            >
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={25}>25</Select.Option>
              <Select.Option value={50}>50</Select.Option>
              <Select.Option value={100}>100</Select.Option>
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text style={{ marginRight: 10 }}>
              Showing {dataSource.length} of {total} entries
            </Text>
            <Pagination
              current={page + 1}
              total={total}
              pageSize={size}
              onChange={(page, pageSize) => {
                fetchData({
                  page: page - 1,
                  size: pageSize,
                  sort: sort,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TableSSR;
