import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Divider, Input, Form, Button, Avatar, InputNumber, Radio, Modal, Typography, Rate, Pagination, message } from "antd";
import { TeamOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { Container, Row, Col } from "reactstrap";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useAuth } from "../../Context/useAuth";

import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import axios from "axios";
import Helmet from "../../Components/Helmet/Helmet";
import BookingForm from "../BookingForm/BookingForm";
import PaymentMethod from "../PaymentMethod/PaymentMethod";

const { TextArea } = Input;
const { Text } = Typography;

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [trustPoint, setTrustPoint] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userAvatar, setUserAvatar] = useState(null)
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const userName = user?.name;
  const userId = user?.userId;
  
  const navigate = useNavigate();

  const pageSize = 5;

  const indexOfLastReview = currentPage * pageSize;
  const indexOfFirstReview = indexOfLastReview - pageSize;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

useEffect(() => {
    // Fetch user's avatar from backend API
    const fetchUserAvatar = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/User/avatar/${user.userId}`); 
        setUserAvatar(response.data.avatar); 
      } catch (error) {
        console.error('Error fetching user avatar:', error);
      }
    };

    if (user) {
      fetchUserAvatar();
    }
  }, [user]);


  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-post-vehicle/${id}`);
        setCarDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/review-car/${id}`);
        const reviewsWithUserData = await Promise.all(response.data.map(async (review) => {
          const userDataResponse = await axios.get(`https://localhost:7228/api/User/${review.userId}`);
          const userData = userDataResponse.data;
          return {
            ...review,
            userName: userData.name,
            userAvatar: userData.avatar
          };
        }));
        setReviews(reviewsWithUserData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    fetchReviews();
  }, [id]);
  
  
  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(`https://localhost:7228/api/Home/add-review?userId=${userId}`, {
        rating,
        trustPoint,
        content: comment,
        postVehicleId: carDetails.id,
      });
  
  
      const newReview = {
        id: response.data.id,
        userName: userName, 
        userAvatar: userAvatar, 
        rating,
        trustPoint,
        content: comment,
        createdDate: response.data.createdDate 
      };
  
      setReviews([newReview, ...reviews]);
      console.log("Review submitted successfully:", response.data);
      console.log("New review:", newReview);

      setComment("");
      setRating(0);
      setTrustPoint(0);
  
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault(); 
     
    const formData = new FormData(event.target);
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));
    const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

   
    const totalPrice = carDetails.price * days;

  
    localStorage.setItem("totalPrice", totalPrice);

    const newBookingData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      note: formData.get("note"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      postVehicleId: carDetails.id,
      totalPrice: totalPrice,
    };
  
    
    setBookingData(newBookingData);
    setShowPaypalModal(true);
  };

  
  const handlePaypalSuccess = async (details, data) => {
    console.log("PayPal payment successful!");
    setShowPaypalModal(false);

    try {
      // Call API order after PayPal payment success
      const response = await axios.post(
        `https://localhost:7228/api/Home/rent-vehicle/${userId}`,
        bookingData 
      );
      setLoading(false); 
      console.log(response.data);
      message.success("Vehicle rented successfully!");
      navigate("/rented-car"); 
    } catch (error) {
      setLoading(false);
      console.error("Error submitting order:", error); 
      message.error("Error submitting order. Please try again.");
    }
  };

    const handlePaypalCancel = () => {
      setShowPaypalModal(false);
      message.error("Payment cancelled!");
      console.log("PayPal payment cancelled!");
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!carDetails) {
    return <p>Car details not found.</p>;
  }

  return (
    <Helmet title={carDetails.vehicleName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={carDetails.image} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{carDetails.vehicleName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${carDetails.price}.00 / Day
                  </h6>

                  <span className="d-flex align-items-center gap-2">
                    <Rate disabled allowHalf value={carDetails.rating} /> 
                    ({carDetails.rating.toFixed(1)} ratings)
                  </span>

                </div>

                <p className="text-2xl font-bold mb-2">{carDetails.title}</p>
                <p className="text-lg text-gray-600">{carDetails.description}</p>

                <div className="flex items-center mt-3" style={{ columnGap: "4rem" }}>
                  <span className="flex items-center gap-1 section__description text-lg">
                    <i className="ri-roadster-line" style={{ color: "#f9a826", fontSize: "24px" }}></i>{" "}
                    Model - {carDetails.vehicleYear}
                  </span>

                  <span className="flex items-center gap-1 section__description text-lg">
                    <i className="ri-settings-2-line" style={{ color: "#f9a826", fontSize: "30px" }}></i>{" "}
                    {carDetails.vehicleType}
                  </span>
                </div>

                <div className="flex items-center mt-3" style={{ columnGap: "4rem" }}>
                  <span className="flex items-center gap-1 section__description text-lg">
                    <TeamOutlined style={{ fontSize: '30px', color: "#f9a826" }} />
                    <span style={{ fontSize: '17px', color: "#7c8a97" }}>{carDetails.vehicleSeat} Seat</span>
                  </span>

                  <span className="flex items-center gap-1 section__description text-lg">
                    <LocalGasStationIcon style={{ color: "#f9a826", fontSize: "24px" }} />
                    <span style={{ fontSize: '17px', color: "#7c8a97" }}>{carDetails.vehicleFuel}</span>
                  </span>
                </div>

                <div className="section__description text-lg mt-3">
                  <EnvironmentOutlined style={{ color: "#f9a826", fontSize: "24px" }} />
                  {carDetails.address}
                </div>
                <div className="section__description text-lg mt-3">
                  <div className="map-container">
                    <iframe
                      title="Google Maps Location"
                      className="thumbnail-img"
                      style={{ border: "0", width: "100%" }}
                      height="300"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE&q=place_id:${carDetails.placeId}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>


              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm name={userName} submitHandler={handleSubmit} />
                
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Information To Rent</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={24}>
              <h3>Leave The Reviews</h3>
              <Form.Item>
                <TextArea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
              </Form.Item>
              <Form.Item label="Rating">
                <Radio.Group onChange={(e) => handleRatingChange(e.target.value)} value={rating}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Radio key={value} value={value}>{value}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Trust Point">
                <InputNumber min={1} max={10} value={trustPoint} onChange={(value) => setTrustPoint(value)} />
              </Form.Item>
              <Form.Item>
              <Button
                htmlType="submit"
                onClick={handleSubmitReview}
                type="primary"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
              >
                Submit Review
              </Button>

              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
          <Col span={24}>
            <h3>Reviews</h3>
            {currentReviews.map((review) => (
              <div key={review.id} className="single__comment d-flex gap-3">
                <Avatar src={review.userAvatar} icon={<UserOutlined />} size={64} />
                <div className="comment__content">
                  <h6 className="fw-bold">{review.userName}</h6>
                  <div>
                    <Text strong>Rating:</Text>{' '}
                    <Rate disabled defaultValue={review.rating} allowHalf={true} value={review.rating} />
                  </div>
                  <div>
                    <Text strong>Trust Point:</Text> {review.trustPoint}
                  </div>
                  <p className="section__description">{review.content}</p>
                </div>
              </div>
            ))}
            {reviews.length > pageSize && (
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={reviews.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            )}
          </Col>


          </Row>
        </Container>
        <Modal
                open={showPaypalModal}
                onCancel={handlePaypalCancel}
                footer={null}
              >
              <PayPalScriptProvider options={{ "client-id": "ARFk56Z6-jq9lnFzDX5bq8pnghtuUynomKwt8PqQiX1wv61d6JMkkD8ioJfYX0GSpPr1HZoxIK8a_5La" }}>
                <PayPalButtons
                  style={{ layout: 'horizontal' }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: localStorage.getItem("totalPrice"),
                        },
                      }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    // Handle successful payment
                    handlePaypalSuccess(data, actions);
                  }}
                  onError={(err) => {
                    // Handle errors
                    console.error('PayPal error:', err);
                    // Optionally, display an error message to the user
                    message.error('An error occurred while processing the payment. Please try again.');
                  }}
                />
              </PayPalScriptProvider>

                <Button onClick={handlePaypalCancel}>Cancel</Button>
              </Modal>
      </section>
    </Helmet>
  );
};

export default CarDetails;
