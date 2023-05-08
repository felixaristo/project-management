import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_URL}auth/login`, form, {
        headers: {
          Authorization:
            "Basic " +
            btoa(
              `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
            ),
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.user.token.access_token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("name", res.data.user.fullname);
        navigate("/");
      })
      .catch((err) => {
        alert("failed");
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Container className="p-5 bg-white rounded shadow-lg card-login">
        <Row>
          <Col md={5} className="mx-5">
            <p className="fs-1 text-center">Login</p>
            <div class="form-group w-100">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="form-control mt-1"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div class="form-group w-100 mt-2">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <p className="text-primary d-flex justify-content-end mt-1 pointer">
              Forgot Password?
            </p>
            <Button
              className="btn btn-primary p-2 w-100 mt-1"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Col>
          <Col md={5}>
            <img
              alt=""
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid mx-5"
              width={750}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
