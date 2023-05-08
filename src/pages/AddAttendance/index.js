import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AddAttendance = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [topic, setTopic] = useState("");
  const { id } = useParams();

  const handleSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}project/attendance/create`,
        { id_project: id, topic: topic },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate("/detail-project/" + id);
      })
      .catch((err) => {});
  };

  return (
    <Card className="border-0 shadow-lg">
      <Card.Body>
        <Card.Title className="fw-bold">Add Attendance</Card.Title>
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Topic:</Form.Label>
            <Form.Control
              type="text"
              name="topic"
              placeholder="topic"
              className="w-100 mt-1 rounded-3 p-2 border form-control"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button
          className="btn bg-primary w-25 float-right text-white"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AddAttendance;
