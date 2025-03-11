const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./src/config/config');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const cors = require('cors');

dotenv.config();
// Connect to the database
connectDb();

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
  res.status(200).send(
    '<h1>Welcome to Blogging-app Web Services</h1>'
  );
});


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

// Start the Server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});