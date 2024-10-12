import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

export const createRateLimiter = (options?: {
  points: number;
  duration: number;
}) => {
  const rateLimitOptions = {
    points: 15,
    duration: 60,
    ...options,
  };

  return new RateLimiterMemory(rateLimitOptions);
};

export const handleRateLimitError = (error: unknown) => {
  if (error instanceof RateLimiterRes && error.remainingPoints === 0) {
    throw new Error("Rate limit exceeded");
  }
};
