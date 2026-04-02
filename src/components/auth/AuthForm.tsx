"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'

type AuthMode = 'signin' | 'signup'

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setInfoMessage(null)
    setIsLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          throw error
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          throw error
        }

        setInfoMessage('Check your email for confirmation instructions.')
      }
    } catch (err) {
      console.error('Authentication error:', err)
      setError(err instanceof Error ? err.message : 'Unable to authenticate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign in to Fluency Frames</CardTitle>
          <CardDescription>
            {mode === 'signin'
              ? 'Enter your email and password to continue.'
              : 'Create an account to save your progress and continue learning.'}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              type="button"
              variant={mode === 'signin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('signin')}
            >
              Sign In
            </Button>
            <Button
              type="button"
              variant={mode === 'signup' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('signup')}
            >
              Sign Up
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form id="auth-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {infoMessage && <p className="text-sm text-muted-foreground">{infoMessage}</p>}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="auth-form" className="w-full" disabled={isLoading}>
            {isLoading ? 'Working…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
          <div className="text-sm text-muted-foreground">
            {mode === 'signin' ? (
              <span>
                New here?{' '}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => setMode('signup')}
                >
                  Create an account.
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => setMode('signin')}
                >
                  Sign in.
                </button>
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
