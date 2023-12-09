import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';

const Registration = () => {
  const [name, setname] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();

  const handleRegistration = () => {
    const userData = {
      name,
      username,
      email,
      password
    };

    axiosInstance
      .post('Authorization/Registration', userData)
      .then((response) => {
        console.log('Registration successful', response.data);
        toast.success('Registration successful');

        setTimeout(() => {
          navigate('/'); // Redirect to the home page after successful registration
        }, 2000);
      })
      .catch((error) => {
        console.error('Registration failed', error);
        toast.error('Registration failed');
      });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={5} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton onClick={handleBack} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" mb={4}>
          Registration
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleRegistration}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Registration;
