import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../assets/rating.png";
import project from "../../assets/planning.png";
import axios from "axios";
import ModalDelete from "../../components/ModalDelete";
import { AddButton } from "../../components/AddButton";

const DetailProject = () => {
  const navigate = useNavigate();
  const [dataAttendance, setDataAttendance] = useState([""]);
  const [dataFiles, setDataFiles] = useState([""]);
  const [dataFolder, setDataFolder] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalAddFile, setModalAddFile] = useState(false);
  const [modalUpdateFile, setModalUpdateFile] = useState(false);
  const [modalAddFolder, setModalAddFolder] = useState(false);
  const [modalUpdateFolder, setModalUpdateFolder] = useState(false);
  const [modalManageFolder, setModalManageFolder] = useState(false);
  const [modalListMom, setModalListMom] = useState(false);
  const [folder, setFolder] = useState("");
  const [idFolder, setIdFolder] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [idUpdateFolder, setIdUpdateFolder] = useState("");
  const [idUpdateFile, setIdUpdateFile] = useState("");
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
    axios
      .get(`${process.env.REACT_APP_URL}project/files/list/10/1`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataFiles(res.data.data);
        setIsLoading(false);
      });
    axios
      .get(`${process.env.REACT_APP_URL}project/files/folder/list`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataFolder(res.data.data);
        setIsLoading(false);
      });
  }, []);

  const addFolder = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}project/files/folder/add`,
        { name: folder },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload(false);
      });
  };

  const updateFolder = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL}project/files/folder/update/${idUpdateFolder}`,
        { name: folder },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload(false);
      });
  };

  const addFile = () => {
    const PPData = new FormData();
    PPData.append("title", title);
    PPData.append("file", file);
    PPData.append("id_folder", idFolder);
    axios
      .post(`${process.env.REACT_APP_URL}project/files/add`, PPData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        window.location.reload(false);
      });
  };

  return (
    <div>
      <Card className="shadow border-0">
        <Card.Body>
          <Card.Title className="mb-3">Detail Project</Card.Title>
          <Row>
            <Col md={12}>
              <Card className="shadow-lg">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-0">Attendance</Card.Title>
                    <AddButton click={() => navigate("/add-attendance/" + id)}>
                      Attendance
                    </AddButton>
                  </div>
                  <Table className="mt-2 border-table">
                    <thead className="bg-table text-white">
                      <tr>
                        <th width="5%">No.</th>
                        <th width="30%">Topic</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {dataAttendance.map((item) => (
                      <tbody>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.topic}</td>
                          <td></td>
                          <td width="15%">
                            <i
                              className="fa-solid fa-pen-to-square ms-1 pointer"
                              onClick={() =>
                                navigate(`/update-client/${item.id}`)
                              }
                            ></i>
                            <ModalDelete url="client" id={item.id} />
                            <i
                              class="fa-solid fa-copy ms-4 pointer"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  `localhost:3000/attendance-user?code=${item.code}`
                                )
                              }
                            ></i>
                            <i class="bi bi-list-ul ms-4 pointer icon-bold" onClick={()=>setModalListMom(true)}></i>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="mt-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Team</Card.Title>
                    <AddButton click={() => navigate("/add-attendance/" + id)}>
                      Attendance
                    </AddButton>
                  </div>
                  <Table className="mt-2 border-table">
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
            <Col md={12} className="mt-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Files</Card.Title>
                    <div>
                      <AddButton click={() => setModalAddFile(true)}>
                        Files
                      </AddButton>
                      <Button
                        className="bg-table text-white"
                        onClick={() => setModalManageFolder(true)}
                      >
                        Manage Folder
                      </Button>
                    </div>
                  </div>
                  <Table className="mt-2 border-table">
                    <thead className="bg-table text-white">
                      <tr>
                        <th width="5%">No.</th>
                        <th width="25%">Folder Name</th>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {dataFiles.map((item) => (
                      <tbody>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.folder_name}</td>
                          <td>{item.title}</td>
                          <td width="15%">
                            <i
                              className="fa-solid fa-pen-to-square ms-1 pointer"
                              onClick={() => {
                                setIdUpdateFile(item.id);
                                setModalUpdateFile(true);
                              }}
                            ></i>
                            <ModalDelete url="project/files" id={item.id} />
                            <a href={item.file} target="_blank">
                              <i class="bi bi-box-arrow-up-right ms-4 text-dark icon-bold"></i>
                            </a>
                          </td>
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

      {/* modal list mom */}
      <Modal
        show={modalListMom}
        onHide={() => setModalListMom(false)}
      >
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <Modal.Title className="fs-4 fw-bold">List MoM</Modal.Title>
            <Button
              className="bg-table text-white"
              onClick={() => {
                // setModalAddFolder(true);
                setModalListMom(false);
              }}
            >
              Add MoM
            </Button>
          </div>
          <Table className="mt-2">
            <thead className="bg-table text-white">
              <tr>
                <th width="5%">No.</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataFolder.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td width="20%">
                    <i
                      className="fa-solid fa-pen-to-square ms-1 pointer"
                      onClick={() => {
                        setIdUpdateFolder(item.id);
                        setModalUpdateFolder(true);
                        setModalManageFolder(false);
                      }}
                    ></i>
                    <ModalDelete url="project/files/folder" id={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* modal add file*/}
      <Modal show={modalAddFile} onHide={() => setModalAddFile(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Add Files</p>
          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Folder:</Form.Label>
              <Row>
                <Col md={8}>
                  <Form.Select
                    value={idFolder}
                    onChange={(e) => setIdFolder(e.target.value)}
                  >
                    {dataFolder.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Button
                    className="bg-table text-white w-100"
                    onClick={() => {
                      setModalAddFolder(true);
                      setModalAddFile(false);
                    }}
                  >
                    Add Folder
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="title"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File:</Form.Label>
              <Form.Control
                type="file"
                name="topic"
                placeholder="topic"
                className="w-100 mt-1 rounded-3 border form-control"
                defaultValue={file}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          <Button className="bg-table w-25 text-white" onClick={addFile}>
            Save
          </Button>
          <Button
            className="bg-table w-25 ms-2 text-white"
            onClick={() => setModalAddFile(false)}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      {/* modal update file*/}
      <Modal show={modalUpdateFile} onHide={() => setModalUpdateFile(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Update File</p>
          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Folder:</Form.Label>
              <Row>
                <Col md={8}>
                  <Form.Select
                    value={idFolder}
                    onChange={(e) => setIdFolder(e.target.value)}
                  >
                    {dataFolder.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Button
                    className="bg-table text-white w-100"
                    onClick={() => {
                      setModalAddFolder(true);
                      setModalAddFile(false);
                    }}
                  >
                    Add Folder
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="title"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File:</Form.Label>
              <Form.Control
                type="file"
                name="topic"
                placeholder="topic"
                className="w-100 mt-1 rounded-3 border form-control"
                defaultValue={file}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          <Button className="bg-table w-25 text-white" onClick={addFile}>
            Save
          </Button>
          <Button
            className="bg-table w-25 ms-2 text-white"
            onClick={() => setModalAddFile(false)}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      {/* modal manage folder */}
      <Modal
        show={modalManageFolder}
        onHide={() => setModalManageFolder(false)}
      >
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <Modal.Title className="fs-4 fw-bold">Manage Folder</Modal.Title>
            <Button
              className="bg-table text-white"
              onClick={() => {
                setModalAddFolder(true);
                setModalManageFolder(false);
              }}
            >
              Add Folder
            </Button>
          </div>
          <Table className="mt-2">
            <thead className="bg-table text-white">
              <tr>
                <th width="5%">No.</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataFolder.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td width="20%">
                    <i
                      className="fa-solid fa-pen-to-square ms-1 pointer"
                      onClick={() => {
                        setIdUpdateFolder(item.id);
                        setModalUpdateFolder(true);
                        setModalManageFolder(false);
                      }}
                    ></i>
                    <ModalDelete url="project/files/folder" id={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* modal add folder */}
      <Modal show={modalAddFolder} onHide={() => setModalAddFolder(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Add Folder</p>
          <Form className="mb-3">
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="name"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button className="bg-table w-25 text-white" onClick={addFolder}>
            Save
          </Button>
          <Button
            className="bg-table w-25 ms-2 text-white"
            onClick={() => setModalAddFolder(false)}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      {/* modal update folder */}
      <Modal
        show={modalUpdateFolder}
        onHide={() => setModalUpdateFolder(false)}
      >
        <Modal.Body>
          <p className="fs-4 fw-bold">Update Folder</p>
          <Form className="mb-3">
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="name"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button className="bg-table w-25 text-white" onClick={updateFolder}>
            Save
          </Button>
          <Button
            className="bg-table w-25 ms-2 text-white"
            onClick={() => setModalUpdateFolder(false)}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailProject;
