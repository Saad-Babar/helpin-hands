'use client'
import React, { useEffect, useState } from 'react'
import Table from '../shared/table/Table'

export default function PickedupDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true)
      setMessage(null)
      try {
        const res = await fetch('/api/pickedup-donations')
        const data = await res.json()
        if (res.ok && data.success) {
          const formatted = data.data.map(d => ({
            ...d,
            image: d.attachments && d.attachments.length > 0 ? `/uploads/food/${d.attachments[0]}` : null,
            pickedupAt: d.pickedUpAt
              ? new Date(d.pickedUpAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'N/A',
            anyNote: d.anyNote || 'N/A',
            pickupAddress: d.pickupAddress || 'N/A',
            phoneNumber: d.phoneNumber || 'N/A',
            mealSize: d.mealSize || 'N/A',
          }))
          setDonations(formatted)
        } else {
          setMessage(data.message || 'Failed to load donations')
        }
      } catch (error) {
        setMessage('Error fetching donations')
      } finally {
        setLoading(false)
      }
    }
    fetchDonations()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      {message && <div className="alert alert-info mb-3">{message}</div>}
      <Table
        data={donations}
        columns={[
          {
            header: 'Image',
            accessorKey: 'image',
            cell: ({ getValue }) =>
              getValue() ? (
                <img
                  src={getValue()}
                  alt="Food"
                  style={{ width: 50, height: 50, borderRadius: 4, objectFit: 'cover' }}
                />
              ) : (
                'No Image'
              ),
          },
          { header: 'Food Name', accessorKey: 'foodName' },
          { header: 'Type', accessorKey: 'foodType' },
          { header: 'Meal Size', accessorKey: 'mealSize' },
          { header: 'City', accessorKey: 'city' },
          { header: 'Delivery Method', accessorKey: 'deliveryOption' },
          { header: 'Pickup Address', accessorKey: 'pickupAddress' },
          { header: 'Phone', accessorKey: 'phoneNumber' },
          { header: 'Note', accessorKey: 'anyNote' },
          { header: 'Picked Up At', accessorKey: 'pickedupAt' },
        ]}
      />
    </div>
  )
}
