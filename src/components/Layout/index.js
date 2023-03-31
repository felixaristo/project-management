import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="p-4">
        {children} <Outlet />
      </div>
    </div>
  );
};

export default Layout;
