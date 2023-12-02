import React, { useState, useEffect } from 'react';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';
import { momentum } from 'ldrs';
import './ProfileBox.css';

momentum.register();

// Loader component
const Loader = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }}
  >
    <l-momentum size="40" speed="1.1" color="black" />
  </Box>
);

const ProfileBox = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
      handleCloseUserMenu();
      navigate('/');
      alert('Your account is successfully logged out!');
    } catch (error) {
      setLoading(false);
      console.error('Logout error:', error.message);
    }
  };

  return (
    <Box className='Box' sx={{ flexGrow: 0 }}>
      <Tooltip title="Open Profile">
        <IconButton className="LogAccount" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu className='Menu'
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem className='MenuItem'>
          <Typography textAlign="center">{user?.email || 'Not logged in'}</Typography>
        </MenuItem>
        {user?.email && (
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        )}
      </Menu>
      {/* Render the loader component */}
      {loading && <Loader />}
    </Box>
  );
};

export default ProfileBox;
