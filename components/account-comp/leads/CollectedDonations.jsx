'use client'
import React, { useEffect, useState, memo } from 'react'
import Table from '../shared/table/Table'

const CollectedDonations = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

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

  const columns = [
    { accessorKey: 'foodName', header: 'Food Name' },
    { accessorKey: 'foodType', header: 'Type' },
    { accessorKey: 'city', header: 'City' },
    { accessorKey: 'deliveryOption', header: 'Delivery Method' },
    { accessorKey: 'collectedAt', header: 'Collected At' },
  ]

  if (loading) return <div>Loading...</div>

  return <Table data={data} columns={columns} />
}

export default CollectedDonations
