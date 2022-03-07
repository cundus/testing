import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FilterTableSSR from "../../../components/dataTable/ssrTableFilter";
import {
  doChooseUserOnBehalf,
  doGetUsersBehalf,
} from "../../../redux/actions/onBehalf";
import globalStyle from "../../../styles/globalStyles";
import "../onbehalf-styles.scss";
import TableLandingUserOnBehalf from "./table-landing-user";

export const initGetDataParams = {
  size: 10,
  page: 0,
  filters: {},
};


class LandingUserBehalf extends Component {
  componentDidMount() {
    this.fetchData({ ...initGetDataParams, resetFilter: true });
  }

  fetchData = (p) => {
    const { onBehalf } = this.props;
    if (p?.resetFilter) {
      this.props.getUsersBehalf({ ...p, filters: {} });
    } else {
      this.props.getUsersBehalf({
        ...p,
        filters: p?.filters || onBehalf?.filterUsersBehalf || {},
      });
    }
  };

  render() {
    const { onBehalf } = this.props;
    const data = onBehalf?.dataUsersBehalf?.result;
    const loading = onBehalf?.loadingUsersBehalf;
    const sort = onBehalf?.filterUsersBehalf?.sort

    const filters = [
      {name: "User ID", value: "userId", type: "FREE_TEXT"},
      {name: "First Name", value: "firstName", type: "FREE_TEXT"},
      {name: "Last Name", value: "lastName", type: "FREE_TEXT"},
      {name: "Email", value: "email", type: "FREE_TEXT"},
      {name: "Manager ID", value: "managerId", type: "FREE_TEXT"},

      {name: "Directorate", value: "directorate", type: "DROPDOWN", data: []},
      {name: "Department", value: "department", type: "DROPDOWN", data: []},
    ]
    return (
      <>
        <div
          style={{
            ...globalStyle.contentContainer,
            textAlign: "center",
          }}
        >
          WIZZARD
        </div>
        <div
          style={{
            ...globalStyle.contentContainer,
            marginTop: 15,
          }}
        >
          <FilterTableSSR
            onFilter={(p) => this.fetchData({ ...initGetDataParams, filters: p })}
            value={this.state?.filterField}
            onChange={(filterField) => {
              this.setState({
                filterField
              })
            }}
            filters={filters}
          />
        </div>
        <div
          style={{
            ...globalStyle.contentContainer,
            marginTop: 15,
          }}
        >
          <TableLandingUserOnBehalf
            dataSource={data?.content || []}
            loading={loading}
            onChoose={this.props.chooseUserOnBehalf}
            fetchData={this.fetchData}
            sort={sort}
            pagination={{
              size: data?.size || initGetDataParams.size,
              total: data?.totalElements || 0,
              page: data?.currentPage || initGetDataParams.page,
            }}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  onBehalf: state.onBehalf,
});
const mapDispatchToProps = (dispatch) => ({
  getUsersBehalf: ({ page, size, filters, sort, order }) =>
    dispatch(doGetUsersBehalf({ page, size, filters, sort, order })),
  chooseUserOnBehalf: (id) => dispatch(doChooseUserOnBehalf(id)),
});
const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingUserBehalf);

export default withRouter(connectToComponent);
