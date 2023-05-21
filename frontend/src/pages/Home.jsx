import React, { useContext } from 'react';

import Posts from './Posts';

//import { UserAuthContext } from '../context/UserAuthContext';

import { Grid } from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import Leftbar from '../components/Leftbar/Leftbar';
import Rightbar from '../components/Rightbar/Rightbar';
import { useSelector } from 'react-redux';

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ display: 'flex', backgroundColor: '#f0f2f5' }}>
      {user ? (
        <>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Leftbar />
            </Grid>
          </Grid>
          <Posts />
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Rightbar />
            </Grid>
          </Grid>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
