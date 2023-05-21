import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, useContext, useRef } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, register } from '../features/auth/authSlice';

//console.log(jsonwebtoken);

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = userData;

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //userRef.current.focus();
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //useEffect(() => {
  //const timeout = setInterval(() => {
  //setError(false);
  //}, 3000);
  //setTimeout(() => {}, timeout);
  //}, []);

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f2f5',
          //minWidth: '500px',
          width: '100%',
          height: '72vh',
          flexDirection: 'row',
          marginTop: '-8px',
          paddingBottom: '112px',
          paddingTop: '72px',
          gap: '50px',

          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '50px',
            paddingBottom: '50px',
            lineHeight: '1.4px',
            fontSize: '1.2rem',
            //backgroundColor: 'blue',
            marginTop: '-100px',
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            style={{ fontWeight: 'bold' }}
          >
            Facebook
          </Typography>
          <Typography
            variant="h5"
            color="textSecondry"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Connect with friends and the world<br></br>
            around you on Facebook.
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '200px',
            margin: 'auto',
            height: '350px',
            //backgroundColor: 'blue',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '450px',
              minWidth: '450px',
              borderRadius: '10px',
              border: 'none',
              //marginRight: '200px',
              backgroundColor: 'white',
            }}
          >
            <TextField
              type="text"
              name="name"
              value={name}
              required
              onChange={handleChange}
              label="name"
              sx={{
                backgroundColor: 'transparent',
                active: 'blue',
                width: '90%',
                margin: '10px',
                borderRadius: '10',
              }}
            />

            <TextField
              type="email"
              name="email"
              value={email}
              required
              onChange={handleChange}
              label="Email"
              sx={{
                backgroundColor: 'transparent',
                active: 'blue',
                width: '90%',
                margin: '10px',
                borderRadius: '10',
              }}
            />

            <div style={{ display: 'flex', width: '90%' }}>
              <TextField
                type="password"
                value={password}
                name="password"
                required
                onChange={handleChange}
                label="Password"
                sx={{
                  backgroundColor: 'transparent',
                  width: '110%',
                  borderRadius: '10',
                }}
              />
            </div>
            <div style={{ display: 'flex', width: '90%' }}>
              <TextField
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                required
                onChange={handleChange}
                label="Confirm password"
                sx={{
                  backgroundColor: 'transparent',
                  width: '110%',
                  borderRadius: '10',
                }}
              />
              {/*hoos icon buttonka waa inuu ku dhex jiro password inputka*/}
            </div>
            <Button
              variant="contained"
              justify="flex-end"
              type="submit"
              sx={{
                width: '90%',
                margin: '10px',
                borderRadius: '10',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              Register
              <span
                style={{ textTransform: 'capitalize', paddingLeft: '5px' }}
              ></span>
            </Button>

            <Button
              variant="contained"
              justify="flex-end"
              //type="submit"
              //onClick={Login}
              component={Link}
              to="/login"
              sx={{
                width: '50%',
                backgroundColor: 'green',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10',
                //textTransform: 'capitalize',
              }}
            >
              L<span style={{ textTransform: 'lowercase' }}>ogin</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
