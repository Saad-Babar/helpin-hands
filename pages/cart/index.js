import React, { Fragment } from "react";
import Header from "../../components/header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { Grid } from "@mui/material";
import Link from "next/link";
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import { Tooltip } from 'react-tooltip'
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/actions/action";
import Footer from "../../components/footer/Footer";

import cartEmpty from '/public/images/cart-empty.png'
import Image from "next/image";

const CartPage = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { carts } = props;

  return (
    <Fragment>
      <Header hclass={'header--styleFour'} />
      <PageTitle pageTitle={"Shopping Cart"} pagesub={"Cart"} />
      <div className="cart-area pt-120 pb-120">
        <div className="container">
          <div className="form">
            <div className="cart-wrapper">
              <div className="row">
                <div className="col-12">
                  {carts && carts.length > 0 ? (
                    <form action="cart">
                      <table className="table-responsive cart-wrap">
                        <thead>
                          <tr>
                            <th className="product-2">Product</th>
                            <th className="pr">Price</th>
                            <th className="ptice">Quantity</th>
                            <th className="stock">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carts.map((catItem, crt) => (
                            <tr key={crt}>
                              <td className="product">
                                <ul>
                                  <li><img src={catItem.proImg} alt="" /></li>
                                  <li className="first-cart">{catItem.title}</li>
                                  <li className="close" onClick={() =>
                                    props.removeFromCart(catItem.id)
                                  }
                                    data-tooltip-id="cart-tooltip"
                                    data-tooltip-content="Remove from cart"
                                    data-tooltip-place="top">
                                    <i className="ti-close"></i>
                                    <Tooltip id="cart-tooltip" />
                                  </li>
                                </ul>
                              </td>
                              <td className="price">₨{Number(catItem.price).toLocaleString()}</td>
                              <td className="stock">
                                <ul className="input-style">
                                  <span className="cart-qty">{catItem.qty}</span>
                                </ul>
                              </td>
                              <td className="price">₨{Number(catItem.qty * catItem.price).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </form>
                  ) : (
                    <div className="empty-area">
                      <div className="icon">
                        <Image src={cartEmpty} alt="" />
                      </div>
                      <p>Your cart is empty Now!</p>
                      <Link onClick={ClickHandler} className="btn btn--styleOne btn--secondary it-btn" href="/products">
                        <span className="btn__text">Shop Now</span>
                        <i className="fa-solid fa-heart btn__icon"></i>
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
                      </Link>
                    </div>
                  )}
                  {carts && carts.length > 0 && (
                    <>
                      {/* <div className="submit-btn-area">
                        <div className="left-coupon">
                          <h3>Have a discount code?</h3>
                          <div className="form-group">
                            <input type="text" placeholder="Coupon code" />
                            <button type="button">Apply Coupon</button>
                          </div>
                        </div>
                        <ul>
                          <li><button type="submit">Update Cart</button></li>
                        </ul>
                      </div> */}
                      <div className="cart-product-list">
                        <ul>
                          <li>Subtotal<span>₨{Number(totalPrice(carts)).toLocaleString()}</span></li>
                          <li className="cart-b">Total Price<span>₨{Number(totalPrice(carts)).toLocaleString()}</span></li>
                          <li><Link className="c-btn" onClick={ClickHandler} href="/checkout"><i className="icon-privacy"></i> Proceed to Checkout</Link></li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};
export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);