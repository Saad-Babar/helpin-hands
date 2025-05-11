import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProjectCreateContent from '../../../../../components/account-comp/projectsCreate/ProjectCreateContent'
import ProjectCreateHeader from '../../../../../components/account-comp/projectsCreate/ProjectCreateHeader'

const page = () => {
  return (
    <>
      <PageHeader>
        <ProjectCreateHeader />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <ProjectCreateContent />
        </div>
      </div>

    </>
  )
}

export default page