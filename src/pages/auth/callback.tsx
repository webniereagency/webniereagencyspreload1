import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error(error)
      }
      // Redirect to dashboard after session is established
      if (data.session) {
        navigate('/dashboard')
      } else {
        navigate('/dashboard')
      }
    }

    handleAuth()
  }, [navigate])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="animate-pulse">
        <h2 className="text-xl font-semibold text-foreground">Verifying your email…</h2>
        <p className="text-muted-foreground mt-2">You'll be redirected shortly.</p>
      </div>
    </div>
  )
}
