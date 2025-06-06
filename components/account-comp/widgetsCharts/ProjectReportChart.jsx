'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import CardHeader from '../shared/CardHeader'
import { projectStatisticsChartOption } from '../../../utils/chartsLogic/projectStatisticsChartOption'
import CardLoader from '../shared/CardLoader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ProjectReportChart = () => {
    const chartOptions = projectStatisticsChartOption()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();
    if (isRemoved) {
        return null;
    }

    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Project Report"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand}/>
                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='area'
                        options={chartOptions}
                        series={chartOptions?.series}
                        height={365}
                    />
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default ProjectReportChart