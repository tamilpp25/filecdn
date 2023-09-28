import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { User, getServerSession } from 'next-auth'

export const getUserSession = async (): Promise<any> => {
  const authUserSession = await getServerSession(authOption)
  if (!authUserSession) throw new Error('unauthorized')
  return authUserSession.user!
}