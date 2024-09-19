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
export function ensureThatTodoIsNotRepeated(newText: string, todoList: Todo[]) {
    let isTextInTodoList = false;
    todoList.forEach(todo => {
        if (todo.text === newText) {
            throw new Error(`Error: The todo text is already in the todoList.`);
        }
    });

}

