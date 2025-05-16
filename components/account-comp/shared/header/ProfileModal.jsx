import React, { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import { FiActivity, FiBell, FiChevronRight, FiDollarSign, FiSettings, FiUser } from "react-icons/fi";
import LogoutButton from './LogoutButton';

const activePosition = ["Active", "Always", "Bussy", "Inactive", "Disabled", "Cutomization"];
const subscriptionsList = ["Plan", "Billings", "Referrals", "Payments", "Statements", "Subscriptions"];

const ProfileModal = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);


  useEffect(() => {
    fetch('/api/profile')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
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
          {/* You can optionally add other menu items or leave blank for guests */}
        </div>
      </div>
    );
  }

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
              <h6 className="text-dark mb-0">{user.name} <span className="badge bg-soft-success text-success ms-1">PRO</span></h6>
              <span className="fs-12 fw-medium text-muted">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Active status dropdown */}
        <div className="dropdown-item">
          <span className="hstack">
            <i className={`wd-10 ht-10 border border-2 border-gray-1 rounded-circle me-2 ${getColor(user.status)}`}></i>
            <span>{user.status || "Unknown"}</span>
          </span>
        </div>






        {/* <div className="dropdown-divider"></div> */}

        {/* Subscriptions dropdown */}
        {/* <div className="dropdown">
          <a href="#" className="dropdown-item" data-bs-toggle="dropdown">
            <span className="hstack">
              <FiDollarSign className="me-2" />
              <span>Subscriptions</span>
            </span>
            <FiChevronRight className="ms-auto me-0" />
          </a>
          <div className="dropdown-menu">
            {subscriptionsList.map((item, index) => (
              <Fragment key={index}>
                {index === activePosition.length - 1 && <div className="dropdown-divider"></div>}
                <a href="#" className="dropdown-item">
                  <span className="hstack">
                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                    <span>{item}</span>
                  </span>
                </a>
              </Fragment>
            ))}
          </div>
        </div> */}

        <div className="dropdown-divider"></div>

        {/* Other menu items */}
        <a href="#" className="dropdown-item">
          <FiUser />
          <span>Profile Details</span>
        </a>
        <a href="#" className="dropdown-item">
          <FiActivity />
          <span>Activity Feed</span>
        </a>
        <a href="#" className="dropdown-item">
          <FiDollarSign />
          <span>Billing Details</span>
        </a>
        <a href="#" className="dropdown-item">
          <FiBell />
          <span>Notifications</span>
        </a>
        <a href="#" className="dropdown-item">
          <FiSettings />
          <span>Account Settings</span>
        </a>

        <div className="dropdown-divider"></div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileModal;
