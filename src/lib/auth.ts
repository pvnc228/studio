// /lib/auth.ts
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET не задан в .env')
}

export async function getUserId(req: NextRequest): Promise<number> {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) {
    throw new Error('Токен не предоставлен')
  }

  const token = auth.replace('Bearer ', '')
  let payload: { userId: number }
  try {
    payload = jwt.verify(token, JWT_SECRET) as any
  } catch {
    throw new Error('Недействительный токен')
  }

  return payload.userId
}
