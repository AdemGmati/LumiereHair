'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { tStr } = useLanguage()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{tStr('user.errorTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-sm text-muted-foreground">{tStr('user.errorCode', { code: error })}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{tStr('user.errorUnspecified')}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
