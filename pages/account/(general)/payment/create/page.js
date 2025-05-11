import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import InvoiceCreate from '../../../../../components/account-comp/payment/InvoiceCreate'

const page = () => {
  return (
    <>
      <PageHeader>
        {/* <PaymentHeader /> */}
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          {/* <PaymentTable /> */}
          <InvoiceCreate />
        </div>
      </div>
    </>
  )
}

export default page