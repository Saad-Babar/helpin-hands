'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../shared/Loading'
import { FiMapPin } from 'react-icons/fi'
import topTost from '../../../utils/topTost'

const PickupDonations = () => {
  const [donations, setDonations] = useState([])
  const [userRole, setUserRole] = useState('')
  const [userCity, setUserCity] = useState('')
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/rider-donations')
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.message || 'Failed to fetch donations')
        }

        const data = await res.json()
        const { role, city, donations } = data

        if (!role || (role.toLowerCase() !== 'admin' && role.toLowerCase() !== 'rider')) {
          setAccessDenied(true)
          setLoading(false)
          return
        }

        setUserRole(role)
        setUserCity(
          city
            ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
            : 'your area'
        )
        setDonations(donations || [])
      } catch (err) {
        topTost('Error loading donations: ' + err.message, 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  const handleCollectDonation = async (donationId) => {
    try {
      const res = await fetch('/api/collect-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationId }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      topTost('Donation marked as collected', 'success')

      setDonations((prev) => prev.filter((d) => d._id !== donationId))
    } catch (err) {
      topTost('Failed to collect donation: ' + err.message, 'error')
    }
  }

  const handleAcceptPickup = (donationId) => {
    console.log('Accept Pickup clicked for donation ID:', donationId)
    topTost('Pickup accepted (dummy)', 'info')
  }

  const renderTitle = () => {
    if (userRole.toLowerCase() === 'admin') {
      return 'All Donations (Admin View)'
    } else if (userRole.toLowerCase() === 'rider') {
      return 'Donations Assigned for Pickup'
    }
    return ''
  }

  if (loading) return <Loading />

  if (accessDenied)
    return (
      <p className="text-danger">
        Access denied. You are not authorized to view donations.
      </p>
    )

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">
        <FiMapPin className="me-2" />
        {renderTitle()}
      </h2>

      {donations.length === 0 ? (
        <p>No donations available at the moment.</p>
      ) : (
        <div className="row">
          {donations.map((donation) => (
            <div key={donation._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={`/uploads/food/${donation.attachments?.[0] || 'default.jpg'}`}
                  className="card-img-top"
                  alt={donation.details?.foodName || 'Donation image'}
                />
                <div className="card-body">
                  <h5 className="card-title">{donation.details?.foodName || 'Food item'}</h5>
                  <p className="card-text">
                    <strong>Type:</strong> {donation.foodType || 'N/A'}
                    <br />
                    <strong>Meal Size:</strong> {donation.mealSize || 'N/A'}
                    <br />
                    <strong>Points:</strong> {donation.points || 'N/A'}
                    <br />
                    <strong>City:</strong> {donation.location?.city || 'N/A'}
                    <br />
                    <strong>Pickup Address:</strong> {donation.location?.pickupAddress || 'N/A'}
                    <br />
                    <strong>Donor Email:</strong> {donation.userEmail || 'N/A'}
                    <br />
                    <strong>Donor Phone:</strong> {donation.location?.phoneNumber || 'N/A'}
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button
                      className="btn btn-success"
                      onClick={() => handleCollectDonation(donation._id)}
                    >
                      Collect Donation
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleAcceptPickup(donation._id)}
                    >
                      Accept Pickup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PickupDonations
