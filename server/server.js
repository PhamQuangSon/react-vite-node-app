const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Important for Vercel

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received!', data });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app; // For Vercel Functions