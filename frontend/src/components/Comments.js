import { Avatar, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

function Comments({ list }) {
  return (
    <div>
      Comments
      <div style={{ display: 'flex', width: '100%' }}>
        <Avatar />
        <textarea />
        <Typography>{list.text}</Typography>
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Comments;
