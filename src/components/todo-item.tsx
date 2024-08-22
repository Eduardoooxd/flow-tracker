'use client';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './shared/button';
import { Card, CardContent } from './shared/card';
import { Checkbox } from './shared/checkbox';
import { TodoOptimisticUpdate } from './todo-list';

interface TodoItemProps {
    todo: Todo;
    optimisticUpdate: TodoOptimisticUpdate;
}

export default function TodoItem({ todo, optimisticUpdate }: TodoItemProps) {
    const { pending } = useFormStatus();
    const [checked, setChecked] = useState(todo.is_complete);

    return (
        <form>
            <Card className={cn('w-full', pending && 'opacity-50')}>
                <CardContent className="flex items-start gap-3 p-3">
                    <span className="flex size-10 items-center justify-center">
                        <Checkbox
                            disabled={pending}
                            checked={!!checked}
                            onCheckedChange={async (val: CheckedState) => {
                                if (val === 'indeterminate') return;
                                setChecked(val);
                                //await updateTodo({ ...todo, is_complete: val });
                            }}
                        />
                    </span>
                    <p className={cn('min-w-0 flex-1 break-words pt-2')}>{todo.task}</p>
                    <Button
                        disabled={pending}
                        formAction={async (data) => {
                            optimisticUpdate({ action: 'delete', todo });
                            // await deleteTodo(todo.id);
                        }}
                        variant="ghost"
                        size="icon"
                    >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Delete Todo</span>
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
