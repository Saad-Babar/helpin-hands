import React from 'react'
import EventCalendarSmall from '../../../../../components/account-comp/EventCalendarSmall'
import Footer from '../../../../../components/account-comp/shared/Footer'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import ProjectReportChart from '../../../../../components/account-comp/widgetsCharts/ProjectReportChart'
import TimeSpentChart from '../../../../../components/account-comp/widgetsCharts/TimeSpentChart'
import Progress from '../../../../../components/account-comp/widgetsList/Progress'
import Schedule from '../../../../../components/account-comp/widgetsList/Schedule'
import ProjectDateLineMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ProjectDateLineMiscellaneous'
import ProjectsTwo from '../../../../../components/account-comp/widgetsTables/ProjectsTwo'
import ActiveProject from '../../../../../components/account-comp/widgetsList/Project'

const page = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectDateLineMiscellaneous />
                    <ProjectReportChart />
                    <div className="col-xxl-4">
                        <div className="card stretch stretch-full">
                            <EventCalendarSmall />
                        </div>
                    </div>
                    <TimeSpentChart />
                    <Progress title={"Team Progress"} footerShow={false} />
                    <ActiveProject cardYSpaceClass="mb-4 pb-1" title="Active Project" />
                    <ProjectsTwo title={"Projects Stats"} className={"col-xxl-8"} />
                    <Schedule />
                </div>
            </div >
            <Footer />
        </>
    )
}

export default page