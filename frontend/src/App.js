import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import './App.css';

//import './style.css';
import Posts from './pages/Posts';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import Footer from './components/Footer';
import Comments from './components/Comments';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import { CssBaseline } from '@mui/material';
import CreateStory from './components/CreateStory/CreateStory';
import UserProfile from './components/userProfile/UserProfile';

function App() {
  const { user } = useSelector((state) => state.auth);

  //const { darkMode, togle } = useContext(DarkModeContext);
  //const navigate = useNavigate();

  return (
    <div
      //className
      style={{
        color: '#1c1e21',
        height: '100vh',

        lineHeight: '1.34px',
        margin: '0',
        padding: '0',
        width: '100%',
      }}
    >
      <Router>
        {user && <Navbar />}
        <CssBaseline />

        <Routes>
          <Route
            exact
            path="/login"
            element={<Login />}
          />

          <Route
            exact
            path="/register"
            element={<Register />}
          />
          <Route
            exact
            path="/forgetpassword"
            element={<ForgetPassword />}
          />
          <Route
            path="/posts"
            element={<Posts />}
          />
          <Route
            path="/userProfile"
            element={<UserProfile />}
          />

          <Route
            path="/comments"
            element={<Comments />}
          />

          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            exact
            path="/stories/create"
            element={<CreateStory />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
