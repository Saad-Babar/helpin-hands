import Footer from '../../../../../components/account-comp/shared/Footer'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import BillableTimeChart from '../../../../../components/account-comp/widgetsCharts/BillableTimeCart'
import TimeLoggedChart from '../../../../../components/account-comp/widgetsCharts/TimeLoggedChart'
import ProjectTimeMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ProjectTimeMiscellaneous'
import TimeStatistics from '../../../../../components/account-comp/widgetsStatistics/TimeStatistics'
import ProjectTracker from '../../../../../components/account-comp/widgetsTables/ProjectTracker'
import React from 'react'
import DuplicateLayout from '../../../duplicateLayout'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'

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
                            <TimeStatistics />
                            <TimeLoggedChart />
                            <BillableTimeChart />
                            <ProjectTimeMiscellaneous />
                            <ProjectTracker />
                        </div>
                    </div>
                    <Footer />
                </div>
            </DuplicateLayout>
        </AdminStyleWrapper>
    )
}

export default page