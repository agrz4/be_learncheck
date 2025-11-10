const express = require('express')
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quiz');

const app = express()
const port = 3000

// middleware
app.use(bodyParser.json());
app.use(express.json());

// set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/', quizRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
