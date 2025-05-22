'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import TabProjectType from './TabProjectType';
import TabProjectSettings from './TabProjectSettings';
import TabAttachement from './TabAttachement';
import TabCompleted from './TabCompleted';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TabProjectDetails = dynamic(() => import('./TabProjectDetails'), { ssr: false });

const steps = [
    { name: 'Food Type', required: true },
    { name: 'Details', required: false },
    { name: 'Location', required: false },
    { name: 'Attachment', required: false },
    { name: 'Completed', required: false }
];

const ProjectCreateContent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        foodType: '',
        mealSize: '',
        details: {
            foodName: '',
            storageCondition: '',
            packagingStatus: '',
            cookedDate: '',
            anyNote: ''
        },
        location: {
            deliveryOptions: '',
            pickupAddress: '',
            phoneNumber: ''
        },
        attachments: []
    });

    const validateFields = () => {
        if (currentStep === 0) {
            const { foodType, mealSize } = formData;
            if (!foodType || !mealSize) {
                setError(true);
                return false;
            }
        }

        if (currentStep === 1) {
            const {
                details: { foodName, storageCondition, packagingStatus, cookedDate, anyNote } = {},
            } = formData;

            if (!foodName || !storageCondition || !packagingStatus || !cookedDate || !anyNote) {
                setError(true);
                return false;
            }
        }

        if (currentStep === 2) {
            const {
                location: { deliveryOptions, pickupAddress, phoneNumber } = {},
            } = formData;

            if (!deliveryOptions || !pickupAddress || !phoneNumber) {
                setError(true);
                return false;
            }
        }



        if (currentStep === 3) {  // assuming TabAttachment is step 3
  const { attachments = [] } = formData

  if (!attachments || attachments.length === 0) {
    setError(true)
    return false // stop going to next step
  } else {
    setError(false) // clear error if attachments present
  }
}



        setError(false);
        return true;
    };


    const handleNext = (e) => {
        e.preventDefault();
        if (validateFields()) {
            setError(false);
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleTabClick = (e, index) => {
        e.preventDefault();
        if (validateFields()) {
            setError(false);
            setCurrentStep(index);
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate attachments before submitting
  if (!formData.attachments || formData.attachments.length === 0) {
    setError(true);  // Assuming you use this state to show error UI in TabAttachment
    toast.error('Please upload at least one attachment.');
    return; // Stop submission
  }

  setLoading(true);
  setSuccessMsg('');
  setErrorMsg('');
  setError(false); // Clear error on valid submit

  try {
    const response = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      setSuccessMsg('Donation submitted successfully!');
      toast.success('Donation submitted successfully!');
      setFormData({
        foodType: '',
        mealSize: '',
        details: {
          foodName: '',
          storageCondition: '',
          packagingStatus: '',
          cookedDate: '',
          anyNote: '',
        },
        location: {
          deliveryOptions: '',
          pickupAddress: '',
          phoneNumber: '',
        },
        attachments: [],
      });
      setCurrentStep(4); // Go to Completed tab
    } else {
      setErrorMsg(result.message || 'Something went wrong. Please try again.');
      toast.error(result.message || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    setErrorMsg('Failed to submit. Check your connection or try again later.');
    toast.error('Failed to submit. Check your connection or try again later.');
  } finally {
    setLoading(false);
  }
};


    const handleFileUpload = (uploadedUrl) => {
        setFormData((prev) => ({
            ...prev,
            attachments: [...prev.attachments, uploadedUrl]
        }));
    };

    return (
        <div className="col-lg-12">
            <div className="card border-top-0">
                <div className="card-body p-0 wizard" id="project-create-steps">
                    {/* Tabs */}
                    <div className="steps clearfix">
                        <ul role="tablist">
                            {steps.map((step, index) => (
                                <li
                                    key={index}
                                    className={`${currentStep === index ? 'current' : ''} ${currentStep === index && error ? 'error' : ''}`}
                                    onClick={(e) => handleTabClick(e, index)}
                                >
                                    <a href="#" className="d-block fw-bold">{step.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Step Content */}
                    <div className="content clearfix">
                        {currentStep === 0 && (
                            <TabProjectType
                                formData={formData}
                                setFormData={setFormData}
                                error={error}
                                setError={setError}
                            />
                        )}
                        {currentStep === 1 && (
                            <TabProjectDetails
                                formData={formData}
                                setFormData={setFormData}
                                error={error} // ✅ Add this
                                setError={setError} // (optional, if needed inside)
                            />
                        )}
                        {currentStep === 2 && (
                            <TabProjectSettings
                                formData={formData}
                                setFormData={setFormData}
                                error={error}
                                setError={setError}
                            />

                        )}

                        {currentStep === 3 && (
                            <TabAttachement
                                formData={formData}
                                setFormData={setFormData}
                                onFileUpload={handleFileUpload}
                                error={error} // ✅ Add this
                                setError={setError}
                            />
                        )}
                        {currentStep === 4 && (
                            <TabCompleted
                                formData={formData}
                                setFormData={setFormData}
                            />
                        )}
                    </div>

                    {/* Feedback Messages */}
                    <div className="p-3">
                        {/* Removed successMsg and errorMsg alerts, using toast instead */}
                        {/* {successMsg && <div className="alert alert-success">{successMsg}</div>} */}
                        {/* {errorMsg && <div className="alert alert-danger">{errorMsg}</div>} */}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="actions clearfix">
                        <ul>
                            {/* Show Previous button on steps 1–3 only */}
                            {currentStep > 0 && currentStep < 4 && (
                                <li onClick={handlePrev}>
                                    <a href="#">Previous</a>
                                </li>
                            )}

                            {/* Show Submit button ONLY on Attachment tab (step 3) */}
                            {currentStep === 3 ? (
                                <li>
                                    <button onClick={handleSubmit} className="btn btn-success" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </li>
                            ) : (
                                // Show Next button on steps 0–2 only
                                currentStep < 3 && (
                                    <li onClick={handleNext}>
                                        <a href="#">Next</a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Toast container for notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop />
        </div>
    );
};

export default ProjectCreateContent;
