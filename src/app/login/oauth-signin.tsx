'use client';
import { Button } from '@/shared-components/button';
import { Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { oAuthSignIn } from './actions';

type OAuthProvider = {
    name: Provider;
    displayName: string;
    icon?: JSX.Element;
};

export function OAuthButtons() {
    const OAuthProviders: OAuthProvider[] = [
        {
            name: 'github',
            displayName: 'Github',
            icon: <Github className="size-5" />,
        },
    ];

    return (
        <>
            {OAuthProviders.map(({ name, displayName, icon }) => (
                <Button
                    className="flex w-full items-center justify-center gap-2"
                    variant="outline"
                    onClick={async () => {
                        await oAuthSignIn(name);
                    }}
                >
                    Login with {displayName}
                    {icon}
                </Button>
            ))}
        </>
    );
}
