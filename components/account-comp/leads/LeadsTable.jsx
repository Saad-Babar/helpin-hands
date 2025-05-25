'use client'
import React, { useEffect, useState, memo } from 'react'
import Table from '../shared/table/Table'
import SelectDropdown from '../shared/SelectDropdown'

const TableCell = memo(({ options, defaultSelect }) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelect || null)
  return (
    <SelectDropdown
      options={options}
      defaultSelect={defaultSelect}
      selectedOption={selectedOption}
      onSelectOption={setSelectedOption}
    />
  )
})

const ExpiryTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpiryItems = async () => {
      try {
        const res = await fetch('/api/expiry-tracker', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        const json = await res.json()
        if (res.ok && json.success) {
          // Map MongoDB _id to id for table if needed
          const mappedData = json.data.map(item => ({
            id: item._id,
            itemName: item.itemName,
            quantity: item.quantity,
            expiryDate: new Date(item.expiryDate).toLocaleDateString(),
            foodCategory: item.foodCategory,
            remindBefore: item.remindBefore,
            status: item.status,
          }))
          setData(mappedData)
        } else {
          console.error(json.message)
        }
      } catch (error) {
        console.error('Failed to fetch expiry items:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExpiryItems()
  }, [])

  const columns = [
    {
      accessorKey: 'itemName',
      header: 'Item Name',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
    },
    {
      accessorKey: 'foodCategory',
      header: 'Food Category',
    },
    {
      accessorKey: 'remindBefore',
      header: 'Remind Before',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`badge ${row.original.status === 'ready to donate' ? 'bg-success' : 'bg-secondary'}`}>
          {row.original.status}
        </span>
      ),
    },
  ]

  if (loading) return <div>Loading...</div>

  return <Table data={data} columns={columns} />
}

export default ExpiryTable
