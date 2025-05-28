import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
                <span>Copyright ©</span>
                {new Date().getFullYear()}
            </p>
            <div className="d-flex align-items-center gap-4">
                <a href="#" className="fs-11 fw-semibold text-uppercase">M. Saad Mubeen (2021-BSCS-057)</a>
                <a href="#" className="fs-11 fw-semibold text-uppercase">Syed M. Hamza (2021-BSCS-077)</a>
            </div>
        </footer>
    )
}

export default Footer