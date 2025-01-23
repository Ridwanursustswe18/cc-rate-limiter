var express = require('express');
var router = express.Router();

router.get('/health', function(req, res, next) {
 res.status(200).json({message:"Server Health check"})
});
router.get('/unlimited', function(req, res, next) {
  res.status(200).json({message:"Unlimited! Let's Go!"})
 });
 router.get('/limited', function(req, res, next) {
  res.status(200).json({message:"Limited, don't over use me!"})
 });

module.exports = router;
