import { Avatar } from '@mui/material';
import React from 'react';

function Comments() {
  return (
    <div>
      Comments
      <form style={{ display: 'flex', width: '100%' }}>
        <Avatar />
        <textarea />
      </form>
    </div>
  );
}

export default Comments;
