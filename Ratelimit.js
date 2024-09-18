
// In-memory store for rate limiting
// mostly we use the rate limit as the middleware

const rateLimitStore = new Map();

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, firstRequestTime: currentTime });
    next();
  } else {
    const data = rateLimitStore.get(ip);
    const timeElapsed = currentTime - data.firstRequestTime;

    if (timeElapsed < windowMs) {
      if (data.count >= maxRequests) {
        res.status(429).send('Too many requests, please try again later.');
      } else {
        data.count += 1;
        rateLimitStore.set(ip, data);
        next();
      }
    } else {
      rateLimitStore.set(ip, { count: 1, firstRequestTime: currentTime });
      next();
    }
  }
};


