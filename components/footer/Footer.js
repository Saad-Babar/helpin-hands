import React from 'react'
import Link from 'next/link'
import shape from '/public/images/shapes/footerShape2.png'
import logo from '/public/images/logos/logo_2.svg'
import Image from 'next/image'
import team1 from '/public/images/update/team-small-1.jpg'
import team6 from '/public/images/update/team-small-2.jpg'
import team3 from '/public/images/update/team-small-3.jpg'
import team4 from '/public/images/update/team-small-4.jpg'
import team5 from '/public/images/update/team-small-5.jpg'
import team2 from '/public/images/update/team-small-6.jpg'

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const SubmitHandler = (e) => {
    e.preventDefault()
}


const Footer = (props) => {
    return (
        <footer className="footer footer--bg footer--styleOne pt-70 pb-40">
            <Image src={shape} alt="Gainioz Shape" className="footer__shape" />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="footer__logo">
                            <Image src={logo} alt="Gainioz Logo" className="footer__logo__image" />
                        </div>
                    </div>
                    {/* <div className="col">
                        <div className="footer__social itSocial">
                            <ul>
                                <li>
                                    <Link onClick={ClickHandler} className="facebook" href="/" rel="nofollow">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} className="twitter" href="/" rel="nofollow">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} className="instagram" href="/" rel="nofollow">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} className="linkedin" href="/" rel="nofollow">
                                        <i className="fab fa-linkedin-in"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} className="pinterest" href="/" rel="nofollow">
                                        <i className="fab fa-pinterest-p"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="col-12">
                        <hr className="footer__line" />
                    </div>
                </div>
                <div className="row">
                    <div className="footer__middle pt-65 pb-35">
                        <div className="row justify-content-between">
                            <div className="col-lg-2 col-md-4 mb-30">
                                <div className="footer__widget">
                                    <div className="footer__title">
                                        <h2 className="footer__heading text-uppercase text-white">Contact us</h2>
                                    </div>
                                    <div className="footer__menu">
                                        <ul className="footer-list mb-30">
                                            <li>
                                                M. Saad Mubeen <Link onClick={ClickHandler} href="/home-4">2021-BSCS-057</Link>
                                            </li>
                                            <li>
                                                Syed M. Hamza <Link onClick={ClickHandler} href="/home-4">2021-BSCS-077</Link>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} href="/home-4">The University Of Faisalabad</Link>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 mb-30">
                                <div className="footer__widget">
                                    <div className="footer__title">
                                        <h2 className="footer__heading text-uppercase text-white">Support us</h2>
                                    </div>
                                    <div className="footer__menu">
                                        <ul>
                                            <li><Link onClick={ClickHandler} href="/login">Donate Now</Link></li>

                                            <li><Link onClick={ClickHandler} href="/login">Become Volunteer</Link></li>
                                            <li><Link onClick={ClickHandler} href="/login">Register your Store</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 mb-30">
                                <div className="footer__widget">
                                    <div className="footer__title">
                                        <h2 className="footer__heading text-uppercase text-white">Quick LInks</h2>
                                    </div>
                                    <div className="footer__menu">
                                        <ul>
                                            <li><Link onClick={ClickHandler} href="/home-4">Home</Link></li>
                                            {/* <li><Link onClick={ClickHandler} href="/about">About us</Link></li> */}
                                            {/* <li><Link onClick={ClickHandler} href="/contact">Contact us</Link></li> */}
                                            <li><Link onClick={ClickHandler} href="/login">Donation</Link></li>
                                            <li><Link onClick={ClickHandler} href="/login">Join Volentter</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mb-30">
                                <h4 className="heading--tertiary mb-4 ff-primary">Turn Leftovers into Lifesavers</h4>
                                                            <div className="row g-3 mt-3">
                                                                <div className="col-6 col-sm-4">
                                                                    <Link onClick={ClickHandler} href="/home-4" className="w-100">
                                                                        <Image src={team1} className="w-100" alt="" />
                                                                    </Link>
                                                                </div>
                                                                <div className="col-6 col-sm-4">
                                                                    <Link onClick={ClickHandler} href="/home-4" className="w-100">
                                                                        <Image src={team2} className="w-100" alt="" />
                                                                    </Link>
                                                                </div>
                                                                <div className="col-6 col-sm-4">
                                                                    <Link onClick={ClickHandler} href="/home-4" className="w-100">
                                                                        <Image src={team3} className="w-100" alt="" />
                                                                    </Link>
                                                                </div>
                                                                <div className="col-6 col-sm-4">
                                                                    <Link onClick={ClickHandler} href="/home-4" className="w-100">
                                                                        <Image src={team4} className="w-100" alt="" />
                                                                    </Link>
                                                                </div>
                                                                <div className="col-6 col-sm-4">
                                                                    <Link onClick={ClickHandler} href="/home-4" className="w-100">
                                                                        <Image src={team5} className="w-100" alt="" />
                                                                    </Link>
                                                                </div>
                                                                <div className="col-6 col-sm-4">
                                                                    <Link onClick={ClickHandler} href="/home-4" className="w-100">
                                                                        <Image src={team6} className="w-100" alt="" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="footer__bottom">
                        <div className="row">
                            <div className="col-12">
                                <hr className="footer__line" />
                            </div>
                            <div className="col mb-20">
                                <div className="footer__copyright pt-20">
                                    <p className="footer__copyright__text mb-0">Copyright@PCS-19 2025 all right receved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;