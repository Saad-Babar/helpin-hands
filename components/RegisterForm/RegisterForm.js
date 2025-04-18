"use client";
import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const RegisterForm = (props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    const [forms, setForms] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value });
        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type, visible: true });
        setTimeout(() => {
            setNotification({ ...notification, visible: false });
        }, 3000); // Adjust duration as needed
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setNotification({ ...notification, visible: false }); // Hide previous notification

        try {
            // Validate form
            if (!validator.allValid()) {
                validator.showMessages();
                setLoading(false);
                return;
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(forms),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error === 'EMAIL_EXISTS') {
                    showNotification(data.message, 'warning');
                    setForms({ ...forms, email: '' }); // Clear only the email field
                    return;
                }
                throw new Error(data.message || 'Registration failed');
            }

            // Success
            setForms({ name: '', email: '', phone: '', subject: '', message: '' });
            showNotification('Registration successful!', 'success');

        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message); // Keep this for potential other errors
            showNotification(error.message || 'Registration failed', 'danger');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {notification.visible && (
                <div className={`fixed top-4 right-4 z-50 alert alert-${notification.type} shadow-lg`} role="alert">
                    {notification.message}
                </div>
            )}
            <form id="contact-form" className="it-contact-form commentsPost commentsPost--style2 pt-45 pb-25" onSubmit={submitHandler}>
                <div className="row g-4">
                    {/* ... your form fields here ... */}
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <input
                                value={forms.name}
                                type="text"
                                name="name"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Enter your name*"
                            />
                            {validator.message('name', forms.name, 'required|alpha_space')}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="commentsPost__input">
                            <input
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
                            <input
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
                            <input
                                value={forms.subject}
                                type="text"
                                name="subject"
                                className="form-control"
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                placeholder="Subject*"
                            />
                            {validator.message('subject', forms.subject, 'required')}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="commentsPost__input">
                            <textarea
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                value={forms.message}
                                name="message"
                                className="form-control"
                                placeholder="Enter your Message*"
                            />
                            {validator.message('message', forms.message, 'required')}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="commentsPost__check">
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    Save my name, email, and website in this browser for the next time I comment.
                                </label>
                            </div>
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
                                    {loading ? 'Processing...' : 'Send message'}
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
                                    <defs>
                                        <filter>
                                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo">
                                            </feColorMatrix>
                                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                        </filter>
                                    </defs>
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