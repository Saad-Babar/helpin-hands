    import React from 'react'
    import getIcon from '../../../utils/getIcon'
    import { FiAlertTriangle } from 'react-icons/fi'

    const TabProjectType = ({ setFormData, formData, error, setError }) => {

        return (

            <section className="step-body mt-4 body current">
                <form id="project-type">
                    <fieldset>
                        <div className="mb-5">
                            <h2 className="fs-16 fw-bold">Food type</h2>
                            <p className="text-muted">Select food type first.</p>
                            {error && <label id="project-type-error" className="error"><FiAlertTriangle /> This field is required.</label>}
                        </div>
                        <fieldset>
                            <ProjectTypeCard
                                icon={"feather-user"}
                                title={"Cooked"}
                                description={"Food that has been prepared and is ready to eat (e.g., homemade meals, restaurant leftovers)."}
                                id={"food_cooked"}
                                name={"project-type"}
                                isRequired={true}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <ProjectTypeCard
                                icon={"feather-users"}
                                title={"Packaged"}
                                description={"Sealed items with labels and expiry dates (e.g., canned food, snacks, bottled drinks)."}
                                id={"food_packaged"}
                                name={"project-type"}
                                isRequired={false}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <ProjectTypeCard
                                icon={"feather-users"}
                                title={"Fresh"}
                                description={"Raw and perishable items like fruits, vegetables, or bakery goods without packaging."}
                                id={"food_fresh"}
                                name={"project-type"}
                                isRequired={false}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                        </fieldset>
                    </fieldset>
                    <hr className="mb-5" />
                    <fieldset>
                        <div className="mb-5">
                            <h2 className="fs-16 fw-bold">Meal Size</h2>
                            <p className="text-muted">Select how many people this food can serve.</p>
                            {error && <label id="project-type-error" className="error"><FiAlertTriangle /> This field is required.</label>}
                        </div>
                        <fieldset>
                            <ProjectTypeCard
                                icon={"feather-globe"}
                                title={"1-2 People"}
                                description={"Enough food to serve one or two people"}
                                id={"project_everyone"}
                                name={"project-manage"}
                                isRequired={true}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <ProjectTypeCard
                                icon={"feather-shield"}
                                title={"3-5 People"}
                                description={"Suitable for a small group of three to five people"}
                                id={"project_admin"}
                                name={"project-manage"}
                                isRequired={false}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                            <ProjectTypeCard
                                icon={"feather-settings"}
                                title={"6+ People"}
                                description={"Can feed six or more people"}
                                id={"project_specific"}
                                name={"project-manage"}
                                isRequired={false}
                                setFormData={setFormData}
                                formData={formData}
                                setError={setError}
                            />
                        </fieldset>
                    </fieldset>
                </form>
            </section>

        )
    }

    export default TabProjectType

    export const ProjectTypeCard = ({ icon, title, description, id, isRequired, name, setFormData, formData, setError }) => {
        const handleOnChange = (e) => {
            const name = e.target.name
            const id = e.target.id
            let updatedType = { ...formData };
            
            if (name === "project-type") {
                updatedType = { ...updatedType, projectType: id };
                setError(false)
            }
            if (name === "project-manage") {
                updatedType = { ...updatedType, projectManage: id };
                setError(false)
            }
            if (name === "budget-spend") {
                updatedType = { ...updatedType, budgetsSpend: id };
                setError(false)
            }
            setFormData({ ...formData, ...updatedType });
        }

        const { projectType, projectManage, budgetsSpend } = formData
        return (
            <>

                <label className="w-100" htmlFor={id}>
                    <input
                        className="card-input-element"
                        type="radio"
                        name={name}
                        id={id}
                        required={isRequired}
                        onClick={(e) => handleOnChange(e)}
                        defaultChecked={projectType === id || projectManage === id || budgetsSpend === id ? true : false}
                    />
                    <span className="card card-body d-flex flex-row justify-content-between align-items-center ">
                        <span className="hstack gap-3">
                            <span className="avatar-text">
                                {React.cloneElement(getIcon(icon), { size: "16", strokeWidth: "1.6" })}
                            </span>
                            <span>
                                <span className="d-block fs-13 fw-bold text-dark">{title}</span>
                                <span className="d-block text-muted mb-0" dangerouslySetInnerHTML={{ __html: description }} />
                            </span>
                        </span>
                    </span>
                </label>
            </>
        )
    }