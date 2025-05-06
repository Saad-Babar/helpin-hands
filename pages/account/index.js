import React from 'react'
import PageHeader from '../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderDate from '../../components/account-comp/shared/pageHeader/PageHeaderDate'
import SiteOverviewStatistics from '../../components/account-comp/widgetsStatistics/SiteOverviewStatistics'
import PaymentRecordChart from '../../components/account-comp/widgetsCharts/PaymentRecordChart'
import LeadsOverviewChart from '../../components/account-comp/widgetsCharts/LeadsOverviewChart'
import TasksOverviewChart from '../../components/account-comp/widgetsCharts/TasksOverviewChart'
import Project from '../../components/account-comp/widgetsList/Project'
import Schedule from '../../components/account-comp/widgetsList/Schedule'
import SalesMiscellaneous from '../../components/account-comp/widgetsMiscellaneous/SalesMiscellaneous'
import LatestLeads from '../../components/account-comp/widgetsTables/LatestLeads'
import TeamProgress from '../../components/account-comp/widgetsList/Progress'
import { projectsDataTwo } from '../../utils/fackData/projectsDataTwo'
import DuplicateLayout from './duplicateLayout'

const Home = () => {
  return (
    <DuplicateLayout>
      <PageHeader >
        <PageHeaderDate />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <SiteOverviewStatistics />
          <PaymentRecordChart />
          <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} />
          <TasksOverviewChart />
          <LeadsOverviewChart chartHeight={315} />
          <LatestLeads title={"Latest Leads"} />
          <Schedule title={"Upcoming Schedule"} />
          <Project cardYSpaceClass="hrozintioal-card" borderShow={true} title="Project Status" />
          <TeamProgress title={"Team Progress"} footerShow={true} />
        </div>
      </div>
    </DuplicateLayout>
  )
}

export default Home