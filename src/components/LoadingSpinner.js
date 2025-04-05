import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ height = "auto" }) => (
  <div
    style={{ height }}
    className="d-flex justify-content-center align-items-center"
  >
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
