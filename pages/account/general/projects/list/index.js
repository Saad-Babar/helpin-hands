import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProjectsListHeader from '../../../../../components/account-comp/projectsList/ProjectsListHeader'
import ProjectTable from '../../../../../components/account-comp/projectsList/ProjectTable'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import DuplicateLayout from '../../../duplicateLayout'
import Footer from '../../../../../components/account-comp/shared/Footer'
const page = () => {
    return (
          <AdminStyleWrapper>
                      <DuplicateLayout>
                          <div className="admin-content-wrapper">
            <PageHeader>
                {/* <ProjectsListHeader /> */}
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectTable />
                </div>
            </div>
            <Footer />
        </div>
        </DuplicateLayout>
        </AdminStyleWrapper>
    )
}

export default page