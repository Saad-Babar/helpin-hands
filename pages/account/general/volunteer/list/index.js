import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsHeader from '../../../../../components/account-comp/leads/LeadsHeader'
import PickedupDonations from '../../../../../components/account-comp/leads/PickedupDonations'
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
                    <PickedupDonations />
                </div>
            </div>
            <Footer />
        </div>
        </DuplicateLayout>
        </AdminStyleWrapper>
    )
}

export default page