import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router'
import Header from '../../components/header/Header';
import { connect } from "react-redux";
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import { addToCart } from "../../store/actions/action";
import Product from './product';
import api from "../../api";
import Footer from '../../components/footer/Footer';
import ProductTabs from './alltab';

const ProductSinglePage = (props) => {
    const router = useRouter()

    const productsArray = api();
    const Allproduct = productsArray

    const { addToCart } = props;

    const initialProducts = Allproduct.filter(prod => prod.slug === router.query.slug);
    const [product, setProduct] = useState(initialProducts);

    useEffect(() => {
        setProduct(Allproduct.filter(prod => prod.slug === router.query.slug));
      }, [Allproduct, router.query.slug]);

    const item = product[0];

    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <PageTitle pageTitle={item?.title} pagesub={'Product'} />
            <section className="product-details pt-130 pb-100">
                <div className="container">
                    {item ? (
                        <Product item={item} addToCart={addToCart} />
                    ) : null}
                    <ProductTabs />
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.data.products,
    };
};

export default connect(mapStateToProps, { addToCart })(ProductSinglePage);