import TodoList from '@/components/todo-list';
import { createClient } from '@/lib/supabase/server';
import { Separator } from '@/shared-components/separator';
import { redirect } from 'next/navigation';

export default async function TodosPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: todos } = await supabase
        .from('todos')
        .select()
        .order('inserted_at', { ascending: false });

    return (
        <section className="flex w-full max-w-2xl flex-col gap-4 p-3 pt-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Todo's
            </h1>
            <Separator className="w-full" />
            <TodoList todos={todos ?? []} />
        </section>
    );
}
