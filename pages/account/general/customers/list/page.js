import CustomersHeader from '../../../../../components/account-comp/customers/CustomersHeader'
import CustomersTable from '../../../../../components/account-comp/customers/CustomersTable'
import Footer from '../../../../../components/account-comp/shared/Footer'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import React from 'react'

const page = () => {
    return (
        <>
            <PageHeader>
                <CustomersHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CustomersTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page