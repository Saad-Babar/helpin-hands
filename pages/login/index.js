"use client";

import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ToastContainer } from 'react-toastify'; // Make sure this import exists in RegisterForm
import LoginSection from '../../components/LoginSection';

import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);

      // If token is valid, redirect to dashboard or account page
      return {
        redirect: {
          destination: '/account',
          permanent: false,
        },
      };
    } catch (err) {
      // Token invalid or expired – allow access to login/register
    }
  }

  // No token – allow access to login/register
  return {
    props: {}, // required to render the page
  };
}


const ContactPage = (props) => {
    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <main className="main">
                <PageTitle pageTitle={'Login'} pagesub={'Login'} />

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
                                    Login
                                </span>
                                <h2 className="sectionTitle__big">Join Our Mission to Reduce Food Waste</h2>
                                <p className="text-muted" style={{ fontSize: '14px' }}>
                                    Log in to access your account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <LoginSection>
                    <LoginForm /> {/* Remove the onShowNotification prop */}
                </LoginSection>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default ContactPage;