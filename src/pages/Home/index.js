import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import client from "../../assets/rating.png";
import project from "../../assets/planning.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Card className="shadow border-0">
        <Card.Body>
          <Card.Title className="mb-3">Menu</Card.Title>
          <Row xs="auto">
            <Col>
              <div
                className="icon-home pointer"
                onClick={() => navigate("/client")}
              >
                <Image className="rounded-img" width={120} src={client} />
                <p className="mt-2 text-center fw-bold">Clients</p>
              </div>
            </Col>
            <Col>
              <div
                className="icon-home pointer"
                onClick={() => navigate("/project")}
              >
                <Image className="rounded-img" width={120} src={project} />
                <p className="mt-2 text-center fw-bold">Projects</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
