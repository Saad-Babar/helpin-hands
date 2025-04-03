import React, { Fragment } from 'react';
import Link from "next/link";
import Events from '../../api/events'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import Image from 'next/image';

const EventPage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <main className="main">
                <PageTitle pageTitle={'Events'} pagesub={'Events'} />

                <section className="events pt-130 pb-80">
                    <div className="container">
                        <div className="row">
                            {Events.map((events, et) => (
                                <div className="col-12 mb-30" key={et}>
                                    <div className="eventsBlock">
                                        <figure className="eventsBlock__thumb">
                                            <Link onClick={ClickHandler} href={'/event-single/[slug]'} as={`/event-single/${events.slug}`} className="eventsBlock__thumb__link">
                                                <Image src={events.eImg} alt="Gainioz Events" className="eventsBlock__thumb__image" />
                                            </Link>
                                        </figure>
                                        <div className="eventsBlock__content">
                                            <h3 className="eventsBlock__heading text-uppercase">
                                                <Link onClick={ClickHandler} href={'/event-single/[slug]'} as={`/event-single/${events.slug}`}>{events.title}</Link>
                                            </h3>
                                            <div className="eventsBlock__meta">
                                                <ul>
                                                    <li>
                                                        <span className="eventsBlock__meta__title">Featured :</span>
                                                        <span className="eventsBlock__meta__text">{events.date}</span>
                                                    </li>
                                                    <li>
                                                        <span className="eventsBlock__meta__title">Newyork :</span>
                                                        <span className="eventsBlock__meta__text">{events.address}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p className="eventsBlock__text">{events.description}</p>
                                            <Link onClick={ClickHandler} href={'/event-single/[slug]'} as={`/event-single/${events.slug}`} className="eventsBlock__detailsLink">
                                                Read more
                                                <svg width="61" height="12" viewBox="0 0 61 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M60.5303 6.53033C60.8232 6.23744 60.8232 5.76256 60.5303 5.46967L55.7574 0.696699C55.4645 0.403806 54.9896 0.403806 54.6967 0.696699C54.4038 0.989593 54.4038 1.46447 54.6967 1.75736L58.9393 6L54.6967 10.2426C54.4038 10.5355 54.4038 11.0104 54.6967 11.3033C54.9896 11.5962 55.4645 11.5962 55.7574 11.3033L60.5303 6.53033ZM0 6.75H60V5.25H0V6.75Z" fill="#0D0D0D" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default EventPage;
