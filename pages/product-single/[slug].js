import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Header from '../../components/header/Header';
import { connect } from "react-redux";
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import { addToCart } from "../../store/actions/action";
import Product from './product';
import Footer from '../../components/footer/Footer';
import ProductTabs from './alltab';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductSinglePage = (props) => {
    const router = useRouter();
    const { addToCart, carts } = props;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!router.query.slug) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/products?slug=${router.query.slug}`);
                const data = await response.json();
                if (data.success && data.products && data.products.length > 0) {
                    // Transform to match Product component props
                    const prod = data.products[0];
                    setProduct({
                        ...prod,
                        proImg: prod.images && prod.images.length > 0 ? prod.images[prod.mainImageIdx || 0] : '/images/product/product-thumb1.png',
                        title: prod.productName,
                        price: prod.price,
                    });
                } else {
                    setProduct(null);
                }
            } catch (error) {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [router.query.slug]);

    return (
        <Fragment>
            <ToastContainer />
            <Header hclass={'header--styleFour'} />
            <PageTitle pageTitle={product?.title || 'Product'} pagesub={'Product'} />
            <section className="product-details pt-130 pb-100">
                <div className="container">
                    {loading ? (
                        <div className="text-center py-5">Loading product details...</div>
                    ) : product ? (
                        <Product item={product} addToCart={addToCart} carts={carts} />
                    ) : (
                        <div className="text-center py-5">Product not found.</div>
                    )}
                    <ProductTabs />
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    carts: state.cartList.cart,
});

export default connect(mapStateToProps, { addToCart })(ProductSinglePage);