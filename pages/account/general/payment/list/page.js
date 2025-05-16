import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PaymentTable from '../../../../../components/account-comp/payment/PaymentTable'
import PaymentHeader from '../../../../../components/account-comp/payment/PaymentHeader'
import Footer from '../../../../../components/account-comp/shared/Footer'

const page = () => {
    return (
        <>
            <PageHeader>
                <PaymentHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <PaymentTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page