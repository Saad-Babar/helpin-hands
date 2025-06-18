import React from 'react';
import Link from 'next/link';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const CancelPage = () => (
  <>
    <Header hclass={'header--styleFour'} />
    <div style={{ textAlign: 'center', margin: '4rem 0' }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was not completed. You can try again or contact support if you need help.</p>
      <Link href="/checkout" className="btn btn--styleOne btn--secondary it-btn" style={{ marginTop: 24 }}>
        Return to Checkout
      </Link>
    </div>
    <Footer />
  </>
);

export default CancelPage;