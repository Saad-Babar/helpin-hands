import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsHeader from '../../../../../components/account-comp/leads/LeadsHeader'
import LeadssTable from '../../../../../components/account-comp/leads/LeadsTable'
import Footer from '../../../../../components/account-comp/shared/Footer'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import DuplicateLayout from '../../../duplicateLayout'
const page = () => {
    return (
        <AdminStyleWrapper>
              <DuplicateLayout>
                <div className="admin-content-wrapper">
            <PageHeader>
                {/* <LeadsHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <LeadssTable />
                </div>
            </div>
            <Footer />
        </div>
        </DuplicateLayout>
        </AdminStyleWrapper>
    )
}

export default page