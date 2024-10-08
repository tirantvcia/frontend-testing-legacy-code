import React from "react";
import { Todo } from "../../domain/todo";

type TodoItemProps = {
    index: number,
    todo: Todo,
    toggleComplete: (todo: Todo) => void,
    deleteTodo: (todo: Todo) => void,
    updateTodo: (todo: Todo, newText: string) => void,
}

type TodoItemState = {
    newText: string,
    isEditing: boolean
}

export function TodoItem({
    index,
    todo,
    toggleComplete,
    deleteTodo,
    updateTodo
}: TodoItemProps
): React.JSX.Element {
    const [state, setState] = React.useState<TodoItemState>({ newText: '', isEditing: false });
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState({ ...state, newText: event.target.value });
     }
    const handleEdit = (): void => {
        setState({ ...state, isEditing: true });
    }
    const handleUpdate = (): void => {
        setState({...state, isEditing: false});
        updateTodo(todo, state.newText);
    }
    
    


    return <div className="todo-list-item">
        {    
        state.isEditing
            ? <input
                className="todo-edit-input"
                defaultValue={todo.text} // Asumiendo que inputData se usa para la edición
                onChange={handleTextChange} />
            : <p className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text} <button className="todo-button edit-todo-button" onClick={handleEdit}>Edit</button></p>}
        <button className="todo-button todo-mark-button" onClick={() => toggleComplete(todo)}>
            {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button className="todo-button todo-delete-button" onClick={() => deleteTodo(todo)}>
            Delete Todo
        </button>

        <button className="todo-button todo-update-button" onClick={handleUpdate}>
            Update Todo
        </button>
    </div>;
}