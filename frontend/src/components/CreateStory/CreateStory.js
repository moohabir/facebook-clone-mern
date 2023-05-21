import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './CreateStory.css';
function CreateStory() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '50px',
        backgroundColor: 'lightGray',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          width: '250px',
          height: '350px',
          backgroundColor: 'indigo',
          marginRight: '20px',
          flexDirection: 'column',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // margin: 'auto',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <input type="file" />
          <Typography>Create a photo story</Typography>
        </CardContent>
      </Card>
      <Card
        sx={{ width: '250px', height: '350px', backgroundColor: 'indianred' }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // margin: 'auto',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <input
            type="text"
            style={{
              dispaly: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
              hight: '90vh',
              width: '50%',
              backgroundColor: 'lightblue',
            }}
          />
          <Typography>Create a text story</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateStory;
