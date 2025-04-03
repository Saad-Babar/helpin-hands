import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import ContactSection from '../../components/ContactSection';

const ContactPage = (props) => {

    return (
        <Fragment>
            <Header hclass={'header--styleFour'}/>
            <main className="main">
                <PageTitle pageTitle={'Contact Us'} pagesub={'Contact'}/>
                <ContactSection />
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default ContactPage;