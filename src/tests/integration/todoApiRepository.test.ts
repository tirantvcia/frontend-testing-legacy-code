import { createTodo, updateTodo } from "../../domain/todo";
import { TodoApiRepository } from "../../frontend/infrastructure/TodoApiRepository";

describe('The Todo Api Repository', () => {
    const baseUrl = 'http://localhost:3000/api/todos/';
    const todoApiRepository = new TodoApiRepository(baseUrl);
    afterEach(async() => {
        const todos = await todoApiRepository.getAll();
        todos.forEach(async todo => await todoApiRepository.delete(todo))
       
    })
    it('should fetch all todos', async () => {
        const aTodo = createTodo('New Todo');
        const addedTodo = await todoApiRepository.add(aTodo);
        const todos = await todoApiRepository.getAll();
        expect(todos).toEqual([addedTodo]);
    });
    it('should add a new todo', async () => {
        const aTodo = createTodo('New Todo');
        const addedTodo = await todoApiRepository.add(aTodo);

        expect(addedTodo.completed).toEqual(aTodo.completed);
        expect(addedTodo.text).toEqual(aTodo.text);
    });
    it('should update a todo', async () => {
        const aTodo = createTodo('New Todo');
        const addedTodo = await todoApiRepository.add(aTodo);

        console.log('addedTodo id'+addedTodo.id);

        const updatedTodo = await todoApiRepository.update(updateTodo(addedTodo, 'Updated Todo'));

        expect('Updated Todo').toEqual(updatedTodo.text);
        expect(addedTodo.text).not.toEqual(updatedTodo.text);
        expect(addedTodo.id).toEqual(updatedTodo.id);
    });    
    it('should delete a todo', async () => {
        const aTodo = createTodo('New Todo');
        const addedTodo = await todoApiRepository.add(aTodo);

        await todoApiRepository.delete(addedTodo);

        const todos = await todoApiRepository.getAll();
        expect(todos).not.toContain(addedTodo);
        expect(todos).toEqual([]);
    });    
});
