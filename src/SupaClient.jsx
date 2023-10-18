import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://yxwirxrwqppiazubberi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d2lyeHJ3cXBwaWF6dWJiZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwOTkwNzYsImV4cCI6MjAxMTY3NTA3Nn0.260NmDbZgceeHKklsKf9wniMFYqHpXI6q_D2EcLE3Rs')

export function signInWithDiscord() {
  const {data, error } = supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: 'http://localhost:5174/'
    }
  })
}