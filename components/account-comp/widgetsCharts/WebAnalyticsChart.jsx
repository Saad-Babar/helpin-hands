'use client'
import React from 'react'
import CardHeader from '../shared/CardHeader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
import CardLoader from '../shared/CardLoader'
import { webAnalyticsChartOptions } from '../../../utils/chartsLogic/webAnalyticsChartOptions'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const WebAnalyticsChart = () => {
    const chartOption = webAnalyticsChartOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Website Analytics"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='bar'
                        options={chartOption}
                        series={chartOption.series}
                        height={425}
                    />
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default WebAnalyticsChart