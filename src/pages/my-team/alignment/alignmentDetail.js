import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spin, Divider, Typography, AutoComplete, Input, Button } from 'antd';
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
        categories: ['Outstanding']
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
    constructor(props) {
      super(props);
      this.state = {
        usersCalibration: [],
        dataTable: [],
        autoCompleteDataSource: [],
        sortedInfo: {},
        filteredInfo: {}
    }
    }
    componentDidMount() {
        this.getData()
    }

    getData= async() => {
        
        const { doGetAlignmentDetail } = this.props;
        const { match } = this.props;
        await doGetAlignmentDetail(match?.params?.sessionId);
        const { alignmentReducers } = this.props;
        const newData = alignmentReducers?.dataDetail?.usersCalibration.map((item, index) => {
            const kpiScore = item?.kpiAchievementScore < 0 ? 0 : item?.kpiAchievementScore
            return {
                ...item,
                name: item?.firstName+' '+item?.lastName,
                managerName: item?.managerFirstName+' '+item?.managerLastName,
                kpiAchievementScore: `${kpiScore}`,
            }
        })

        this.setState({
            usersCalibration: newData,
            dataTable: newData,
        })
    }

    
    handleChange = (pagination, filters, sorter) => {
        this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
        });
    };


    clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      };

    render() {
        const { alignmentReducers } = this.props;
        const { usersCalibration, sortedInfo, filteredInfo,dataTable } = this.state;
        const contentChart = {
            ...options,
            series: [{
                name: 'Requirements',
                data: [
                    alignmentReducers?.dataDetail?.totalRequirementOutstanding
                ],
                stack: 'Requirements',
                color: '#324aa8'
            }, {
                name: 'Actual',
                data: [
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
                                {usersCalibration?.map((item, index) =>
                                    <Text>{item?.firstName}&nbsp;{item?.lastName}
                                    {(usersCalibration.length > 0 && index < usersCalibration.length-2) && ', '}
                                    {(usersCalibration.length-2 === index) && ' & '}</Text>
                                )}
                                <Divider />
                            </div>
                            <div style={{ width: '50vw', marginBottom: 20 }}>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={contentChart}
                                />
                            </div>
                            <div style={{marginBottom: 10}}>
                                <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                            </div>
                            <TableAlignmentDetail handleChangeTable={this.handleChange} sortedInfo={sortedInfo} filteredInfo={filteredInfo} dataSource={dataTable ?? []} />
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
