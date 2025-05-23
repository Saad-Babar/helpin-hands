'use client'
import React, { Fragment } from 'react'
import CardHeader from '../shared/CardHeader';
import useCardTitleActions from '../../../hooks/useCardTitleActions';
import CardLoader from '../shared/CardLoader';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const accountsData = [
    { imageSrc: '/admin-images/payment/mastercard.svg', cardName: 'Mastercard', amount: '$3,365', lastDigits: '3456' },
    { imageSrc: '/admin-images/payment/visa.svg', cardName: 'Visa Card', amount: '$2,245', lastDigits: '4236' },
    { imageSrc: '/admin-images/payment/discover.svg', cardName: 'Discover', amount: '$1,687', lastDigits: '5236' },
    { imageSrc: '/admin-images/payment/american-express.svg', cardName: 'AM Express', amount: '$2,558', lastDigits: '4235' },
    { imageSrc: '/admin-images/payment/jcb.svg', cardName: 'JCB Card', amount: '$2,359', lastDigits: '3457' }
];

const Accounts = ({ title }) => {

    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action">
                    {
                        accountsData.map(({ imageSrc, cardName, amount, lastDigits }, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="hstack gap-3 align-items-end">
                                            <Image width={50} height={50} sizes='100vw' src={imageSrc} alt="img" className="img-fluid wd-50" />
                                            <div className="ac-card">
                                                <a href="#" className="d-block">{cardName} <small className="fw-medium text-muted">({amount})</small></a>
                                                <small className="fw-normal text-muted">**** **** **** {lastDigits}</small>
                                            </div>
                                        </div>
                                        <div className="avatar-text avatar-md">
                                            <FiArrowRight />
                                        </div>
                                    </div>
                                    {accountsData.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                                </Fragment>
                            )
                        })
                    }
                </div>

                <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center">Refresh</a>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>

    )
}

export default Accounts

