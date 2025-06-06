'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import CardHeader from '../shared/CardHeader'
import { visitorsOverviewChartOption } from '../../../utils/chartsLogic/visitorsOverviewChartOption'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
import CardLoader from '../shared/CardLoader'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const VisitorsOverviewChart = () => {
    const chartOption = visitorsOverviewChartOption()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Visitors Overview"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action">
                    <ReactApexChart
                        options={chartOption}
                        series={chartOption?.series}
                        type='area'
                        height={370}
                    />
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default VisitorsOverviewChart