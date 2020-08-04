import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spin, Divider, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import TableAlignmentDetail from './table-alignmentDetail';
import globalStyle from "../../../styles/globalStyles";
import { getAlignmentSessionDetail } from "../../../redux/actions/alignment";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const { Text } = Typography;

const options = {

    chart: {
        type: 'column'
    },

    title: {
        text: ' '
    },

    xAxis: {
        categories: ['Need Improvement', 'Well Done', 'Outstanding']
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: ' '
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>'
        }
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },
    credits: {
        enabled: false,
    },
}

class AlignmentList extends Component {
    componentDidMount() {
        const { doGetAlignmentDetail } = this.props;
        const { match } = this.props;
        doGetAlignmentDetail(match?.params?.sessionId);
    }

    render() {
        const { alignmentReducers } = this.props;
        const contentChart = {
            ...options,
            series: [{
                name: 'Requirements',
                data: [
                    alignmentReducers?.dataDetail?.totalRequirementWellDone,
                    alignmentReducers?.dataDetail?.totalRequirementNeedImprovement,
                    alignmentReducers?.dataDetail?.totalRequirementOutstanding
                ],
                stack: 'Requirements',
                color: '#324aa8'
            }, {
                name: 'Actual',
                data: [
                    alignmentReducers?.dataDetail?.totalActualWellDone,
                    alignmentReducers?.dataDetail?.totalActualNeedImprovement,
                    alignmentReducers?.dataDetail?.totalActualOutstanding
                ],
                stack: 'Actual',
                color: 'orange'
            }]
        }
        return (
            <div style={globalStyle.contentContainer}>
                {
                    !alignmentReducers?.loadingDetail ?
                        <div>
                            <div>
                                <Divider />
                                <Text strong style={{ fontSize: 20 }}>Performance Review Alignment (Callibration) : </Text><br />
                                <Text strong>Member : </Text>
                                {alignmentReducers?.dataDetail?.usersCalibration.map((item) =>
                                    <Text>{item?.firstName}&nbsp;{item?.lastName}</Text>
                                )}
                                <Divider />
                            </div>
                            <div style={{ width: '50vw' }}>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={contentChart}
                                />
                            </div>
                            <TableAlignmentDetail team={alignmentReducers?.dataDetail?.usersCalibration ?? []} />
                        </div> :
                        <center>
                            <Spin />
                        </center>
                }
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => ({
    doGetAlignmentDetail: (sessionId) => dispatch(getAlignmentSessionDetail(sessionId))
});

const mapStateToProps = (state) => ({
    alignmentReducers: state.alignmentReducers
});
const connectToComponent = connect(mapStateToProps, mapDispatchtoProps)(AlignmentList);

export default withRouter(connectToComponent);
