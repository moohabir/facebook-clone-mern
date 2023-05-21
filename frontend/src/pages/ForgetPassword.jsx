import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();

  const Login = async () => {
    await axios
      .post(
        'http://localhost:3001/users/login',
        JSON.stringify({
          email,
          password,
        })
      )
      .then((response) => {
        //localStorage.getItem('token');
        // localStorage.setItem('email');
        setCurrentUser(response.data);
        //console.log(response.data);
        //localStorage.setItem('password');
        //setCurrentUser(response);
        const accessToken = response?.data?.accessToken;

        setCurrentUser({ email, password, accessToken });
        console.log({ email, password, accessToken });

        //email=(response?.data?.email);
        //window.location.reload();
        //setPassword(response?.data?.password);
        //setCurrentUser([...currentUser, { email, password }]);
        //alert('');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {!currentUser && (
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h4"
              color="primary"
            >
              Facebook
            </Typography>
            <div>
              <form>
                <input
                  type="email||phone"
                  placeholder="Email or phone"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    marginRight: '10px',
                    backgroundColor: 'transparent',
                    height: '35px',
                    width: '200px',
                    border: '1px solid blue',
                    borderRadius: '8px',
                    textIndent: '16px',
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: 'transparent',
                    height: '35px',
                    width: '200px',
                    border: '1px solid blue',
                    borderRadius: '8px',
                    textIndent: '16px',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ marginLeft: '10px' }}
                  onClick={Login}
                  Component={Link}
                  to="/"
                >
                  L <span style={{ textTransform: 'lowercase' }}>og in</span>
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: 'blue',
                    textTransform: 'capitalize',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => window.location.reload() || setCurrentUser({})}
                  Component={Link}
                  to="/forgetpassword"
                >
                  F
                  <span style={{ textTransform: 'lowercase' }}>
                    orget account
                  </span>
                </Button>
              </form>
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#e9ebee',

              alignItems: 'center',

              gap: '20px',
            }}
          >
            <form
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                display: 'flex',
                //justifyContent: 'center',
                flexDirection: 'column',
                //alignItems: 'center',
                height: '200px',
                //justifyContent: 'center',
                width: '500px',
                margin: 'auto',
                padding: '80px 0',
                lineHeight: '1.2',
                color: '#1c1e21',
                marginTop: '90px',
                marginBottom: '90px',
              }}
            >
              <Typography
                variant="h4"
                sx={{ margin: '10px' }}
              >
                Find your account
              </Typography>

              <Typography
                variant="h6"
                sx={{ margin: '10px' }}
              >
                Please enter your email or mobile number to search for your
                account.
              </Typography>
              <input
                placeholder="Email or mobile number"
                style={{
                  width: '90%',
                  margin: 'auto',
                  height: '40px',
                  border: '1px solid grey',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  marginTop: '15px',
                  justifyContent: 'flex-end',
                  marginRight: '10px',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    marginRight: '10px',
                    marginLeft: '10px',
                    backgroundColor: 'grey',
                    color: 'black',
                    textTransform: 'capitalize',
                  }}
                  Component={Link}
                  to="/login"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'blue',
                    color: 'white',
                    textTransform: 'capitalize',
                  }}
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgetPassword;
