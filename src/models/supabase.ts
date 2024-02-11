import { AuthError, Provider, createClient } from "@supabase/supabase-js";

const supabase = createClient('https://svqubdprnzkhvgwslxzw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2cXViZHBybnpraHZnd3NseHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNDg4ODUsImV4cCI6MjAyMjcyNDg4NX0.Hiwb8nFPsZJO4--k0iS0bSCy_8ivhaF4pFLNlV_tSB0');

export async function createUser(email: string, password: string, name: string) : Promise<AuthError | null> {
    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: name
            }
        }
    })

    return error;
}

export async function signIn(email: string, password: string) : Promise<AuthError | null> { 
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    return error;
}

export async function signInWithOauth(provider: Provider) : Promise<AuthError | null> {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: provider
    })

    return error;
}

export async function signOut() : Promise<AuthError | null> {
    const { error } = await supabase.auth.signOut();
    return error;
}

export async function updateUserEmail(email: string) : Promise<AuthError | null> {
    const { error } = await supabase.auth.updateUser({
        email: email
    })

    return error;
}

export async function updateUserPassword(password: string) : Promise<AuthError | null> {
    const { error } = await supabase.auth.updateUser({
        password: password
    })

    return error; 
}

export async function getUser() {
    const { data, error } = await supabase.auth.refreshSession();
    if (error == null) {
        return data;
    }
}