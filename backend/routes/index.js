const express = require('express');
const userRouter = require('./user');
const router = express.Router();
const accoutRouter = require('./accounts');

router.use('/account', accoutRouter);
router.use('/user', userRouter);
module.exports = router;