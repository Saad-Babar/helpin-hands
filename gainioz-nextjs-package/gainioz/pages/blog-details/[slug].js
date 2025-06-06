import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import blogs from '../../api/blogs'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import BlogSingle from '../../components/BlogDetails/BlogDetails';


const BlogDetails = (props) => {

    const router = useRouter()

    const BlogDetails = blogs.find(item => item.slug === router.query.slug)

    return (
        <Fragment>
            <Header hclass={'header--styleFour'} />
            <main className="main">
                <PageTitle pageTitle={BlogDetails?.title} pagesub={'Single Blog'} pageTop={'Blog'}/>
                <BlogSingle/>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;