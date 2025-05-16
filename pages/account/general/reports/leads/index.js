import Footer from '../../../../../components/account-comp/shared/Footer'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import InquiryChannelChart from '../../../../../components/account-comp/widgetsCharts/InquiryChannelChart'
import InquiryTrackingChart from '../../../../../components/account-comp/widgetsCharts/InquiryTrackingChart'
import ProjectLeads from '../../../../../components/account-comp/widgetsList/ProjectLeads'
import ScheduleTwo from '../../../../../components/account-comp/widgetsList/ScheduleTwo'
import LeadsStatistics from '../../../../../components/account-comp/widgetsStatistics/LeadsStatistics'
import LeadsStatusTwo from '../../../../../components/account-comp/widgetsTables/LeadsStatusTwo'
import { upcomingEventsData } from '../../../../../utils/fackData/upcomingEventsData'
import React from 'react'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import DuplicateLayout from '../../../duplicateLayout'

const page = () => {
    return (
        <AdminStyleWrapper>
            <DuplicateLayout>
                <div className="admin-content-wrapper">
                    <PageHeader >
                        <PageHeaderWidgets />
                    </PageHeader>
                    <div className='main-content'>
                        <div className='row'>
                            <LeadsStatistics />
                            <InquiryTrackingChart />
                            <InquiryChannelChart />
                            <LeadsStatusTwo />
                            <ScheduleTwo title={"Upcoming Events"} data={upcomingEventsData.slice(0, 3)} />
                            <ProjectLeads />
                        </div>
                    </div>
                    <Footer />
                </div>
            </DuplicateLayout>
        </AdminStyleWrapper>

    )
}

export default page