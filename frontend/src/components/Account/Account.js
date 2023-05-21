import './Account.css';
import React from 'react';
import { Avatar, Paper, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightIcon from '@mui/icons-material/Nightlight';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { logout, reset } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

function Account() {
  const dispatch = useDispatch();
  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <Avatar /> <span>Mohamed Abdille</span>
        </div>
        <Avatar />
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <SettingsIcon /> <span>Settings & privacy</span>
        </div>
        <ArrowForwardIosIcon />
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <HelpIcon /> <span>Help & support</span>
        </div>
        <ArrowForwardIosIcon />
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <NightlightIcon /> <span>Display & accessibility</span>
        </div>
        <ArrowForwardIosIcon />
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <FeedbackIcon /> <span>Give feedback</span>
        </div>
        <ArrowForwardIosIcon />
      </div>

      <div
        style={{ display: 'flex' }}
        onClick={() => dispatch(logout())}
      >
        <div style={{ display: 'flex' }}>
          <LogoutIcon /> <span>Log Out</span>
        </div>
        <ArrowForwardIosIcon />
      </div>
      <Typography>
        Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
        Cookies · · Meta © 2023
      </Typography>
    </Paper>
  );
}

export default Account;
