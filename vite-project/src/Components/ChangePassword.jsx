// ChangePassword.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../AxiosInstance';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Check if the user is authenticated
    if (!token) {
      console.error('JWT token not found in local storage.');
      // Redirect the user to the unauthorized page or login page
      navigate('/unauthorized'); // Replace '/unauthorized' with the actual path of your unauthorized page
    }
  }, [token, navigate]);

  const handleChangePassword = async () => {
    try {
      const username = localStorage.getItem('username');

      const response = await axiosInstance.post('Authorization/ChangePassword', {
        username,
        currentPassword,
        newPassword,
        confirmNewPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Password changed successfully');
        // Redirect to login page after changing password
        navigate('/');
      } else {
        toast.error('Failed to change password. Please check your current password.');
      }
    } catch (error) {
      toast.error('An error occurred while trying to change the password.');
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/dashboard'); 
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={5} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton onClick={handleBack} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
          Change Password
        </Typography>
        <Box component="form" noValidate sx={{ width: '100%', marginTop: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            sx={{ marginTop: 3 }}
          >
            Change Password
          </Button>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
}

export default ChangePassword;
