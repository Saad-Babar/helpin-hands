'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiAlignLeft, FiArrowLeft, FiArrowRight, FiMaximize, FiMinimize, FiMoon, FiSun } from "react-icons/fi";
import LanguagesModal from './LanguagesModal';
import NotificationsModal from './NotificationsModal';
import ProfileModal from './ProfileModal';
import SearchModal from './SearchModal';
import TimesheetsModal from './TimesheetsModal';
import HeaderDropDownModal from './HeaderDropDownModal';
import MegaMenu from './megaManu/MegaMenu';
import { NavigationContext } from '../../../../utils/navigationProvider';

const Header = () => {
    const { navigationOpen, setNavigationOpen } = useContext(NavigationContext);
    const [openMegaMenu, setOpenMegaMenu] = useState(false);
    const [navigationExpend, setNavigationExpend] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        typeof window !== 'undefined' ? localStorage.getItem("skinTheme") === "dark" : false
    );

    const miniButtonRef = useRef(null);
    const expendButtonRef = useRef(null);

    useEffect(() => {
        if (openMegaMenu) {
            document.documentElement.classList.add("nxl-lavel-mega-menu-open");
        } else {
            document.documentElement.classList.remove("nxl-lavel-mega-menu-open");
        }
    }, [openMegaMenu]);

    const handleThemeMode = (type) => {
        if (type === "dark") {
            document.documentElement.classList.add("app-skin-dark");
            localStorage.setItem("skinTheme", "dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("app-skin-dark");
            localStorage.setItem("skinTheme", "light");
            setIsDarkMode(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            if (newWindowWidth <= 1024) {
                document.documentElement.classList.remove('minimenu');
                if (document.querySelector('.navigation-down-1600')) {
                    document.querySelector('.navigation-down-1600').style.display = 'none';
                }
            } else if (newWindowWidth >= 1025 && newWindowWidth <= 1400) {
                document.documentElement.classList.add('minimenu');
                if (document.querySelector('.navigation-up-1600')) {
                    document.querySelector('.navigation-up-1600').style.display = 'none';
                }
                if (document.querySelector('.navigation-down-1600')) {
                    document.querySelector('.navigation-down-1600').style.display = 'block';
                }
            } else {
                document.documentElement.classList.remove('minimenu');
                if (document.querySelector('.navigation-up-1600')) {
                    document.querySelector('.navigation-up-1600').style.display = 'block';
                }
                if (document.querySelector('.navigation-down-1600')) {
                    document.querySelector('.navigation-down-1600').style.display = 'none';
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const savedSkinTheme = localStorage.getItem("skinTheme");
        if (savedSkinTheme) {
            handleThemeMode(savedSkinTheme);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNavigationExpendUp = (e, pram) => {
        e.preventDefault();
        setNavigationExpend(pram === "show");
        if (pram === "show") {
            document.documentElement.classList.add('minimenu');
        } else {
            document.documentElement.classList.remove('minimenu');
        }
    };

    const handleNavigationExpendDown = (e, pram) => {
        e.preventDefault();
        setNavigationExpend(pram === "show");
        if (pram === "show") {
            document.documentElement.classList.remove('minimenu');
        } else {
            document.documentElement.classList.add('minimenu');
        }
    };

    const fullScreenMaximize = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestfullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        setIsFullscreen(true);
        document.documentElement.classList.add("fsh-infullscreen");
        document.querySelector("body").classList.add("full-screen-helper");
    };

    const fullScreenMinimize = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setIsFullscreen(false);
        document.documentElement.classList.remove("fsh-infullscreen");
        document.querySelector("body").classList.remove("full-screen-helper");
    };

    return (
        <header className="nxl-header">
            <div className="header-wrapper">
                {/* Header Left */}
                <div className="header-left d-flex align-items-center gap-4">
                    {/* Mobile Toggler */}
                    <a href="#" className="nxl-head-mobile-toggler" onClick={(e) => { e.preventDefault(); setNavigationOpen(true); }} id="mobile-collapse">
                        <div className={`hamburger hamburger--arrowturn ${navigationOpen ? "is-active" : ""}`}>
                            <div className="hamburger-box">
                                <div className="hamburger-inner"></div>
                            </div>
                        </div>
                    </a>

                    {/* Navigation Toggle */}
                    {/* <div className="nxl-navigation-toggle navigation-up-1600">
                        {navigationExpend ? (
                            <a href="#" onClick={(e) => handleNavigationExpendUp(e, "hide")} id="menu-expend-button" ref={expendButtonRef}>
                                <FiArrowRight size={24} />
                            </a>
                        ) : (
                            <a href="#" onClick={(e) => handleNavigationExpendUp(e, "show")} id="menu-mini-button" ref={miniButtonRef}>
                                <FiAlignLeft size={24} />
                            </a>
                        )}
                    </div> */}
                    {/* <div className="nxl-navigation-toggle navigation-down-1600">
                        {navigationExpend ? (
                            <a href="#" onClick={(e) => handleNavigationExpendDown(e, "hide")} id="menu-mini-button" ref={miniButtonRef}>
                                <FiAlignLeft size={24} />
                            </a>
                        ) : (
                            <a href="#" onClick={(e) => handleNavigationExpendDown(e, "show")} id="menu-expend-button" ref={expendButtonRef}>
                                <FiArrowRight size={24} />
                            </a>
                        )}
                    </div> */}

                    {/* Mega Menu Toggle */}
                    {/* <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                        <a href="#" onClick={(e) => { e.preventDefault(); setOpenMegaMenu(true); }} id="nxl-lavel-mega-menu-open">
                            <FiAlignLeft size={24} />
                        </a>
                    </div> */}

                    {/* Mega Menu */}
                    {/* <div className="nxl-drp-link nxl-lavel-mega-menu">
                        <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                            <a href="#" onClick={(e) => { e.preventDefault(); setOpenMegaMenu(false); }} id="nxl-lavel-mega-menu-hide">
                                <i className="me-2"><FiArrowLeft /></i>
                                <span>Back</span>
                            </a>
                        </div>
                        <div className="nxl-lavel-mega-menu-wrapper d-flex gap-3">
                            <HeaderDropDownModal />
                            <MegaMenu />
                        </div>
                    </div> */}
                </div>

                {/* Header Right */}
                <div className="header-right ms-auto">
                    <div className="d-flex align-items-center">
                        {/* <SearchModal /> */}
                        {/* <LanguagesModal /> */}

                        {/* Fullscreen Toggle */}
                        <div className="nxl-h-item d-none d-sm-flex">
                            <div className="full-screen-switcher">
                                <span className="nxl-head-link me-0">
                                    {!isFullscreen ? (
                                        <FiMaximize size={20} className="maximize" onClick={fullScreenMaximize} />
                                    ) : (
                                        <FiMinimize size={20} className="minimize" onClick={fullScreenMinimize} />
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Dark/Light Theme Toggle */}
                        {/* <div className="nxl-h-item dark-light-theme">
                            {isDarkMode ? (
                                <div className="nxl-head-link me-0 light-button" onClick={() => handleThemeMode("light")}>
                                    <FiSun size={20} />
                                </div>
                            ) : (
                                <div className="nxl-head-link me-0 dark-button" onClick={() => handleThemeMode("dark")}>
                                    <FiMoon size={20} />
                                </div>
                            )}
                        </div> */}

                        {/* <TimesheetsModal /> */}
                        <NotificationsModal />
                        <ProfileModal />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;