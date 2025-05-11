import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import SiteOverviewStatistics from '../../../../../components/account-comp/widgetsStatistics/SiteOverviewStatistics'
import EstimateStatistics from '../../../../../components/account-comp/widgetsStatistics/EstimateStatistics'
import EstimateStatisticsTwo from '../../../../../components/account-comp/widgetsStatistics/EstimateStatisticsTwo'
import UserOverviewStatistics from '../../../../../components/account-comp/widgetsStatistics/UserOverviewStatistics'
import LeadsStatistics from '../../../../../components/account-comp/widgetsStatistics/LeadsStatistics'
import TimeStatistics from '../../../../../components/account-comp/widgetsStatistics/TimeStatistics'
import EstimateStatisticsThree from '../../../../../components/account-comp/widgetsStatistics/EstimateStatisticsThree'
import PaymentStatistics from '../../../../../components/account-comp/widgetsStatistics/PaymentStatistics'
import CustomersStatistics from '../../../../../components/account-comp/widgetsStatistics/CustomersStatistics'
import ProjectsStatistics from '../../../../../components/account-comp/widgetsStatistics/ProjectsStatistics'
import LeadsStatisticsTwo from '../../../../../components/account-comp/widgetsStatistics/LeadsStatisticsTwo'
import TimeStatisticsTwo from '../../../../../components/account-comp/widgetsStatistics/TimeStatisticsTwo'
import OrdersStatistics from '../../../../../components/account-comp/widgetsStatistics/OrdersStatistics'
import UserOverviewStatisticsTwo from '../../../../../components/account-comp/widgetsStatistics/UserOverviewStatisticsTwo'
import ProjectsStatisticsTwo from '../../../../../components/account-comp/widgetsStatistics/ProjectsStatisticsTwo'
import UserOverviewStatisticsThree from '../../../../../components/account-comp/widgetsStatistics/UserOverviewStatisticsThree'
import SocilMediaStatistics from '../../../../../components/account-comp/widgetsStatistics/SocilMediaStatistics'
import Footer from '../../../../../components/account-comp/shared/Footer'

const page = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SiteOverviewStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <EstimateStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <EstimateStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <UserOverviewStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <LeadsStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <TimeStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <EstimateStatisticsThree />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <PaymentStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <CustomersStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <ProjectsStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <LeadsStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <TimeStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <OrdersStatistics />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <UserOverviewStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <ProjectsStatisticsTwo />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <UserOverviewStatisticsThree />
                    <hr className="border-top-dashed mt-4 mb-5 mx-3" />
                    <SocilMediaStatistics />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page