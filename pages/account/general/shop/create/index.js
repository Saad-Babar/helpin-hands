import React, { useState } from 'react'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import LeadsCreateHeader from '../../../../../components/account-comp/leadsViewCreate/LeadsCreateHeader'
import SellProductContent from '../../../../../components/account-comp/leadsViewCreate/SellProductContent'
import DuplicateLayout from '../../../duplicateLayout'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import Footer from '../../../../../components/account-comp/shared/Footer'

const Page = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    condition: '',
    location: {
      country: '',
      state: '',
      city: '',
      pickupAddress: '',
      phoneNumber: '',
    },
    agreement: false,
  })

  const [error, setError] = useState(false)

  const validateForm = () => {
    if (
      !formData.productName.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.condition ||
      !formData.location.country ||
      !formData.location.state ||
      !formData.location.city ||
      !formData.location.pickupAddress.trim() ||
      !formData.location.phoneNumber.trim() ||
      !formData.agreement
    ) {
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setError(false)
      alert('Form submitted! You can add your API call here.')
      console.log('Form data:', formData)
    } else {
      setError(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AdminStyleWrapper>
      <DuplicateLayout>
        <div className="admin-content-wrapper">
          <PageHeader>{/* <LeadsCreateHeader /> */}</PageHeader>

          <div className="main-content">
            <div className="row">
              <SellProductContent
                formData={formData}
                setFormData={setFormData}
                error={error}
                setError={setError}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
          <Footer />
        </div>
      </DuplicateLayout>
    </AdminStyleWrapper>
  )
}

export default Page
