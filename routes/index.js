var express = require('express');
const { rateLimiter } = require('../public/src/utils/rateLimiter');
var router = express.Router();
const IpMap = new Map();
const initialTokens = 10;
const requests = [];
const requestThreshold = 60;
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
  const isBucketPassed = rateLimiter.bucketToken(ipAddress,IpMap,initialTokens);
  const isFixedWindowPassed = rateLimiter.fixedWindowCounter(requests,requestThreshold);
  const isSlidingWindowLogPassed = rateLimiter.slidingWindowLog(ipAddress,IpMap,requestThreshold);
  const isSlidingWindowCounterPassed = rateLimiter.slidingWindowCounter(requests,requestThreshold,duration,currentWindow);
  if(!isBucketPassed){
    return res.status(429).json({message:"limited request!"})
  }
  return res.status(200).json({message:"Limited, don't over use me!"});
 });

module.exports = router;
