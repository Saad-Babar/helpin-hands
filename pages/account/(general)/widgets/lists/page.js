import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import Schedule from '../../../../../components/account-comp/widgetsList/Schedule'
import Project from '../../../../../components/account-comp/widgetsList/Project'
import Progress from '../../../../../components/account-comp/widgetsList/Progress'
import Meeting from '../../../../../components/account-comp/widgetsList/Meeting'
import Todos from '../../../../../components/account-comp/widgetsList/Todos'
import Trending from '../../../../../components/account-comp/widgetsList/Trending'
import Accounts from '../../../../../components/account-comp/widgetsList/Accounts'
import Notifications from '../../../../../components/account-comp/widgetsList/Notifications'
import Feedback from '../../../../../components/account-comp/widgetsList/Feedback'
import Activity from '../../../../../components/account-comp/widgetsList/Activity'
import ActivityTwo from '../../../../../components/account-comp/widgetsList/ActivityTwo'
import Profile from '../../../../../components/account-comp/widgetsList/Profile'
import Socal from '../../../../../components/account-comp/widgetsList/Social'
import Suggestions from '../../../../../components/account-comp/widgetsList/Suggestions'
import Browser from '../../../../../components/account-comp/widgetsList/Browser'
import Tickets from '../../../../../components/account-comp/widgetsList/Tickets'
import Upgrade from '../../../../../components/account-comp/widgetsList/Upgrade'
import ScheduleTwo from '../../../../../components/account-comp/widgetsList/ScheduleTwo'
import InvoiceOverview from '../../../../../components/account-comp/widgetsList/InvoiceOverview'
import ProjectLeads from '../../../../../components/account-comp/widgetsList/ProjectLeads'
import { upcomingEventsData } from '../../../../../utils/fackData/upcomingEventsData'
import Footer from '../../../../../components/account-comp/shared/Footer'
import UsersList from '../../../../../components/account-comp/widgetsList/UsersList'

const page = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <Schedule title={"Schedule"} />
                    <Project title={"Project"} borderShow={true} cardYSpaceClass={"hrozintioal-card"} />
                    <Progress title={"Progress"} footerShow={true} />
                    <Meeting title={"Meeting"} />
                    <UsersList title={"Users"} />
                    <Todos title={"Todos"} />
                    <Trending title={"Trending"} />
                    <Accounts title={"Accounts"} />
                    <Notifications title={"Notifications"} />
                    <Feedback title={"Feedback"} />
                    <Activity title={"Activity"} />
                    <ActivityTwo title={"Activity"} />
                    <div className="col-xxl-4 col-lg-6">
                        <Profile />
                    </div>
                    <Socal title={"Socal"} />
                    <Suggestions title={"Suggestions"} />
                    <Browser title={"Browser"} />
                    <Tickets title={"Tickets"} />
                    <Upgrade />
                    <ScheduleTwo title={"Upcoming Activities"} data={upcomingEventsData} />
                    <InvoiceOverview title={"Invoice Overview"} />
                    <ProjectLeads />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page