import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard4 = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState('');
  const [movieCount, setMovieCount] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const navigate = useNavigate();

  // Fetch genre movie data with authentication
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    // Check if the user is authenticated
    if (!token) {
      console.error('JWT token not found in local storage.');
      // Redirect the user to the unauthorized page or login page
      navigate('/unauthorized');
    }

    // Fetch years from the second API
    fetch('https://localhost:7107/api/data/distributor_moviename', { headers })
      .then((response) => response.json())
      .then((data) => {
        const uniqueYears = Array.from(new Set(data.map((movie) => movie.Year)));
        setYears(uniqueYears);
      })
      .catch((error) => console.error('Error fetching years:', error));

    // Fetch distributors from the first API
    fetch('https://localhost:7107/api/data/distributor_moviecount', { headers })
      .then((response) => response.json())
      .then((data) => {
        setDistributors(data.map((entry) => entry.Distributor));
      })
      .catch((error) => console.error('Error fetching distributors:', error));
  }, [token, navigate]);

  useEffect(() => {
    // Fetch movie count based on selected year and distributor
    if (selectedYear && selectedDistributor) {
      fetch(`https://localhost:7107/api/data/distributor_moviecount?year=${selectedYear}&distributor=${selectedDistributor}`, { headers })
        .then((response) => response.json())
        .then((data) => setMovieCount(data))
        .catch((error) => console.error('Error fetching movie count:', error));

      // Fetch movies based on selected year and distributor
      fetch(`https://localhost:7107/api/data/distributor_moviename?year=${selectedYear}&distributor=${selectedDistributor}`, { headers })
        .then((response) => response.json())
        .then((data) => setFilteredMovies(data))
        .catch((error) => console.error('Error fetching filtered movies:', error));
    }
  }, [selectedYear, selectedDistributor, headers]);

  const handleBack = () => {
    navigate('/dashboard3');
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h2 style={{ color: '#333', textAlign: 'center' }}>Distributor Analysis</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handleBack} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            PREVIOUS PAGE
          </button>
        </div>

        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor="yearFilter">Select Year:</label>
            <select id="yearFilter" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">All</option>
              {years
                .sort((a, b) => a - b) // Sort years in ascending order
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="distributorFilter">Select Distributor:</label>
            <select id="distributorFilter" value={selectedDistributor} onChange={(e) => setSelectedDistributor(e.target.value)}>
              <option value="">All</option>
              {distributors.map((distributor) => (
                <option key={distributor} value={distributor}>
                  {distributor}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h3>Movie Count</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Distributor</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Count of Movie_Info</th>
              </tr>
            </thead>
            <tbody>
            
            {movieCount.length > 0 ? (
  movieCount
    .filter((entry) => (!selectedDistributor || entry.Distributor === selectedDistributor))
    .map((entry) => (
      <tr key={entry.Distributor}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.Distributor}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry['Count of Movie_Info']}</td>
      </tr>
    ))
) : (
  <tr>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{selectedDistributor}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>0</td>
  </tr>
)}


</tbody>
          </table>
        </div>

        <div>
          <h3>Filtered Movies</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Year</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Distributor</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total World_Wide_Sales</th>
              </tr>
            </thead>
            <tbody>
            {filteredMovies.length > 0 ? (
  filteredMovies
    .filter(
      (movie) => (!selectedDistributor || movie.Distributor === selectedDistributor) && (!selectedYear || movie.Year === selectedYear)
    )
    .map((movie) => (
      <tr key={movie.Title}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie.Title}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie.Year}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie.Distributor}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie['Total World_Wide_Sales']}</td>
      </tr>
    ))
) : (
  <tr>
    <td colSpan="4" style={{ textAlign: 'center', padding: '8px' }}>
      No data available
    </td>
  </tr>
)}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard4;
