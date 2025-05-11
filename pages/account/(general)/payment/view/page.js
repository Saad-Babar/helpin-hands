import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PaymentHeader from '../../../../../components/account-comp/payment/PaymentHeader'
import InvoiceView from '../../../../../components/account-comp/payment/InvoiceView'

const page = () => {
  return (
    <>
      <PageHeader>
        <PaymentHeader />
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          {/* <PaymentTable /> */}
          <InvoiceView />
        </div>
      </div>
    </>
  )
}

export default page