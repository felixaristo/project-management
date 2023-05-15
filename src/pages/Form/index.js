import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo-qubisa.png";
import dls from "../../assets/poweredbydls.png";
import { Container } from "react-bootstrap";

const Form = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const codeParams = searchParams.get("code");

  const [form, setForm] = useState({
    id_user: "0",
    fullname: "",
    email: "",
    telp: "",
    unit: "",
    code_project_attendance: codeParams,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}project/attendance/detail/` + codeParams,
        {
          headers: {
            Authorization:
              "Basic " +
              btoa(
                `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
              ),
          },
        }
      )
      .then((res) => {
        setCode(res.data.data);
      });
  }, []);

  const submitAttendance = () => {
    if (
      !form.fullname == "" &&
      !form.email == "" &&
      !form.telp == "" &&
      !form.unit == ""
    ) {
      axios
        .post(
          `${process.env.REACT_APP_URL}project/attendance/submit_attendance`,
          form,
          {
            headers: {
              Authorization:
                "Basic " +
                btoa(
                  `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
                ),
            },
          }
        )
        .then((res) => {
          navigate("/thankyou");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Field cannot be empty!");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Container className="p-5 bg-white rounded shadow-lg card-login">
        <div className="d-flex justify-content-between">
          <img src={logo} alt="" width={120} height={40} />
          <img src={dls} alt="" width={100} />
        </div>
        <h3 className="text-center fw-bold">Daftar Hadir Meeting</h3>
        <h4 className="text-center fst-italic">{code?.topic}</h4>
        <form>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Enter your name"
              value={form.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Phone number:</label>
            <input
              type="text"
              name="telp"
              className="form-control"
              placeholder="Enter your phone number"
              value={form.telp}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Unit perusahaan:</label>
            <input
              type="text"
              name="unit"
              className="form-control"
              placeholder="Enter your unit"
              value={form.unit}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="d-grid">
          <span
            className="btn btn-submit text-white"
            onClick={submitAttendance}
          >
            Submit
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Form;
