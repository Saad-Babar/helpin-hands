import React from 'react'
import ChatContent from '../../../../components/account-comp/chats/ChatContent'
import AdminStyleWrapper from '../../../../components/AdminStyleWrapper'
import DuplicateLayout from '../../duplicateLayout'
const AppsChat = () => {
  return (
    <AdminStyleWrapper>
      <DuplicateLayout>
        <div className="admin-content-wrapper">
          <ChatContent />
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default AppsChat