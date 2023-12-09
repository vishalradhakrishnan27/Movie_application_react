
import { Link, useNavigate } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import StarsIcon from '@mui/icons-material/Stars';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useEffect, useState } from 'react';

const AboutUs = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check if the user is authenticated
      if (!token) {
        console.error('JWT token not found in local storage.');
        // Redirect the user to the unauthorized page or login page
        navigate('/unauthorized'); // Replace '/unauthorized' with the actual path of your unauthorized page
      }
    }, [token, navigate]);
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>About Us</h2>
      <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
        Welcome to this Application! We are thrilled to have you here. Explore the world of movies with our application, where
        you can discover, analyze, and enjoy the magic of cinema. 🎬✨
      </p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Our Mission</h3>
      <p>
         Our mission is to provide a comprehensive platform for movie enthusiasts. Whether you're a casual viewer
        or a cinephile, we aim to offer an immersive experience with valuable insights into the world of cinema.
      </p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Key Features</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <MovieIcon style={{ fontSize: '1.5em', marginRight: '10px', verticalAlign: 'middle' }} />
          Dynamic Movie Database: Explore a vast collection of movies from various genres.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <StarsIcon style={{ fontSize: '1.5em', marginRight: '10px', verticalAlign: 'middle' }} />
          In-Depth Analysis: Dive into detailed analytics, including box office performance and critical ratings.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <EmojiEventsIcon style={{ fontSize: '1.5em', marginRight: '10px', verticalAlign: 'middle' }} />
          Personalized Recommendations: Receive tailored movie suggestions based on your preferences.
        </li>
        {/* Add more features as needed */}
      </ul>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Get Started</h3>
      <p>
        Ready to embark on a cinematic journey? Sign up today and unlock the door to a world of entertainment. Join our community of
        movie lovers who have already experienced the [Your Application Name] difference.
      </p>

      {/* Placeholder for an image */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img
          src="src/clapper.png" // Add the actual path to your image
          alt="Application Preview"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
        <p style={{ fontStyle: 'italic', marginTop: '10px', color: '#666' }}>Explore the beauty of this Application</p>
      </div>

      {/* Blue-colored Back button to go to the Dashboard page */}
      <Link to="/Dashboard" style={{ textDecoration: 'none' }}>
        <button style={{ marginTop: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          Back to Dashboard
          <KeyboardArrowRightIcon style={{ marginLeft: '5px' }} />
        </button>
      </Link>
    </div>
  );
};

export default AboutUs;
