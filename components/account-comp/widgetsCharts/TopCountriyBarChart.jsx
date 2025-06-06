'use client'
import React from 'react'
import CardHeader from '../shared/CardHeader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
import CardLoader from '../shared/CardLoader'
import { topCountryBarChartOptions } from '../../../utils/chartsLogic/topCountryBarChartOptions'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })


const TopCountryBarChart = () => {
    const chartOptions = topCountryBarChartOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Top Countries"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <ReactApexChart
                        type='bar'
                        options={chartOptions}
                        series={chartOptions.series}
                        height={400}
                    />
                </div>

                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default TopCountryBarChart
