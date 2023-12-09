// Dashboard2.jsx
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Paper, Grid, Button, Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import Navbar from './Navbar'; // Import the Navbar component
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Dashboard2 = () => {
    
  const [genreSalesData, setGenreSalesData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [filterType, setFilterType] = useState('Total World_Wide_Sales'); // Default filter type
  const [budgetData, setBudgetData] = useState([]);
  const [domesticOpeningData, setDomesticOpeningData] = useState([]);
  const [domesticSalesData, setDomesticSalesData] = useState([]);
  const [internationalSalesData, setInternationalSalesData] = useState([]);

  const location = useLocation();
  const filterHistory = location.state?.filterHistory;
  useEffect(() => {
    // Check if filter history is available and set the corresponding values
    if (filterHistory) {
      setSelectedGenre(filterHistory.genreName);
      setFilterType(filterHistory.category);
    }
  }, [filterHistory]);

  useEffect(() => {
    // Fetch genre sales data based on the filter type
    const fetchGenreSalesData = async () => {
      try {

        const token = localStorage.getItem('token'); // Replace 'your_jwt_token_key' with the actual key used to store the token

        if (!token) {
          console.error('JWT token not found in local storage.');
          // Redirect the user to the unauthorized page or login page
          window.location.href = '/unauthorized'; // Replace '/unauthorized' with the actual path of your unauthorized page
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };


        let url;
        if (filterType === 'Total World_Wide_Sales') {
          url = 'https://localhost:7107/api/data/Total_World_Wide_Sales_by_genre_name';
        } else if (filterType === 'Average World_Wide_Sales') {
          url = 'https://localhost:7107/api/data/Average_World_Wide_Sales_by_genre_name';
        } else if (filterType === 'Sum of BudgetAmount') {
          url = 'https://localhost:7107/api/data/Sum_of_BudgetAmount_by_genre_name';
        } else if (filterType === 'Sum of Domestic_Opening') {
          url = 'https://localhost:7107/api/data/Sum_of_Domestic_Opening_by_genre_name';
        } else if (filterType === 'Sum of Domestic_Sales') {
          url = 'https://localhost:7107/api/data/Sum_of_Domestic_Sales_by_genre_name';
        } else if (filterType === 'Sum of International_Sales') {
          url = 'https://localhost:7107/api/data/Sum_of_International_Sales_by_genre_name';
        }

        const response = await fetch(url, { headers });
        const data = await response.json();

        setGenreSalesData(data);
      } catch (error) {
        console.error('Error fetching genre sales data:', error);
      }
    };

    fetchGenreSalesData();
  }, [filterType]);

// ...

useEffect(() => {
    // Fetch budget data
    fetch('https://localhost:7107/api/data/Sum_of_BudgetAmount_by_genre_name', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setBudgetData(data));
  }, []);
  
  useEffect(() => {
    // Fetch domestic opening data
    fetch('https://localhost:7107/api/data/Sum_of_Domestic_Opening_by_genre_name', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setDomesticOpeningData(data));
  }, []);
  
  useEffect(() => {
    // Fetch domestic sales data
    fetch('https://localhost:7107/api/data/Sum_of_Domestic_Sales_by_genre_name', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setDomesticSalesData(data));
  }, []);
  
  useEffect(() => {
    // Fetch international sales data
    fetch('https://localhost:7107/api/data/Sum_of_International_Sales_by_genre_name', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setInternationalSalesData(data));
  }, []);
  
  // ...
  

  useEffect(() => {
    // Calculate total amount for the selected genre or all genres
    if (genreSalesData.length > 0) {
      if (selectedGenre === 'All') {
        const total = genreSalesData.reduce((acc, genre) => acc + parseInt(genre[filterType]), 0);
        setTotalAmount(total);
      } else if (selectedGenre) {
        const selectedGenreData = genreSalesData.find(item => item.genre_name === selectedGenre);
        if (selectedGenreData) {
          setTotalAmount(selectedGenreData[filterType]);
        }
      }
    } else {
      setTotalAmount(null);
    }
  }, [genreSalesData, selectedGenre, filterType]);

  useEffect(() => {
    // Create genre sales chart
    if (genreSalesData.length > 0) {
      const chartData = selectedGenre === 'All'
        ? genreSalesData
        : [{ genre_name: selectedGenre, [filterType]: totalAmount }];
  
      const canvas = document.getElementById('genreSalesChart');
  
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartData.map(item => item.genre_name),
            datasets: [
              {
                label: `${filterType} by Genre`,
                data: chartData.map(item => parseInt(item[filterType])),
                backgroundColor: 'rgba(75,192,192,0.7)',
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
  
        return () => {
          chart.destroy();
        };
      }
    }
  }, [genreSalesData, selectedGenre, totalAmount, filterType]);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter);
  };

  const username = localStorage.getItem('username'); // Assuming 'username' is the key you used to store the username

  if (!username) {
    console.error('Username not found in local storage.');
    // Redirect the user to the login page or handle the authentication logic
    return;
  }
  const handleGoButtonClick = () => {
    // Ensure that a genre is selected before making the API call
    if (selectedGenre) {
      const filterHistory = {
        userName: username, // Replace 'user' with the actual username (you can get it from your authentication system)
        genreName: selectedGenre,
        category: filterType,
      };
      let barApi;
    
      if (filterType === 'Total World_Wide_Sales') {
        barApi = 'https://localhost:7107/api/data/Total_World_Wide_Sales_bar_chart';
      } else if (filterType === 'Average World_Wide_Sales') {
        barApi = 'https://localhost:7107/api/data/Average_World_Wide_Sales_bar_chart';
      } else if (filterType === 'Sum of BudgetAmount') {
        barApi = 'https://localhost:7107/api/data/Sum_of_BudgetAmount_bar_chart';
      } else if (filterType === 'Sum of Domestic_Opening') {
        barApi = 'https://localhost:7107/api/data/Sum_of_Domestic_Opening_bar_chart';
      } else if (filterType === 'Sum of Domestic_Sales') {
        barApi = 'https://localhost:7107/api/data/Sum_of_Domestic_Sales_bar_chart';
      } else if (filterType === 'Sum of International_Sales') {
        barApi = 'https://localhost:7107/api/data/Sum_of_International_Sales_bar_chart';
      }
  
      // Save the filter history to the database, including the bar API endpoint
      filterHistory.barApi = barApi;

      fetch('https://localhost:7107/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterHistory),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Filter history saved:', data);
        })
        .catch(error => {
          console.error('Error saving filter history:', error);
        });
  
      fetch(barApi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(barData => {
          console.log('Bar data:', barData);
        })
        .catch(error => {
          console.error('Error fetching bar data:', error);
        });
    } else {
      console.warn('Please select a genre before clicking Go.');
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <div>
            <h2> Collection based on Genre</h2>
            <Navbar /> {/* Include the Navbar component */}
            <select onChange={handleGenreChange}>
              <option value="">Select Genre</option>
              <option value="All">All</option> {/* Add "All" option */}
              {genreSalesData.map((genre, index) => (
                <option key={index} value={genre.genre_name}>
                  {genre.genre_name}
                </option>
              ))}
            </select>
            <select onChange={handleFilterChange} value={filterType}>
              <option value="Total World_Wide_Sales">Total World Wide Sales</option>
              <option value="Average World_Wide_Sales">Average World Wide Sales</option>
              <option value="Sum of BudgetAmount">Total Budget</option>
              <option value="Sum of Domestic_Opening">Sum of Domestic Opening</option>
              <option value="Sum of Domestic_Sales">Sum of Domestic Sales</option>
              <option value="Sum of International_Sales">Sum of International Sales</option>
            </select>
            <Button variant="contained" color="primary" onClick={handleGoButtonClick}>
          ADD TO HISTORY📕
        </Button>
            {selectedGenre && (
              <canvas id="genreSalesChart" style={{ maxWidth: '600px', maxHeight: '400px' }}></canvas>
            )}
            {totalAmount !== null && (
              <div>
                <h3>Total Amount</h3>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {`$${formatAmount(totalAmount)}`}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Paper>
      </Grid>
      {/* Navigation Buttons */}
      <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
        <Grid item>
          <Link to="/dashboard">
            <Button variant="contained" color="primary">
              Previous Page
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/dashboard3">
            <Button variant="contained" color="primary">
              Next Page
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

// Helper function to format amount in millions/billions
const formatAmount = (amount) => {
  if (amount === null) {
    return '';
  } else if (amount >= 1e9) {
    return `${(amount / 1e9).toFixed(3)} Billion`;
  } else if (amount >= 1e6) {
    return `${(amount / 1e6).toFixed(3)} Million`;
  } else {
    return amount;
  }
};

export default Dashboard2;
