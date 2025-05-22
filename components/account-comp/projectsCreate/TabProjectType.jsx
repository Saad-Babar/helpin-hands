import React from 'react';
import getIcon from '../../../utils/getIcon';
import { FiAlertTriangle } from 'react-icons/fi';

const TabProjectType = ({ setFormData, formData = {}, error, setError }) => {
  return (
    <section className="step-body mt-4 body current">
      <form id="project-type">
        {/* Food Type */}
        <fieldset className="mb-5">
          <h2 className="fs-16 fw-bold">Food type</h2>
          <p className="text-muted">Select food type first.</p>
          {error && !formData.foodType && (
            <label id="food-type-error" className="error">
              <FiAlertTriangle /> This field is required.
            </label> 
          )}
          <div>
            <ProjectTypeCard
              icon="feather-user"
              title="Cooked"
              description="Food that has been prepared and is ready to eat (e.g., homemade meals, restaurant leftovers)."
              id="cooked"
              name="foodType"
              value={formData.foodType}
              setFormData={setFormData}
              setError={setError}
            />
            <ProjectTypeCard
              icon="feather-users"
              title="Packaged"
              description="Sealed items with labels and expiry dates (e.g., canned food, snacks, bottled drinks)."
              id="packaged"
              name="foodType"
              value={formData.foodType}
              setFormData={setFormData}
              setError={setError}
            />
            <ProjectTypeCard
              icon="feather-users"
              title="Fresh"
              description="Raw and perishable items like fruits, vegetables, or bakery goods without packaging."
              id="fresh"
              name="foodType"
              value={formData.foodType}
              setFormData={setFormData}
              setError={setError}
            />
          </div>
        </fieldset>

        <hr className="mb-5" />

        {/* Meal Size */}
        <fieldset className="mb-5">
          <h2 className="fs-16 fw-bold">Meal Size</h2>
          <p className="text-muted">Select how many people this food can serve.</p>
          {error && !formData.mealSize && (
            <label id="meal-size-error" className="error">
              <FiAlertTriangle /> This field is required.
            </label>
          )}
          <div>
            <ProjectTypeCard
              icon="feather-globe"
              title="1-2 People"
              description="Enough food to serve one or two people"
              id="1-2"
              name="mealSize"
              value={formData.mealSize}
              setFormData={setFormData}
              setError={setError}
            />
            <ProjectTypeCard
              icon="feather-shield"
              title="3-5 People"
              description="Suitable for a small group of three to five people"
              id="3-5"
              name="mealSize"
              value={formData.mealSize}
              setFormData={setFormData}
              setError={setError}
            />
            <ProjectTypeCard
              icon="feather-settings"
              title="6+ People"
              description="Can feed six or more people"
              id="6+"
              name="mealSize"
              value={formData.mealSize}
              setFormData={setFormData}
              setError={setError}
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default TabProjectType;

// ---- Reusable Card Component ----
export const ProjectTypeCard = ({ icon, title, description, id, name, value, setFormData, setError }) => {
  const handleOnChange = () => {
    setFormData((prev) => ({
      ...prev,
      [name]: id
    }));
    setError(false);
  };

  const isChecked = value === id;

  return (
    <label className="w-100" htmlFor={id}>
      <input
        className="card-input-element"
        type="radio"
        name={name}
        id={id}
        checked={isChecked}
        onChange={handleOnChange}
      />
      <span className="card card-body d-flex flex-row justify-content-between align-items-center">
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
  );
};
