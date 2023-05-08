import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../assets/rating.png";
import project from "../../assets/planning.png";
import axios from "axios";
import ModalDelete from "../../components/ModalDelete";
import { AddButton } from "../../components/AddButton";

const DetailProject = () => {
  const navigate = useNavigate();
  const [dataAttendance, setDataAttendance] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}project/attendance/list/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataAttendance(res.data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Card className="shadow border-0">
        <Card.Body>
          <Card.Title className="mb-3">Detail Project</Card.Title>
          <Row>
            <Col>
              <Card className="shadow w-25">
                <Card.Body>
                  <Card.Title>Attendance</Card.Title>
                  <AddButton click={() => navigate("/add-attendance/" + id)}>
                    Attendance
                  </AddButton>
                  <Table className="mt-3 border-table">
                    <thead className="bg-table text-white">
                      <tr>
                        <th width="5%">No.</th>
                        <th>Topic</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    {dataAttendance.map((item) => (
                      <tbody>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.topic}</td>
                          {/* <td width="20%">
                            <i
                              className="fa-solid fa-pen-to-square ms-1 pointer"
                              onClick={() =>
                                navigate(`/update-client/${item.id}`)
                              }
                            ></i>
                            <ModalDelete url="client" id={item.id} />
                          </td> */}
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailProject;
