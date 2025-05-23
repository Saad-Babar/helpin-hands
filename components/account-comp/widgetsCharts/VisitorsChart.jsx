'use client'
import React from 'react'
import CardHeader from '../shared/CardHeader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
import CardLoader from '../shared/CardLoader'
import { visitorChartOption } from '../../../utils/chartsLogic/visitorChartOption'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })


const VisitorsChart = () => {
    const chartOptions = visitorChartOption()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();
    if (isRemoved) {
        return null;
    }

    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Visitors"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='area'
                        options={chartOptions}
                        series={chartOptions.series}
                        height={350}
                    />
                </div>

                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default VisitorsChart