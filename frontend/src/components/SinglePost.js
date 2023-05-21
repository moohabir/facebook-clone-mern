import { Avatar, TextField } from '@mui/material';
import React from 'react';

function SinglePost({ post }) {
  //console.log(post.description);
  return (
    <div>
      Singlepost
      <h1>hh</h1>
      <div style={{ display: 'flex', margin: '10px' }}>
        <Avatar />
        <TextField
          style={{ width: '100%', borderRadius: '10px' }}
          placeholder="Write a comment"
        />
      </div>
    </div>
  );
}

export default SinglePost;
