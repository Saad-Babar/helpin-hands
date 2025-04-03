import React from 'react'
import ContactForm from '../ContactFrom/ContactForm'
import icon1 from '/public/images/update/flag1.png'
import icon2 from '/public/images/update/flag2.png'
import icon3 from '/public/images/update/flag3.png'
import Image from 'next/image'


const ContactSection = (props) => {
    return (
        <div>
            <div className="contact contact--layout1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-40">
                            <div className="contactBlock text-center">
                                <figure className="contactBlock__figure">
                                    <Image className="contactBlock__figure__thumb" src={icon1} alt="Gainioz Contact" />
                                </figure>
                                <div className="contactBlock__content">
                                    <h2 className="contactBlock__heading text-uppercase">united states</h2>
                                    <p className="contactBlock__text">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                                    <span className="contactBlock__email connect">info@yourdomain.com</span>
                                    <span className="contactBlock__phone connect">+1266 - 568 - 8894</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-40">
                            <div className="contactBlock text-center">
                                <figure className="contactBlock__figure">
                                    <Image className="contactBlock__figure__thumb" src={icon2} alt="Gainioz Contact" />
                                </figure>
                                <div className="contactBlock__content">
                                    <h2 className="contactBlock__heading text-uppercase">Belgium</h2>
                                    <p className="contactBlock__text">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                                    <span className="contactBlock__email connect">info@yourdomain.com</span>
                                    <span className="contactBlock__phone connect">+1266 - 568 - 8894</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-40">
                            <div className="contactBlock text-center">
                                <figure className="contactBlock__figure">
                                    <Image className="contactBlock__figure__thumb" src={icon3} alt="Gainioz Contact" />
                                </figure>
                                <div className="contactBlock__content">
                                    <h2 className="contactBlock__heading text-uppercase">United Kingdom</h2>
                                    <p className="contactBlock__text">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                                    <span className="contactBlock__email connect">info@yourdomain.com</span>
                                    <span className="contactBlock__phone connect">+1266 - 568 - 8894</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ContactForm/>

                </div>
            </div>
            <div id="myMap">
                <iframe title='title' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14599.594381298903!2d90.42194549999999!3d23.822204699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1644251033908!5m2!1sen!2sbd" width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    )
}

export default ContactSection;