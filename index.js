// index.js
import 'dotenv/config'             // loads .env into process.env
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env')
    process.exit(1)
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // sign up (create user)
    async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { error }
    return { data }
    }

    // sign in
    async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error }
    return { data }
    }

    // sign out
    async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) return { error }
    return { ok: true }
    }

    // small demo runner
    async function main() {
    console.log('Running Supabase auth demo...')

    const email = 'test+' + Date.now() + '@example.com'   // unique test email
    const password = 'Password123!'

    console.log('Signing up:', email)
    console.log(await signUp(email, password))          // may require email confirmation depending on your project settings

    console.log('Signing in:')
    console.log(await signIn(email, password))

    console.log('Signing out:')
    console.log(await signOut())

    console.log('Done.')
}

main().catch(err => console.error(err))
