const express = require("express");
const router = express.Router();
const apiRoutes = require('./api')
router.use('/api', apiRoutes)

module.exports = router

router.use((req,res)=>{
  //res.send("<h2>Wrong Route</h2><h4><a href='/api/home'>Click Here To Go Back</a></h4>")
  res.render('landingpage')
})