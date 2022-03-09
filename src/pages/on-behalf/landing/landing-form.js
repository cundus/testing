import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FilterTableSSR from "../../../components/dataTable/ssrTableFilter";
import {
    doChooseFormOnBehalf, doGetFormsBehalf
} from "../../../redux/actions/onBehalf";
import globalStyle from "../../../styles/globalStyles";
import { stepKpisDropdown } from "../../../utils/stepKpi";
import "../onbehalf-styles.scss";
import TableLandingFormOnBehalf from "./table-landing-form";

 const initGetDataParams = {
  size: 10,
  page: 0,
  filters: {},
};

class LandingFormBehalf extends Component {
  componentDidMount() {
    this.fetchData({ ...initGetDataParams, resetFilter: true });
  }

  fetchData = (p) => {
    const { onBehalf } = this.props;
    if (p?.resetFilter) {
      this.props.getFormsBehalf({ ...p, filters: {} });
    } else {
      this.props.getFormsBehalf({
        ...p,
        filters: p?.filters || onBehalf?.filterUsersBehalf || {},
      });
    }
  };

  render() {
    const { onBehalf } = this.props;
    const data = onBehalf?.dataFormsBehalf?.result;
    const loading = onBehalf?.loadingFormsBehalf;
    const sort = onBehalf?.filterFormsBehalf?.sort

    const filters = [
      {name: "Form Title", value: "title", type: "FREE_TEXT"},

      {name: "Step", value: "step", type: "DROPDOWN", data: stepKpisDropdown},

      {name: "Date Assigned", value: "DateAssigned", type: "RANGE_DATE"},
      {name: "Step Due Date", value: "StepDueDate", type: "RANGE_DATE"},
 
      {name: "Form Start Date", value: "FormReviewStartDate", type: "RANGE_DATE"},
      {name: "Form End Date", value: "FormReviewEndDate", type: "RANGE_DATE"},
      {name: "Form Due Date", value: "FormReviewDueDate", type: "RANGE_DATE"},

      {name: "Last Modified", value: "FormLastModifiedDate", type: "RANGE_DATE"},
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
          <TableLandingFormOnBehalf
            dataSource={data?.content || []}
            loading={loading}
            onChoose={this.props.chooseFormOnBehalf}
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
  getFormsBehalf: ({ page, size, filters, sort, order }) =>
    dispatch(doGetFormsBehalf({ page, size, filters, sort, order })),
  chooseFormOnBehalf: (id) => dispatch(doChooseFormOnBehalf(id)),
});
const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingFormBehalf);

export default withRouter(connectToComponent);
