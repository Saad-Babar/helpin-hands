'use client'
import React from 'react'
import useCardTitleActions from '../../../hooks/useCardTitleActions';
import CardHeader from '../shared/CardHeader';
import CardLoader from '../shared/CardLoader';
import { performanceCandlestickChartOptions } from '../../../utils/chartsLogic/performanceCandlestickChartOptions';
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PerformanceCandlestickChart = () => {
    const chartOptions = performanceCandlestickChartOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();
    if (isRemoved) {
        return null;
    }

    return (
        <>
            <div className="col-xxl-12">
                <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                    <CardHeader title={"Earning & Expense"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                    <div className="card-body custom-card-action">
                        <ReactApexChart
                            type='candlestick'
                            options={chartOptions}
                            series={chartOptions.series}
                            height={500}
                        />
                    </div>

                    <CardLoader refreshKey={refreshKey} />
                </div>

            </div>
        </>
    )
}

export default PerformanceCandlestickChart