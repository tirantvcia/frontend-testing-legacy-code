import { filterTodo } from "../../../../domain/service/todoQueries"

describe('The Todo Queries', () => {
    const todoList = [
        {id: '1', text: 'Todo 1', completed: true},
        {id: '2', text: 'Todo 2', completed: false},
        {id: '3', text: 'Todo 3', completed: true},
        {id: '4', text: 'Todo 4', completed: false},
    ]

    describe('when filtering todos', () => {
        it('should return all todos when filter is "all', () => {
            const result = filterTodo( 'all', todoList);
            expect(result).toEqual(todoList);
        })
        it('should return only completed todos when filter is "completed', () => {
            const result = filterTodo( 'completed', todoList);
            expect(result).toEqual([
                {id: '1', text: 'Todo 1', completed: true},
                {id: '3', text: 'Todo 3', completed: true},
            ]);

        })    
        it('should return only incompleted todos when filter is "incomplete', () => {
            const result = filterTodo( 'incomplete', todoList);
            expect(result).toEqual([
                {id: '2', text: 'Todo 2', completed: false},
                {id: '4', text: 'Todo 4', completed: false},
            ]);

        })      
    })

})