import React, { useState } from "react";
import Stories from '../../api/stories'
import Link from "next/link";
import shape from '/public/images/shapes/portfolio-shape.png'
import Image from "next/image";

const StoriesSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    return (

        <section className="portfolio">
            <div className="container-fluid p-0 overflow-hidden">
                <div className="row g-0">
                    {Stories.slice(0, 3).map((stories, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className={`portfolioBlock position-relative ${activeIndex === index ? "portfolioBlock--active" : ""}`}
                                onMouseEnter={() => handleMouseEnter(index)}  >
                                <figure className="portfolioBlock__figure">
                                    <Image className="portfolioBlock__figure__thumb" src={stories.pImg} alt="Gainioz Portfolio" />
                                    <div className="portfolioBlock__figure__shape">
                                        <Image src={shape} alt="Gainioz" />
                                    </div>
                                </figure>
                                <div className="portfolioBlock__content">
                                    <h2 className="portfolioBlock__heading text-uppercase"><Link onClick={ClickHandler} href={'/story-details/[slug]'} as={`/story-details/${stories.slug}`}>{stories.title}</Link></h2>

                                    <Link onClick={ClickHandler} href={'/story-details/[slug]'} as={`/story-details/${stories.slug}`} className="portfolioBlock__hashLink"><span># Read More</span></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StoriesSection;