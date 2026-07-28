'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronRight, LockKeyhole, Package, ShoppingBag, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogoutButton } from '@/components/login/logout-button'
import { useLanguage } from '@/i18n/LanguageProvider'

const Center = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { tStr } = useLanguage()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace('/user/login')
        return
      }

      setEmail(data.user.email ?? '')
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="grid min-h-[54vh] place-items-center bg-[#fdfbfe] px-5">
        <div className="flex items-center gap-3 text-sm font-medium text-[#796782]">
          <span className="size-4 animate-spin rounded-full border-2 border-violet-200 border-t-violet-500" />
          {tStr('user.loading')}
        </div>
      </div>
    )
  }

  const initial = email.charAt(0).toUpperCase() || 'L'

  return (
    <main className="min-h-[calc(100vh-9rem)] bg-[#f8f6fc] py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-7 flex items-center gap-2 text-xs font-medium text-[#8d7c96]">
          <Link href="/" className="transition-colors hover:text-violet-500">Home</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-[#311b43]">{tStr('user.centerTitle')}</span>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] bg-[#311b43] px-6 py-8 text-white shadow-[0_20px_60px_rgba(49,27,67,.18)] sm:px-10 sm:py-10">
          <div className="absolute -right-16 -top-24 size-64 rounded-full bg-violet-400/20 blur-2xl" />
          <div className="absolute -bottom-28 right-1/4 size-56 rounded-full border border-white/10" />
          <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/12 font-display text-2xl font-semibold text-violet-100 ring-1 ring-white/15 sm:size-16">
                {initial}
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[.18em] text-violet-200">Lumiere Hair</p>
                <h1 className="font-display text-3xl font-semibold leading-none sm:text-4xl">{tStr('user.centerTitle')}</h1>
                <p className="mt-2 text-sm text-white/70">{email || tStr('user.centerWelcome')}</p>
              </div>
            </div>
            <Link href="/products" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#311b43] transition-transform hover:-translate-y-0.5">
              Continue shopping <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_.8fr]">
          <section className="rounded-[1.5rem] border border-[#ebe6f1] bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-violet-500">Your space</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#311b43]">Everything in one place</h2>
              </div>
              <ShoppingBag className="size-5 text-violet-300" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/products" className="group rounded-2xl border border-[#ebe6f1] bg-[#fdfbfe] p-4 transition-colors hover:border-violet-200 hover:bg-violet-50/60">
                <div className="mb-6 grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-600"><Package className="size-5" /></div>
                <div className="flex items-center justify-between gap-3">
                  <div><h3 className="font-semibold text-[#311b43]">Shop extensions</h3><p className="mt-1 text-sm text-[#796782]">Discover your next look</p></div>
                  <ChevronRight className="size-5 text-[#ad9ab5] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="/user/update-password" className="group rounded-2xl border border-[#ebe6f1] bg-[#fdfbfe] p-4 transition-colors hover:border-violet-200 hover:bg-violet-50/60">
                <div className="mb-6 grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-600"><LockKeyhole className="size-5" /></div>
                <div className="flex items-center justify-between gap-3">
                  <div><h3 className="font-semibold text-[#311b43]">Password & security</h3><p className="mt-1 text-sm text-[#796782]">Keep your account secure</p></div>
                  <ChevronRight className="size-5 text-[#ad9ab5] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </section>

          <aside className="rounded-[1.5rem] border border-[#ebe6f1] bg-white p-5 sm:p-7">
            <div className="grid size-10 place-items-center rounded-xl bg-[#311b43] text-white"><UserRound className="size-5" /></div>
            <h2 className="mt-5 font-display text-2xl font-semibold text-[#311b43]">Account details</h2>
            <p className="mt-2 text-sm leading-6 text-[#796782]">Signed in as <span className="font-medium text-[#311b43]">{email || 'your account'}</span>.</p>
            <div className="my-6 border-t border-[#ebe6f1]" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.14em] text-[#8d7c96]">Session</p>
            <LogoutButton />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Center
