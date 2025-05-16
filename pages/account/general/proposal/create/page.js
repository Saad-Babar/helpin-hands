import React from 'react'
import dynamic from 'next/dynamic'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProposalEditHeader from '../../../../../components/account-comp/proposalEditCreate/ProposalEditHeader'
import ProposalCreateContent from '../../../../../components/account-comp/proposalEditCreate/ProposalCreateContent'
const ProposalSent = dynamic(() => import('../../../../../components/account-comp/proposalEditCreate/ProposalSent'), { ssr: false })
const page = () => {
    return (
        <>
            <PageHeader>
                <ProposalEditHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProposalCreateContent />
                </div>
            </div>
            <ProposalSent />
        </>
    )
}

export default page