import Footer from '../../../../../components/account-comp/shared/Footer'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import EstimateAreaChartThree from '../../../../../components/account-comp/widgetsCharts/EstimateAreaChartThree'
import SalesPipelineChart from '../../../../../components/account-comp/widgetsCharts/SalesPipelineChart'
import ProjectAssingeMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ProjectAssingeMiscellaneous'
import ForecastRevenueMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ForecastRevenueMiscellaneous'
import EstimateStatisticsTwo from '../../../../../components/account-comp/widgetsStatistics/EstimateStatisticsTwo'
import LeadsStatus from '../../../../../components/account-comp/widgetsTables/LeadsStatus'
import React from 'react'

const page = () => {
  return (
    <>
      <PageHeader >
        <PageHeaderWidgets />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <EstimateStatisticsTwo />
          <SalesPipelineChart isFooterShow={true} />
          <ForecastRevenueMiscellaneous />
          <ProjectAssingeMiscellaneous />
          <EstimateAreaChartThree />
          <LeadsStatus title={"Contact Leads"} progressFullHeight={true} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page