import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsCreateHeader from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateHeader'
import LeadsCreateContent from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateContent'
import PickupDonations from '../../../../../components/account-comp/leadsViewCreate/PickupDonations'
import DuplicateLayout from '../../../duplicateLayout'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
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
              <PickupDonations></PickupDonations>
            </div>
          </div>
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default page