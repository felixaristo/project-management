import React from "react";
import { Button } from "react-bootstrap";

export const AddButton = ({ children, click }) => {
  return (
    <>
      <Button className="bg-primary text-white" onClick={click}>
        <i class="fa-solid fa-plus me-1"></i> Add {children}
      </Button>
    </>
  );
};
