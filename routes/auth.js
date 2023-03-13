const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      data: { newUser },
    });
  } catch (err) {
    res.status(400).json({
      message: 'User already exists',
      data: { newUser },
    });
  }
});
//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const validPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);
    if (validPassword !== req.body.password) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    // const token = user.generateAuthToken();
    const { password, ...others } = user._doc;
    res.status(200).json({
      message: 'User logged in successfully',
      data: { others },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});
module.exports = router;
