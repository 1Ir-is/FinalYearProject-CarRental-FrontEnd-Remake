import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../../Components/Helmet/Helmet";
import axios from "axios";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import CommonSection from "../../UI/CommonSection/CommonSection";

import "./ContactPage.css";
import "../../UI/BookingForm/BookingForm.css";

const socialLinks = [
  {
    url: "https://www.facebook.com/minhhuy.huynh.5076",
    icon: "ri-facebook-line",
  },
  {
    url: "https://www.instagram.com/call_me_irisssss/",
    icon: "ri-instagram-line",
  },
  {
    url: "https://github.com/1Ir-is", 
    icon: "ri-github-line", 
  },
  {
    url: "https://twitter.com/MKouhaku",
    icon: "ri-twitter-line",
  },
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://localhost:7228/api/Auth/contact", formData);
      console.log("Response:", response.data);
      message.success("Message sent successfully! We will contact as soon as posible.");
      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      message.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4 text-indigo-900">Contact to Us</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </FormGroup>

                <button className="contact__btn" type="submit" disabled={loading}>
                  {loading ? <Spin indicator={antIcon} /> : "Send Message"}
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold text-indigo-900">
                  Contact Information
                </h6>
                <p className="section__description mb-0">Viet Nam</p>
                <div className="d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0 text-indigo-900">Phone:</h6>
                  <p className="section__description mb-0">+0914048099</p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6 text-indigo-900">Email:</h6>
                  <p className="section__description mb-0">arsherwinphonguniverse@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4 text-indigo-900">Follow Us</h6>

                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <a
                      href={item.url} // Use href instead of Link
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
