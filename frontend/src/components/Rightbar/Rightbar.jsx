import { Divider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Rightbar.css';

function Rightbar() {
  return (
    <div
      style={{
        flex: 2,
        position: 'sticky',
        top: '70px',
        height: 'calc(100vh - 70px)',
        scrollBehavior: 'scroll',
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Typography>Your Pages and profiles</Typography>
        <MoreHorizIcon />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <MessageIcon />
        <Typography>2 Messages</Typography>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <NotificationsIcon />
        <Typography>3 Notifications</Typography>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <NotificationsIcon />
        <Typography> Switch into page</Typography>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <NotificationsIcon />
        <Typography>Create promotion</Typography>
      </div>
      <Divider />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <NotificationsIcon />
        <Typography>Your Pages and profiles</Typography>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>Your Pages and profiles</Typography>
        <MoreHorizIcon />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>Your Pages and profiles</Typography>
        <MoreHorizIcon />
      </div>
    </div>
  );
}

export default Rightbar;
