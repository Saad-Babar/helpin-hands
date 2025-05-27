'use client'
import React, { useEffect, useState } from 'react'
import Table from '../shared/table/Table'

const CollectedDonations = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(null) // track which donation is requesting rider
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchCollectedDonations = async () => {
      try {
        const res = await fetch('/api/collected-donations')
        const json = await res.json()
        if (res.ok && json.success) {
          setData(json.data)
        } else {
          console.error(json.message)
        }
      } catch (error) {
        console.error('Failed to fetch collected donations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCollectedDonations()
  }, [])

  const handleRequestRider = async (donationId) => {
    setRequesting(donationId)
    setMessage(null)
    try { 
      const res = await fetch('/api/request-rider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationId }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setMessage('Riders notified successfully!')
      } else {
        setMessage(json.message || 'Failed to notify riders')
      }
    } catch (error) {
      setMessage('Error sending request')
    } finally {
      setRequesting(null)
    }
  }

  const columns = [
    { accessorKey: 'foodName', header: 'Food Name' },
    { accessorKey: 'foodType', header: 'Type' },
    { accessorKey: 'city', header: 'City' },
    { accessorKey: 'deliveryOption', header: 'Delivery Method' },
    { accessorKey: 'collectedAt', header: 'Collected At' },
    {
      header: 'Action',
      cell: ({ row }) => (
        <button
          disabled={requesting === row.original.id}
          onClick={() => handleRequestRider(row.original.id)}
          className="btn btn-primary btn-sm"
        >
          {requesting === row.original.id ? 'Requesting...' : 'Request Rider'}
        </button>
      ),
    },
  ]

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {message && <div className="alert alert-info mb-3">{message}</div>}
      <Table data={data} columns={columns} />
    </div>
  )
}

export default CollectedDonations
