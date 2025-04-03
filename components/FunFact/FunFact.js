import React from 'react'
import CountUp from 'react-countup';
import map from '/public/images/map/map-fact.png'
import CtaSection from '../CtaSection/CtaSection';


const FunFact = [
    {
        title: '16000',
        subTitle: 'Food',
        symbol: 'kg',
        des: 'We help local nonprofits access the funding, tools, training,',
        sclass: 'factBlock--one',
    },
    {
        title: '23',
        subTitle: 'Education ',
        symbol: 'mln',
        des: 'We help local nonprofits access the funding, tools, training,',
        sclass: 'factBlock--two',
    },
    {
        title: '14000',
        subTitle: 'Food',
        symbol: '+',
        des: 'We help local nonprofits access the funding, tools, training,',
        sclass: 'factBlock--three',
    },
    {
        title: '16000',
        subTitle: 'Water',
        symbol: 'kg',
        des: 'We help local nonprofits access the funding, tools, training,',
        sclass: 'factBlock--four',
    },
    {
        title: '25',
        subTitle: 'Food',
        symbol: 'mln',
        des: 'We help local nonprofits access the funding, tools, training,',
        sclass: 'factBlock--five',
    },

]


const FunFactSection = (props) => {

    return (

        <section className="fact fact--layout1 position-relative pt-125 pb-95">
            <img src={map} alt="Gainioz" className="fact__map position-absolute" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-8 mx-auto">
                        <div className="sectionTitle text-center mb-65">
                            <span className="sectionTitle__small justify-content-center">
                                <i className="fa-solid fa-heart btn__icon"></i>
                                need your help
                            </span>
                            <h2 className="sectionTitle__big">we are always where others need help</h2>
                        </div>
                    </div>
                </div>
                <div className="factWrapper">
                    <div className="row gx-50">
                        {FunFact.slice(0, 3).map((funfact, fitem) => (
                            <div className="col-lg-4" key={fitem}>
                                <div className={`factBlock ${funfact.sclass}`}>
                                    <h3 className="factBlock__heading"><span className="factBlock__number"><CountUp end={funfact.title} enableScrollSpy /></span><span
                                        className="factBlock__ext">{funfact.symbol}</span>
                                    </h3>
                                    <span className="factBlock__tag">{funfact.subTitle}</span>
                                    <p className="factBlock__text">{funfact.des}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="factWrapper factWrapper--two">
                    <div className="row justify-content-center gx-50">
                        {FunFact.slice(3, 5).map((funfact, fitem) => (
                            <div className="col-lg-4" key={fitem}>
                                <div className={`factBlock ${funfact.sclass}`}>
                                    <h3 className="factBlock__heading"><span className="factBlock__number"><CountUp end={funfact.title} enableScrollSpy /></span><span
                                        className="factBlock__ext">,{funfact.symbol}</span>
                                    </h3>
                                    <span className="factBlock__tag">{funfact.subTitle}</span>
                                    <p className="factBlock__text">{funfact.des}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CtaSection/>
            </div>
        </section>
    )
}

export default FunFactSection;