import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>
      <h1 style={{ color: 'red' }}>Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <p>Please log in or contact the administrator for assistance.</p>
      <span role="img" aria-label="warning" style={{ fontSize: '48px', color: 'red' }}>
        ⚠️
      </span>
      <br />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginTop: '20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
      </Link>
    </div>
  );
};

export default Unauthorized;
