import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Paper, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const chartOptions = {
  width: 300,
  height: 200,
};

const Dashboard = () => {
  const [dailySalesData, setDailySalesData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
        try {
          // Retrieve the token from local storage
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
      
          const [dailyResponse, monthlyResponse, donutResponse, allMoviesResponse] = await Promise.all([
            fetch('https://localhost:7107/api/data/Total_World_Wide_Sales_by_Day', { headers }),
            fetch('https://localhost:7107/api/data/Total_World_Wide_Sales_by_Month', { headers }),
            fetch('https://localhost:7107/api/data/Count%20of%20movieid%20by%20genre_name', { headers }),
            fetch('https://localhost:7107/api/data/all_movies', { headers })
          ]);
      
          const [dailyData, monthlyData, donutData, allMoviesData] = await Promise.all([
            dailyResponse.json(),
            monthlyResponse.json(),
            donutResponse.json(),
            allMoviesResponse.json()
          ]);

        setDailySalesData(dailyData);
        setMonthlySalesData(monthlyData);
        setDonutChartData(donutData);
        setAllMovies(allMoviesData);
        // Sort movies based on total worldwide sales
        const sorted = allMoviesData.sort((a, b) => b['Total World_Wide_Sales'] - a['Total World_Wide_Sales']);
        setSortedMovies(sorted.slice(0, topN));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [topN]);

  useEffect(() => {
    // Create daily sales chart
    if (dailySalesData.length > 0) {
      const chart = new Chart(document.getElementById('dailySalesChart'), {
        type: 'line',
        data: {
          labels: dailySalesData.map(item => item.Day),
          datasets: [
            {
              label: 'Total World Wide Sales by Day',
              data: dailySalesData.map(item => parseInt(item['Total World_Wide_Sales'])),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        },
        options: chartOptions,
      });
      return () => {
        chart.destroy();
      };
    }
  }, [dailySalesData]);

  useEffect(() => {
    // Create monthly sales chart
    if (monthlySalesData.length > 0) {
      const chart = new Chart(document.getElementById('monthlySalesChart'), {
        type: 'line',
        data: {
          labels: monthlySalesData.map(item => item.Month),
          datasets: [
            {
              label: 'Total World Wide Sales by Month',
              data: monthlySalesData.map(item => parseInt(item['Total World_Wide_Sales'])),
              fill: false,
              borderColor: 'rgba(192,75,192,1)',
            },
          ],
        },
        options: chartOptions,
      });
      return () => {
        chart.destroy();
      };
    }
  }, [monthlySalesData]);

  useEffect(() => {
    // Create donut chart
    if (donutChartData.length > 0) {
      const chart = new Chart(document.getElementById('donutChart'), {
        type: 'doughnut',
        data: {
          labels: donutChartData.map(item => item.genre_name),
          datasets: [
            {
              data: donutChartData.map(item => item['Count of movieid']),
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
              ],
            },
          ],
        },
        options: chartOptions,
      });
      return () => {
        chart.destroy();
      };
    }
  }, [donutChartData]);

  return (
    <div>
      <Navbar />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <div>
              <h2>Total world wide Collection based on release day</h2>
              <canvas id="dailySalesChart"></canvas>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <div>
              <h2>Total world wide Collection based on month</h2>
              <canvas id="monthlySalesChart"></canvas>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <div>
              <h2>Total movies based on Genre</h2>
              <canvas id="donutChart"></canvas>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <div>
              <h2>All Movies</h2>
              <label>
                Top{' '}
                <input
                  type="number"
                  value={topN}
                  onChange={(e) => setTopN(parseInt(e.target.value))}
                  min="1"
                />{' '}
                movies by sales
              </label>
              <TableContainer>
                <Table>
                <TableHead>
  <TableRow>
    <TableCell style={{ fontWeight: 'bold' }}>TITLE</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>YEAR</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>QUARTER</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>MONTH</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>DAY</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>RUNNING TIME</TableCell>
    <TableCell style={{ fontWeight: 'bold' }}>LICENSE</TableCell>
    <TableCell style={{ fontWeight: 'bold'}}>TOTAL WORLD WIDE SALES</TableCell>
  </TableRow>
</TableHead>
                  <TableBody>
                    {sortedMovies.map(movie => (
                      <TableRow key={movie.Title}>
                        <TableCell>{movie.Title}</TableCell>
                        <TableCell>{movie.Year}</TableCell>
                        <TableCell>{movie.Quarter}</TableCell>
                        <TableCell>{movie.Month}</TableCell>
                        <TableCell>{movie.Day}</TableCell>
                        <TableCell>{movie.Running_Time}</TableCell>
                        <TableCell>{movie.License}</TableCell>
                        <TableCell>{movie['Total World_Wide_Sales']}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <div>
              <Button
                component={Link}
                to="/dashboard2"
                variant="contained"
                color="primary"
              >
                Next Page
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
