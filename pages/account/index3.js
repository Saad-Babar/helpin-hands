import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR to prevent style conflicts
const AdminStyleWrapper = dynamic(
  () => import('../../components/AdminStyleWrapper'),
  { ssr: false }
);

const PageHeader = dynamic(() => import('../../components/account-comp/shared/pageHeader/PageHeader'), { ssr: false });
const PageHeaderDate = dynamic(() => import('../../components/account-comp/shared/pageHeader/PageHeaderDate'), { ssr: false });
const PickedupOverviewStatistics = dynamic(() => import('../../components/account-comp/widgetsStatistics/PickedupOverviewStatistics'), { ssr: false });
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
import Footer from '../../components/account-comp/shared/Footer';

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
                <h2>Rider / Volunteer Dashboard</h2>
              <PickedupOverviewStatistics></PickedupOverviewStatistics>
              {/* <PaymentRecordChart /> */}
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
          <Footer />
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default Home;