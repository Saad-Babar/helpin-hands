  'use client'
  import SelectDropdown from '../shared/SelectDropdown'
  import { dileveryOptions } from '../../../utils/options'
  import { FiAlertTriangle } from 'react-icons/fi'

  import React, { useState } from 'react'
  import useLocationData from '../../../hooks/useLocationData'

  const TabProjectSettings = ({ setFormData, formData = {}, error, setError }) => {
    const {
      location: {
        deliveryOptions = '',
        pickupAddress = '',
        phoneNumber = '',
        country = '',
        state = '',
        city = '',
      } = {},
    } = formData

    const { countries, states, cities, loading, error: locationError, fetchStates, fetchCities } = useLocationData()

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

    const handleCountryChange = (option) => {
      fetchStates(option.label)
      fetchCities(option.label)
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          country: option.label,
          state: '',
          city: '',
        },
      }))
    }

    const handleStateChange = (option) => {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          state: option.label,
        },
      }))
    }

    const handleCityChange = (option) => {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          city: option.label,
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

            {/* Country */}
            <div className="row mb-4 align-items-center">
              <div className="col-lg-4">
                <label className="fw-semibold">Country: </label>
              </div>
              <div className="col-lg-8">
                <SelectDropdown
                  options={countries}
                  selectedOption={countries.find(opt => opt.label === country)}
                  defaultSelect="usa"
                  onSelectOption={handleCountryChange}
                />
              </div>
            </div>

            {/* State */}
            <div className="row mb-4 align-items-center">
              <div className="col-lg-4">
                <label className="fw-semibold">State: </label>
              </div>
              <div className="col-lg-8">
                <SelectDropdown
                  options={states}
                  selectedOption={states.find(opt => opt.label === state)}
                  defaultSelect="new-york"
                  onSelectOption={handleStateChange}
                />
              </div>
            </div>

            {/* City */}
            <div className="row mb-4 align-items-center">
              <div className="col-lg-4">
                <label className="fw-semibold">City: </label>
              </div>
              <div className="col-lg-8">
                <SelectDropdown
                  options={cities}
                  selectedOption={cities.find(opt => opt.label === city)}
                  defaultSelect="new-york"
                  onSelectOption={handleCityChange}
                />
              </div>
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
        </form>
      </section>
    )
  }

  export default TabProjectSettings