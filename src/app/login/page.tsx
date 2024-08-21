import { createClient } from '@/lib/supabase/server';
import { Button } from '@/shared-components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared-components/card';
import { Input } from '@/shared-components/input';
import { Label } from '@/shared-components/label';
import { redirect } from 'next/navigation';
import { emailLogin } from './actions';

interface LoginPageProps {
    searchParams: { message: string };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { message } = searchParams;

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect('/todos');
    }

    return (
        <section className="flex min-h-[calc(100dvh-4.5rem)] items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form id="login-form" className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jonh-doe@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                minLength={6}
                                name="password"
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                        {message ? (
                            <div className="text-sm font-medium text-destructive">{message}</div>
                        ) : null}
                        <Button formAction={emailLogin} className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
