import React, { useEffect, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaDonate, FaBox, FaCheck, FaHandHoldingHeart } from 'react-icons/fa';
import Link from 'next/link';

const iconStyles = {
  FaDonate: { bg: '#FFD700', color: '#8B7500' },        // gold
  FaBox: { bg: '#00BFFF', color: '#004C99' },           // deep sky blue
  FaHandHoldingHeart: { bg: '#FF6B6B', color: '#8B2B2B' }, // light red
  FaCheck: { bg: '#4CAF50', color: '#26532B' },         // green
};

const getIcon = (icon) => {
  switch (icon) {
    case 'FaDonate': return <FaDonate />;
    case 'FaBox': return <FaBox />;
    case 'FaCheck': return <FaCheck />;
    case 'FaHandHoldingHeart': return <FaHandHoldingHeart />;
    default: return <FaDonate />;
  }
};

const SiteOverviewStatistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats([
          {
            id: 'donation',
            title: 'Donations Made',
            total_number: data.totalDonations,
            completed_number: data.totalDonations,
            progress: '100%',
            progress_info: `${data.totalDonations} items`,
            icon: 'FaDonate',
          },
          {
            id: 'expiry',
            title: 'Expiry Items Added',
            total_number: data.totalExpiryItems,
            completed_number: data.totalExpiryItems,
            progress: '100%',
            progress_info: `${data.totalExpiryItems} items`,
            icon: 'FaBox',
          },
        //   {
        //     id: 'readyToDonate',
        //     title: 'Ready to Donate',
        //     total_number: data.totalExpiryItems,
        //     completed_number: data.readyToDonate,
        //     progress: `${(data.readyToDonate / data.totalExpiryItems * 100 || 0).toFixed(1)}%`,
        //     progress_info: `${data.readyToDonate} ready`,
        //     icon: 'FaCheck',
        //   },
          {
            id: 'donated',
            title: 'Already Donated',
            total_number: data.totalExpiryItems,
            completed_number: data.donated,
            progress: `${(data.donated / data.totalExpiryItems * 100 || 0).toFixed(1)}%`,
            progress_info: `${data.donated} donated`,
            icon: 'FaHandHoldingHeart',
          },
        ]);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading statistics...</p>;

  return (
    <>
      {stats.map(({ id, completed_number, progress, progress_info, title, total_number, icon }) => (
        <div key={id} className="col-xxl-3 col-md-6" style={{ marginBottom: 20 }}>
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
                      backgroundColor: iconStyles[icon]?.bg,
                      color: iconStyles[icon]?.color,
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
                    {React.cloneElement(getIcon(icon), { size: '24' })}
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
                        {completed_number ? completed_number + '/' : ''}
                      </span>
                      <span className="counter" style={{ color: '#6c757d' }}>
                        {total_number}
                      </span>
                    </div>
                    <h3 className="fs-13 fw-semibold text-truncate-1-line" style={{ color: '#343a40' }}>
                      {title}
                    </h3>
                  </div>
                </div>
                <Link href="#" className="lh-1" style={{ color: '#6c757d' }}>
                  <FiMoreVertical className="fs-16" />
                </Link>
              </div>
              <div className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <Link
                    href="#"
                    className="fs-12 fw-medium text-muted text-truncate-1-line"
                    style={{ textDecoration: 'none' }}
                  >
                    {title}
                  </Link>
                  <div className="w-100 text-end">
                    <span className="fs-12 text-dark" style={{ fontWeight: '600' }}>
                      {progress_info}
                    </span>{' '}
                    <span className="fs-11 text-muted">({progress})</span>
                  </div>
                </div>
                <div
                  className="progress mt-2 ht-3"
                  style={{ height: 8, borderRadius: 6, backgroundColor: '#e9ecef' }}
                >
                  <div
                    className={`progress-bar progress-${id}`}
                    role="progressbar"
                    style={{
                      width: progress,
                      backgroundColor: iconStyles[icon]?.color,
                      borderRadius: 6,
                      transition: 'width 0.6s ease',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SiteOverviewStatistics;
