var express = require('express');
const { rateLimiter } = require('../public/src/utils/rateLimiter');
var router = express.Router();
const IpMap = new Map();
const initialTokens = 10;
const requests = [];
const requestThreshold = 60;
const windowStart = Date.now();
const duration = 60;
const currentWindow = [0];
const IP = require('ip');
router.get('/health', function(req, res, next) {
 res.status(200).json({message:"Server Health check"})
});
router.get('/unlimited', function(req, res, next) {
  res.status(200).json({message:"Unlimited! Let's Go!"})
 });
 router.get('/limited', function(req, res, next) {
  const ipAddress = IP.address();
  // const dhakaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  // const minutes = new Date(dhakaTime).getMinutes();
  // console.log(minutes);  
  // const isPassed = bucketToken(ipAddress,IpMap,initialTokens);
  // const isPassed = rateLimiter.fixedWindowCounter(requests,requestThreshold);
  // const isPassed = rateLimiter.slidingWindowLog(ipAddress,IpMap,requestThreshold);
  const isPassed = rateLimiter.slidingWindowCounter(requests,requestThreshold,duration,currentWindow);
  if(!isPassed){
    return res.status(429).json({message:"limited request!"})
  }
  return res.status(200).json({message:"Limited, don't over use me!"});
 });

module.exports = router;
