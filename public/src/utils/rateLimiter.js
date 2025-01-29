import _ from 'lodash';
const bucketToken = (ipAddress, bucketPerIpMap, initialTokens) => {
  if (!bucketPerIpMap.has(ipAddress)) {
    bucketPerIpMap.set(ipAddress, initialTokens - 1);
  } else {
    const currentTokens = bucketPerIpMap.get(ipAddress);
    if (currentTokens <= 0) return false;
    bucketPerIpMap.set(ipAddress, currentTokens - 1);
  }

  setTimeout(() => {
    const tokens = bucketPerIpMap.get(ipAddress);
    if (tokens < initialTokens) {
      bucketPerIpMap.set(ipAddress, tokens + 1);
    }
  }, 1000);

  return true;
};
const fixedWindowCounter = (requests, requestThreshold) => {
  const currentTime = Date.now();
  const oneMinute = 60 * 1000;
  while (requests.length > 0 && currentTime - requests[0] > oneMinute) {
    requests.shift();
  }
  if (requests.length < requestThreshold) {
    requests.push(currentTime);
    return true;
  }

  return false;
}
const slidingWindowLog = (ipAddress, logPerIpMap, requestThreshold) => {
  const currentTime = Date.now();
  const oneMinute = 60 * 1000;
  if (!logPerIpMap.has(ipAddress)) {
    logPerIpMap.set(ipAddress, [currentTime]);
    return true;
  }
  let totalRequests = 0;
  for (const [ip, timestamps] of logPerIpMap) {
    while (timestamps.length > 0 && currentTime - timestamps[0] > oneMinute) {
      timestamps.shift();
    }
    totalRequests += timestamps.length;
  }
  if (totalRequests >= requestThreshold) {
    return false;
  }
  const currentIpTimestamps = logPerIpMap.get(ipAddress);
  currentIpTimestamps.push(currentTime);
  logPerIpMap.set(ipAddress, currentIpTimestamps);
  const sortedEntries = Array.from(logPerIpMap.entries())
    .sort((a, b) => {
      const [, timestampsA] = a;
      const [, timestampsB] = b;
      if (timestampsA[0] !== timestampsB[0]) {
        return timestampsA[0] - timestampsB[0];
      }
      return timestampsA.length - timestampsB.length;
    });
  logPerIpMap = new Map(sortedEntries);
  return true;
};
export const rateLimiter = {
  bucketToken,
  fixedWindowCounter,
  slidingWindowLog,
}