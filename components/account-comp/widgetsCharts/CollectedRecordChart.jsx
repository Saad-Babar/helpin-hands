'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaDonate, FaBox, FaHandHoldingHeart, FaCoins } from 'react-icons/fa';
import CardHeader from '../shared/CardHeader';
import CardLoader from '../shared/CardLoader';
import useCardTitleActions from '../../../hooks/useCardTitleActions';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Icon helper
const getIcon = (icon) => {
  switch (icon) {
    case 'donations': return <FaDonate />;
    case 'expiry': return <FaBox />;
    case 'donated': return <FaHandHoldingHeart />;
    case 'points': return <FaCoins />;
    default: return <FaDonate />;
  }
};

const CollectedRecordChart = () => {
  const [stats, setStats] = useState(null);
  const [lineChartOptions, setLineChartOptions] = useState(null);
  const [donutChartOptions, setDonutChartOptions] = useState(null);
  const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats'); // Your stats API
        const data = await res.json();

        // Prepare line chart options (your existing chart)
        const lineOpts = {
          chart: {
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
          },
          stroke: { curve: 'smooth', width: 3 },
          markers: { size: 4 },
          colors: ['#28a745', '#ffc107', '#17a2b8', '#6f42c1'],
          xaxis: {
            categories: data.last7DaysDates || [],
            labels: { rotate: -45 },
          },
          yaxis: { title: { text: 'Count / Points' } },
          tooltip: { shared: true, intersect: false },
          series: [
            { name: 'Donations', data: data.donationHistory || [] },
            { name: 'Expiry Items', data: data.expiryHistory || [] },
            { name: 'Donated', data: data.donatedHistory || [] },
            { name: 'Points Redeemed', data: data.pointsHistory || [] },
          ],
        };

        // Prepare donut chart options (new chart below your cards)
        // Show percentage distribution of totalExpiryItems:
        // Donated, Expired (expired can be totalExpiryItems - donated), and maybe Pending (dummy example)
        const totalExpiry = data.totalExpiryItems || 0;
        const donated = data.donated || 0;
        const expired = Math.max(totalExpiry - donated, 0);
        const pending = Math.floor(totalExpiry * 0.1); // example 10% pending

        const donutOpts = {
          chart: { type: 'donut' },
          labels: ['Donated', 'Expired', 'Pending'],
          colors: ['#28a745', '#dc3545', '#ffc107'], // green, red, yellow
          legend: { position: 'bottom' },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: { width: 300 },
              legend: { position: 'bottom' }
            }
          }],
          series: [donated, expired, pending],
          tooltip: {
            y: {
              formatter: (val) => val + ' items'
            }
          }
        };

        setStats(data);
        setLineChartOptions(lineOpts);
        setDonutChartOptions(donutOpts);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    }
    fetchStats();
  }, [refreshKey]);

  if (isRemoved) return null;
  if (!stats || !lineChartOptions || !donutChartOptions) return <p>Loading Donation Records...</p>;

  const cardsData = [
    {
      id: 'donations',
      title: 'Total Donations',
      value: stats.totalDonations || 0,
      icon: 'donations',
      progress: '100%',
      progressInfo: `${stats.totalDonations || 0} items`,
      bgColor: 'bg-success',
    },
    {
      id: 'expiry',
      title: 'Expiry Items Added',
      value: stats.totalExpiryItems || 0,
      icon: 'expiry',
      progress: '100%',
      progressInfo: `${stats.totalExpiryItems || 0} items`,
      bgColor: 'bg-warning',
    },
    {
      id: 'donated',
      title: 'Already Donated',
      value: stats.donated || 0,
      icon: 'donated',
      progress: ((stats.donated / stats.totalExpiryItems) * 100 || 0).toFixed(1) + '%',
      progressInfo: `${stats.donated || 0} items`,
      bgColor: 'bg-primary',
    },
    {
      id: 'points',
      title: 'Points Redeemed',
      value: stats.totalPoints || 0,
      icon: 'points',
      progress: '100%',
      progressInfo: `${stats.totalPoints || 0} points`,
      bgColor: 'bg-dark',
    }
  ];

  return (
    <div className="col-xxl-12">
      {/* Your original line chart card */}
      <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
        <CardHeader
          title={"Donation Records Overview"}
          refresh={handleRefresh}
          remove={handleDelete}
          expanded={handleExpand}
        />
        <div className="card-body custom-card-action p-0">
          <ReactApexChart
            options={lineChartOptions}
            series={lineChartOptions.series}
            height={377}
          />
        </div>
        <div className="card-footer">
          <div className="row g-4">
            {cardsData.map(({ id, title, value, progress, progressInfo, icon, bgColor }) => (
              <SummaryCard
                key={id}
                title={title}
                value={value}
                progress={progress}
                progressInfo={progressInfo}
                icon={getIcon(icon)}
                bgColor={bgColor}
              />
            ))}
          </div>
        </div>
        <CardLoader refreshKey={refreshKey} />
      </div>

      {/* New donut chart card below */}
      <div className={`card stretch stretch-full mt-4`}>
        <CardHeader title="Donation Status Distribution" />
        <div className="card-body p-3">
          <ReactApexChart
            options={donutChartOptions}
            series={donutChartOptions.series}
            type="donut"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, progress, progressInfo, icon, bgColor }) => (
  <div className="col-lg-4 col-xl-3">
    <div className="p-3 border border-dashed rounded d-flex align-items-center gap-3">
      <div className={`avatar-text avatar-lg ${bgColor} text-white rounded-circle d-flex align-items-center justify-content-center`} style={{ minWidth: 48, minHeight: 48 }}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="flex-grow-1">
        <div className="fs-14 fw-semibold text-dark">{title}</div>
        <h5 className="fw-bold">{value}</h5>
        <div className="progress mt-2 ht-3 rounded" style={{ backgroundColor: '#e9ecef' }}>
          <div className={`progress-bar ${bgColor}`} role="progressbar" style={{ width: progress }}></div>
        </div>
        <small className="text-muted">{progressInfo}</small>
      </div>
    </div>
  </div>
);

export default CollectedRecordChart;
