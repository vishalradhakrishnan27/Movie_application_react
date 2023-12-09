// NavbarExtended.jsx
import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavbarExtended = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();

    // Replace the current history entry with the new one (redirect to '/')
    window.history.replaceState(null, null, '/');

    // Force a reload to ensure the browser history is updated
    window.location.reload();
  };

  const handleNavigateToChangePassword = () => {
    handleClose();
    navigate('/changepassword');
  };

  const [isNavbarOpaque, setIsNavbarOpaque] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeOpaque = scrollPosition === 0;

      if (shouldBeOpaque !== isNavbarOpaque) {
        setIsNavbarOpaque(shouldBeOpaque);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavbarOpaque]);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '8px',
      background: isNavbarOpaque ? '#f0f0f0' : 'rgba(240, 240, 240, 0.8)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      transition: 'background 0.3s',
    }}>
      <div>
        <h1 style={{ margin: 0 }}>
          <span style={{ background: 'linear-gradient(to right, black, red)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            MOVIE FANDOM
          </span>
          <span role="img" aria-label="Movie Emoji" style={{ fontSize: 'inherit' }}>🎬🎥🎞</span>
        </h1>
      </div>
      <div>
        <Button onClick={() => window.scrollTo(0, 0)} variant="contained" color="primary" sx={{ padding: '8px', fontSize: '14px', marginRight: '8px' }}>
          Page 🔺
        </Button>
        <Button onClick={() => window.scrollTo(0, document.body.scrollHeight)} variant="contained" color="primary" sx={{ padding: '8px', fontSize: '14px', marginRight: '8px' }}>
          Page 🔻
        </Button>
        <Button component={Link} to="/historypage" variant="contained" color="primary" sx={{ padding: '8px', fontSize: '14px', marginRight: '8px' }}>
          History⭐
        </Button>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ padding: '8px', fontSize: '14px', marginRight: '8px' }}
        >
          More Options
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        ><MenuItem component={Link} to="/aboutUs" onClick={handleClose}>
        About Us
      </MenuItem>
      <MenuItem
        onClick={() => window.location.href = 'mailto:rvishal21062002@gmail.com'}
      >
        Contact Us
      </MenuItem>
          <MenuItem onClick={handleNavigateToChangePassword}>Change Password</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          
        </Menu>
      </div>
    </nav>
  );
};

export default NavbarExtended;
