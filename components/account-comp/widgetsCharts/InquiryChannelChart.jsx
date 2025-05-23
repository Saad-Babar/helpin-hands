'use client'
import React from 'react'
import CardHeader from '../shared/CardHeader'
import { inquiryChannelChartOption } from '../../../utils/chartsLogic/inquiryChannelChartOption'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const InquiryChannelChart = () => {
    const chartOption = inquiryChannelChartOption()
    return (
        <div className="col-xxl-6">
            <div className="card stretch stretch-full">
                <CardHeader title={"Inquiry Channel"} />

                <div className="card-body custom-card-action">
                    <div className="leads-inquiry-channel">
                        <ReactApexChart
                            type='bar'
                            options={chartOption}
                            series={chartOption?.series}
                            height={350}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InquiryChannelChart