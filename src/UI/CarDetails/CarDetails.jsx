import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider, Input, Form, Button, Avatar, InputNumber, Radio } from "antd";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../Components/Helmet/Helmet";
import BookingForm from "../BookingForm/BookingForm";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import { TeamOutlined, EnvironmentOutlined } from '@ant-design/icons';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { useAuth } from "../../Context/useAuth";

const { TextArea } = Input;

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [trustPoint, setTrustPoint] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const userId = user?.userId;

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
        setReviews(response.data);
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
  
      // Assuming the server responds with the complete review object including all necessary fields
      const newReview = response.data;
  
      // Update the reviews state with the new review
      setReviews([newReview, ...reviews]);
  
      // Clear the form fields
      setComment("");
      setRating(0);
      setTrustPoint(0);
  
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
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

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({carDetails.rating} ratings)
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
                              <iframe
                className="thumbnail-img"
                frameBorder="0"
                style={{ border: "0" }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE&q=place_id:${carDetails.placeId}`}
                allowFullScreen
              ></iframe>

                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
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
                <Radio.Group onChange={(e) => setRating(e.target.value)} value={rating}>
                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Trust Point">
                <InputNumber min={1} max={10} value={trustPoint} onChange={(value) => setTrustPoint(value)} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" onClick={handleSubmitReview} type="primary">
                  Submit Review
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
          <Col span={24}>
  <h3>Reviews</h3>
  {reviews && reviews.map((review) => (
    <div key={review.id} style={{ marginBottom: "16px" }}>
      <Avatar src={review.avatar} />
      <p>{review.author}</p>
      <p>Rating: {review.rating}</p>
      <p>Trust Point: {review.trustPoint}</p>
      <p>{review.content}</p>
    </div>
  ))}
</Col>

          </Row>


        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
