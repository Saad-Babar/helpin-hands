'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import CardHeader from '../shared/CardHeader'
import { hoursSpentChartOption } from '../../../utils/chartsLogic/hoursSpentChartOption'
import CardLoader from '../shared/CardLoader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const TimeSpentChart = () => {
  const chartOptions = hoursSpentChartOption()
  const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();
  if (isRemoved) {
      return null;
  }

  return (
    <div className="col-xxl-4">
      <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
        <CardHeader title={"Hours Spent"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand}/>

        <div className="card-body custom-card-action p-0">
          <ReactApexChart
            type='bar'
            options={chartOptions}
            series={chartOptions.series}
            height={325}
          />
        </div>
        <div className="card-footer hstack justify-content-around">
          <div className="text-center">
            <a href="#" className="fs-16 fw-bold">66H:35M</a>
            <div className="fs-11 text-muted">Billable Hours</div>
          </div>
          <span className="vr"></span>
          <div className="text-center">
            <a href="#" className="fs-16 fw-bold">06H:25M</a>
            <div className="fs-11 text-muted">Unbillable Hours</div>
          </div>
        </div>
        <CardLoader refreshKey={refreshKey} />
      </div>
    </div>
  )
}

export default TimeSpentChart