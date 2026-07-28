'use client'

import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/i18n/LanguageProvider'

export function LogoutButton() {
  const router = useRouter()
  const { tStr } = useLanguage()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/user/login')
  }

  return <Button onClick={logout}>{tStr('common.logout')}</Button>
}
