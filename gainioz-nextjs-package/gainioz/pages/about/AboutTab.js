import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import aImg from '/public/images/map/map-about-tab.svg'
import aImg1 from '/public/images/about/aboutDetailsthumb1.jpg'
import aImg2 from '/public/images/about/aboutDetailsthumb2.jpg'
import aImg3 from '/public/images/about/aboutDetailsthumb3.jpg'
import Image from 'next/image';


const AboutTab = (props) => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    return (
        <div className="about position-relative">
            <Image src={aImg} alt="Gainioz" className="map-about-tab" />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="featureTab">
                            <Nav tabs className="nav justify-content-center">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        about foundation
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        our mission
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '3' })}
                                        onClick={() => { toggle('3'); }}
                                    >

                                        our vission
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab} className="pt-55">
                                <TabPane tabId="1">
                                    <div className="row">
                                        <div className="col-lg-10 mx-auto">
                                            <div className="aboutDetails text-center">
                                                <p className="aboutDetailsText mb-20">Rorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod
                                                    tempor incididunt ut labore et dolore magna
                                                    aliqua. Ut enim ad minim veniam, quis exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo.
                                                </p>
                                                <p className="aboutDetailsText mb-20">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                    accusantium
                                                    doloremque laudantium, totam rem aperiam,
                                                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                                    explicabo.
                                                    Nemo enim ipsam
                                                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                                                    eos
                                                    qui ratione
                                                    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                                    consectetur, adipisci velit,
                                                    loremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                                    architecto beatae vitae
                                                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                                                    fugit,
                                                </p>
                                            </div>
                                            <div className="aboutDetailsThumbs pt-100">
                                                <div className="row g-0 align-items-center">
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb">
                                                            <Image src={aImg1} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb aboutDetailsThumb--big">
                                                            <Image src={aImg2} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb">
                                                            <Image src={aImg3} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="row">
                                        <div className="col-lg-10 mx-auto">
                                            <div className="aboutDetailsThumbs">
                                                <div className="row g-0 align-items-center">
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb">
                                                            <Image src={aImg1} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb aboutDetailsThumb--big">
                                                            <Image src={aImg2} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb">
                                                            <Image src={aImg3} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="aboutDetails text-center  pt-100">
                                                <p className="aboutDetailsText mb-20">Rorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod
                                                    tempor incididunt ut labore et dolore magna
                                                    aliqua. Ut enim ad minim veniam, quis exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo.
                                                </p>
                                                <p className="aboutDetailsText mb-20">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                    accusantium
                                                    doloremque laudantium, totam rem aperiam,
                                                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                                    explicabo.
                                                    Nemo enim ipsam
                                                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                                                    eos
                                                    qui ratione
                                                    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                                    consectetur, adipisci velit,
                                                    loremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                                    architecto beatae vitae
                                                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                                                    fugit,
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                <div className="row">
                                        <div className="col-lg-10 mx-auto">
                                            <div className="aboutDetails text-center">
                                                <p className="aboutDetailsText mb-20">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                    accusantium
                                                    doloremque laudantium, totam rem aperiam,
                                                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                                    explicabo.
                                                    Nemo enim ipsam
                                                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                                                    eos
                                                    qui ratione
                                                    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                                    consectetur, adipisci velit,
                                                    loremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                                    architecto beatae vitae
                                                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                                                    fugit,
                                                </p>
                                                <p className="aboutDetailsText mb-20">Rorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod
                                                    tempor incididunt ut labore et dolore magna
                                                    aliqua. Ut enim ad minim veniam, quis exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo.
                                                </p>
                                            </div>
                                            <div className="aboutDetailsThumbs pt-100">
                                                <div className="row g-0 align-items-center">
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb">
                                                            <Image src={aImg1} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb aboutDetailsThumb--big">
                                                            <Image src={aImg2} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="aboutDetailsThumb">
                                                            <Image src={aImg3} alt="About Gainioz" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutTab;