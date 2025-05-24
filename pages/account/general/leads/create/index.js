import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsCreateHeader from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateHeader'
import LeadsCreateContent from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateContent'

const page = () => {
  return (
    <>
      <PageHeader>
        <LeadsCreateHeader />
      </PageHeader>

      <div className='main-content'>
        <div className='row'>
          <LeadsCreateContent />
        </div>
      </div>
    </>
  )
}

export default page