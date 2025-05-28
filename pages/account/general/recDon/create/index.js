import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsCreateHeader from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateHeader'
import LeadsCreateContent from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateContent'
import NearbyDonations from '../../../../../components/account-comp/leadsViewCreate/NearbyDonations'
import DuplicateLayout from '../../../duplicateLayout'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import Footer from '../../../../../components/account-comp/shared/Footer'
const page = () => {
  return (
    <AdminStyleWrapper>
      <DuplicateLayout>
        <div className="admin-content-wrapper">
          <PageHeader>
            {/* <LeadsCreateHeader /> */}
          </PageHeader>

          <div className='main-content'>
            <div className='row'>
              <NearbyDonations></NearbyDonations>
            </div>
          </div>
          <Footer />
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default page