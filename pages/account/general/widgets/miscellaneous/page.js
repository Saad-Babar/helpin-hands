import React from 'react'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProjectDateLineMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ProjectDateLineMiscellaneous'
import ProjectAssingeMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ProjectAssingeMiscellaneous'
import ProjectTimeMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ProjectTimeMiscellaneous'
import GoalMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/GoalMiscellaneous'
import Progress from '../../../../../components/account-comp/widgetsList/Progress'
import ForecasRevenuetMiscellaneousTwo from '../../../../../components/account-comp/widgetsMiscellaneous/ForecastRevenueMiscellaneousTwo'
import EstimateMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/EstimateMiscellaneous'
import SellingStatusMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/SellingStatusMiscellaneous'
import ConversionStatusMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/ConversionStatusMiscellaneous'
import TrafficSourceMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/TrafficSourceMiscellaneous'
import SalesMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/SalesMiscellaneous'
import CommentMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/CommentMiscellaneous'
import StatusMiscellaneous from '../../../../../components/account-comp/widgetsMiscellaneous/StatusMiscellaneous'
import Footer from '../../../../../components/account-comp/shared/Footer'
import { productsData } from '../../../../../utils/fackData/productsData'

const page = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderWidgets />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectDateLineMiscellaneous />
                    <ProjectAssingeMiscellaneous />
                    <Progress title={"Tasks Progress"} btnFooter={true} />
                    <GoalMiscellaneous />
                    <ForecasRevenuetMiscellaneousTwo />
                    <ProjectTimeMiscellaneous />
                    <SellingStatusMiscellaneous />
                    <ConversionStatusMiscellaneous />
                    <TrafficSourceMiscellaneous />
                    <SalesMiscellaneous dataList={productsData} />
                    <CommentMiscellaneous />
                    <StatusMiscellaneous />
                    <EstimateMiscellaneous />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page