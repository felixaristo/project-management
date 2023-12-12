import React from "react";
import { Container, Dropdown, Image, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/ONE-GML-DLS.png";

const Header = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  return (
    <div className="bg-white shadow-sm">
      <Navbar>
        <Container className="">
          <Image width={140} src={logo} />
          <Dropdown>
            <Dropdown.Toggle className="d-flex gap-2" variant="none">
              <i className="fa-sharp fa-regular fa-circle-user fs-4"></i>
              <span>{name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/login");
                  localStorage.clear();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <Navbar>
        <Container className="mx-5">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <i className="fas fa-house me-2"></i>
              <span>Home</span>
            </Nav.Link>
            <Nav.Link href="#features">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
