import React, { Fragment, useState } from 'react';
import Link from 'next/link'
import Services from '../../api/service'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import icon from '/public/images/icons/mission-icon1.svg'
import icon2 from '/public/images/icons/mission-icon2.svg'
import icon3 from '/public/images/icons/mission-icon3.svg'
import icon4 from '/public/images/icons/mission-icon4.svg'
import shape1 from '/public/images/shapes/pagebreadcumbShapeTop.svg'
import shape2 from '/public/images/shapes/pagebreadcumbShapeBottom.svg'
import ModalVideo from 'react-modal-video'
import Testimonial3 from '../../components/Testimonial3/Testimonial3';
import Image from 'next/image';




const ServicePage = (props) => {

    const [isOpen, setOpen] = useState(false)

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <main className="main">
                <PageTitle pageTitle={'Our Services'} pagesub={'Services'} />
                <div className="service pt-130 pb-95">
                    <div className="container">
                        <div className="row">
                            {Services.slice(3, 7).map((service, srv) => (
                                <div className="col-lg-3 col-md-4" key={srv}>
                                    <div className="keyFeatureBlock keyFeatureBlock--style3 keyFeatureBlock--style5 mb-30">
                                        <div className="keyFeatureBlock__left">
                                            <span className="keyFeatureBlock__icon">
                                                <Image src={service.icon} alt="Gainioz Feature_Icon" />
                                            </span>
                                        </div>
                                        <div className="keyFeatureBlock__content">
                                            <h3 className="keyFeatureBlock__heading">
                                                <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${service.slug}`} className="keyFeatureBlock__heading__link">
                                                    {service.title}
                                                </Link>
                                            </h3>
                                            <p className="keyFeatureBlock__text">{service.description}</p>
                                            <Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${service.slug}`} className="keyFeatureBlock__link">
                                                Read more
                                                <i className="fa-solid fa-arrow-right-long"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <section className="serviceDetails pb-115">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-11">
                                <div className="serviceDetailsContent">
                                    <h2 className="serviceDetailsContent__heading mb-45 text-uppercase">We are always there others need help</h2>
                                    <p className="">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam,
                                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                        enim ipsam
                                        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                                        ratione
                                        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                                        adipisci velit,
                                        loremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                        beatae vitae
                                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, dicta
                                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="missionSection missionSection--style1 position-relative" style={{ backgroundImage: `url(${'/images/bg/missionBg.jpg'})` }}>
                    <div className="sectionShape sectionShape--top">
                        <Image src={shape1} alt="Gainioz"/>
                    </div>
                    <div className="sectionShape sectionShape--bottom">
                        <Image src={shape2} alt="Gainioz"/>
                    </div>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="missionContent">
                                    <div className="sectionTitle mb-35">
                                        <span className="sectionTitle__small">
                                            <i className="fa-solid fa-heart btn__icon"></i>
                                            Our mission
                                        </span>
                                        <h2 className="sectionTitle__big text-white">our mission in- 2024</h2>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="missionBlock bgSecondary">
                                                <div className="missionBlock__icon">
                                                    <Image src={icon} alt="Gainioz Mission" />
                                                </div>
                                                <div className="missionBlock__content">
                                                    <span className="missionBlock__counter">1600</span>
                                                    <p className="missionBlock__title">SOLAR PANEL</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="missionBlock bgPrimary">
                                                <div className="missionBlock__icon">
                                                    <Image src={icon2} alt="Gainioz Mission" />
                                                </div>
                                                <div className="missionBlock__content">
                                                    <span className="missionBlock__counter">289</span>
                                                    <p className="missionBlock__title">Build HOme</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="missionBlock bgPrimary">
                                                <div className="missionBlock__icon">
                                                    <Image src={icon3} alt="Gainioz Mission" />
                                                </div>
                                                <div className="missionBlock__content">
                                                    <span className="missionBlock__counter">16<span>k</span></span>
                                                    <p className="missionBlock__title">Give Job</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="missionBlock bgSecondary">
                                                <div className="missionBlock__icon">
                                                    <Image src={icon4} alt="Gainioz Mission" />
                                                </div>
                                                <div className="missionBlock__content">
                                                    <span className="missionBlock__counter">24<span>mln</span></span>
                                                    <p className="missionBlock__title">Pure water</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="missionVideo">
                                    <div className="mission-video-main">
                                        <div className="promo-video">
                                            <div className="waves-block">
                                                <div className="waves wave-1"></div>
                                                <div className="waves wave-2"></div>
                                                <div className="waves wave-3"></div>
                                            </div>
                                        </div>
                                        <button onClick={() => setOpen(true)} className="video video-popup mfp-iframe" data-lity><i
                                            className="fa fa-play"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="BqI0Q7e4kbk" onClose={() => setOpen(false)} />
            </main>
            <Testimonial3 />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default ServicePage;
