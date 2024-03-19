import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import "./RegisterPage.css";

type Props = {};

type RegisterFormsInputs = {
  email: string;
  name: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  name: Yup.string().required("name is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.name, form.password);
  };
  return (
    <section className="register-section">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="register-form">
            <h2 className="text-center mb-4">Create an Account</h2>
            <form   onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
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
              <button type="submit" className="btn btn-primary w-100">Sign up</button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default RegisterPage;
