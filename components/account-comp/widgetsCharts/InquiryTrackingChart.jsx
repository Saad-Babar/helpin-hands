'use client'
import React from 'react'
import CardHeader from '../shared/CardHeader'
import { inquiryTrackingChartOption } from '../../../utils/chartsLogic/inquiryTrackingChartOption'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const InquiryTrackingChart = () => {
    const chartOption = inquiryTrackingChartOption()
    return (
        <div className="col-xxl-6">
            <div className="card stretch stretch-full">
                <CardHeader title={"Inquiry Tracking"} />

                <div className="card-body custom-card-action">
                    <ReactApexChart
                        type='bar'
                        options={chartOption}
                        series={chartOption?.series}
                        height={350}
                    />
                </div>
            </div>
        </div>
    )
}

export default InquiryTrackingChart