"use client";
import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';

const RegisterForm = (props) => {

    const [error, setError]=useState("");

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
        setForms({ ...forms, [e.target.name]: e.target.value })
        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validator.allValid()) {
          validator.showMessages();
          return;
        }
      
        try {
          setError(''); // Clear previous errors
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(forms),
          });
      
          const contentType = response.headers.get('content-type');
          let responseData;
      
          if (contentType?.includes('application/json')) {
            responseData = await response.json();
          } else {
            const text = await response.text();
            console.error('Unexpected response:', text);
            throw new Error(`Server returned: ${text.substring(0, 100)}...`);
          }
      
          if (!response.ok) {
            throw new Error(
              responseData.error || 
              responseData.message || 
              `Registration failed (Status ${response.status})`
            );
          }
      
          // Success case
          setForms({ name: '', email: '', subject: '', phone: '', message: '' });
          alert('Registration successful!');
          
        } catch (error) {
          console.error('Full client-side error:', error);
          setError(error.message);
          
          // Show more detailed error if available
          if (error.message.includes('500')) {
            setError('Server error. Please check console for details.');
          }
        }
      };

    return (
        <form id="contact-form" className="it-contact-form commentsPost commentsPost--style2 pt-45 pb-25" onSubmit={(e) => submitHandler(e)}>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="commentsPost__input">
                        <input
                            value={forms.name}
                            type="text"
                            name="name"
                            className="form-control"
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            placeholder="Enter your name*"/>
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
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            placeholder="Enter your email*" />
                        {validator.message('email', forms.email, 'required|email')}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="commentsPost__input">
                        <input
                            value={forms.phone}
                            type="phone"
                            name="phone"
                            className="form-control"
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            placeholder="Enter your Phone number*" />
                        {validator.message('phone', forms.phone, 'required|phone')}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="commentsPost__input">
                        <input
                            value={forms.subject}
                            type="subject"
                            name="subject"
                            className="form-control"
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            placeholder="Subject*" />
                        {validator.message('subject', forms.subject, 'required|phone')}
                    </div>
                </div>
                <div className="col-12">
                    <div className="commentsPost__input">
                        <textarea
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            value={forms.message}
                            type="text"
                            name="message"
                            className="form-control"
                            placeholder="Enter your Massage*">
                        </textarea>
                        {validator.message('message', forms.message, 'required')}
                    </div>
                </div>
                <div className="col-12">
                    <div className="commentsPost__check">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Save my name, email, and website in this
                                browser for the next time I comment.</label>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="commentsPost__button text-center">
                        <button type="submit" className="btn btn--styleOne btn--primary it-btn">
                            <span className="btn__text">Send massage</span>
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
                        { error &&(
                            <div className='bg-black rounded'>{error}</div>
                        )
                        }
                    </div>
                </div>
            </div>
            <div className="form-response"></div>
        </form>
    )
}

export default RegisterForm;