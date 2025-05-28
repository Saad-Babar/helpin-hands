import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR to prevent style conflicts
const AdminStyleWrapper = dynamic(
  () => import('../../components/AdminStyleWrapper'),
  { ssr: false }
);

const PageHeader = dynamic(() => import('../../components/account-comp/shared/pageHeader/PageHeader'), { ssr: false });
const PageHeaderDate = dynamic(() => import('../../components/account-comp/shared/pageHeader/PageHeaderDate'), { ssr: false });
const SiteOverviewStatistics = dynamic(() => import('../../components/account-comp/widgetsStatistics/SiteOverviewStatistics'), { ssr: false });
const PaymentRecordChart = dynamic(() => import('../../components/account-comp/widgetsCharts/PaymentRecordChart'), { ssr: false });
const LeadsOverviewChart = dynamic(() => import('../../components/account-comp/widgetsCharts/LeadsOverviewChart'), { ssr: false });
const TasksOverviewChart = dynamic(() => import('../../components/account-comp/widgetsCharts/TasksOverviewChart'), { ssr: false });
const Project = dynamic(() => import('../../components/account-comp/widgetsList/Project'), { ssr: false });
const Schedule = dynamic(() => import('../../components/account-comp/widgetsList/Schedule'), { ssr: false });
const SalesMiscellaneous = dynamic(() => import('../../components/account-comp/widgetsMiscellaneous/SalesMiscellaneous'), { ssr: false });
const LatestLeads = dynamic(() => import('../../components/account-comp/widgetsTables/LatestLeads'), { ssr: false });
const TeamProgress = dynamic(() => import('../../components/account-comp/widgetsList/Progress'), { ssr: false });
const DuplicateLayout = dynamic(() => import('./duplicateLayout'), { ssr: false });

import { projectsDataTwo } from '../../utils/fackData/projectsDataTwo';

const Home = () => {
  return (
    <AdminStyleWrapper>
      <DuplicateLayout>
        <div className="admin-content-wrapper">
          <PageHeader>
            {/* <PageHeaderDate /> */}
          </PageHeader>
          
          <div className='main-content'>
            <div className='row'>
                <h2>Index3</h2>
              <SiteOverviewStatistics />
              <PaymentRecordChart />
              {/* <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} /> */}
              {/* <TasksOverviewChart /> */}
              {/* <LeadsOverviewChart chartHeight={315} /> */}
              {/* <LatestLeads title={"Latest Leads"} /> */}
              {/* <Schedule title={"Upcoming Schedule"} /> */}
              {/* <Project 
                cardYSpaceClass="hrozintioal-card" 
                borderShow={true} 
                title="Project Status" 
              />
              <TeamProgress title={"Team Progress"} footerShow={true} /> */}
            </div>
          </div>
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default Home;