const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API is running 🎉');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});