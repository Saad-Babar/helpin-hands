import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import CustomersViewHeader from '../../../../../components/account-comp/customersView/CustomersViewHeader'
import CustomerContent from '../../../../../components/account-comp/customersView/CustomerContent'

const page = () => {
  return (
    <>
      <PageHeader>
        <CustomersViewHeader />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <CustomerContent />
        </div>
      </div>
    </>
  )
}

export default page