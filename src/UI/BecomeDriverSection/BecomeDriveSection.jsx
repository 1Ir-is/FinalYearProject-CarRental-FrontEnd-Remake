import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom"; 

import "./BecomeDriverSection.css";
import driverImg from "../../assets/all-images/toyota-offer-2.png";

const BecomeDriverSection = () => {
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="become__driver-title text-slate-100 font-semibold">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            {/* Use Link from React Router to navigate to the SellerRegistrationPage */}

            <button className="btn become__driver-btn mt-4 text-slate-100">
              <Link to="/register-owner" style={{ textDecoration: 'none', color: '#000d6b' }} onMouseEnter={(e) => e.target.style.color = '#000d6b'} onMouseLeave={(e) => e.target.style.color = '#000d6b'}>
                Become to our partner
              </Link>
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
