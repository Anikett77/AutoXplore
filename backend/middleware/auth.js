import jwt from 'jsonwebtoken'

/**
 * Simple auth middleware that:
 * - reads Authorization: Bearer <token>
 * - verifies with process.env.JWT_SECRET
 * - sets req.user = { id: <userId> }
 *
 * NOTE: adjust `payload.id` access if your JWT stores the user id under a different key
 * (e.g. payload.userId or payload._id).
 */
export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error('JWT_SECRET is not set in environment')
      return res.status(500).json({ message: 'Server misconfiguration' })
    }

    const payload = jwt.verify(token, secret)
    // Expecting payload contains user id as `id`. If your tokens use a different field, change here.
    const userId = payload.id ?? payload.userId ?? payload._id

    if (!userId) {
      return res.status(401).json({ message: 'Invalid token (no user id)' })
    }

    // attach user info for downstream handlers
    req.user = { id: userId, payload }
    next()
  } catch (err) {
    console.error('auth middleware error', err)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}