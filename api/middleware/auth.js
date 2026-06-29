// Authentication Middleware for Vercel API Routes
// Validates custom portal credentials and admin credentials

// Admin credentials (should be moved to environment variables in production)
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@upstarsloans.com',
  password: process.env.ADMIN_PASSWORD || 'admin123'
}

/**
 * Validate customer authentication
 * @param {Object} credentials - { userId, password }
 * @returns {Promise<Object>} Customer data if valid, null otherwise
 */
async function validateCustomerAuth(supabase, credentials) {
  if (!credentials.userId || !credentials.password) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', credentials.userId)
      .eq('password', credentials.password)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error('Authentication validation error:', error)
    return null
  }
}

/**
 * Validate admin authentication
 * @param {Object} credentials - { email, password }
 * @returns {boolean} True if valid admin credentials
 */
function validateAdminAuth(credentials) {
  if (!credentials.email || !credentials.password) {
    return false
  }

  return credentials.email === ADMIN_CREDENTIALS.email && 
         credentials.password === ADMIN_CREDENTIALS.password
}

/**
 * Middleware to authenticate requests
 * Checks for customer or admin credentials in request headers/body
 */
export async function authenticateRequest(req, res, supabase) {
  // Check for credentials in headers or body
  const credentials = req.headers.authorization 
    ? JSON.parse(req.headers.authorization)
    : req.body

  // Check for admin credentials
  if (credentials.role === 'admin') {
    const isAdminValid = validateAdminAuth({
      email: credentials.email,
      password: credentials.password
    })

    if (isAdminValid) {
      return { authenticated: true, role: 'admin', user: null }
    }
  }

  // Check for customer credentials
  if (credentials.role === 'customer' || !credentials.role) {
    const customer = await validateCustomerAuth(supabase, {
      userId: credentials.userId,
      password: credentials.password
    })

    if (customer) {
      return { authenticated: true, role: 'customer', user: customer }
    }
  }

  return { authenticated: false, role: null, user: null }
}

/**
 * Express middleware wrapper for authentication
 */
export function authMiddleware(supabase) {
  return async (req, res, next) => {
    const authResult = await authenticateRequest(req, res, supabase)
    
    if (!authResult.authenticated) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid or missing credentials' 
      })
    }

    req.auth = authResult
    next()
  }
}

/**
 * Middleware to ensure user is admin
 */
export function requireAdmin(req, res, next) {
  if (req.auth.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'Admin access required' 
    })
  }
  next()
}

/**
 * Middleware to ensure user can access specific customer data
 * Admins can access any customer's data
 * Customers can only access their own data
 */
export function requireCustomerAccess(req, res, next) {
  const requestedCustomerId = req.query.customerId || req.body.customerId
  
  // Admins can access any customer data
  if (req.auth.role === 'admin') {
    return next()
  }

  // Customers can only access their own data
  if (req.auth.role === 'customer') {
    if (requestedCustomerId && requestedCustomerId !== req.auth.user.id) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You can only access your own data' 
      })
    }
    return next()
  }

  return res.status(403).json({ 
    error: 'Forbidden',
    message: 'Invalid access attempt' 
  })
}
