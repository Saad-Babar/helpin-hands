import React from 'react'
import ContactForm from '../ContactFrom/ContactForm'
import icon1 from '/public/images/update/flag1.png'
import icon2 from '/public/images/update/flag2.png'
import icon3 from '/public/images/update/flag3.png'
import Image from 'next/image'
import RegisterForm from '../RegisterForm/RegisterForm'


const RegisterSection = (props) => {
    return (
        <div>
            <div className="contact contact--layout1">
                <div className="container">

                    {/* <ContactForm/> */}
                    <RegisterForm />

                </div>
            </div>
        </div>
    )
}

export default RegisterSection;