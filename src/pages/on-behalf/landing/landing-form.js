import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    doChooseFormOnBehalf, doGetFormsBehalf
} from "../../../redux/actions/onBehalf";
import globalStyle from "../../../styles/globalStyles";
import "../onbehalf-styles.scss";
import TableLandingFormOnBehalf from "./table-landing-form";

export const initGetDataParams = {
  size: 10,
  page: 0,
  filters: {},
};

class LandingFormBehalf extends Component {
  componentDidMount() {
    this.props.getFormsBehalf(initGetDataParams);
  }

  render() {
    const { onBehalf } = this.props;
    const data = onBehalf?.dataFormsBehalf?.result;
    const loading = onBehalf?.loadingFormsBehalf;

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
            textAlign: "center",
            marginTop: 15,
          }}
        >
          SEARCH
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
            fetchData={this.props.getFormsBehalf}
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
