import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import client from "../../assets/rating.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Card className="shadow border-0">
        <Card.Body>
          <Card.Title>Menu</Card.Title>
          <Row>
            <Col>
              <div
                className="icon-home pointer"
                onClick={() => navigate("/clients")}
              >
                <Image
                  className="rounded border-dark"
                  width={100}
                  src={client}
                />
                <p className="mt-2 text-center fw-bold">Clients</p>
              </div>
            </Col>
            {/* <Col>
              <div className="w-25">
                <Image
                  className="rounded border-dark"
                  width={100}
                  src={client}
                />
                <p className="mt-1">Clients</p>
              </div>
            </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
