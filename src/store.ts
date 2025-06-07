import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Todo = {
	task: string;
	id: number;
};

const storedTodos = browser && localStorage.todos;
export const todos = writable(browser && (storedTodos ? JSON.parse(storedTodos) : <Todo[]>[]));

todos.subscribe((value) => {
	if (browser && value) return (localStorage.todos = JSON.stringify(value));
});
