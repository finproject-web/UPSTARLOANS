// Rate Limiting Middleware for Vercel API Routes
// Prevents abuse and protects against DDoS attacks

// Simple in-memory rate limiting (for production, consider using Redis)
const rateLimitStore = new Map()

/**
 * Rate limit configuration
 */
const RATE_LIMIT_CONFIG = {
  // General API rate limits
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
    message: 'Too many requests, please try again later'
  },
  
  // File upload rate limits (stricter)
  fileUpload: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10, // 10 uploads per 15 minutes
    message: 'Too many file uploads, please try again later'
  },
  
  // File access rate limits
  fileAccess: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 50, // 50 file accesses per 5 minutes
    message: 'Too many file access requests, please try again later'
  }
}

/**
 * Clean up expired rate limit entries
 */
function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}

// Run cleanup every minute
setInterval(cleanupExpiredEntries, 60 * 1000)

/**
 * Get client identifier
 * Uses IP address and user ID if available
 */
function getClientIdentifier(req) {
  const ip = req.headers['x-forwarded-for'] || 
             req.headers['x-real-ip'] || 
             req.connection.remoteAddress ||
             'unknown'
  
  const userId = req.auth?.user?.id || req.auth?.user?.userId || 'anonymous'
  
  return `${ip}-${userId}`
}

/**
 * Check if request is within rate limits
 */
function checkRateLimit(identifier, config) {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record) {
    // First request
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs
    })
    return { allowed: true, remaining: config.maxRequests - 1 }
  }

  if (now > record.resetTime) {
    // Window expired, reset counter
    record.count = 1
    record.resetTime = now + config.windowMs
    return { allowed: true, remaining: config.maxRequests - 1 }
  }

  if (record.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    }
  }

  // Increment counter
  record.count++
  return { allowed: true, remaining: config.maxRequests - record.count }
}

/**
 * Rate limiting middleware factory
 * @param {string} type - Type of rate limit ('general', 'fileUpload', 'fileAccess')
 */
export function createRateLimiter(type = 'general') {
  const config = RATE_LIMIT_CONFIG[type] || RATE_LIMIT_CONFIG.general

  return async (req, res, next) => {
    const identifier = getClientIdentifier(req)
    const result = checkRateLimit(identifier, config)

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', config.maxRequests)
    res.setHeader('X-RateLimit-Remaining', result.remaining)
    
    if (result.resetTime) {
      res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000))
    }

    if (!result.allowed) {
      const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000)
      res.setHeader('Retry-After', retryAfter)
      
      return res.status(429).json({
        error: 'Too Many Requests',
        message: config.message,
        retryAfter: retryAfter
      })
    }

    next()
  }
}

/**
 * Export pre-configured rate limiters
 */
export const generalRateLimiter = createRateLimiter('general')
export const fileUploadRateLimiter = createRateLimiter('fileUpload')
export const fileAccessRateLimiter = createRateLimiter('fileAccess')
