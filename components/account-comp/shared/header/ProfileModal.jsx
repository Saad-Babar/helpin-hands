'use client';

import React, { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import { FiActivity, FiBell, FiChevronRight, FiDollarSign, FiSettings, FiUser, FiBarChart2 } from "react-icons/fi";
import LogoutButton from './LogoutButton';

const activePosition = ["Active", "Always", "Bussy", "Inactive", "Disabled", "Cutomization"];
const subscriptionsList = ["Plan", "Billings", "Referrals", "Payments", "Statements", "Subscriptions"];

const ProfileModal = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch('/api/donations');
        if (!res.ok) throw new Error('Failed to fetch points');
        const data = await res.json();
        setPoints(data.totalPoints);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPoints();
  }, []);

  const getColor = (item) => {
    switch (item) {
      case "Always":
        return "always_clr";
      case "Bussy":
        return "bussy_clr";
      case "Inactive":
        return "inactive_clr";
      case "Disabled":
        return "disabled_clr";
      case "Cutomization":
        return "cutomization_clr";
      default:
        return "active-clr";
    }
  };

  if (!user) {
    return (
      <div className="dropdown nxl-h-item">
        <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
          <Image width={40} height={40} src="/admin-images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" />
        </a>
        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
          <div className="dropdown-header">
            <div className="d-flex align-items-center">
              <Image width={40} height={40} src="/admin-images/avatar/1.png" alt="user-image" className="img-fluid user-avtar" />
              <div>
                <h6 className="text-dark mb-0">Guest User</h6>
                <span className="fs-12 fw-medium text-muted">guest@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown nxl-h-item">
      <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
        <Image
          width={40}
          height={40}
          src={`${user.document.replace(/\\/g, '/')}`}
          alt="user-image"
          className="img-fluid user-avtar"
        />
      </a>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
        <div className="dropdown-header">
          <div className="d-flex align-items-center">
            <Image
              width={40}
              height={40}
              src={`${user.document.replace(/\\/g, '/')}`}
              alt="user-image"
              className="img-fluid user-avtar"
            />
            <div>
              <h6 className="text-dark mb-0">
                {user.name}{' '}
                {user.role && (
                  <span className="badge bg-soft-success text-success ms-1 text-uppercase">
                    {user.role}
                  </span>
                )}
              </h6>
              <span className="fs-12 fw-medium text-muted">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="dropdown-item">
          <span className="hstack">
            <i className={`wd-10 ht-10 border border-2 border-gray-1 rounded-circle me-2 ${getColor(user.status)}`}></i>
            <span>{user.status || "Unknown"}</span>
          </span>
        </div>

        <div className="dropdown-divider"></div>

        <a href="#" className="dropdown-item disabled d-flex align-items-center" style={{ cursor: 'default', opacity: 0.7 }}>
          <FiDollarSign size={18} className="me-2" />
          <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>
            Total Points Earned: <span className="text-primary">{points}</span>
          </span>
        </a>

        <div className="dropdown-divider"></div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileModal;
