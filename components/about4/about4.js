import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup';
import shape1 from '/public/images/shapes/love-shape3.svg'
import shape2 from '/public/images/shapes/love-shape4.svg'
import shape3 from '/public/images/shapes/love-shape5.svg'

import icon1 from '/public/images/icons/mission-icon1.svg'
import icon2 from '/public/images/icons/mission-icon2.svg'
import icon3 from '/public/images/icons/mission-icon3.svg'
import icon4 from '/public/images/icons/mission-icon4.svg'

import FeaturesSection3 from '../FeaturesSection3/FeaturesSection3';
import Image from 'next/image';

const About4 = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalMealsFed, setTotalMealsFed] = useState(0);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch('/api/summary');
        const data = await res.json();
        setTotalDonations(data.totalDonations || 0);
        setTotalMealsFed(data.totalMealsFed || 0);
      } catch (err) {
        console.error('Failed to fetch donations summary:', err);
      }
    }
    fetchSummary();
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <section className="about">
      <Image className="about__shape about__shape--one" src={shape1} alt="Gainioz Shape" />
      <Image className="about__shape about__shape--two" src={shape2} alt="Gainioz Shape" />
      <Image className="about__shape about__shape--three" src={shape3} alt="Gainioz Shape" />
      <div className="aboutArea aboutArea--padding position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30">
              <div className="aboutContent">
                <div className="sectionTitle mb-20">
                  <span className="sectionTitle__small">
                    <i className="fa-solid fa-heart btn__icon"></i>
                    about foundation
                  </span>
                  <h2 className="sectionTitle__big">what have we done with your help</h2>
                </div>
                <p className="aboutContent__text">
                  With your support, we have made meaningful progress in fighting food waste and hunger by connecting donors, stores, and NGOs through our platform. Together, we have helped rescue and redistribute thousands of meals, reducing waste and feeding those in need across multiple communities.

                  While there are many initiatives out there, our foundation stands out by leveraging technology to make donation processes transparent, efficient, and impactful.
                </p>
                <span className="aboutContent__quote">join our Action and everyone can help</span>
                <Link onClick={ClickHandler} className="btn btn--styleOne btn--secondary it-btn" href="/donation-listing">
                  <span className="btn__text">donate now</span>
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
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo" />
                        <feBlend in2="goo" in="SourceGraphic" result="mix" />
                      </filter>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-4">
                {/* Total Donations Made */}
                <div className="col-lg-6 col-md-6">
                  <div className="missionBlock bgSecondary">
                    <div className="missionBlock__icon">
                      <Image src={icon1} alt="Donations Icon" width={60} height={60} />
                    </div>
                    <div className="missionBlock__content">
                      <span className="missionBlock__counter">
                        <CountUp end={totalDonations} duration={2} />
                      </span>
                      <p className="missionBlock__title">DONATIONS MADE</p>
                    </div>
                  </div>
                </div>
                {/* People Fed (sum of mealSize) */}
                <div className="col-lg-6 col-md-6">
                  <div className="missionBlock bgPrimary">
                    <div className="missionBlock__icon">
                      <Image src={icon2} alt="People Fed Icon" width={60} height={60} />
                    </div>
                    <div className="missionBlock__content">
                      <span className="missionBlock__counter">
                        <CountUp end={totalMealsFed} duration={2} />
                      </span>
                      <p className="missionBlock__title">PEOPLE FED</p>
                    </div>
                  </div>
                </div>
                {/* You can remove the other two blocks or repurpose them */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturesSection3 />
    </section>
  )
}

export default About4;
