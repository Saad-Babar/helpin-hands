import React, { useEffect, useState } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const iconStyles = {
  FaHandHoldingHeart: { bg: '#FF6B6B', color: '#8B2B2B' }, // light red
};

const getIcon = (icon) => {
  switch (icon) {
    case 'FaHandHoldingHeart':
      return <FaHandHoldingHeart />;
    default:
      return <FaHandHoldingHeart />;
  }
};

const ReceiverCollections = () => {
  const [collectedCount, setCollectedCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchCollectedCount = async () => {
    try {
      const res = await fetch('/api/receiver-collections', {
        method: 'GET',
        credentials: 'include', // crucial for session cookie
      });
      if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
      const data = await res.json();
      setCollectedCount(data.collectedCount);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };

  fetchCollectedCount();
}, []);


  if (error) return <p>Error loading data: {error}</p>;
  if (collectedCount === null) return <p>Loading collection stats...</p>;

  return (
    <div className="col-xxl-3 col-md-6" style={{ marginBottom: 20 }}>
      <div
        className="card stretch stretch-full short-info-card"
        style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: 12 }}
      >
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div className="d-flex gap-4 align-items-center">
              <div
                className="avatar-text avatar-lg icon"
                style={{
                  backgroundColor: iconStyles['FaHandHoldingHeart'].bg,
                  color: iconStyles['FaHandHoldingHeart'].color,
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                }}
              >
                {React.cloneElement(getIcon('FaHandHoldingHeart'), { size: '24' })}
              </div>
              <div>
                <div
                  className="fs-4 fw-bold text-dark"
                  style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                >
                  <span
                    className="counter"
                    style={{ color: '#007bff', fontWeight: '700' }}
                  >
                    {collectedCount}
                  </span>
                </div>
                <h3
                  className="fs-13 fw-semibold text-truncate-1-line"
                  style={{ color: '#343a40' }}
                >
                  Donations Collected
                </h3>
              </div>
            </div>
            <a href="#" className="lh-1" style={{ color: '#6c757d' }}>
              <FiMoreVertical className="fs-16" />
            </a>
          </div>
          <div className="pt-4">
            <div className="d-flex align-items-center justify-content-between">
              <a
                href="#"
                className="fs-12 fw-medium text-muted text-truncate-1-line"
                style={{ textDecoration: 'none' }}
              >
                Total collections by you
              </a>
              <div className="w-100 text-end">
                <span className="fs-12 text-dark" style={{ fontWeight: '600' }}>
                  {collectedCount} times
                </span>{' '}
                <span className="fs-11 text-muted">(100%)</span>
              </div>
            </div>
            <div
              className="progress mt-2 ht-3"
              style={{ height: 8, borderRadius: 6, backgroundColor: '#e9ecef' }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: '100%',
                  backgroundColor: iconStyles['FaHandHoldingHeart'].color,
                  borderRadius: 6,
                  transition: 'width 0.6s ease',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverCollections;
