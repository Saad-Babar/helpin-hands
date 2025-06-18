import React from "react";
import Link from "next/link";
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify';

const Product = ({ products, addToCartProduct, addToWishListProduct, addToCompareListProduct, carts }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const handleAddToCart = (product) => {
    // Always use id = _id for cart
    const productWithId = { ...product, id: product._id };
    if (carts && carts.some(cartItem => cartItem.id === productWithId.id)) {
      toast.info('Already in cart');
      return;
    }
    addToCartProduct(productWithId, 1);
    toast.success('Added to cart');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Added today';
    } else if (diffDays === 2) {
      return 'Added yesterday';
    } else if (diffDays < 7) {
      return `Added ${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="productTop pt-130 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="shopFilter__body">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    {products.length > 0 &&
                      products.slice(0, 12).map((product, pitem) => (
                        <div className="col-lg-3 mb-24" key={pitem}>
                          <div className="productBlock">
                            {product.badge1 ?
                              <span className={`productBlock__tags ${product.badgeClass || ''}`}>{product.badge1}</span>
                              : ''}
                            <figure className="productBlock__thumb">
                              <div className="productBlock__thumb__main">
                                <Link onClick={ClickHandler} href={'/product-single/[slug]'} as={`/product-single/${product.slug}`}>
                                  <img src={product.proImg} alt="Gainioz Product" />
                                </Link>
                              </div>
                              <div className="productBlock__thumb__hover">
                                <Link onClick={ClickHandler} href={'/product-single/[slug]'} as={`/product-single/${product.slug}`}>
                                  <img src={product.proImg2} alt="Gainioz Product" />
                                </Link>
                              </div>
                            </figure>
                            <div className="productBlock__content">
                              <div className="productBlock__content__main">
                                <h3 className="productBlock__name"><Link onClick={ClickHandler} href={'/product-single/[slug]'} as={`/product-single/${product.slug}`}> {product.title}</Link></h3>
                                <span className="productBlock__price">₨{Number(product.price).toLocaleString()}</span>
                                {/* Show location if available */}
                                {product.location && (
                                  <div className="productBlock__location" style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                    <i className="fa-solid fa-map-marker-alt" style={{ marginRight: '5px' }}></i>
                                    {product.location}
                                  </div>
                                )}
                                {/* Show condition if available */}
                                {product.condition && (
                                  <div className="productBlock__condition" style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                                    <i className="fa-solid fa-tag" style={{ marginRight: '5px' }}></i>
                                    {product.condition}
                                  </div>
                                )}
                                {/* Show creation date */}
                                {product.createdAt && (
                                  <div className="productBlock__date" style={{ fontSize: '11px', color: '#999', marginTop: '2px', fontStyle: 'italic' }}>
                                    <i className="fa-solid fa-clock" style={{ marginRight: '5px' }}></i>
                                    {formatDate(product.createdAt)}
                                  </div>
                                )}
                                <span className="productBlock__ratings">
                                  <i className="fa-solid fa-star active"></i>
                                  <i className="fa-solid fa-star active"></i>
                                  <i className="fa-solid fa-star active"></i>
                                  <i className="fa-solid fa-star active"></i>
                                  <i className="fa-solid fa-star"></i>
                                </span>
                              </div>
                              <div className="productBlock__content__hover">
                                <div className="productBlock__actions">
                                  <button type="button" className="btn btn-secondary"
                                    onClick={() => handleAddToCart(product)}
                                    data-tooltip-id="cart-tooltip" data-tooltip-content="Add to Cart"
                                  >
                                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.2363 4H11.5254L8.50195 0.460938C8.29102 0.226562 7.93945 0.203125 7.70508 0.390625C7.4707 0.601562 7.44727 0.953125 7.63477 1.1875L10.0488 4H3.46289L5.87695 1.1875C6.06445 0.953125 6.04102 0.601562 5.80664 0.390625C5.57227 0.203125 5.2207 0.226562 5.00977 0.460938L1.98633 4H0.298828C0.134766 4 0.0175781 4.14062 0.0175781 4.28125V4.84375C0.0175781 5.00781 0.134766 5.125 0.298828 5.125H0.720703L1.37695 9.78906C1.44727 10.3516 1.91602 10.75 2.47852 10.75H11.0332C11.5957 10.75 12.0645 10.3516 12.1348 9.78906L12.791 5.125H13.2363C13.377 5.125 13.5176 5.00781 13.5176 4.84375V4.28125C13.5176 4.14062 13.377 4 13.2363 4ZM11.0332 9.625H2.47852L1.86914 5.125H11.6426L11.0332 9.625ZM7.33008 6.4375C7.33008 6.13281 7.07227 5.875 6.76758 5.875C6.43945 5.875 6.20508 6.13281 6.20508 6.4375V8.3125C6.20508 8.64062 6.43945 8.875 6.76758 8.875C7.07227 8.875 7.33008 8.64062 7.33008 8.3125V6.4375ZM9.95508 6.4375C9.95508 6.13281 9.69727 5.875 9.39258 5.875C9.06445 5.875 8.83008 6.13281 8.83008 6.4375V8.3125C8.83008 8.64062 9.06445 8.875 9.39258 8.875C9.69727 8.875 9.95508 8.64062 9.95508 8.3125V6.4375ZM4.70508 6.4375C4.70508 6.13281 4.44727 5.875 4.14258 5.875C3.81445 5.875 3.58008 6.13281 3.58008 6.4375V8.3125C3.58008 8.64062 3.81445 8.875 4.14258 8.875C4.44727 8.875 4.70508 8.64062 4.70508 8.3125V6.4375Z" fill="#8B8F9E" />
                                    </svg>
                                  </button>
                                  <Tooltip id="cart-tooltip" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="paginationBlock">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                      <li className="page-item page-item--prev disabled">
                        <Link href={'/products'} className="page-link" tabIndex="-1" aria-disabled="true">
                          <i className="fa-solid fa-angle-left"></i>
                        </Link>
                      </li>
                      <div className="paginationBlock__number">
                        <ul>
                          <li className="page-item"><Link href={'/products'} className="page-link">1</Link></li>
                          <li className="page-item"><Link href={'/products'} className="page-link">2</Link></li>
                          <li className="page-item"><Link href={'/products'} className="page-link">3</Link></li>
                          <li className="page-item"><Link href={'/products'} className="page-link">...</Link></li>
                        </ul>
                      </div>
                      <li className="page-item page-item--next">
                        <Link href={'/products'} className="page-link">
                          <i className="fa-solid fa-angle-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
