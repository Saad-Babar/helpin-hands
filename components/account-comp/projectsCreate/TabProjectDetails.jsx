import React, { useEffect, useState } from 'react'
import SelectDropdown from '../shared/SelectDropdown'
import { foodStoreOptions, packingStatusOptions } from '../../../utils/options'
import DatePicker from 'react-datepicker'
import useDatePicker from '../../../hooks/useDatePicker'
import useJoditConfig from '../../../hooks/useJoditConfig'
import dynamic from 'next/dynamic'
import { FiAlertTriangle } from 'react-icons/fi'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

const TabProjectDetails = ({ setFormData, formData = {}, error, setError }) => {
  const {
    details: {
      foodName = '',
      storageCondition = '',
      packagingStatus = '',
      cookedDate = null,
      anyNote = '',
    } = {},
  } = formData

  const { startDate, setStartDate, renderFooter } = useDatePicker()
  const config = useJoditConfig()
  const [editorValue, setEditorValue] = useState(anyNote)

  // Sync editor value with state
  useEffect(() => {
    setEditorValue(anyNote)
  }, [anyNote])

  // Sync cooked date
  useEffect(() => {
    if (startDate !== cookedDate) {
      setFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          cookedDate: startDate,
        },
      }))
    }
  }, [startDate, cookedDate, setFormData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }))
  }

  const handleStorageConditionChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        storageCondition: option?.value || '',
      },
    }))
  }

  const handlePackingStatusChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        packagingStatus: option?.value || '',
      },
    }))
  }

  const handleNotesChange = (htmlString) => {
    setEditorValue(htmlString)
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        anyNote: htmlString,
      },
    }))
  }

  return (
    <section className="step-body mt-4 body current">
      <form id="project-details">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Food details</h2>
            <p className="text-muted">Food details goes here.</p>
          </div>

          <fieldset>
            {/* Food Name */}
            <div className="mb-4">
              <label htmlFor="foodName" className="form-label">
                Food Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="foodName"
                name="foodName"
                value={foodName}
                onChange={handleInputChange}
                required
              />
              {error && !foodName && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>

            {/* Storage Condition */}
            <div className="mb-4">
              <label htmlFor="storageCondition" className="form-label">
                Storage Condition <span className="text-danger">*</span>
              </label>
              <SelectDropdown
                options={foodStoreOptions}
                selectedOption={foodStoreOptions.find(
                  (o) => o.value === storageCondition
                )}
                onSelectOption={handleStorageConditionChange}
                required
              />
              {error && !storageCondition && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>

            {/* Packing Status */}
            <div className="mb-4">
              <label htmlFor="packingStatus" className="form-label">
                Packing Status{' '}
                <span className="text-danger">
                  * Is food properly packed for transport?
                </span>
              </label>
              <SelectDropdown
                options={packingStatusOptions}
                selectedOption={packingStatusOptions.find(
                  (o) => o.value === packagingStatus
                )}
                onSelectOption={handlePackingStatusChange}
                required
              />
              {error && !packagingStatus && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>

            {/* Cooked Date */}
            <div className="mb-4">
              <label htmlFor="cookedDate" className="form-label">
                Cooked Date <span className="text-danger">*</span>
              </label>
              <div className="input-group date">
                <DatePicker
                  placeholderText="Pick cooked date"
                  selected={startDate}
                  showPopperArrow={false}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                  popperPlacement="bottom-start"
                  calendarContainer={({ children }) => (
                    <div className="bg-white react-datepicker">
                      {children}
                      {renderFooter('start')}
                    </div>
                  )}
                />
              </div>
              {error && !startDate && (
                <label className="error text-danger d-block mt-1">
                  <FiAlertTriangle /> This field is required.
                </label>
              )}
            </div>

            {/* Any Note */}
            <div className="mb-4">
              <label className="form-label">
                Any Note <span className="text-danger">*</span>
              </label>
              <JoditEditor
                value={editorValue}
                config={config}
                onChange={handleNotesChange}
              />
              {error && !anyNote && (
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

export default TabProjectDetails
