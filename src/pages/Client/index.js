import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/AddButton";
import ModalDelete from "../../components/ModalDelete";

const Client = () => {
  const navigate = useNavigate();
  const [dataClient, setDataClient] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}client/list/`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataClient(res.data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Card className="shadow border-0">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="fw-bold">Clients</Card.Title>
          <AddButton click={() => navigate("/add-client")}>Client</AddButton>
        </div>
        <Table className="mt-2 border-table">
          <thead className="bg-table text-white">
            <tr>
              <th width="5%">No.</th>
              <th>Client Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {dataClient.map((item) => (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td width="20%">
                  <i className="fa-solid fa-pen-to-square ms-1 pointer" onClick={()=>navigate(`/update-client/${item.id}`)}></i>
                  <ModalDelete url="client" id={item.id} />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Client;
