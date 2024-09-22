import * as React from "react";
import { v4 as uuid } from 'uuid';
import { TodoItem } from "./todoItem";
import { createTodo, Todo, toggleTodoCompleted, updateTodo } from "../../domain/todo";
import { ensureThatTodoIsNotRepeated, filterTodo, TodoFilter } from "../../domain/service/todoQueries";
import { TodoApiRepository } from "../infrastructure/TodoApiRepository";
import _ from "cypress/types/lodash";
import { text } from "express";


export class TodoApp extends React.Component {
    todoList: Todo[] = [];

    todoText = '';
    numberOfCompleted = 0;
    currentFilter = 'all' as TodoFilter;
    


    todoRepository = new TodoApiRepository('http://localhost:3000/api/todos/');


    constructor(props) {
        super(props);
        this.initialize();
    }

    private initialize() {
        this.todoRepository.getAll()
            .then(this.handleGetAllSuccess)
            .catch(error => console.log(error));
    }



    private handleGetAllSuccess = data => {
        this.todoList = data;
        this.forceUpdate();
    }

    addTodo() {
        try {
            const newTodo = createTodo(this.todoText);
            ensureThatTodoIsNotRepeated(this.todoText, this.todoList);

            // Si pasa todas las validaciones, agregar el "todo"
            this.todoRepository.add(newTodo)
                .then(this.handleAddSuccess);

        } catch (e) {
            alert(e.message);

        }

    }

    private handleAddSuccess = (data: Todo) => {
        this.todoList.push(data);
        this.todoText = '';
        this.forceUpdate();
    }

    updateTodo = (previousTodo: Todo, newText: string) => {

        try {
            const updatedTodo = updateTodo(previousTodo, newText);
            ensureThatTodoIsNotRepeated(newText, this.todoList);
            // Si pasa todas las validaciones, actualizar el "todo"
            this.todoRepository.update(updatedTodo)
                .then(_ => this.handleUpdateSuccess(updatedTodo));

        } catch (e) {
            alert(e.message);
        }

    }

    private handleUpdateSuccess(todo: { id: string; text: string; completed: boolean; }) {
        const index = this.todoList.findIndex(item => item.id === todo.id);
        this.todoList[index] = todo;
        this.forceUpdate();
    }



    deleteTodo = (todo: Todo) => {
        this.todoRepository.delete(todo)
            .then(() => {
                this.handleDeleteSuccess(todo);
            })
    }

    private handleDeleteSuccess(todo: Todo) {
        const index = this.todoList.findIndex(item => item.id === todo.id);
        if (this.todoList[index].completed) {
            this.numberOfCompleted--;
        }
        this.todoList.splice(index, 1);
        this.forceUpdate();
    }

    toggleComplete = (todo: Todo) => {
        
        const updatedTodo = toggleTodoCompleted(todo);
        this.todoRepository.update(updatedTodo)
            .then(_ => {
                this.handleToggleSuccess(updatedTodo);
            })
    }






    private handleToggleSuccess(todo: Todo) {
        const index = this.todoList.findIndex(item => item.id === todo.id);
        this.todoList[index] = todo;
        todo.completed ? this.numberOfCompleted++ : this.numberOfCompleted--;
        this.forceUpdate();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.forceUpdate();
    }






    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const text = event.target.value;
        this.todoText = text;
        this.forceUpdate();
    }


    render() {
        const todosToShow = filterTodo(this.currentFilter, this.todoList);

        return (
            <div className="todo-app-container">
                <h1>TODOLIST APP</h1>
                <input
                    className="todo-input"
                    value={this.todoText}
                    onChange={this.handleInputChange}
                />
                <button className="todo-button add-todo-button" onClick={this.addTodo.bind(this)}>
                    Add Todo
                </button>
                <h2>Completed Todos: {this.numberOfCompleted}</h2>
                <div>
                    <button className="todo-button all-filter" onClick={this.setFilter.bind(this, 'all')}>All</button>
                    <button className="todo-button completed-filter" onClick={this.setFilter.bind(this, 'completed')}>Completed</button>
                    <button className="todo-button incomplete-filter" onClick={this.setFilter.bind(this, 'incomplete')}>Incomplete</button>
                </div>
                {todosToShow.map((todo, index) =>

                    <TodoItem index={index}
                        todo={todo}
                        toggleComplete={this.toggleComplete}
                        deleteTodo={this.deleteTodo}
                        updateTodo={this.updateTodo} />
                )}

            </div>
        );
    }


}



