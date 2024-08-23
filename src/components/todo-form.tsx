'use client';
import { addTodo } from '@/app/todos/actions';
import { Todo } from '@/types/todo';
import { Send } from 'lucide-react';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './shared/button';
import { Card, CardContent } from './shared/card';
import { Textarea } from './shared/textarea';
import { TodoOptimisticUpdate } from './todo-list';

interface TodoFormProps {
    optimisticUpdate: TodoOptimisticUpdate;
}

function FormContent() {
    const { pending } = useFormStatus();

    return (
        <>
            <Textarea
                disabled={pending}
                minLength={4}
                name="todo"
                required
                placeholder="Add a new todo"
            />
            <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Submit Todo</span>
            </Button>
        </>
    );
}

export default function TodoForm({ optimisticUpdate }: TodoFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const createNewTodo = async (data: FormData) => {
        const newTodo: Todo = {
            id: -1,
            inserted_at: '',
            user_id: '',
            task: data.get('todo') as string,
            is_complete: false,
        };
        optimisticUpdate({ action: 'create', todo: newTodo });
        await addTodo(data);
        formRef.current?.reset();
    };

    return (
        <Card>
            <CardContent className="p-3">
                <form ref={formRef} className="flex gap-4" action={createNewTodo}>
                    <FormContent />
                </form>
            </CardContent>
        </Card>
    );
}
