import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import HeroSlider from "../../UI/HeroSlider/HeroSlider";
import FindCarForm from "../../UI/FindCarForm/FindCarForm";
import AboutSection from "../../UI/AboutSection/AboutSection";
import CarItem from "../../UI/CarItem/CarItem";
import ServicesList from "../../UI/ServiceList/ServiceList";
import BecomeDriverSection from "../../UI/BecomeDriverSection/BecomeDriveSection";
import Testimonial from "../../UI/Testimonial/Testimonial";
import BlogList from "../../UI/BlogList/BlogList";

import carData from "../../assets/data/carData";
import "./Hero.css";

const Hero = () => {


  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>
              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>





      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />
      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>
            <Testimonial />
          </Row>
        </Container>
      </section>

    


      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>
            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Hero;
