'use client'
import React from 'react'
import CardHeader from '../shared/CardHeader'
import Pagination from '../shared/Pagination'
import { FiMoreVertical } from 'react-icons/fi'
import { contactLeadsData } from '../../../utils/fackData/contactLeadsData'
import CardLoader from '../shared/CardLoader'
import useCardTitleActions from '../../../hooks/useCardTitleActions'
import Link from 'next/link'
import Image from 'next/image'

const LeadsStatus = ({ title, progressFullHeight }) => {
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-lg-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr className="border-b">
                                    <th scope="row">Lead Name</th>
                                    <th>Company</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th className="wd-250">Stage</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactLeadsData.map(({ amount, id, progress, user_email, user_img, user_name, user_status, user_company, badgeColor, progressColor }) => (
                                        <tr key={id}>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="avatar-image">
                                                        <Image width={38} height={38} sizes='100vw' src={user_img} alt="img" className="img-fluid" />
                                                    </div>
                                                    <Link href="#">
                                                        <span className="d-block">{user_name}</span>
                                                        <span className="fs-12 d-block fw-normal text-muted">{user_email}</span>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-gray-200 text-dark">{user_company}</span>
                                            </td>
                                            <td>${amount} USD</td>
                                            <td>
                                                <span className={`badge bg-soft-${badgeColor} text-${badgeColor}`}>{user_status}</span>
                                            </td>
                                            <td>
                                                {
                                                    progressFullHeight ?
                                                        <div className="progress">
                                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="78" aria-valuemin="0" aria-valuemax="100">{progress}%</div>
                                                        </div> :
                                                        <div className="progress ht-3">
                                                            <div className={`progress-bar bg-${progressColor}`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={78} aria-valuemin={0} aria-valuemax={100} />
                                                        </div>
                                                }
                                            </td>
                                            <td className="text-end">
                                                <Link href="#"><i><FiMoreVertical /></i></Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer"> <Pagination /></div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default LeadsStatus
