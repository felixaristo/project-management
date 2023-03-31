import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import UpdateClient from "./pages/UpdateClient";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/update-client/:id" element={<UpdateClient />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
