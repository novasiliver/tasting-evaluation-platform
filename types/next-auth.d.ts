import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      company?: string | null
      phone?: string | null
      country?: string | null
      address?: string | null
      website?: string | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: string
    company?: string | null
    phone?: string | null
    country?: string | null
    address?: string | null
    website?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    company?: string | null
    phone?: string | null
    country?: string | null
    address?: string | null
    website?: string | null
  }
}

