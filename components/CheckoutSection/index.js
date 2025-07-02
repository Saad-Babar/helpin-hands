import React, { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import { totalPrice } from "../../utils";


const CheckoutSection = forwardRef(({ cartList, onCheckout }, ref) => {

    const router = useRouter()

    const [value, setValue] = useState({
        email: 'user@gmail.com',
        fname: '',
        lname: '',
        company: '',
        country: '',
        post_code: '',
        phone: '',
        note: '',
    });

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };


    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            setValue({
                email: '',
                fname: '',
                lname: '',
                company: '',
                country: '',
                post_code: '',
                phone: '',
                note: '',
            });
            validator.hideMessages();

            const userRegex = /^user+.*/gm;
            const email = value.email;

            if (email.match(userRegex)) {
                toast.success('Order Recived sucessfully!');
                router.push('/checkout')
            } else {
                toast.info('user email not existed!');
            }
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    useImperativeHandle(ref, () => ({
        validateAndGetValues: () => {
            if (validator.allValid()) {
                return { valid: true, values: value };
            } else {
                validator.showMessages();
                return { valid: false };
            }
        }
    }));

    return (
        <Fragment>
            <div className="checkout-area pt-120 pb-120">
                <div className="container">
                    <form onSubmit={submitForm}>
                        <div className="checkout-wrap">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="biling-item">
                                        <div className="heading-title">
                                            <h2>Billing Address</h2>
                                        </div>
                                        <div className="billing-adress">
                                            <div className="contact-form form-style">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <label>First name *</label>
                                                        <input type="text" placeholder="Your first name"
                                                            name="fname"
                                                            value={value.fname}
                                                            onChange={(e) => changeHandler(e)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <label>Last name *</label>
                                                        <input type="text" placeholder="Last name"
                                                            name="lname"
                                                            value={value.lname}
                                                            onChange={(e) => changeHandler(e)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <label>Email address *</label>
                                                        <input type="text" placeholder="Email Address*"
                                                            name="email"
                                                            value={value.email}
                                                            onChange={(e) => changeHandler(e)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <label>Company name (optional)</label>
                                                        <input type="text" placeholder="Company name" id="cname"
                                                            name="company"
                                                            value={value.company}
                                                            onChange={(e) => changeHandler(e)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <select className="form-control"
                                                            name="country"
                                                            value={value.country}
                                                            onChange={(e) => changeHandler(e)}
                                                        >
                                                            <option disabled="" selected="">Country / Region *</option>
                                                            <option>United States (USA)</option>
                                                            <option>South Africa</option>
                                                            <option>Australia</option>
                                                            <option>Srilanka</option>
                                                            <option>Pakistan</option>
                                                            <option>Canada</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <label>Steet address line 1*</label>
                                                        <input type="text" placeholder="Steet address line 1" id="address" name="address" />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <input type="text" placeholder="Steet address line 2" id="address2" name="address2" />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <select name="address" id="City" className="form-control">
                                                            <option disabled="" selected="">Town / City *</option>
                                                            <option>Islamabad</option>
                                                            <option>Lahore</option>
                                                            <option>Faisalabad</option>
                                                            <option>Karachi</option>
                                                            <option>Quetta</option>
                                                            <option>Peshawar</option>
                                                            <option>Multan</option>
                                                            <option>Rawalpindi</option>
                                                            <option>Sialkot</option>
                                                        </select>
                                                    </div>
                                                    {/* <div className="col-lg-12 col-md-12 col-12">
                                                        <select name="address" id="state" className="form-control">
                                                            <option disabled="" selected="">State *</option>
                                                            <option>United States (USA)</option>
                                                            <option>South Africa</option>
                                                            <option>Australia</option>
                                                            <option>Srilanka</option>
                                                            <option>Pakisthan</option>
                                                            <option>Canada</option>
                                                        </select>
                                                    </div> */}
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <label>Zip/ Postal code *</label>
                                                        <input type="text" placeholder="Zip/ Postal code *" id="Post2"
                                                            name="post_code"
                                                            value={value.post_code}
                                                            onChange={(e) => changeHandler(e)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <label>Phone Number</label>
                                                        <input type="text" placeholder="Phone number"
                                                            name="phone"
                                                            value={value.phone}
                                                            onChange={(e) => changeHandler(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="checkout-order-area">
                                        <h3>Your Order</h3>
                                        <div className="oreder-item">
                                            <div className="title bg-title">
                                                <h2>Products <span>Subtotal</span></h2>
                                            </div>
                                            {cartList.map(item => (
                                                <div className="oreder-product" key={item.id}>
                                                    <div className="images">
                                                        <span>
                                                            <img src={item.proImg} alt="" />
                                                        </span>
                                                        <small>{item.title} ${item.price} x {item.qty}</small>
                                                    </div>
                                                    <span> ${item.qty * item.price}</span>
                                                </div>
                                            ))}
                                            <div className="title s1">
                                                <h2>Subtotal<span>${totalPrice(cartList)}</span></h2>
                                            </div>
                                            <div className="title s2">
                                                <h2>Total<span>${totalPrice(cartList)}</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
});


export default CheckoutSection;