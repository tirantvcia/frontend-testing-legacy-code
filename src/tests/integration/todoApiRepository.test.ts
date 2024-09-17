import { createTodo, Todo } from "../../domain/todo";

class TodoApiRepository {

    constructor(private baseUrl: string) {

    }

    getAll(): Promise<Todo[]> {
        return fetch(this.baseUrl)
        .then(response => response.json())
    }

    add(todo: Todo): Promise<Todo> {
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
        }).then(response => response.json())
    }

    delete(todo: Todo): Promise<{}> {
        //const deleteIdUrl = `http://localhost:3000/api/todos/${this.todoList[index].id}`;
        return fetch(this.baseUrl + todo.id, { method: 'DELETE' })
    }


}

describe('The TTodo Api Repository', () => {
    const baseUrl = 'http://localhost:3000/api/todos';
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
});
