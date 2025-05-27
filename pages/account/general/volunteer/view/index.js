import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsViewHeader from '../../../../../components/account-comp/leadsViewCreate/LeadsViewHeader'
import LeadsViewContent from '../../../../../components/account-comp/leadsViewCreate/LeadsViewContent'
import LeadsViewTab from '../../../../../components/account-comp/leadsViewCreate/LeadsViewTab'

const page = () => {
  return (
    <>
      <PageHeader>
        <LeadsViewHeader />
      </PageHeader>
      <LeadsViewTab />
      <div className='main-content'>
        <div className='tab-content'>
          {/* <LeadssTable /> */}
          <LeadsViewContent />
        </div>
      </div>
    </>
  )
}

export default page