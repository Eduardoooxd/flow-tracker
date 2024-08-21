'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { getURL } from '@/lib/utils';
import { Provider } from '@supabase/supabase-js';

export async function emailLogin(formData: FormData) {
    const supabase = createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('/login?message=Could not authenticate user');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signupEmail(formData: FormData) {
    const supabase = createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect('/login?message=Error signing up');
    }

    revalidatePath('/', 'layout');
    redirect('/login');
}

export async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
}

export async function oAuthSignIn(provider: Provider) {
    if (!provider) {
        redirect('/login?message=No provider selected');
    }

    const supabase = createClient();
    const redirectUrl = getURL('/auth/callback');

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: redirectUrl,
        },
    });

    if (error) {
        redirect(`/login?message=Error authenticate with OAuth Provider ${provider}`);
    }

    redirect(data.url);
}
