import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderDate from '../../../../../components/account-comp/shared/pageHeader/PageHeaderDate'
import EmailOverview from '../../../../../components/account-comp/EmailOverview'
import Browser from '../../../../../components/account-comp/widgetsList/Browser'
import Remainders from '../../../../../components/account-comp/widgetsTables/Remainders'
import GoalMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/GoalMiscellaneous'
import SiteOverviewChart from '../../../../../components/account-comp/widgetsCharts/SiteOverviewChart'
import VisitorsOverviewChart from '../../../../../components/account-comp/widgetsCharts/VisitorsOverviewChart'
import SocialMediaStatisticsChart from '../../../../../components/account-comp/widgetsCharts/SocialMediaStatisticsChart'
import MarketingChart from '../../../../../components/account-comp/widgetsCharts/MarketingChart'
import Footer from '../../../../../components/account-comp/shared/Footer'


const page = () => {
    return (
        <>
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
        </>
    )
}

export default page