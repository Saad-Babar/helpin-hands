import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProjectCreateContent from '../../../../../components/account-comp/projectsCreate/ProjectCreateContent'
import ProjectCreateHeader from '../../../../../components/account-comp/projectsCreate/ProjectCreateHeader'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import DuplicateLayout from '../../../duplicateLayout'
import Footer from '../../../../../components/account-comp/shared/Footer'


const page = () => {
  return (
    <AdminStyleWrapper>
            <DuplicateLayout>
                <div className="admin-content-wrapper">
      <PageHeader>
        {/* <ProjectCreateHeader /> */}
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <ProjectCreateContent />
        </div>
      </div>
      <Footer />
</div>
  </DuplicateLayout>
  </AdminStyleWrapper>

  )
}

export default page