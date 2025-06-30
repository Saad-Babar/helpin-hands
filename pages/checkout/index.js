import React, {Fragment} from 'react';
import PageTitle from "../../components/pagetitle/PageTitle";
import Header from '../../components/header/Header';
import CheckoutSection from '../../components/CheckoutSection'
import Scrollbar from '../../components/scrollbar/scrollbar'
import {connect} from "react-redux";
import Footer from '../../components/footer/Footer';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);

const CheckoutPage =({cartList}) => {
    const handleStripeCheckout = async () => {
        const stripe = await stripePromise;
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: cartList }),
        });
        const data = await res.json();
        console.log('Stripe session response:', data);
        if (!data.sessionId) {
            alert('Stripe session creation failed: ' + (data.error || 'Unknown error'));
            return;
        }
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
    };

    return(
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <PageTitle pageTitle={'Checkout'} pagesub={'Checkout'}/> 
            <CheckoutSection cartList={cartList}/>
            <div style={{textAlign: 'center', margin: '2rem'}}>
                <button onClick={handleStripeCheckout} className="btn btn--styleOne btn--secondary it-btn">
                    Pay with Card (Stripe Test)
                </button>
            </div>
            <Footer />
            <Scrollbar/>
        </Fragment>
    )
};
const mapStateToProps = state => {
    return {
        cartList: state.cartList.cart,
        symbol: state.data.symbol
    }
};

export default connect(mapStateToProps)(CheckoutPage);
