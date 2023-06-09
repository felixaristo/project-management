import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateClient = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const { id } = useParams();

  const handleUpdate = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL}client/update/${id}`,
        { name: name },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate("/client");
      })
      .catch((err) => {});
  };

  const handlePic = (e) => {
    e.preventDefault();
    setIcon(e.target.files[0]);
  };

  return (
    <Card className="border-0 shadow-lg">
      <Card.Body>
        <Card.Title className="fw-bold">Update Client</Card.Title>
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="name"
              className="w-100 mt-1 rounded-3 p-2 border form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
        {/* <div className="mb-3">
            {icon ? (
              <img alt="" width={150} src={URL.createObjectURL(icon)} />
            ) : (
              ""
            )}
            <label>Icon:</label>
            <input
              type="file"
              name="icon"
              className="form-control mt-1"
              value={name}
              onChange={handlePic}
            />
          </div> */}
        <Button
          className="btn bg-primary w-25 float-right text-white"
          onClick={handleUpdate}
        >
          Submit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UpdateClient;
