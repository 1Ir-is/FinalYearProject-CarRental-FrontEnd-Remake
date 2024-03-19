import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import "./LoginPage.css";

type Props = {};

type LoginFormsInputs = {
  Email: string;
  password: string;
};

const validation = Yup.object().shape({
  Email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.Email, form.password);
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
                <Link to="#" className="forgot-password-link">Forgot password?</Link>
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign in</button>
            </form>
            <p className="text-center mt-3">
              Don’t have an account yet? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default LoginPage;
