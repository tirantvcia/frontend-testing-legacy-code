import React from "react";
import { Todo } from "./todoApp";

type TodoItemProps = {
    index: number,
    todo: Todo,
    todoUpdatingStatuses: boolean[],
    handleUpdateTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onEdit: (index: number, text: string) => void,
    toggleComplete: (index: number) => void,
    deleteTodo: (index: number) => void,
    updateTodo: (index: number) => void,
}

type TodoItemState = {
    newText: string,
    isEditing: boolean
}

export function TodoItem({
    index,
    todo,
    todoUpdatingStatuses,
    handleUpdateTextChange,
    onEdit,
    toggleComplete,
    deleteTodo,
    updateTodo
}: TodoItemProps
): React.JSX.Element {
    const [state, setState] = React.useState<TodoItemState>({ newText: '', isEditing: false });
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState({ ...state, newText: event.target.value });
        handleUpdateTextChange(event);
    }
    const handleEdit = (): void => {
        setState({ ...state, isEditing: true });
        onEdit(index, todo.text);
    }
    const handleUpdate = (): void => {
        setState({...state, isEditing: false});
        updateTodo(index);
    }
    
    


    return <div className="todo-list-item">
        {    todoUpdatingStatuses[index]
            ? <input
                className="todo-edit-input"
                defaultValue={todo.text} // Asumiendo que inputData se usa para la edición
                onChange={handleUpdateTextChange} />
            : <p className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text} <button className="todo-button edit-todo-button" onClick={handleEdit}>Edit</button></p>}
        <button className="todo-button todo-mark-button" onClick={() => toggleComplete(index)}>
            {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button className="todo-button todo-delete-button" onClick={() => deleteTodo(index)}>
            Delete Todo
        </button>

        <button className="todo-button todo-update-button" onClick={handleUpdate}>
            Update Todo
        </button>
    </div>;
}