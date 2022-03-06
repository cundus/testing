import { Pagination, Select, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { Component } from "react";

class TableSSR extends Component {
  render() {
    const { dataSource, loading, pagination, fetchData, columns } = this.props;
    const { total, size, page } = pagination;

    return (
      <div id="table-ssr">
        <Table
          dataSource={dataSource}
          columns={columns}
          size={"small"}
          loading={loading}
          scroll={{
            x: true,
          }}
          pagination={false}
          onChange={(pagination, filters, sorters) => {
            fetchData({
              page: pagination.current - 1,
              size: 10,
              sort: sorters.field,
              order: sorters.order,
            });
          }}
        />
        <div style={{ display: "flex", marginTop: 20 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Text style={{ marginRight: 10 }}>
                Items per page
            </Text>
            <Select
              value={size}
              style={{ width: 120 }}
              onChange={(value) => {
                fetchData({
                  page: 0,
                  size: value,
                  resetFilter: true
                });
              }}
            >
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={20}>20</Select.Option>
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
