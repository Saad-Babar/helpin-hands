import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import ProjectViewHeader from '../../../../../components/account-comp/projectsView/ProjectViewHeader'
import ProjectViewTabItems from '../../../../../components/account-comp/projectsView/ProjectViewTabItems'
import TabProjectOverview from '../../../../../components/account-comp/projectsView/TabProjectOverview'
import LeadsEmptyCard from '../../../../../components/account-comp/leadsViewCreate/LeadsEmptyCard'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import DuplicateLayout from '../../../duplicateLayout'
const page = () => {
  return (
    <AdminStyleWrapper>
                <DuplicateLayout>
                    <div className="admin-content-wrapper">
      <PageHeader>
        <ProjectViewHeader />
      </PageHeader>
      <ProjectViewTabItems />
      <div className='main-content'>
        <div className='tab-content'>
          <TabProjectOverview />
          <div className="tab-pane fade" id="activityTab"><LeadsEmptyCard title="No activity yet!" description="There is no activity on this project" /></div>
          <div className="tab-pane fade" id="timesheetsTab"><LeadsEmptyCard title="No timesheets yet!" description="There is no timesheets on this project" /></div>
          <div className="tab-pane fade" id="milestonesTab"><LeadsEmptyCard title="No milestones yet!" description="There is no milestones on this project" /></div>
          <div className="tab-pane fade" id="discussionsTab"><LeadsEmptyCard title="No discussions yet!" description="There is no discussions on this project" /></div>
        </div>
      </div>
    </div>
    </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default page