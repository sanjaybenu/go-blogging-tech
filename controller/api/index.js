const express = require('express');

const router = express.Router();

const blogRoutes = require('./blogs')

const homeRoutes = require('./home')

const userRoutes = require('./users')

router.use('/users', userRoutes)

router.use('/home', homeRoutes)

router.use('/blog', blogRoutes)

module.exports = router;