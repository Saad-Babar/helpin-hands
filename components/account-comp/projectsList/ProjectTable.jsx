'use client';
import React, { useEffect, useState } from 'react';
import Table from '../shared/table/Table';
import { FiEye, FiMoreHorizontal } from 'react-icons/fi';
import Dropdown from '../shared/Dropdown';

// const actions = [
//   { label: "View", icon: <FiEye /> },
//   { type: "divider" },
//   { label: "Delete", icon: <FiEye />, },
// ];

const ProjectTable = () => {
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/user-donations');
      if (!res.ok) throw new Error('Failed to fetch donations');
      const data = await res.json();
      setDonationData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const columns = [
    {
      accessorKey: 'foodType',
      header: 'Food Type',
    },
    {
      accessorKey: 'mealSize',
      header: 'Meal Size',
    },
    {
      accessorKey: 'details.foodName',
      header: 'Food Name',
    },
    {
      accessorKey: 'details.storageCondition',
      header: 'Storage',
    },
    {
      accessorKey: 'details.packagingStatus',
      header: 'Packaging',
    },
    {
      accessorKey: 'location.deliveryOptions',
      header: 'Delivery Option',
    },
    {
      accessorKey: 'location.pickupAddress',
      header: 'Pickup Address',
    },
    {
      accessorKey: 'points',
      header: 'Points',
    },
    {
  accessorKey: 'attachments',
  header: 'Image',
  cell: info => {
    const images = info.getValue();
    const filename = images?.[0];
    const imageUrl = filename ? `/uploads/food/${filename}` : null;
    return imageUrl ? (
      <img src={imageUrl} alt="food" width={60} className="rounded" />
    ) : 'No Image';
  },
}
,

    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: info => new Date(info.getValue()).toLocaleString(),
    },
    // {
    //   accessorKey: 'actions',
    //   header: 'Actions',
    //   cell: () => (
    //     <Dropdown
    //       dropdownItems={actions}
    //       triggerClassNaclassName="avatar-md"
    //       triggerPosition="0,21"
    //       triggerIcon={<FiMoreHorizontal />}
    //     />
    //   ),
    // },
  ];

  return (
    <>
      {loading ? <p>Loading donations...</p> : <Table data={donationData} columns={columns} />}
    </>
  );
};

export default ProjectTable;
