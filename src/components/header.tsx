import { signOut } from '@/app/login/actions';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from './shared/button';

export default async function Header() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-primary">Flow Tracker</h1>
                </Link>
                <div className="flex items-center justify-end space-x-2">
                    {user !== null ? (
                        <form action={signOut} className="flex items-center gap-2">
                            <p>{user.email}</p>
                            <Button>Sign Out</Button>
                        </form>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
