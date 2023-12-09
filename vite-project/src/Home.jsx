import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  const containerStyle = {
    textAlign: 'center',
    margin: '40px',
    backgroundColor: '#000', // Black background
    padding: '20px',
    borderRadius: '8px',
  };

  const welcomeTextStyle = {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#fff', // White text
    fontWeight: 'bold',
  };

  const linksContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    padding: '15px 30px',
    background: 'linear-gradient(to right, #ff0000, #000)', // Gradient from red to black
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0',
    transition: 'background 0.3s ease',
  };

  const navLinkHoverStyle = {
    background: 'linear-gradient(to right, #ff3333, #333)', // Gradient on hover
  };

  const accessTextStyle = {
    fontSize: '18px',
    marginTop: '20px',
    color: '#fff', // White text
  };

  const actionButtonStyle = {
    textDecoration: 'none',
    padding: '15px 30px',
    background: 'linear-gradient(to right, #ff0000, #000)', // Gradient from red to black
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '18px',
    display: 'inline-block',
    margin: '10px',
    transition: 'background 0.3s ease',
  };

  const actionButtonHoverStyle = {
    background: 'linear-gradient(to right, #ff3333, #333)', // Gradient on hover
  };

  return (
    <div style={containerStyle}>
      <h2 style={welcomeTextStyle}>MOVIE FANDOM 🎬🎥🎞</h2>
      {isAuthenticated ? (
        <div style={linksContainerStyle}>
          {/* Add authenticated user links here if needed */}
        </div>
      ) : (
        <p style={accessTextStyle}>
          Join the movie fandom. Login or register to explore!
        </p>
      )}
      <Link to="/login" style={{ ...actionButtonStyle, ...actionButtonHoverStyle }}>
        Login
      </Link>
      <Link to="/registration" style={{ ...actionButtonStyle, ...actionButtonHoverStyle }}>
        Register
      </Link>
    </div>
  );
};

export default Home;
