const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('website'));

// Initialize projectData object
let projectData = {};

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// GET route to return projectData
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  };
  res.send({ message: 'Data received' });
});
