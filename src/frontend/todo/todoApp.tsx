import * as React from "react";
import { v4 as uuid } from 'uuid';
import { TodoItem } from "./todoItem";
import { createTodo, Todo, updateTodo } from "../../domain/todo";
import { filterTodo, TodoFilter } from "../../domain/service/todoQueries";



export class TodoApp extends React.Component {
    todoList: Todo[] = [];

    todoText = '';
    numberOfCompleted = 0;
    currentFilter = 'all' as TodoFilter;


    constructor(props) {
        super(props);
        this.initialize();
    }

    private initialize() {
        fetch('http://localhost:3000/api/todos/')
            .then(response => response.json())
            .then(data => {
                this.todoList = data;
                this.forceUpdate();
            })
            .catch(error => console.log(error));
    }



    addTodo() {
        try {
            const newTodo = createTodo(this.todoText);
            // Validación de texto repetido
            let isRepeated = false;
            for (let i = 0; i < this.todoList.length; i++) {
                if (this.todoList[i].text === this.todoText) {
                    isRepeated = true;
                    break;
                }
            }

            if (isRepeated) {
                alert('Error: The todo text is already in the todoList.');
                return;
            }
            // Si pasa todas las validaciones, agregar el "todo"
            fetch('http://localhost:3000/api/todos/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo),
            })
                .then(response => response.json())
                .then(data => {
                    this.todoList.push(data);
                    this.todoText = '';
                    this.forceUpdate();
                });


        } catch (e) {
            alert(e.message);

        }




    }

    updateTodo = (previousTodo: Todo, newText: string) => {

        try {
            const index = this.todoList.indexOf(previousTodo);
            const updatedTodo = updateTodo(previousTodo, newText);

            this.ensureThatValidTextIsNotInTodoList(index, newText);


            // Si pasa todas las validaciones, actualizar el "todo"
            fetch(`http://localhost:3000/api/todos/${updatedTodo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: updatedTodo.text, completed: updatedTodo.completed }),
            })
                .then(response => response.json())
                .then(data => {
                    this.todoList[index] = updatedTodo;
                    this.forceUpdate();
                });

        } catch (e) {
            alert(e.message);
        }


    }



    deleteTodo = index => {
        fetch(`http://localhost:3000/api/todos/${this.todoList[index].id}`, { method: 'DELETE' })
            .then(() => {
                if (this.todoList[index].completed) {
                    this.numberOfCompleted--;
                }
                this.todoList.splice(index, 1);
                this.forceUpdate();
            })
    }

    toggleComplete = index => {
        this.todoList[index].completed = !this.todoList[index].completed;
        fetch(`http://localhost:3000/api/todos/${this.todoList[index].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: this.todoList[index].completed }),
        })
            .then(response => response.json())
            .then(data => {
                // this.todoList[index] = data;
                this.todoList[index].completed ? this.numberOfCompleted++ : this.numberOfCompleted--;
                this.forceUpdate();
            })
    }


    private ensureThatValidTextIsNotInTodoList(index: number, newText: string) {
        let isTextInTodoList = false;
        for (let i = 0; i < this.todoList.length; i++) {
            if (i !== index && this.todoList[i].text === newText) {
                throw new Error(`Error: The todo text is already in the todoList.`);
            }
        }
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


