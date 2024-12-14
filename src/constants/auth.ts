const isClient = typeof window !== 'undefined';

export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const RATE_LIMIT_KEY = 'photo_submissions';
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 300000; // 300 seconds in milliseconds

interface RateLimit {
  count: number;
  timestamp: number;
}

export const isAuthenticated = () => {
  if (!isClient) return false;
  return sessionStorage.getItem('auth_token') === AUTH_TOKEN;
};

export const checkRateLimit = (): boolean => {
  if (!isClient) return false;
  
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  let rateLimit: RateLimit;

  if (stored) {
    rateLimit = JSON.parse(stored);
    if (now - rateLimit.timestamp > TIME_WINDOW) {
      // Reset if time window has passed
      rateLimit = { count: 0, timestamp: now };
    }
  } else {
    rateLimit = { count: 0, timestamp: now };
  }

  if (rateLimit.count >= MAX_SUBMISSIONS) {
    return false;
  }

  rateLimit.count++;
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(rateLimit));
  return true;
};

export const getRateLimitInfo = (): { remaining: number; resetTime: string } => {
  if (!isClient) {
    return { remaining: MAX_SUBMISSIONS, resetTime: 'now' };
  }

  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  if (!stored) {
    return { remaining: MAX_SUBMISSIONS, resetTime: 'now' };
  }

  const rateLimit: RateLimit = JSON.parse(stored);
  const now = Date.now();
  const timeElapsed = now - rateLimit.timestamp;

  if (timeElapsed > TIME_WINDOW) {
    return { remaining: MAX_SUBMISSIONS, resetTime: 'now' };
  }

  const remaining = Math.max(0, MAX_SUBMISSIONS - rateLimit.count);
  const resetInSeconds = Math.ceil((TIME_WINDOW - timeElapsed) / 1000);
  const resetTime = `${Math.floor(resetInSeconds / 60)}m ${resetInSeconds % 60}s`;

  return { remaining, resetTime };
};