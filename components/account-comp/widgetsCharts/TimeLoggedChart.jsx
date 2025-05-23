'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import CardHeader from '../shared/CardHeader'
import { timeLoggedChartOption } from '../../../utils/chartsLogic/timeLoggedChartOption'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const TimeLoggedChart = () => {
    const chartOptions = timeLoggedChartOption()
    return (
        <div className="col-xxl-6">
            <div className="card stretch stretch-full">
                <CardHeader title={"Time Logged"} />
                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='area'
                        options={chartOptions}
                        series={chartOptions.series}
                        height={350}
                    />
                </div>
            </div>
        </div>
    )
}

export default TimeLoggedChart