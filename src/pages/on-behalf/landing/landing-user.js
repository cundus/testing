import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { doChooseUserOnBehalf, doGetUsersBehalf } from "../../../redux/actions/onBehalf";
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
    this.props.getUsersBehalf(initGetDataParams);
  }

  render() {
    const { onBehalf } = this.props;
    const data = onBehalf?.dataUsersBehalf?.result;
    const loading = onBehalf?.loadingUsersBehalf;

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
          <TableLandingUserOnBehalf
            dataSource={data?.content || []}
            loading={loading}
            onChoose={this.props.chooseUserOnBehalf}
            fetchData={this.props.getUsersBehalf}
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
    chooseUserOnBehalf:(id) => dispatch(doChooseUserOnBehalf(id))
});
const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingUserBehalf);

export default withRouter(connectToComponent);
