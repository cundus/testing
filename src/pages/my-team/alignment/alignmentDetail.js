import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spin, Divider, Typography, AutoComplete, Input } from 'antd';
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
    constructor(props) {
      super(props);
      this.state = {
        usersCalibration: [],
        dataTable: [],
        autoCompleteDataSource: []
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
        
        let autoCompleteDataSource = [
            ...newData.map(item => item.name),
            ...newData.map(item => item.managerName),
            ...newData.map(item => item.userId),
            ...newData.map(item => item.preAlignment),
            ...newData.map(item => item.department),
            ...newData.map(item => item.kpiAchievementScore),
        ]
        autoCompleteDataSource = _.uniq(autoCompleteDataSource);

        this.setState({
            usersCalibration: newData,
            dataTable: newData,
            autoCompleteDataBase: autoCompleteDataSource,
            autoCompleteDataSource: autoCompleteDataSource
        })
    }

    search = (keyword) => {
        const keysearch = keyword ? keyword.toLowerCase() : '';
        const { usersCalibration, autoCompleteDataBase } = this.state
        const found = usersCalibration.filter(item => {
            if (item.name.toLowerCase().includes(keysearch)) {
                return item
            } else if (item.managerName.toLowerCase().includes(keysearch)) {
                return item
            } else if (item.kpiAchievementScore.toLowerCase().includes(keysearch)) {
                return item
            } else if (item.department.toLowerCase().includes(keysearch)) {
                return item
            } else if (item.preAlignment.toLowerCase().includes(keysearch)) {
                return item
            } else if (item.userId.toLowerCase().includes(keysearch)) {
                return item
            }
        })
        const searchData = autoCompleteDataBase.filter(item => item.toLowerCase().includes(keysearch))
        this.setState({
            dataTable: keyword ? found : usersCalibration,
            autoCompleteDataSource: keyword ? searchData : autoCompleteDataBase
        })
    }
    render() {
        const { alignmentReducers } = this.props;
        const { usersCalibration, autoCompleteDataSource,dataTable } = this.state;
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
                                {usersCalibration?.map((item, index) =>
                                    <Text>{item?.firstName}&nbsp;{item?.lastName}
                                    {(usersCalibration.length > 0 && index < usersCalibration.length-2) && ', '}
                                    {(usersCalibration.length-2 === index) && ' & '}</Text>
                                )}
                                <Divider />
                            </div>
                            <div style={{ width: '50vw' }}>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={contentChart}
                                />
                            </div>
                            <AutoComplete
                                dataSource={autoCompleteDataSource}
                                onChange={keyword => this.search(keyword)}
                                allowClear
                            >
                                <Input.Search size="large" placeholder="Search" />
                            </AutoComplete>
                            <TableAlignmentDetail team={dataTable ?? []} />
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
