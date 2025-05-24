import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsHeader from '../../../../../components/account-comp/leads/LeadsHeader'
import LeadssTable from '../../../../../components/account-comp/leads/LeadsTable'
import Footer from '../../../../../components/account-comp/shared/Footer'

const page = () => {
    return (
        <>
            <PageHeader>
                <LeadsHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <LeadssTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page