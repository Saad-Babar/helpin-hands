import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { addToCart, addToWishList, addToCompareList } from "../../store/actions/action";
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import Product from '../../components/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopPage = ({ addToCart, addToWishList, addToCompareList, carts }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
        
        // Set up automatic refresh every 5 minutes to check for new products and update badges
        const refreshInterval = setInterval(() => {
            fetchProducts();
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(refreshInterval);
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/products?role=admin');
            const data = await response.json();
            
            if (data.success) {
                // Transform database products to match the expected format
                const transformedProducts = data.products.map(product => {
                    const createdAt = new Date(product.createdAt);
                    const now = new Date();
                    const daysDifference = (now - createdAt) / (1000 * 60 * 60 * 24);
                    
                    return {
                        id: product._id,
                        proImg: product.images && product.images.length > 0 ? product.images[product.mainImageIdx || 0] : '/images/product/product-thumb1.png',
                        proImg2: product.images && product.images.length > 1 ? product.images[1] : '/images/product/product-thumb1.png',
                        title: product.productName,
                        slug: product.productName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'product',
                        price: product.price,
                        delPrice: product.price,
                        category: product.condition || 'General',
                        stock: 'In Stock',
                        size: 'medium',
                        brand: 'User Product',
                        // Show "New Product" badge if product is less than 2 days old
                        badge1: daysDifference < 2 ? 'New Product' : null,
                        badgeClass: daysDifference < 2 ? 'new' : null,
                        // Add user info
                        userId: product.userId,
                        createdAt: product.createdAt,
                        description: product.description,
                        condition: product.condition,
                        location: `${product.city || ''} ${product.state || ''} ${product.country || ''}`.trim(),
                        isNew: daysDifference < 2
                    };
                });
                
                setProducts(transformedProducts);
            } else {
                console.warn('No products found in database, using fallback data');
                // Fallback to static data if no products in database
                const fallbackData = [
                    {
                        id: 1,
                        proImg: "/images/product/product-thumb1.png",
                        proImg2: "/images/product/product-thumb1-1.png",
                        title: "Sample Product",
                        slug: "sample-product",
                        price: "100.00",
                        delPrice: "120.00",
                        category: "General",
                        stock: "In Stock",
                        size: "medium",
                        brand: "Sample Brand",
                        badge1: "New Product",
                        badgeClass: "new",
                        createdAt: new Date().toISOString(),
                        isNew: true
                    }
                ];
                setProducts(fallbackData);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to static data on error
            const fallbackData = [
                {
                    id: 1,
                    proImg: "/images/product/product-thumb1.png",
                    proImg2: "/images/product/product-thumb1-1.png",
                    title: "Sample Product",
                    slug: "sample-product",
                    price: "100.00",
                    delPrice: "120.00",
                    category: "General",
                    stock: "In Stock",
                    size: "medium",
                    brand: "Sample Brand",
                    badge1: "New Product",
                    badgeClass: "new",
                    createdAt: new Date().toISOString(),
                    isNew: true
                }
            ];
            setProducts(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);
    };
    const addToWishListProduct = (product, qty = 1) => {
        addToWishList(product, qty);
    };

    const addToCompareListProduct = (product, qty = 1) => {
        addToCompareList(product, qty);
    };

    return (
        <Fragment>
            <ToastContainer />
            <Header hclass={'header--styleFour'} />
            <main className="main shop-page">
                <PageTitle pageTitle={'Online Shop'} pagesub={'Shop'}/>
                {loading ? (
                    <div className="container pt-130 pb-90">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Loading products...</p>
                            </div>
                        </div>
                    </div>
                ) : (
                <Product
                    addToCartProduct={addToCartProduct}
                    addToWishListProduct={addToWishListProduct}
                    addToCompareListProduct={addToCompareListProduct}
                    products={products}
                    carts={carts}
                />
                )}
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

const mapStateToProps = (state) => ({
    carts: state.cartList.cart,
});

export default connect(mapStateToProps, { addToCart, addToWishList, addToCompareList })(ShopPage);
