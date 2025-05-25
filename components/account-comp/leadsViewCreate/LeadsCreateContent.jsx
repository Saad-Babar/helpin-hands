'use client'
import React, { useState } from 'react'
import SelectDropdown from '../shared/SelectDropdown'
import Input from '../shared/Input'
import Loading from '../shared/Loading'
import { FiUserPlus } from 'react-icons/fi'
import topTost from '../../../utils/topTost'

import { foodCategoryOptions } from '../../../utils/fackData/foodcategory'
import { remindDayOptions } from '../../../utils/fackData/remindday'
import useLocationData from '../../../hooks/useLocationData'

const LeadsCreateContent = () => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(foodCategoryOptions[0])
    const [selectedPeriod, setSelectedPeriod] = useState(remindDayOptions[0])
    const [loadingSave, setLoadingSave] = useState(false)

    const { loading } = useLocationData()

    const handleSave = async () => {
        console.log('SENDING DATA:', {
            itemName,
            quantity,
            expiryDate,
            foodCategory: selectedCategory?.value,
            remindBefore: selectedPeriod?.value
        })

        if (!itemName || !quantity || !expiryDate || !selectedCategory || !selectedPeriod) {
            topTost("Failed to save data. Fill All Fields.", "error")
            return
        }

        setLoadingSave(true)

        try {
            const res = await fetch('/api/expiry-tracker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName,
                    quantity,
                    expiryDate,
                    foodCategory: selectedCategory.value,
                    remindBefore: selectedPeriod.value,
                }),
            })


            if (res.ok) {
                topTost("Data saved successfully!", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000) // slight delay so user sees toast
            }
            else {
                const errorData = await res.json()
                topTost('Failed to save: ' + (errorData.message || 'Unknown error'), 'error')
            }
        } catch (error) {
            topTost('Error saving data: ' + error.message, 'error')
        } finally {
            setLoadingSave(false)
        }
    }

    return (
        <>
            {(loading || loadingSave) && <Loading />}
            <div className="col-lg-12">
                <div className="card stretch stretch-full">
                    <div className="card-body general-info">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Expiry Tracker :</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                                    Add items in expiry tracker.
                                </span>
                            </h5>
                        </div>

                        <Input
                            icon="feather-shopping-cart"
                            label="Item Name"
                            labelId="nameInput"
                            placeholder="Item's Name"
                            name="name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />

                        <Input
                            icon="feather-briefcase"
                            label="Quantity"
                            labelId="quantityInput"
                            placeholder="Enter Quantity e.g. 1 pack / 1 L / 1 KG"
                            name="quantity"
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <Input
                            icon="feather-calendar"
                            type="date"
                            label="Expiry Date"
                            labelId="expiryDateInput"
                            placeholder="Expiry Date"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />

                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">Food Category: </label>
                            </div>
                            <div className="col-lg-8">
                                <SelectDropdown
                                    options={foodCategoryOptions}
                                    selectedOption={selectedCategory}
                                    defaultSelect={foodCategoryOptions[0].value}
                                    onSelectOption={setSelectedCategory}
                                />
                            </div>
                        </div>

                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">Remind Before Days: </label>
                            </div>
                            <div className="col-lg-8">
                                <SelectDropdown
                                    options={remindDayOptions}
                                    selectedOption={selectedPeriod}
                                    defaultSelect={remindDayOptions[0].value}
                                    onSelectOption={setSelectedPeriod}
                                />
                            </div>
                        </div>

                        <a
                            href="#"
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSave()
                            }}
                        >
                            <FiUserPlus size={16} className="me-2" />
                            <span>Add Expiry</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeadsCreateContent
