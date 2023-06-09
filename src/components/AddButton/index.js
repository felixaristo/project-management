import React from "react";
import { Button } from "react-bootstrap";

export const AddButton = ({ children, click }) => {
  return (
    <>
      <Button className="bg-table text-white me-2" onClick={click}>
        <i class="fa-solid fa-plus me-1"></i> Add {children}
      </Button>
    </>
  );
};
