import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ModalDelete = ({ url, id }) => {
  const [show, setShow] = useState(false);
  const [idClient, setIdClient] = useState("");
  const token = localStorage.getItem("token");

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}${url}/delete/${idClient}`,
        { id_client: idClient },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <i
        className="fa-solid fa-trash ms-4 pointer"
        onClick={() => {
          setShow(true);
          setIdClient(id);
        }}
      ></i>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Confirmation</p>
          <p>Are you sure you want to delete this?</p>
          <div className="d-flex justify-content-center">
            <div
              className="btn bg-primary mx-2 text-white px-4"
              onClick={handleDelete}
            >
              OK
            </div>
            <div
              className="btn bg-primary mx-2 text-white px-4"
              onClick={() => setShow(false)}
            >
              Cancel
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDelete;
