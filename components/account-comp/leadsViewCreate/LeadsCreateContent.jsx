'use client'
import React, { useState } from 'react'
import SelectDropdown from '../shared/SelectDropdown'
import TextArea from '../shared/TextArea'
import { customerListTagsOptions, leadsGroupsOptions, leadsSourceOptions, leadsStatusOptions, propsalVisibilityOptions, taskAssigneeOptions } from '../../../utils/options'
import useLocationData from '../../../hooks/useLocationData'
import { currencyOptionsData } from '../../../utils/fackData/currencyOptionsData'
import { foodCategoryOptions } from '../../../utils/fackData/foodcategory'
import { remindDayOptions } from '../../../utils/fackData/remindday'

import { languagesData } from '../../../utils/fackData/languagesData'
import { timezonesData } from '../../../utils/fackData/timeZonesData'
import Loading from '../shared/Loading'
import Input from '../shared/Input'
import MultiSelectImg from '../shared/MultiSelectImg'
import MultiSelectTags from '../shared/MultiSelectTags'



const LeadsCreateContent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedperiod, setselectedperiod] = useState(null);
    const { countries, states, cities, loading, error, fetchStates, fetchCities, } = useLocationData();
    const leadsTags = customerListTagsOptions
    return (
        <>
            {loading && <Loading />}
            <div className="col-lg-12">
                <div className="card stretch stretch-full">
                    <div className="card-body lead-status">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Lead Status :</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">Typically refers to adding a new potential customer or sales prospect</span>
                            </h5>
                            <a href="#" className="btn btn-sm btn-light-brand">Create Invoice</a>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Status</label>
                                <SelectDropdown
                                    options={leadsStatusOptions}
                                    selectedOption={selectedOption}
                                    defaultSelect="new"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Source</label>
                                <SelectDropdown
                                    options={leadsSourceOptions}
                                    selectedOption={selectedOption}
                                    defaultSelect="facebook"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Visibility:</label>
                                <SelectDropdown
                                    options={propsalVisibilityOptions}
                                    selectedOption={selectedOption}
                                    defaultSelect="public"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Tags</label>
                                <MultiSelectTags
                                    options={leadsTags}
                                    placeholder=""
                                />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Assigned</label>
                                <MultiSelectImg
                                    options={taskAssigneeOptions}
                                    placeholder=""
                                />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Groups</label>
                                <MultiSelectTags
                                    options={leadsGroupsOptions}
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="card-body general-info">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Expiry Tracker :</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">Add items in expiry tracker.</span>
                            </h5>
                            {/* <a href="#" className="btn btn-sm btn-light-brand">Edit Lead</a> */}
                        </div>
                        <Input
                            icon='feather-shopping-cart'
                            label={"Item Name"}
                            labelId={"nameInput"}
                            placeholder={"Item's Name"}
                            name={"name"}
                        />
                        <Input
                            icon='feather-briefcase'
                            label={"Quantity"}
                            labelId={"emailInput"}
                            placeholder={"Enter Quantity e.g. 1 pack / 1 L / 1 KG"}
                            name={"quantity"}
                            type={"text"}
                        />
                        <Input
                            icon="/admin-images/file-icons/calendar.svg"
                            type="date"
                            label="Expiry Date"
                            labelId="expiryDateInput"
                            placeholder="Expiry Date"
                            name="expiryDate"
                        />

                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">Food Category: </label>
                            </div>
                            <div className="col-lg-8">
                                <SelectDropdown
                                    options={foodCategoryOptions}
                                    selectedOption={selectedCategory}
                                    defaultSelect="vegetables"
                                    onSelectOption={(option) => setSelectedCategory(option)}
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
                                    selectedOption={selectedperiod}
                                    defaultSelect="2days"
                                    onSelectOption={(option) => setSelectedCategory(option)}
                                />
                            </div>
                        </div>

                        
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">Time Zone: </label>
                            </div>
                            <div className="col-lg-8">
                                <SelectDropdown
                                    options={timezonesData}
                                    selectedOption={selectedOption}
                                    defaultSelect="Western Europe Time"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">Languages: </label>
                            </div>
                            <div className="col-lg-8">
                                <MultiSelectTags
                                    options={languagesData}
                                    defaultSelect={[languagesData[25], languagesData[10], languagesData[45]]}
                                />
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </>
    )
}

export default LeadsCreateContent