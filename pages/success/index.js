import React from 'react';
import Link from 'next/link';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const SuccessPage = () => (
  <>
    <Header hclass={'header--styleFour'} />
    <div style={{ textAlign: 'center', margin: '4rem 0' }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your donation/purchase. Your payment was processed successfully.</p>
      <Link href="/products" className="btn btn--styleOne btn--secondary it-btn" style={{ marginTop: 24 }}>
        Back to Shop
      </Link>
    </div>
    <Footer />
  </>
);

export default SuccessPage;