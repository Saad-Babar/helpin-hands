import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProjectsListHeader from '../../../../../components/account-comp/projectsList/ProjectsListHeader'
import ProjectTable from '../../../../../components/account-comp/projectsList/ProjectTable'

const page = () => {
    return (
        <>
            <PageHeader>
                <ProjectsListHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ProjectTable />
                </div>
            </div>
        </>
    )
}

export default page