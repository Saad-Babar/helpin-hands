import React from 'react'
import ProposalTable from '../../../../../components/account-comp/proposal/ProposalTable'
import ProposalHeadr from '../../../../../components/account-comp/proposal/ProposalHeadr'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProposalHeaderContent from '../../../../../components/account-comp/proposal/ProposalHeaderContent'
import Footer from '../../../../../components/account-comp/shared/Footer'


const page = () => {
    return (
        <>
            <PageHeader>
                <ProposalHeadr />
            </PageHeader>
            <ProposalHeaderContent />
            <div className='main-content'>
                <div className='row'>
                    <ProposalTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page