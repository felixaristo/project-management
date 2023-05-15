import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Client from "./pages/Client";
import AddClient from "./pages/AddClient";
import UpdateClient from "./pages/UpdateClient";
import Project from "./pages/Project";
import AddProject from "./pages/AddProject";
import UpdateProject from "./pages/UpdateProject";
import DetailProject from "./pages/DetailProject";
import Form from "./pages/Form";
import Thankyou from "./pages/Thankyou";
import AddAttendance from "./pages/AddAttendance";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/attendance-user" element={<Form />} />
      <Route path="/thankyou" element={<Thankyou />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<Client />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/update-client/:id" element={<UpdateClient />} />
        <Route path="/project" element={<Project />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-attendance/:id" element={<AddAttendance />} />
        <Route path="/update-project/:id" element={<UpdateProject />} />
        <Route path="/detail-project/:id" element={<DetailProject />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
