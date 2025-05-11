import React from 'react'
import dynamic from 'next/dynamic'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProposalViewHeader from '../../../../../components/account-comp/proposalView/ProposalViewHeader'
import ProposalViewTab from '../../../../../components/account-comp/proposalView/ProposalViewTab'
import TasksTabContent from '../../../../../components/account-comp/proposalView/TasksTabContent'
import NotesTabContent from '../../../../../components/account-comp/proposalView/NotesTabContent'
import CommentTabContent from '../../../../../components/account-comp/proposalView/CommentTabContent'
const ProposalTabContent = dynamic(() => import('../../../../../components/account-comp/proposalView/ProposalTabContent'), { ssr: false })
const ProposalSent = dynamic(() => import('../../../../../components/account-comp/proposalEditCreate/ProposalSent'), { ssr: false })
const page = () => {
  return (
    <div>
      <PageHeader>
        <ProposalViewHeader />
      </PageHeader>
      <ProposalViewTab />
      <div className='main-content'>
        <div className='tab-content'>
          <ProposalTabContent />
          <TasksTabContent />
          <NotesTabContent />
          <CommentTabContent />
        </div>
      </div>
      <ProposalSent />
    </div>
  )
}

export default page