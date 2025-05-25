'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function shouldNotify(expiryDate, remindBeforeDays) {
  const now = new Date()
  const expiry = new Date(expiryDate)
  const remindBefore = parseInt(remindBeforeDays, 10) || 0
  const remindDate = new Date(expiry)
  remindDate.setDate(remindDate.getDate() - remindBefore)
  return now >= remindDate && now <= expiry
}

const NotificationsModal = () => {
  const [notificationsList, setNotificationsList] = useState([])

  useEffect(() => {
    async function fetchExpiryItems() {
      try {
        const res = await fetch('/api/expiry-tracker', { method: 'GET', credentials: 'include' })
        const data = await res.json()
        if (data.success) {
          const notifyItems = data.data.filter(item =>
            shouldNotify(item.expiryDate, item.remindBefore)
          ).map(item => ({
            id: item._id,
            itemName: item.itemName,
            expiryDate: item.expiryDate,
          }))
          setNotificationsList(notifyItems)
        }
      } catch (error) {
        console.error('Failed to fetch expiry items for notifications', error)
      }
    }

    fetchExpiryItems()
  }, [])

  return (
    <div className="dropdown nxl-h-item">
      <div className="nxl-head-link me-3" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
        <FiBell size={20} />
        {notificationsList.length > 0 && (
          <span className="badge bg-danger nxl-h-badge">{notificationsList.length}</span>
        )}
      </div>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
        <div className="d-flex justify-content-between align-items-center notifications-head px-3 py-2">
          <h6 className="fw-bold text-dark mb-0">Notifications</h6>
        </div>

        {notificationsList.length === 0 && (
          <p className="text-center my-3">No notifications</p>
        )}

        {notificationsList.map(({ id, itemName, expiryDate }) => (
          <Card key={id} itemName={itemName} expiryDate={expiryDate} />
        ))}
      </div>
    </div>
  )
}

export default NotificationsModal

const Card = ({ itemName, expiryDate }) => {
  const router = useRouter()

  const handleDonateClick = () => {
    toast.success(`Thanks for choosing to donate "${itemName}"!`)
    setTimeout(() => {
      router.push('/account/general/projects/create')
    }, 1000) // 2.5 second delay for reading the toast
  }

  return (
    <div className="notifications-item px-3 py-2 border-bottom">
      <div className="notifications-desc d-flex justify-content-between align-items-center">
        <div style={{ flex: 1 }}>
          <span className="font-body text-truncate-2-line d-block">
            <span className="fw-semibold text-dark">{itemName}</span> expires on {new Date(expiryDate).toLocaleDateString()}
          </span>
          <div className="notifications-date text-muted" style={{ fontSize: '0.8rem' }}>
            Reminder time reached
          </div>
        </div>

        <div className="d-flex flex-column align-items-end ms-3">
          <span
            className="d-block wd-8 ht-8 rounded-circle"
            style={{ backgroundColor: 'red', marginBottom: '0.5rem' }}
            title="New notification"
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={handleDonateClick}
            style={{ whiteSpace: 'nowrap' }}
          >
            Donate this Food
          </button>
        </div>
      </div>
    </div>
  )
}
