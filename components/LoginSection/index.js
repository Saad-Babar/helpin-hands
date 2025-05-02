import React from 'react';
import ContactForm from '../ContactFrom/ContactForm';
import icon1 from '/public/images/update/flag1.png';
import icon2 from '/public/images/update/flag2.png';
import icon3 from '/public/images/update/flag3.png';
import Image from 'next/image';
import LoginForm from '../LoginForm/LoginForm';

const LoginSection = (props) => {
    return (
        <div>
            <div className="contact register--layout1">
                <div className="container">
                    {props.children} {/* Render the children passed from ContactPage */}
                </div>
            </div>
        </div>
    );
};

export default LoginSection;