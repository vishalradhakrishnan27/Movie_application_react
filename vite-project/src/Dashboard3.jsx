// Dashboard3.jsx
import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, Card, CardContent, Chip } from '@mui/material';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const Dashboard3 = () => {
  const [genreMovieData, setGenreMovieData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isRandomSelected, setIsRandomSelected] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'your_jwt_token_key' with the actual key used to store the token

    if (!token) {
      console.error('JWT token not found in local storage.');
      // Redirect the user to the unauthorized page or login page
      window.location.href = '/unauthorized'; // Replace '/unauthorized' with the actual path of your unauthorized page
      return;
    }

    // Fetch genre movie data with authentication
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    fetch('https://localhost:7107/api/data/genre_movienames', { headers })
      .then(response => response.json())
      .then(data => setGenreMovieData(data))
      .catch(error => console.error('Error fetching genre movie data:', error));
  }, []);


  const handleGenreClick = (genre) => {
    if (isRandomSelected) {
      setIsRandomSelected(false);
      setRandomMovie(null);
    }

    const isSelected = selectedGenres.includes(genre);

    if (isSelected) {
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleRandomClick = () => {
    setIsRandomSelected(true);
    setSelectedGenres([]); // Clear selected genres

    const randomIndex = Math.floor(Math.random() * genreMovieData.length);
    const randomMovie = genreMovieData[randomIndex];

    setRandomMovie(randomMovie);
  };

  useEffect(() => {
    // Filter and sort movies based on selected genres
    const filtered = genreMovieData
      .filter(item => selectedGenres.includes(item.genre_name))
      .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));

    setFilteredMovies(filtered);
  }, [selectedGenres, genreMovieData]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <div>
            <h2>Movie Suggestions by Genre</h2>
            <Navbar />
            <div style={{ marginBottom: '10px' }}>
              {genreMovieData &&
                Array.from(new Set(genreMovieData.map(item => item.genre_name))).map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    variant={selectedGenres.includes(genre) ? 'filled' : 'outlined'}
                    onClick={() => handleGenreClick(genre)}
                    style={{ margin: '5px', backgroundColor: selectedGenres.includes(genre) ? 'lightblue' : 'transparent' }}
                  />
                ))}
              <Chip
                label="Random 🎲🔁"
                variant={isRandomSelected ? 'filled' : 'outlined'}
                onClick={handleRandomClick}
                style={{ margin: '5px', backgroundColor: isRandomSelected ? 'lightblue' : 'transparent' }}
              />
            </div>
            {isRandomSelected && randomMovie && (
              <div>
                <h3>Random Movie Suggestion</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ borderBottom: '2px solid black', padding: '8px', fontWeight: 'bold' }}>MOVIE NAME</th>
                      <th style={{ borderBottom: '2px solid black', padding: '8px', fontWeight: 'bold' }}>MOVIE INFO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{randomMovie.Title}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{randomMovie.Movie_Info}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {!isRandomSelected && filteredMovies.length > 0 && (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '2px solid black', padding: '8px', fontWeight: 'bold' }}>MOVIE NAME</th>
                    <th style={{ borderBottom: '2px solid black', padding: '8px', fontWeight: 'bold' }}>MOVIE INFO</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map((movie, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{movie.Title}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{movie.Movie_Info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Paper>
      </Grid>
      {/* Navigation Buttons */}
      <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
        <Grid item>
          <Link to="/dashboard2">
            <Button variant="contained" color="primary">
              Previous Page
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/Dashboard4">
            <Button variant="contained" color="primary">
              NEXT PAGE
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps() {
  // Fetch data from your server-side endpoint
  const res = await fetch('https://localhost:7107/api/data/genre_movienames');
  const genreMovieData = await res.json();

  return {
    props: {
      genreMovieData,
    },
  };
}

export default Dashboard3;
