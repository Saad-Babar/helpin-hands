"use client";
import React, { useState, useEffect, useRef } from 'react'; // Import useRef here
import SimpleReactValidator from 'simple-react-validator';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";

const RegisterForm = ({ onShowNotification }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null); // Declare the ref inside the component

    const [forms, setForms] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: '',
        con_password: '',
        role: '',
        address: '',
        document: '',
    });

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage',
        validators: {
            confirm: {
                message: 'The password confirmation does not match.',
                rule: (val, params, validatorInstance) => {
                    const passwordValue = document.querySelector('#pass').value;
                    return val === passwordValue;
                }
            },
            file: {
                message: 'Please upload a file.',
                rule: (val, params, validatorInstance) => {
                    return val instanceof File;
                }
            },
        }
    }));

    const changeHandler = e => {
        const { name, value, type, files } = e.target;
        setForms(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));

        if (name === 'password' || name === 'con_password') {
            console.log('Input Name:', name);
            console.log('Input Value:', value);
            console.log('Current forms state:', forms);
        }

        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validator.allValid()) {
            validator.showMessages();
            setLoading(false);
            toast.error("Please fill out all fields correctly.");
            return;
        }

        try {
            const formData = new FormData();
            for (const key in forms) {
                formData.append(key, forms[key]);
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Registration error:', data?.message || 'Registration failed');
                toast.error(data?.message || 'Registration failed');
                setError(data?.message || 'Registration failed');
                return;
            }

            toast.success('Registration successful!');
            setForms({
                fname: '', lname: '', email: '', phone: '',
                password: '', con_password: '', role: '', address: '', document: ''
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.message || 'Registration failed');
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {/* Toast Container should ideally be in _app.js or layout, but for component use, we include it here */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <form id="contact-form" className="it-contact-form commentsPost commentsPost--style2 pt-45 pb-25" onSubmit={submitHandler}>
                <div className="row g-4">

                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="fname" className="form-label">Enter Your First Name*</label>
                            <input
                                id="fname"
                                value={forms.fname}
                                type="text"
                                name="fname"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Enter your First Name*"
                            />
                            {validator.message('First Name', forms.fname, 'required|alpha_space')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="lname" className="form-label">Enter Your Last Name*</label>
                            <input
                                id="lname"
                                value={forms.lname}
                                type="text"
                                name="lname"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Enter your Last Name*"
                            />
                            {validator.message('Last Name', forms.lname, 'required|alpha_space')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="email" className="form-label">Enter Your Email*</label>
                            <input
                                id="email"
                                value={forms.email}
                                type="email"
                                name="email"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Enter your email*"
                            />
                            {validator.message('email', forms.email, 'required|email')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="phone" className="form-label">Enter Your Phone Number*</label>
                            <input
                                id="phone"
                                value={forms.phone}
                                type="tel"
                                name="phone"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Enter your Phone number*"
                            />
                            {validator.message('phone', forms.phone, 'required|phone')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="pass" className="form-label">Create Your Password*</label>
                            <input
                                id="pass"
                                value={forms.password}
                                type="password"
                                name="password"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Create Password*"
                            />
                            {validator.message('password', forms.password, 'required')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="cpass" className="form-label">Re-Enter Your Password*</label>
                            <input
                                id="cpass"
                                value={forms.con_password}
                                type="password"
                                name="con_password"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Confirm Password*"
                            />
                            {validator.message('Confirm Password', forms.con_password, 'required|confirm')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <label htmlFor="role" className="form-label">Select Your Role*</label>
                            <select
                                id="role"
                                name="role"
                                className="form-select"
                                value={forms.role}
                                onChange={changeHandler}
                                onBlur={changeHandler}
                            >
                                <option value="">-- Select Your Role --</option>
                                <option value="Individual Donor">Individual Donor</option>
                                <option value="Store Owner">Store Owner</option>
                                <option value="NGO / Receiver">NGO / Receiver</option>
                                <option value="Rider">Rider</option>
                            </select>
                            <div className="text-danger">
                                {validator.message('Your Role', forms.role, 'required')}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="commentsPost__input">
                            <label htmlFor="address" className="form-label">Enter your Address*</label>
                            <input
                                id="address"
                                value={forms.address}
                                type="text"
                                name="address"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Enter your Address*"
                            />
                            {validator.message('address', forms.address, 'required')}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="commentsPost__input">
                            <label htmlFor="cnic" className="form-label">Upload Your CNIC*</label>
                            <input
                                id="cnic"
                                type="file"
                                name="document"
                                className="form-control"
                                onChange={changeHandler}
                                onBlur={changeHandler}
                                ref={fileInputRef} // Attach the ref here
                            />
                            {validator.message('document', forms.document, 'required|file')}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="commentsPost__button text-center">
                            <button
                                type="submit"
                                className="btn btn--styleOne btn--primary it-btn"
                                disabled={loading}
                            >
                                <span className="btn__text">
                                    {loading ? 'Processing...' : 'Register'}
                                </span>
                                <i className="fa-solid fa-heart btn__icon"></i>
                                <span className="it-btn__inner">
                                    <span className="it-btn__blobs">
                                        <span className="it-btn__blob"></span>
                                        <span className="it-btn__blob"></span>
                                        <span className="it-btn__blob"></span>
                                        <span className="it-btn__blob"></span>
                                    </span>
                                </span>
                                <svg className="it-btn__animation" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    {/* ... SVG code ... */}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;