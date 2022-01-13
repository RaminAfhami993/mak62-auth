const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const articleRouter = require('./article');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/article', articleRouter);

module.exports = router;