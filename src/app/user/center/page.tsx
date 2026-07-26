'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogoutButton } from '@/components/login/logout-button'

const Center = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      
      if (!data.user) {
        router.push('/') // Redirect to homepage if not logged in
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>center</h1>
      <LogoutButton />
    </div>
  )
}

export default Center
