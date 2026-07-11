'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/client'
import { LogoutButton } from '../components/logout-button'

const page = () => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setIsLoading(false)
    }
    checkUser()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Welcome to My Store</h1>
      
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/user/login">
            <button>Login</button>
          </Link>
          
          <Link href="/user/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
      
      <p>page</p>
    </div>
  )
}

export default page