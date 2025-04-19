"use client";

import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import RegisterSection from '../../components/RegisterSection';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { ToastContainer } from 'react-toastify'; // Make sure this import exists in RegisterForm

const ContactPage = (props) => {
    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <main className="main">
                <PageTitle pageTitle={'Register'} pagesub={'Register'} />

                {/* REMOVE this entire section for the custom notification */}
                {/* {notification.visible && (
                    <div className={`fixed top-0 left-0 w-full z-50 p-3 alert alert-${notification.type} shadow-lg text-center`} role="alert">
                        {notification.message}
                    </div>
                )} */}

                <div className="container mt-5 register--layout1">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div className="sectionTitle text-center">
                                <span className="sectionTitle__small justify-content-center">
                                    <i className="fa-solid fa-heart btn__icon"></i>
                                    Register
                                </span>
                                <h2 className="sectionTitle__big">Join Our Mission to Reduce Food Waste</h2>
                                <p className="text-muted" style={{ fontSize: '14px' }}>
                                    Please fill in your accurate details to register. Duplicate accounts are not allowed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <RegisterSection>
                    <RegisterForm /> {/* Remove the onShowNotification prop */}
                </RegisterSection>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default ContactPage;