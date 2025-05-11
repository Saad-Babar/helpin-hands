import React from 'react'
import dynamic from 'next/dynamic'
import ProposalEditContent from '../../../../../components/account-comp/proposalEditCreate/ProposalEditContent'
import ProposalEditHeader from '../../../../../components/account-comp/proposalEditCreate/ProposalEditHeader'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
const ProposalSent = dynamic(() => import('../../../../../components/account-comp/proposalEditCreate/ProposalSent'), { ssr: false })
const page = () => {
    return (
        <>
            <PageHeader>
                <ProposalEditHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProposalEditContent />
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default page