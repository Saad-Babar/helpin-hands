import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import ContactSection from '../../components/ContactSection';
import RegisterSection from '../../components/RegisterSection';

const ContactPage = (props) => {

    return (
        <Fragment>
            <Header hclass={'header--styleFour'}/>
            <main className="main">
                <PageTitle pageTitle={'Register'} pagesub={'Register'}/>
                <RegisterSection />
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default ContactPage;