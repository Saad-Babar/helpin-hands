import React, { useState } from "react";
import Link from 'next/link'
import { toast } from 'react-toastify';

const Product = ({ item, addToCart, carts }) => {
  // State for main image index
  const [mainIdx, setMainIdx] = useState(item.mainImageIdx || 0);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format price
  const formatPrice = (price) => `₨${Number(price).toLocaleString()}`;

  // Add to cart handler with duplicate check
  const handleAddToCart = () => {
    // Always use id = _id for cart
    const productWithId = { ...item, id: item._id };
    if (carts && carts.some(cartItem => cartItem.id === productWithId.id)) {
      toast.info('Already in cart');
      return;
    }
    addToCart(productWithId, 1);
    toast.success('Added to cart');
  };

  return (
    <div className="row align-items-center">
      <div className="col-lg-6 mb-50">
        <div className="productImages-gallery">
          <div className="productImages-gallery__tabs">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <div className="productImages-gallery__main" style={{ overflow: 'hidden', width: '100%', maxWidth: 400 }}>
                  <img
                    src={item.images && item.images.length > 0 ? item.images[mainIdx] : ''}
                    alt={item.productName}
                    style={{ width: '100%', maxWidth: 400, transition: 'transform 0.3s', cursor: 'zoom-in' }}
                    className="zoom-on-hover"
                  />
                </div>
                {/* Gallery thumbnails if more images */}
                {item.images && item.images.length > 1 && (
                  <div className="productImages-gallery__thumbs mt-3" style={{ display: 'flex', flexDirection: 'row' }}>
                    {item.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`thumb-${idx}`}
                        onClick={() => setMainIdx(idx)}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: 'cover',
                          marginRight: 8,
                          border: idx === mainIdx ? '2px solid #7CB030' : '1px solid #eee',
                          borderRadius: 4,
                          cursor: 'pointer',
                          opacity: idx === mainIdx ? 1 : 0.7
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5 mb-50">
        <div className="productDetails-block">
          <h3 className="productDetails-block__heading mb-15">{item.productName}</h3>
          <div className="productDetails-block__price mb-20">
            <span>{formatPrice(item.price)}</span>
          </div>
          <div className="mb-2" style={{ color: '#888' }}>
            <i className="fa-solid fa-map-marker-alt" style={{ marginRight: 5 }}></i>
            {item.city}, {item.state}, {item.country}
          </div>
          <div className="mb-2" style={{ color: '#888' }}>
            <i className="fa-solid fa-tag" style={{ marginRight: 5 }}></i>
            {item.condition}
          </div>
          <div className="mb-2" style={{ color: '#888' }}>
            <i className="fa-solid fa-clock" style={{ marginRight: 5 }}></i>
            {formatDate(item.createdAt)}
          </div>
          <div className="mb-3">
            <strong>Description:</strong>
            <div>{item.description}</div>
          </div>
          <div className="mb-3">
            <strong>Contact:</strong>
            <div>Phone: {item.phone}</div>
            <div>Email: {item.email}</div>
          </div>
          <div className="productDetails-block__buttons">
            <button className="btn btn--styleOne btn--secondary it-btn" onClick={handleAddToCart}>
              <span className="btn__text">Add to cart</span>
              <span className="it-btn__inner">
                <span className="it-btn__blobs">
                  <span className="it-btn__blob"></span>
                  <span className="it-btn__blob"></span>
                  <span className="it-btn__blob"></span>
                  <span className="it-btn__blob"></span>
                </span>
              </span>
              <svg className="it-btn__animation" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter>
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10">
                    </feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo">
                    </feColorMatrix>
                    <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                  </filter>
                </defs>
              </svg>
            </button>
            <Link onClick={ClickHandler} className="btn btn--styleOne btn--primary it-btn" href="/products">
              <span className="btn__text">Back to Shop</span>
              <span className="it-btn__inner">
                <span className="it-btn__blobs">
                  <span className="it-btn__blob"></span>
                  <span className="it-btn__blob"></span>
                  <span className="it-btn__blob"></span>
                  <span className="it-btn__blob"></span>
                </span>
              </span>
              <svg className="it-btn__animation" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter>
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo">
                    </feColorMatrix>
                    <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                  </filter>
                </defs>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add zoom effect CSS
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `.zoom-on-hover:hover { transform: scale(1.15); z-index: 2; }`;
  document.head.appendChild(style);
}

export default Product;
