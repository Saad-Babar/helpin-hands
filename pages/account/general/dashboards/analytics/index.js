import React from 'react'
import dynamic from 'next/dynamic';

const PageHeader = dynamic(() => import('../../../../../components/account-comp/shared/pageHeader/PageHeader'), { ssr: false })
const PageHeaderDate = dynamic(() => import('../../../../../components/account-comp/shared/pageHeader/PageHeaderDate'), { ssr: false })
const EmailOverview = dynamic(() => import('../../../../../components/account-comp/EmailOverview'), { ssr: false })
const Browser = dynamic(() => import('../../../../../components/account-comp/widgetsList/Browser'), { ssr: false })
const Remainders = dynamic(() => import('../../../../../components/account-comp/widgetsTables/Remainders'), { ssr: false })
const GoalMiscellaneous = dynamic(() => import('../../../../../components/account-comp/widgetsMiscellaneous/GoalMiscellaneous'), { ssr: false })
const SiteOverviewChart = dynamic(() => import('../../../../../components/account-comp/widgetsCharts/SiteOverviewChart'), { ssr: false })
const VisitorsOverviewChart = dynamic(() => import('../../../../../components/account-comp/widgetsCharts/VisitorsOverviewChart'), { ssr: false })
const SocialMediaStatisticsChart = dynamic(() => import('../../../../../components/account-comp/widgetsCharts/SocialMediaStatisticsChart'), { ssr: false })
const MarketingChart = dynamic(() => import('../../../../../components/account-comp/widgetsCharts/MarketingChart'), { ssr: false })
const Footer = dynamic(() => import('../../../../../components/account-comp/shared/Footer'), { ssr: false })
const DuplicateLayout = dynamic(() => import('../../../duplicateLayout'), { ssr: false });

const AdminStyleWrapper = dynamic(() => import('../../../../../components/AdminStyleWrapper'),
    { ssr: false }
);

const page = () => {
    return (
        <AdminStyleWrapper>
            <DuplicateLayout>
                <div className="admin-content-wrapper">
                    <PageHeader >
                        <PageHeaderDate />
                    </PageHeader>
                    <div className='main-content'>
                        <div className='row'>
                            <EmailOverview />
                            <VisitorsOverviewChart />
                            <Browser title={"Browser States"} />
                            <SiteOverviewChart />
                            <GoalMiscellaneous />
                            <MarketingChart />
                            <Remainders title={"Project Remainders"} />
                            <SocialMediaStatisticsChart />
                        </div>
                    </div>
                    <Footer />
                </div>
            </DuplicateLayout>
        </AdminStyleWrapper>
    )
}

export default page