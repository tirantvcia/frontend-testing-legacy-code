import { Todo } from "../todo";

export function filterTodo(currentFilter: TodoFilter, todoList: Todo[]) {
    const filteredTodos = [];
    for (let i = 0; i < todoList.length; i++) {
        if (currentFilter === 'all' ||
            (currentFilter === 'completed' && todoList[i].completed) ||
            (currentFilter === 'incomplete' && !todoList[i].completed)) {
            filteredTodos.push(todoList[i]);
        }
    }
    return filteredTodos;
} 

export type TodoFilter = 'all' | 'completed' | 'incomplete';

