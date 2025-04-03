import React, { Fragment } from 'react';
import Link from "next/link";
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';

const ErrorPage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Error 404'} pagesub={'404'} />
                <div className="error-page">
                    <div className="container not-found-content">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="contant-wrapper text-center">
                                    <div className="error-page__text">
                                        <h2>404</h2>
                                    </div>
                                    <div className="error-page__content mb-50">
                                        <h2>Hi Sorry We Can’t Find That Page!</h2>
                                        <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>

                                        <div className="error-page-button">
                                            <Link onClick={ClickHandler} className="btn btn--styleOne btn--secondary it-btn" href="/">
                                                <span className="btn__text">Go Back Home</span>
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
                                                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10">
                                                            </feGaussianBlur>
                                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo">
                                                            </feColorMatrix>
                                                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default ErrorPage;
