import React from 'react'
import SelectDropdown from '../shared/SelectDropdown'
import { dileveryOptions } from '../../../utils/options'
import { FiAlertTriangle } from 'react-icons/fi'


const TabProjectSettings = ({ setFormData, formData = {}, error, setError }) => {
  const {
    location: {
      deliveryOptions = '',
      pickupAddress = '',
      phoneNumber = '',
    } = {},
  } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }))
  }

  const handleDeliveryOptionChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        deliveryOptions: option?.value || '',
      },
    }))
  }

  return (
    <section className="step-body mt-4 body current">
      <form id="project-settings">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Pickup Location</h2>
            <p className="text-muted">
              Specify the pickup location and contact details for the food donation.
            </p>
          </div>

          <fieldset>
            {/* Delivery Option */}
            <div className="mb-4">
              <label htmlFor="deliveryOptions" className="form-label">
                Delivery Option <span className="text-danger">*</span>
              </label>
              <SelectDropdown
                options={dileveryOptions}
                selectedOption={dileveryOptions.find(
                  (option) => option.value === deliveryOptions
                )}
                onSelectOption={handleDeliveryOptionChange}
                required
              />
              {error && !deliveryOptions && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>

            {/* Pickup Address */}
            <div className="mb-4">
              <label htmlFor="pickupAddress" className="form-label">
                Pickup Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="pickupAddress"
                name="pickupAddress"
                value={pickupAddress}
                onChange={handleInputChange}
                placeholder="e.g. Street No. 5, Model Town, Lahore"
                required
              />
              {error && !pickupAddress && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label">
                Contact Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="e.g. 03XX-XXXXXXX"
                required
              />
              {error && !phoneNumber && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>
          </fieldset>
        </fieldset>
      </form>
    </section>
  )
}

export default TabProjectSettings
