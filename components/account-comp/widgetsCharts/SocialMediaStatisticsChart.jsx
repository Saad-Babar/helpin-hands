'use client'
import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import CardHeader from '../shared/CardHeader'
import { socialRadarChartOption } from '../../../utils/chartsLogic/socialRadarChartOption'
import CardLoader from '../shared/CardLoader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const SocialMediaStatisticsChart = () => {
    const chartOptions = socialRadarChartOption()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Social Statistics"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartOptions?.series}
                        type='radar'
                        height={376}
                    />
                </div>
                <Link href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Explore Details</Link>
            </div>
            <CardLoader refreshKey={refreshKey} />
        </div>
    )
}

export default SocialMediaStatisticsChart