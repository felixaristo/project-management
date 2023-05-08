import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AddButton } from "../../components/AddButton";
import ModalDelete from "../../components/ModalDelete";

const Project = () => {
  const navigate = useNavigate();
  const [dataProject, setDataProject] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}project/list`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataProject(res.data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Card className="shadow border-0">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="fw-bold">Projects</Card.Title>
          <AddButton click={() => navigate("/add-project")}>Project</AddButton>
        </div>
        <Table onLoad={isLoading} className="mt-2 border-table">
          <thead className="bg-table text-white">
            <tr>
              <th width="5%">No.</th>
              <th>Project Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {dataProject.map((item) => (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td width="20%">
                  <i
                    class="fa-solid fa-circle-info ms-1 pointer"
                    onClick={() => navigate(`/detail-project/${item.id}`)}
                  ></i>
                  <i
                    className="fa-solid fa-pen-to-square ms-4 pointer"
                    onClick={() => navigate(`/update-project/${item.id}`)}
                  ></i>
                  <ModalDelete url="project" id={item.id} />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Project;
