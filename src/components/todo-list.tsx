'use client';
import { Todo } from '@/types/todo';
import { useOptimistic } from 'react';
import TodoForm from './todo-form';
import TodoItem from './todo-item';

interface TodoListProps {
    todos: Todo[];
}

export type Action = 'delete' | 'update' | 'create';

export type TodoOptimisticUpdate = (action: { action: Action; todo: Todo }) => void;

export function todoReducer(
    state: Todo[],
    { action, todo: newTodo }: { action: Action; todo: Todo },
) {
    switch (action) {
        case 'delete':
            return state.filter(({ id }) => id !== newTodo.id);
        case 'update':
            return state.map((oldTodo) => (oldTodo.id === newTodo.id ? newTodo : oldTodo));
        case 'create':
            return [newTodo, ...state];
        default:
            return state;
    }
}

export default function TodoList({ todos }: TodoListProps) {
    const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(todos, todoReducer);

    return (
        <>
            <TodoForm optimisticUpdate={optimisticTodosUpdate} />
            <div className="flex w-full flex-col gap-4">
                {optimisticTodos?.map((todo) => {
                    return (
                        <TodoItem
                            optimisticUpdate={optimisticTodosUpdate}
                            todo={todo}
                            key={todo.id}
                        />
                    );
                })}
            </div>
        </>
    );
}
