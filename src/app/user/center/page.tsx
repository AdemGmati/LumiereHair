'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogoutButton } from '@/components/login/logout-button'
import { useLanguage } from '@/i18n/LanguageProvider'

const Center = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { tStr } = useLanguage()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      
      if (!data.user) {
        router.push('/')
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  if (isLoading) return <div className="flex min-h-[40vh] items-center justify-center">{tStr('user.loading')}</div>

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-[#311b43]">{tStr('user.centerTitle')}</h1>
      <p className="mt-2 text-[#796782]">{tStr('user.centerWelcome')}</p>
      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  )
}

export default Center
