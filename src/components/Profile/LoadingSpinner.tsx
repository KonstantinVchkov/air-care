import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-border d-flex mx-auto align-center text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;