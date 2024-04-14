import React, { useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Modal } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatar from "./avatar-1.png";
import { useAuth } from "../../Context/useAuth";
import AccountMenu from "../AccountMenu/AccountMenu";
import axios from "axios";

import "./Navbar.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
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

const Navbar = (props) => {
  const { isLoggedIn, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  

  const menuRef = useRef(null);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("menu__active");
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://localhost:7228/api/Home/find-post-vehicles?search=${searchQuery}`
      );

      if (response.data.length === 0) {
        setModalMessage("No cars found matching your search.");
        setShowModal(true);
      } else {
        navigate("/cars", { state: { searchResults: response.data } });
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim() === "") {
        // If search query is empty, navigate to "/cars" directly
        navigate("/cars");
      } else {
        // Otherwise, perform search
        handleSearch();
      }
    }
  };

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> 0914048099
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
              {isLoggedIn() ? (
                  <>
                  <div className="header__top__right">
                    <AccountMenu />
                    <div className="welcome-text">
                      Welcome, {user?.name}
                    </div>
                  </div>

                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-1"
                    >
                      <i className="ri-login-circle-line"></i> Login
                    </Link>
                    <Link
                      to="/register"
                      className="d-flex align-items-center gap-1"
                    >
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
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
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Viet Nam</h4>
                  <h6 className="text-indigo-900">
                    Da Nang city, Viet Nam
                  </h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6 className="text-indigo-900">10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">


          <span className="mobile__menu flex items-center justify-between"> {/* Changed justify-end to justify-between */}
            <div className="flex items-center mr-44"> {/* Added mr-8 for more margin-right */}
              <i className="ri-menu-line" onClick={toggleMenu}></i> 
              {isLoggedIn() && (
                <div className="header__top__right" style={{ paddingRight: '0', '@media (max-width: 768px)': { paddingRight: '0' } }}> {/* Overriding padding-right */}
                  <AccountMenu />
                  <div className="welcome-text">
                    Welcome, {user?.name}
                  </div>
                </div>
              )}


            </div>
            {!isLoggedIn() && ( 
                <div className="flex items-center">
                <Link
                  to="/login"
                  className="flex items-center gap-1 md:hidden no-underline text-white mr-4" // Added gap-1 class for consistency
                >
                  <i className="ri-login-circle-line text-white"></i> {/* Updated mr-2 for margin-right */}
                  Login 
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1 md:hidden no-underline text-white" // Added gap-1 class for consistency
                >
                  <i className="ri-user-line text-white"></i> {/* Removed mr-1 */}
                  Register 
                </Link>
              </div>
            )}
          </span>






            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "nav__active nav__item"
                        : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search"
                  className="placeholder-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch} disabled={loading}>
                  <i className="ri-search-line text-white"></i>
                </button>
              </div>
            </div>


          </div>
        </Container>
      </div>

      <Modal
        title={
          <span>
            <i className="ri-error-warning-line" style={{ color: 'orange', marginRight: '8px' }}></i>
            No Cars Found
          </span>
        }
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <p>{modalMessage}</p>
      </Modal>

    </header>
  );
};

export default Navbar;
