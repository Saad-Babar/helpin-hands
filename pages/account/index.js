import React from 'react';
import dynamic from 'next/dynamic';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

// Dynamically import components with no SSR to prevent style conflicts
const AdminStyleWrapper = dynamic(() => import('../../components/AdminStyleWrapper'), { ssr: false });
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
import Footer from '../../components/account-comp/shared/Footer';

const Home = () => {
  return (
    <AdminStyleWrapper>
      <DuplicateLayout>
        <div className="admin-content-wrapper">
          <PageHeader>
            {/* <PageHeaderDate /> */}
          </PageHeader>

          <div className="main-content">
            <div className="row">
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
          <Footer />
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  );
};

export default Home;

// Server-side redirection based on user role
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;

  if (cookies) {
    const { token } = parse(cookies);

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'NGO / Receiver') {
          return {
            redirect: {
              destination: '/account/index2',
              permanent: false,
            },
          };
        }

        if (decoded.role === 'Rider') {
          return {
            redirect: {
              destination: '/account/index3',
              permanent: false,
            },
          };
        }

      } catch (err) {
        console.error('JWT verification failed:', err.message);
      }
    }
  }

  return {
    props: {}, // Continue rendering default dashboard for other roles or unauthenticated users
  };
}
