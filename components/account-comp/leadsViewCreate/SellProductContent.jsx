'use client'
import React, { useState, useEffect, useRef } from 'react'
import SelectDropdown from '../shared/SelectDropdown'
import Input from '../shared/Input'
import Loading from '../shared/Loading'
import topTost from '../../../utils/topTost'
import useLocationData from '../../../hooks/useLocationData'
import { FiUploadCloud, FiStar } from 'react-icons/fi'

const conditionOptions = [
  { label: 'New', value: 'New' },
  { label: 'Used - Like New', value: 'Used - Like New' },
  { label: 'Used - Good', value: 'Used - Good' },
  { label: 'Used - Acceptable', value: 'Used - Acceptable' },
]

const SellProductContent = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [selectedCondition, setSelectedCondition] = useState(conditionOptions[0])

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  const [images, setImages] = useState([])
  const [consent, setConsent] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [mainImageIdx, setMainImageIdx] = useState(0)

  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [loadingUser, setLoadingUser] = useState(true)

  const fileInputRef = useRef(null)

  // Use improved useLocationData hook
  const { countries, states, cities, loading } = useLocationData(selectedCountry, selectedState)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me')
        if (res.ok) {
          const data = await res.json()
          setUserId(data.user?.userId || data.user?._id || data.user?.id || '')
        }
      } catch {}
      setLoadingUser(false)
    }
    fetchUser()
  }, [])

  // Handle country selection
  const handleCountryChange = (country) => {
    setSelectedCountry(country)
    setSelectedState(null)
    setSelectedCity(null)
  }

  // Handle state selection
  const handleStateChange = (state) => {
    setSelectedState(state)
    setSelectedCity(null)
  }

  // Handle city selection
  const handleCityChange = (city) => {
    setSelectedCity(city)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5)
    setImages(files)
    setMainImageIdx(0) // reset main image to first
  }

  const handleSetMainImage = (idx) => {
    setMainImageIdx(idx)
  }

  const handleRemoveImage = (idx) => {
    const newImages = images.filter((_, i) => i !== idx)
    setImages(newImages)
    if (mainImageIdx === idx) {
      setMainImageIdx(0)
    } else if (mainImageIdx > idx) {
      setMainImageIdx(mainImageIdx - 1)
    }
  }

  const handleSave = async () => {
    if (!userId) {
      topTost('User not loaded. Please wait or re-login.', 'error')
      return
    }
    if (
      !productName ||
      !phone ||
      !selectedCountry ||
      !selectedState ||
      !selectedCity ||
      images.length === 0 ||
      !consent
    ) {
      topTost('Please fill all required fields (product name, phone, location, images, consent).', 'error')
      return
    }

    setLoadingSave(true)

    try {
      const formData = new FormData()
      formData.append('productName', productName)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('condition', selectedCondition.value)
      formData.append('country', selectedCountry.value)
      formData.append('state', selectedState.value)
      formData.append('city', selectedCity.value)
      formData.append('consent', consent)
      formData.append('mainImageIdx', mainImageIdx)
      formData.append('phone', phone)
      formData.append('email', email)
      formData.append('userId', userId)

      images.forEach((image) => {
        formData.append('images', image)
      })

      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        topTost('Product listed successfully!', 'success')
        window.location.reload()
      } else {
        let errorMsg = 'Unknown error';
        try {
          const error = await res.json();
          errorMsg = error.message || JSON.stringify(error);
        } catch (e) {
          errorMsg = await res.text();
        }
        topTost('Error: ' + errorMsg, 'error')
      }
    } catch (error) {
      topTost('Server Error: ' + error.message, 'error')
    } finally {
      setLoadingSave(false)
    }
  }

  return (
    <>
      {(loading || loadingSave) && <Loading />}
      <div className="col-lg-12">
        <div className="card stretch stretch-full shadow-sm border-0 rounded-3">
          <div className="card-body p-5">
            <h4 className="fw-bold mb-4 text-success">List a Product for Sale</h4>
            <p className="text-muted mb-5">
              Upload your product. <strong>All money goes to help the needy.</strong>
            </p>

            {/* Location dropdowns */}
            <div className="mb-4">
              <label className="fw-semibold mb-2">
                Country <span className="text-danger">*</span>
              </label>
              <SelectDropdown
                options={countries}
                selectedOption={selectedCountry}
                onSelectOption={handleCountryChange}
                placeholder="Select country"
                required
              />
            </div>

            <div className="mb-4">
              <label className="fw-semibold mb-2">
                State <span className="text-danger">*</span>
              </label>
              <SelectDropdown
                options={states}
                selectedOption={selectedState}
                onSelectOption={handleStateChange}
                placeholder="Select state"
                required
                isDisabled={!selectedCountry}
              />
            </div>

            <div className="mb-4">
              <label className="fw-semibold mb-2">
                City <span className="text-danger">*</span>
              </label>
              <SelectDropdown
                options={cities}
                selectedOption={selectedCity}
                onSelectOption={handleCityChange}
                placeholder="Select city"
                required
                isDisabled={!selectedState}
              />
            </div>

            {/* Product Name */}
            <div className="mb-4 row align-items-center">
              <label htmlFor="productName" className="col-lg-3 fw-semibold">
                Product Name:
              </label>
              <div className="col-lg-9">
                <Input
                  icon="feather-shopping-bag"
                  labelId="productName"
                  placeholder="e.g. Winter Jacket"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 row align-items-center">
              <label htmlFor="description" className="col-lg-3 fw-semibold">
                Description:
              </label>
              <div className="col-lg-9">
                <Input
                  icon="feather-file-text"
                  labelId="description"
                  placeholder="Product Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Expected Price */}
            <div className="mb-4 row align-items-center">
              <label htmlFor="price" className="col-lg-3 fw-semibold">
                Expected Price:
              </label>
              <div className="col-lg-9">
                <Input
                  icon="feather-dollar-sign"
                  labelId="price"
                  placeholder="e.g. 500"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Condition */}
            <div className="mb-4 row align-items-center">
              <label className="col-lg-3 fw-semibold">Condition:</label>
              <div className="col-lg-9">
                <SelectDropdown
                  options={conditionOptions}
                  selectedOption={selectedCondition}
                  defaultSelect={conditionOptions[0].value}
                  onSelectOption={setSelectedCondition}
                />
              </div>
            </div>

            {/* Upload Images */}
            <div className="mb-4 row align-items-center">
              <label className="col-lg-3 fw-semibold">Upload Images:</label>
              <div className="col-lg-9">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="form-control"
                  max="5"
                  ref={fileInputRef}
                />
                <small className="text-muted">Max 5 images</small>
                {images.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {images.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`preview-${idx}`}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover',
                            border: idx === mainImageIdx ? '3px solid #28a745' : '1px solid #ccc',
                            borderRadius: 8,
                            cursor: 'pointer',
                          }}
                          onClick={() => handleSetMainImage(idx)}
                        />
                        {idx === mainImageIdx && (
                          <span style={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            background: '#28a745',
                            color: '#fff',
                            borderRadius: '50%',
                            padding: 2,
                            fontSize: 16,
                          }}>
                            <FiStar />
                          </span>
                        )}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          style={{ position: 'absolute', bottom: 4, right: 4, padding: '2px 6px', fontSize: 12 }}
                          onClick={() => handleRemoveImage(idx)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Phone Number (required) */}
            <div className="mb-4 row align-items-center">
              <label htmlFor="phone" className="col-lg-3 fw-semibold">
                Phone Number: <span className="text-danger">*</span>
              </label>
              <div className="col-lg-9">
                <Input
                  icon="feather-smart-phone"
                  labelId="phone"
                  placeholder="e.g. 03001234567"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Email (optional) */}
            <div className="mb-4 row align-items-center">
              <label htmlFor="email" className="col-lg-3 fw-semibold">
                Email:
              </label>
              <div className="col-lg-9">
                <Input
                  icon="feather-mail"
                  labelId="email"
                  placeholder="e.g. user@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Consent */}
            <div className="mb-4 row align-items-center">
              <div className="offset-lg-3 col-lg-9">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="consentCheckbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="consentCheckbox">
                    I agree that all proceeds from this sale will be donated to help needy people.
                    <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="mb-4 row align-items-center">
              <div className="offset-lg-3 col-lg-9">
                {loadingUser && (
                  <div className="text-warning mb-2">Loading user info...</div>
                )}
                {!loadingUser && !userId && (
                  <div className="text-danger mb-2">User not found. Please log in.</div>
                )}
                <button
                  className="btn btn-success"
                  disabled={loadingSave || loadingUser || !userId}
                  onClick={handleSave}
                >
                  {loadingSave ? 'Saving...' : 'List Product for Sale'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellProductContent
