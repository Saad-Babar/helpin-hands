import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


const MissionVision = (props) => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    return (

        <div className="mvv pt-100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mvvTabs">
                            <div className="mvvTabs__wrapper d-flex align-items-start">
                                <div className="nav nav-pills mb-30" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <Nav tabs className="nav justify-content-center">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggle('1'); }}
                                            >
                                                Our MIssion
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggle('2'); }}
                                            >
                                                Our Vision
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '3' })}
                                                onClick={() => { toggle('3'); }}
                                            >

                                                Our Values
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                                <TabContent activeTab={activeTab} className="mb-30">
                                    <TabPane tabId="1">
                                        <div className="mvvTabs__content">
                                            <h2 className="mvvTabs__heading">Saving Food, Serving Humanity</h2>
                                            <p className="mvvTabs__text mb-25">
                                                Our mission is to combat food waste and hunger through a secure, organized, and technology-driven platform. Every year, over $1 trillion worth of food is wasted globally—causing 8–10% of all greenhouse gas emissions and occupying nearly 30% of agricultural land. Meanwhile, 150 million children under 5 suffer from stunted growth due to malnutrition. We aim to connect donors, NGOs, and volunteers to ensure that surplus food reaches those in need—safely and efficiently.
                                            </p>
                                            <div className="mvvTabs__skills">
                                                <div className="mvvTabs__skills__block mb-20">
                                                    <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">30</span>%</h4>
                                                    <span className="mvvTabs__skills__title color-title">agricultural land wasted</span>
                                                </div>
                                                <div className="mvvTabs__skills__block mb-20">
                                                    <h4 className="mvvTabs__skills__counter">$<span className="mvvTabs__skills__counter">1</span>T</h4>
                                                    <span className="mvvTabs__skills__title color-title">food wasted annually</span>
                                                </div>
                                                <div className="mvvTabs__skills__block mb-20">
                                                    <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">150</span>M</h4>
                                                    <span className="mvvTabs__skills__title color-title">children affected</span>
                                                </div>
                                            </div>
                                            <p className="mvvTabs__text mb-0">
                                                With this platform, we listen to community needs, act through technology, learn from real-time feedback, and repeat the process to create a cycle of sustainable change. Together, we can build a food-secure and waste-free future.
                                            </p>
                                        </div>

                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div className="mvvTabs__content">
    <h2 className="mvvTabs__heading">A Future Without Hunger or Waste</h2>
    <p className="mvvTabs__text mb-25">
        Our vision is a world where no edible food goes to waste, and no one sleeps hungry. By creating a smart, secure, and collaborative food donation ecosystem, we envision bridging the gap between abundance and need—using technology to empower generosity and reduce environmental harm. We strive to normalize food donations and make it as easy and trusted as ordering online.
    </p>
    <div className="mvvTabs__skills">
    <div className="mvvTabs__skills__block mb-20">
        <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">40</span>%</h4>
        <span className="mvvTabs__skills__title color-title">targeted food waste reduction</span>
    </div>
    <div className="mvvTabs__skills__block mb-20">
        <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">500</span>+</h4>
        <span className="mvvTabs__skills__title color-title">planned donations in pilot phase</span>
    </div>
    <div className="mvvTabs__skills__block mb-20">
        <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">100</span>+</h4>
        <span className="mvvTabs__skills__title color-title">expected volunteers at launch</span>
    </div>
</div>

    <p className="mvvTabs__text mb-0">
        Our platform isn't just about food—it’s about dignity, sustainability, and creating a cycle of care. We believe in tech for good, and we’re here to lead the way.
    </p>
</div>

                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div className="mvvTabs__content">
    <h2 className="mvvTabs__heading">Our Core Values</h2>
    <p className="mvvTabs__text mb-25">
        Our project is built on the belief that no one should go hungry while food is being wasted. We are committed to building a system that encourages generosity, ensures transparency, and upholds the dignity of every person involved—from donors to receivers. As we prepare for launch, these values guide every line of code and every decision we make.
    </p>
    <div className="mvvTabs__skills">
        <div className="mvvTabs__skills__block mb-20">
            <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">100</span>%</h4>
            <span className="mvvTabs__skills__title color-title">Transparency in Donations</span>
        </div>
        <div className="mvvTabs__skills__block mb-20">
            <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">0</span>%</h4>
            <span className="mvvTabs__skills__title color-title">Food Wastage Goal</span>
        </div>
        <div className="mvvTabs__skills__block mb-20">
            <h4 className="mvvTabs__skills__counter"><span className="mvvTabs__skills__counter">1</span> Vision</h4>
            <span className="mvvTabs__skills__title color-title">One Ummah, Shared Responsibility</span>
        </div>
    </div>
    <p className="mvvTabs__text mb-0">
        Our mission is not just to reduce food waste, but to create a trusted ecosystem that connects people in need with those who have something to give—securely, responsibly, and compassionately.
    </p>
</div>

                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MissionVision;