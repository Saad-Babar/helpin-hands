import React from 'react';
import Teams from '../../api/team'
import Link from "next/link";
import Image from 'next/image';


const TeamSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (

        <section className="volunteersSection pb-120 pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sectionTitle text-center mb-70">
                            <span className="sectionTitle__small justify-content-center">
                                <i className="fa-solid fa-heart btn__icon"></i>
                                We Change Your Life & World
                            </span>
                            <h2 className="sectionTitle__big">Meet Our Volunteers</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {Teams.slice(0, 8).map((team, tm) => (
                        <div className="col-lg-3 col-md-6 mb-45" key={tm}>
                            <div className="volunteerBlock text-center">
                                <figure className="volunteerBlock__figure">
                                    <Image className="volunteerBlock__figure__thumb" src={team.tImg} alt="Gainioz Volunteers" />
                                </figure>
                                <div className="volunteerBlock__content">
                                    <h3 className="volunteerBlock__name text-uppercase text-center">
                                        <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>{team.name}</Link>
                                    </h3>
                                    <div className="itSocial itSocial--volunteer">
                                        <ul>
                                            <li>
                                                <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                    <i className="fab fa-facebook-f"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                    <i className="fab fa-twitter"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                    <i className="fab fa-instagram"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} href={'/team-single/[slug]'} as={`/team-single/${team.slug}`}>
                                                    <i className="fab fa-linkedin-in"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default TeamSection;