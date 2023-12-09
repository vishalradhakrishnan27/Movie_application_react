import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Avatar, Paper, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../AxiosInstance';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('Authorization/Login', {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.token) {
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.token);
          toast.success('Login successful');

          // Redirect to /dashboard upon successful login
          navigate('/dashboard');

          // Reset the input fields after a successful login
          setUsername('');
          setPassword('');
        } else {
          // If the token is not present in the response, handle accordingly
          toast.error('Login failed: Invalid username or password');
        }
      } else {
        toast.error('Login failed: Invalid username or password');
      }
    } catch (error) {
      toast.error('An error occurred while trying to log in.');
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={5} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={handleBack} sx={{ alignSelf: 'flex-start' }}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* You can customize the avatar icon */}
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
            Login
          </Typography>
          <Box component="form" noValidate sx={{ width: '100%', marginTop: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ marginTop: 3 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
