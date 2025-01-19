import { createClient } from '../supabase/client'

const supabase = createClient()

export type User = {
  id: string
  aud: string
  role?: string
  email: string
  email_confirmed_at?: string
  phone?: string | null
  confirmation_sent_at?: string
  confirmed_at?: string
  last_sign_in_at?: string
  app_metadata: object | null,
  identities?: [
    {
      id: string,
      user_id: string,
      identity_data: {
        email: string,
        sub: string
      },
      provider: string,
      last_sign_in_at: string,
      created_at: string,
      updated_at: string
    }
  ],
  created_at: string,
  updated_at: string
}

export const getUser = async (): Promise<any | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user || null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}