const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const auth = require('./routes/auth');

dotenv.config();
const { DB } = process.env;
const { PORT } = process.env;
const app = express();
app.use(express.json());

//ROUTES
app.use('/api/test', userRoute);
app.use('/api/test', auth);

app.listen(PORT || 5000, () => {
  console.log('server is running');
});

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected!!');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();
