import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },
  {
    path: "#",
    display: "Privacy Policy",
  },
  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link
                  to="/home"
                  className=" d-flex align-items-center gap-2"
                >
                  <i className="ri-car-line"></i>
                  <span>
                    Rent Car <br /> Service
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content text-justify">
              Welcome to AutoRent DaNang! We specialize in providing premium car rental services for your travel needs. Whether it's for business or leisure, our diverse fleet of vehicles ensures that you'll find the perfect ride for your journey. With AutoRent DaNang, your comfort and satisfaction are our top priorities. Explore the beauty of Da Nang and beyond with us today!
            </p>


          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    className="p-0 mt-3 quick__link"
                  >
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">Ngu Hanh Son, Da Nang</p>
              <p className="office__info">Phone: +0914048099</p>
              <p className="office__info">Email: arsherwinphonguniverse@gmail.com</p>
              <p className="office__info">Office Time: 10am - 7pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">
                Subscribe our newsletter
              </p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i className="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col>
          {/* Add the iframe here */}
          <Col lg="12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.6771679536046!2d108.23336217576042!3d16.082233839088417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421820f41ac5b7%3A0x4c5f5c4abc7a1212!2zNjU4IE5nLiBRdXnhu4FuLCBBbiBI4bqjaSBC4bqvYywgU8ahbiBUcsOgLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1713449946547!5m2!1svi!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                AutoRent DaNang&nbsp;© 2024 AutoRent DaNang, Inc. All Rights
                Reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
