import React from 'react'
import Link from 'next/link'
import logo from '/public/images/logos/logo_2.svg'
import team1 from '/public/images/update/team-small-1.jpg'
import team6 from '/public/images/update/team-small-2.jpg'
import team3 from '/public/images/update/team-small-3.jpg'
import team4 from '/public/images/update/team-small-4.jpg'
import team5 from '/public/images/update/team-small-5.jpg'
import team2 from '/public/images/update/team-small-6.jpg'
import Image from 'next/image'

const ClickHandler = () => {
    window.scrollTo(10, 0);
} 


const Footer2 = (props) => {
    return (
        <footer className="footer-section">
            <div className="footer-main pt-95 pb-70">
                <div className="container overflow-hidden">
                    <div className="footer-nav pb-50">
                        <div className="row g-5">
                            <div className="col-md-6 mb-30">
                                <Link onClick={ClickHandler} href="/"><Image src={logo} alt="" /></Link>
                            </div>
                            <div className="col-md-6 d-flex align-items-center justify-content-xl-end mb-30">
                                <ul className="footer-nav__list">
                                    <li className="footer-nav__item">
                                        <Link onClick={ClickHandler} href="/home-4" className="footer-nav__link">About</Link>
                                    </li>
                                    <li className="footer-nav__item">
                                        <Link onClick={ClickHandler} href="/register" className="footer-nav__link">Register</Link>
                                    </li>
                                    <li className="footer-nav__item">
                                        <Link onClick={ClickHandler} href="login" className="footer-nav__link">Login</Link>
                                    </li>
                                    {/* <li className="footer-nav__item">
                                        <Link onClick={ClickHandler} href="/home-4" className="footer-nav__link">Contact Us</Link>
                                    </li>
                                    <li className="footer-nav__item">
                                        <Link onClick={ClickHandler} href="/home-4" className="footer-nav__link">Privacy</Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-3 mb-30">
                            <h4 className="heading--tertiary mb-4 ff-primary">Contact Us</h4>
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
                            {/* <div className="footer__social itSocial mb-0 text-start">
                                <ul>
                                    <li>
                                        <Link onClick={ClickHandler} className="facebook" href="/home-4" rel="nofollow">
                                            <i className="fab fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} className="twitter" href="/home-4" rel="nofollow">
                                            <i className="fab fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} className="instagram" href="/home-4" rel="nofollow">
                                            <i className="fab fa-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} className="linkedin" href="/home-4" rel="nofollow">
                                            <i className="fab fa-linkedin-in"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} className="pinterest" href="/home-4" rel="nofollow">
                                            <i className="fab fa-pinterest-p"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="col-lg-2 mb-30">
                            <h4 className="heading--tertiary mb-4 ff-primary">ABOUT US</h4>
                            <ul className="footer-list">
                                <li><Link onClick={ClickHandler} href="/home-4">About Us</Link></li>
                                {/* <li><Link onClick={ClickHandler} href="/service">Service</Link></li>
                                <li><Link onClick={ClickHandler} href="/donation-listing">Donation</Link></li>
                                <li><Link onClick={ClickHandler} href="/donation-listing">Privacy</Link></li>
                                <li><Link onClick={ClickHandler} href="/donation-listing">Policy</Link></li>
                                <li><Link onClick={ClickHandler} href="/contact">Contact</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-lg-2 mb-30">
                            <h4 className="heading--tertiary mb-4 ff-primary">SUPPORT US</h4>
                            <ul className="footer-list">
                                <li><Link onClick={ClickHandler} href="/login">Donate Now</Link></li>
                                {/* <li><Link onClick={ClickHandler} href="/products">Store</Link></li> */}
                                <li><Link onClick={ClickHandler} href="/login">Become Volunteer</Link></li>
                                <li><Link onClick={ClickHandler} href="/login">Register your Store</Link></li>
                                {/* <li><Link onClick={ClickHandler} href="/contact">Privacy & Policy</Link></li>
                                <li><Link onClick={ClickHandler} href="/donation-listing">Fundraiser</Link></li> */}
                            </ul>
                        </div>
                        {/* <div className="col-lg-2 mb-30">
                            <h4 className="heading--tertiary mb-4 ff-primary">SUPPORT US</h4>
                            <ul className="footer-list">
                                <li><Link onClick={ClickHandler} href="/donation-listing">Donate Now</Link></li>
                                <li><Link onClick={ClickHandler} href="/products">Store</Link></li>
                                <li><Link onClick={ClickHandler} href="/contact">Reports</Link></li>
                                <li><Link onClick={ClickHandler} href="/home-4">Press Releases</Link></li>
                                <li><Link onClick={ClickHandler} href="/contact">Privacy & Policy</Link></li>
                                <li><Link onClick={ClickHandler} href="/donation-listing">Fundraiser</Link></li>
                            </ul>
                        </div> */}
                        <div className="col-lg-3 mb-30">
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
            <div className="footer-copyright">
                Copyright © 2025 All Rights Reserved by <Link onClick={ClickHandler} href="/home-4">PCS-19</Link>
            </div>
        </footer>
    )
}

export default Footer2;