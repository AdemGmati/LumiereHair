'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/client'
import { useRouter } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'

const center = () => {
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      
      if (!data.user) {
        router.push('/') // Redirect to homepage if not logged in
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>center</h1>
      <LogoutButton />
    </div>
  )
}

export default center