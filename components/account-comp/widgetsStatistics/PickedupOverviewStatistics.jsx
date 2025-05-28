import React, { useEffect, useState } from 'react';
import { FaTruck } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import Link from 'next/link';

const PickedupOverviewStatistics = () => {
  const [totalPickedUp, setTotalPickedUp] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/pickedup-donations');
        const result = await res.json();

        if (res.ok && result.success && Array.isArray(result.data)) {
          setTotalPickedUp(result.data.length);
        } else {
          setTotalPickedUp(0);
        }
      } catch (err) {
        console.error('Failed to load pickedup donations:', err);
        setTotalPickedUp(0);
      }
    };

    fetchStats();
  }, []);

  if (totalPickedUp === null) return <p>Loading pickup statistics...</p>;

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
                  backgroundColor: '#00BFFF',
                  color: '#004C99',
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
                <FaTruck />
              </div>
              <div>
                <div
                  className="fs-4 fw-bold text-dark"
                  style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                >
                  <span className="counter" style={{ color: '#007bff', fontWeight: '700' }}>
                    {totalPickedUp}
                  </span>
                </div>
                <h3 className="fs-13 fw-semibold text-truncate-1-line" style={{ color: '#343a40' }}>
                  Total Pickups
                </h3>
              </div>
            </div>
            <Link href="#" className="lh-1" style={{ color: '#6c757d' }}>
              <FiMoreVertical className="fs-16" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickedupOverviewStatistics;
