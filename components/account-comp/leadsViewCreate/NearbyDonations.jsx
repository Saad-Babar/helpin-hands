'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../shared/Loading'
import { FiMapPin } from 'react-icons/fi'
import topTost from '../../../utils/topTost'

const NearbyDonations = () => {
    const [donations, setDonations] = useState([])
    const [userCity, setUserCity] = useState('')
    const [userRole, setUserRole] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNearbyDonations = async () => {
            try {
                const res = await fetch('/api/nearby-donations')
                if (!res.ok) {
                    const { message } = await res.json()
                    throw new Error(message || 'Failed to fetch nearby donations')
                }

                const { donations, role, city } = await res.json()

                // Filter out collected donations
                const availableDonations = donations.filter(d => d.status !== 'collected')

                setUserRole(role)
                setDonations(availableDonations)

                if (role.toLowerCase() === 'admin') {
                    setUserCity('All Cities')
                } else if (city) {
                    setUserCity(city.charAt(0).toUpperCase() + city.slice(1))
                } else {
                    setUserCity('your area')
                }
            } catch (err) {
                topTost('Error loading donations: ' + err.message, 'error')
            } finally {
                setLoading(false)
            }
        }

        fetchNearbyDonations()
    }, [])

    const handleCollectDonation = async (donationId) => {
        try {
            const res = await fetch('/api/collect-donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ donationId })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message)

            topTost('Donation marked as collected', 'success')

            // Remove from UI immediately
            setDonations(prev => prev.filter(d => d._id !== donationId))
        } catch (err) {
            topTost('Failed to collect donation: ' + err.message, 'error')
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-3">
                <FiMapPin className="me-2" />
                {userRole.toLowerCase() === 'admin' ? 'All Donations (Admin View)' : `Available Donations in ${userCity}`}
            </h2>

            {loading ? (
                <Loading />
            ) : donations.length === 0 ? (
                <p>No donations available {userRole.toLowerCase() === 'admin' ? 'at the moment.' : 'in your city right now.'}</p>
            ) : (
                <div className="row">
                    {donations.map(donation => (
                        <div key={donation._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src={`/uploads/food/${donation.attachments?.[0] || 'default.jpg'}`}
                                    className="card-img-top"
                                    alt={donation.details?.foodName}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{donation.details?.foodName}</h5>
                                    <p className="card-text">
                                        <strong>Type:</strong> {donation.foodType}<br />
                                        <strong>Meal Size:</strong> {donation.mealSize}<br />
                                        <strong>Points:</strong> {donation.points}<br />
                                        <strong>City:</strong> {donation.location?.city}<br />
                                        <strong>Pickup Address:</strong> {donation.location?.pickupAddress}<br />
                                        <strong>Donor Email:</strong> {donation.userEmail || 'N/A'}<br />
                                        <strong>Donor Phone:</strong> {donation.userPhone || 'N/A'}
                                    </p>
                                    <button
                                        className="btn btn-success mt-2"
                                        onClick={() => handleCollectDonation(donation._id)}
                                    >
                                        Collect Donation
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NearbyDonations
