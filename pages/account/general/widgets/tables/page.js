import React from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import PageHeaderWidgets from '../../../../../components/account-comp/shared/pageHeader/PageHeaderWidgets'
import LatestLeads from '../../../../../components/account-comp/widgetsTables/LatestLeads'
import TopSelling from '../../../../../components/account-comp/widgetsTables/TopSelling'
import Remainders from '../../../../../components/account-comp/widgetsTables/Remainders'
import Tickets from '../../../../../components/account-comp/widgetsList/Tickets'
import Countries from '../../../../../components/account-comp/widgetsTables/Countries'
import LeadsStatus from '../../../../../components/account-comp/widgetsTables/LeadsStatus'
import ContactLeads from '../../../../../components/account-comp/widgetsTables/ContactLeads'
import Support from '../../../../../components/account-comp/widgetsTables/Support'
import ProjectsTwo from '../../../../../components/account-comp/widgetsTables/ProjectsTwo'
import Campaign from '../../../../../components/account-comp/widgetsTables/Campaign'
import VisitedPages from '../../../../../components/account-comp/widgetsTables/VisitedPages'
import ProgressTwo from '../../../../../components/account-comp/widgetsTables/ProgressTwo'
import ProjectTracker from '../../../../../components/account-comp/widgetsTables/ProjectTracker'
import Tasks from '../../../../../components/account-comp/widgetsTables/Tasks'
import InvoiceSummary from '../../../../../components/account-comp/widgetsTables/InvoiceSummary'
import TrafficReports from '../../../../../components/account-comp/widgetsTables/TrafficReports'
import Store from '../../../../../components/account-comp/widgetsTables/Store'
import Customers from '../../../../../components/account-comp/widgetsTables/Customers'
import Orders from '../../../../../components/account-comp/widgetsTables/Orders'
import Footer from '../../../../../components/account-comp/shared/Footer'

const page = () => {
  return (
    <>
      <PageHeader >
        <PageHeaderWidgets />
      </PageHeader>
      <div className='main-content'>
        <div className='row'>
          <LatestLeads title={"Leads"} />
          <TopSelling title={"Top Selling"} />
          <Remainders title={"Remainders"} />
          <Tickets title={"Tickets"} paginationShow={true} />
          <LeadsStatus title={"Leads Status"} />
          <Countries title={"Countries"} />
          <ContactLeads title={"Contact Leads"} />
          <Support title={"Support Inbox"} />
          <Campaign title={"Campaign"} />
          <VisitedPages title={"Visited Pages"} />
          <ProjectsTwo title={"Projects Stats"} className="col-xxl-6" />
          <ProgressTwo title={"Project Progress"} />
          <ProjectTracker />
          <Tasks title={"Latest Tasks"} />
          <InvoiceSummary title={"Invoice Summary"} />
          <TrafficReports title={"Traffic Reports"} />
          <Store title={"Store Overview"} />
          <Customers title={"New Customers"} />
          <Orders title={"Recent Orders"} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page