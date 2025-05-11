import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import CustomersCreateHeader from '../../../../../components/account-comp/customersCreate/CustomersCreateHeader'
import CustomerCreateContent from '../../../../../components/account-comp/customersCreate/CustomerCreateContent'

const page = () => {
  return (
    <>
      <PageHeader>
        <CustomersCreateHeader />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <CustomerCreateContent />
        </div>
      </div>
    </>
  )
}

export default page