const path = require('path');
const cors = require('cors');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const stories = require('./Stories');
const port = process.env.PORT || 9000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS
app.use(
  cors({
    origin: [
      'https://facebook-clone-mern.netlify.app',
      'http://localhost:3000',
      'https://facebook-clone-mern.onrender.com',
    ],
  })
);

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
//app.use('/api/comments', require('./routes/commentRoutes'));
//app.use('/api/stories', require('./routes/storiesRoutes'));

app.get('/api/stories/others', (req, res) => {
  res.send(stories);
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the "build" folder
  app.use(express.static(path.join(__dirname, './frontend/build')));

  // Route all other requests to the frontend's "index.html" file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
