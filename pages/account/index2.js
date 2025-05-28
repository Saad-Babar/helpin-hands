import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR to prevent style conflicts
const AdminStyleWrapper = dynamic(
  () => import('../../components/AdminStyleWrapper'),
  { ssr: false }
);

const PageHeader = dynamic(() => import('../../components/account-comp/shared/pageHeader/PageHeader'), { ssr: false });
const PageHeaderDate = dynamic(() => import('../../components/account-comp/shared/pageHeader/PageHeaderDate'), { ssr: false });
const recieverStatistics = dynamic(() => import('../../components/account-comp/widgetsStatistics/recieverStatistics'), { ssr: false });
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
import RecieverStatistics from '../../components/account-comp/widgetsStatistics/recieverStatistics';
import CollectedRecordChart from '../../components/account-comp/widgetsCharts/CollectedRecordChart';

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
            <h2>NGO / Reciever Dashboard</h2>
              <RecieverStatistics></RecieverStatistics>
              {/* <CollectedRecordChart></CollectedRecordChart> */}
              {/* <PaymentRecordChart /> */}
            </div>
          </div>
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default Home;