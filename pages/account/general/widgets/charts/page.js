import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import SiteOverviewChart from '../../../../../components/account-comp/widgetsCharts/SiteOverviewChart'
import EstimateBarChat from '../../../../../components/account-comp/widgetsCharts/EstimateBarChart'
import EstimateAreaChart from '../../../../../components/account-comp/widgetsCharts/EstimateAreaChart'
import EstimateAreaChartTwo from '../../../../../components/account-comp/widgetsCharts/EstimateAreaChartTwo'
import TasksOverviewChart from '../../../../../components/account-comp/widgetsCharts/TasksOverviewChart'
import InquiryChannelChart from '../../../../../components/account-comp/widgetsCharts/InquiryChannelChart'
import InquiryTrackingChart from '../../../../../components/account-comp/widgetsCharts/InquiryTrackingChart'
import TimeLoggedChart from '../../../../../components/account-comp/widgetsCharts/TimeLoggedChart'
import BillableTimeChart from '../../../../../components/account-comp/widgetsCharts/BillableTimeCart'
import LeadsOverviewChart from '../../../../../components/account-comp/widgetsCharts/LeadsOverviewChart'
import VisitorsOverviewChart from '../../../../../components/account-comp/widgetsCharts/VisitorsOverviewChart'
import TopCountryChart from '../../../../../components/account-comp/widgetsCharts/TopCountryChart'
import WebAnalyticsChart from '../../../../../components/account-comp/widgetsCharts/WebAnalyticsChart'
import BilledAreaChart from '../../../../../components/account-comp/widgetsCharts/BilledAreaChart'
import SalesPipelineChart from '../../../../../components/account-comp/widgetsCharts/SalesPipelineChart'
import DeviceUseChart from '../../../../../components/account-comp/widgetsCharts/DeviceUseChart'
import ProjectReportChart from '../../../../../components/account-comp/widgetsCharts/ProjectReportChart'
import TimeSpentChart from '../../../../../components/account-comp/widgetsCharts/TimeSpentChart'
import VisitorsChart from '../../../../../components/account-comp/widgetsCharts/VisitorsChart'
import TopCountryBarChart from '../../../../../components/account-comp/widgetsCharts/TopCountriyBarChart'
import EstimateBarChartTwo from '../../../../../components/account-comp/widgetsCharts/EstimateBarChartTwo'
import PerformanceCandlestickChart from '../../../../../components/account-comp/widgetsCharts/PerformanceCandlestickChart'
import Footer from '../../../../../components/account-comp/shared/Footer'
import PaymentRecordChartTwo from '../../../../../components/account-comp/widgetsCharts/PaymentRecordChartTwo'

const page = () => {
  return (
    <>
      <PageHeader >
        <PageHeaderWidgets />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <SiteOverviewChart />
          <EstimateBarChat />
          <EstimateAreaChart />
          <EstimateAreaChartTwo />
          <TasksOverviewChart />
          <InquiryTrackingChart />
          <InquiryChannelChart />
          <TimeLoggedChart />
          <BillableTimeChart />
          <PaymentRecordChartTwo />
          <LeadsOverviewChart chartHeight={290} isFooterShow={true} />
          <VisitorsOverviewChart />
          <TopCountryChart />
          <WebAnalyticsChart />
          <BilledAreaChart />
          <SalesPipelineChart />
          <DeviceUseChart />
          <ProjectReportChart />
          <TimeSpentChart />
          <VisitorsChart />
          <TopCountryBarChart />
          <EstimateBarChartTwo />
          <PerformanceCandlestickChart />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page