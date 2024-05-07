import React, { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { GoogleLogin } from '@react-oauth/google';

import "./LoginPage.css";
import axios from "axios";

type Props = {};

type LoginFormsInputs = {
  Email: string;
  password: string;
};

const validation = Yup.object().shape({
  Email: Yup.string().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      "Password contain at least one uppercase letter, and at least one numeric digit"
    ),
});

const LoginPage = (props: Props) => {
  const { loginUser, loginUserGoogle, logout } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  // Hàm logout khi hết thời gian không hoạt động
  const startLogoutTimer = () => {
    setTimeout(() => {
      logout();
    }, 30 * 60 * 1000); // 30 phút
  };

  useEffect(() => {
    startLogoutTimer(); // Bắt đầu hẹn giờ logout khi component mount
  }, []); // Chỉ chạy một lần khi component mount

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.Email, form.password);
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    
    try {
      const response = await axios.post('https://localhost:7228/api/auth/google-login', { token });
      const userData = response.data;
     
      // Handle user data as needed
      console.log('User data:', userData);

  
      loginUserGoogle(userData.email);
      
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(atob(base64));
        return decodedToken;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
};

  return (
    <section className="login-section">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="login-form">
            <h2 className="text-center mb-4">Sign in to your account</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("Email")}
                />
                {errors.Email && (
                  <p className="text-danger">{errors.Email.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-3">
              <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign in</button>
            </form>
            <p className="text-center mt-3">
              Don’t have an account yet? <Link to="/auth/register">Sign up</Link>
            </p>

            <div className="flex justify-center items-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default LoginPage;
