import { Steps } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FilterTableSSR from "../../../components/dataTable/ssrTableFilter";
import {
  doChooseUserOnBehalf,
  doGetUsersBehalf,
} from "../../../redux/actions/onBehalf";
import { getDepartements, getDirectorates } from "../../../service/onBehalf";
import globalStyle from "../../../styles/globalStyles";
import "../onbehalf-styles.scss";
import TableLandingUserOnBehalf from "./table-landing-user";

export const initGetDataParams = {
  size: 10,
  page: 0,
  filters: {},
};

class LandingUserBehalf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        directorates: [],
        departments: []
      }
    };
    this.idleTimer = null;
  }

  componentDidMount() {
    this.fetchData({ ...initGetDataParams, resetFilter: true });
    this.fetchOptions()
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

  fetchOptions = async () => {
    try {
      const dataDirectorates = await getDirectorates()
      const dataDepartements = await getDepartements()
      this.setState({
        options: {
          directorates: dataDirectorates?.data?.result || [],
          departments: dataDepartements?.data?.result || []
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { onBehalf } = this.props;
    const { options } = this.state;
    const data = onBehalf?.dataUsersBehalf?.result;
    const loading = onBehalf?.loadingUsersBehalf;
    const sort = onBehalf?.filterUsersBehalf?.sort;

    const filters = [
      { name: "User ID", value: "userId", type: "FREE_TEXT" },
      { name: "First Name", value: "firstName", type: "FREE_TEXT" },
      { name: "Last Name", value: "lastName", type: "FREE_TEXT" },
      { name: "Email", value: "email", type: "FREE_TEXT" },
      { name: "Manager ID", value: "managerId", type: "FREE_TEXT" },

      {name: "Directorate", value: "directorate", type: "DROPDOWN", data: options?.directorates || []},
      {name: "Department", value: "department", type: "DROPDOWN", data:  options?.departments || []},
    ]
    return (
      <>
        <div
          style={{
            ...globalStyle.contentContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40vw",
            }}
          >
            <Steps current={0}>
              <Steps.Step
                title="Select User"
                icon={<img src="/assets/icon/user-group.svg" />}
              />
              <Steps.Step
                title="Select KPI Form"
                icon={<img src="/assets/icon/select.svg" />}
              />
            </Steps>
          </div>
        </div>
        <div
          style={{
            ...globalStyle.contentContainer,
            marginTop: 15,
          }}
        >
          <FilterTableSSR
            onFilter={(p) =>
              this.fetchData({ ...initGetDataParams, filters: p })
            }
            value={this.state?.filterField}
            onChange={(filterField) => {
              this.setState({
                filterField,
              });
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
