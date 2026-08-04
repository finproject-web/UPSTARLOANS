# Security Setup Instructions

## Environment Variables Setup

On your hosting platform (Vercel, Netlify, etc.), set these environment variables:

### Required Environment Variables:
```
VITE_SUPABASE_URL=https://yxseqkbwlxxwxkhslnog.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable__e8zs0QBkyZyd_DrYv0rBA_FcL6vjOR
VITE_ADMIN_EMAIL=admin@upstarsloans.com
VITE_ADMIN_PASSWORD=your_secure_admin_password
```

### Security Features Implemented:

1. **Protected Admin Routes**: Admin dashboard now requires authentication
2. **Session Management**: Admin sessions expire after 24 hours
3. **Security Headers**: Added CORS and security headers
4. **Code Obfuscation**: Production build minifies and removes console logs
5. **Environment Variables**: Sensitive data moved to environment variables
6. **Git Ignore**: .env file excluded from version control

## Admin Credentials

Current admin credentials (CHANGE THESE FOR PRODUCTION):
- Email: admin@upstarsloans.com
- Password: Up$tar2024!Secure#Admin

## For Live Site:

1. Update admin password in hosting platform environment variables
2. Ensure HTTPS is enabled on your domain
3. Add your domain to Supabase allowed origins if needed
4. Consider adding additional security headers via your hosting platform

## Additional Security Recommendations:

1. **IP Whitelisting**: Consider restricting admin access by IP
2. **Two-Factor Authentication**: Add 2FA for admin login
3. **Rate Limiting**: Implement rate limiting on login attempts
4. **Audit Logging**: Log all admin actions for security monitoring
5. **Regular Password Changes**: Implement forced password rotation
6. **Domain Restrictions**: Limit admin access to specific domains