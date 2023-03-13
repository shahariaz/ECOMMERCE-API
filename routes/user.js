const router = require('express').Router();
const { verifyToken, verifyTokenAndAuth } = require('./verifyToken');

router.put('/:id', verifyToken, verifyTokenAndAuth);
module.exports = router;
