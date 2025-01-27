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
 const fixedWindowCounter = (requests, requestThreshold)=> {
    const currentTime = Date.now();
    const oneMinute = 60 * 1000; 
    while (requests.length > 0 && currentTime - requests[0] > oneMinute) {
      requests.shift();
    }
    requests.push(currentTime);
    return requests.length <= requestThreshold;
  }
  export const rateLimiter = {
    bucketToken,
    fixedWindowCounter,
  }