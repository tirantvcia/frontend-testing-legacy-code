import { v4 as uuid } from 'uuid';

//`Error: The todo text must be between ${min} and ${max} characters long.`
//'Error: The todo text can only contain letters, numbers, and spaces.'
//`Error: The todo text cannot include the prohibited word "${word}"`

describe('The Todo Model', ()=>{
    describe('When creating a new Todo', ()=>{
        it('should create a todo when text is valid', ()=>{
            const text = 'A valid text with more than 3 valid words';
            const todo = createTodo(text);
            
            expect(todo.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
            expect(todo.text).toMatch(text);
            expect(todo.completed).toBe(false);

        });        
        it('should throw an error when text is less minimum length', ()=>{
            const text = 'a';
            expect(()=> createTodo(text)).toThrowError(`Error: The todo text must be between 3 and 100 characters long.`);

        });
        it('should throw an error when text is more than maximun length', ()=>{
            const text = 'a'.repeat(101);
            expect(()=> createTodo(text)).toThrowError(`Error: The todo text must be between 3 and 100 characters long.`);

        });       
        it('should throw an error when text is empty', ()=>{
            const text = '';
            expect(()=> createTodo(text)).toThrowError(`Error: The todo text must be between 3 and 100 characters long.`);

        });            
        it('should throw an error when text is null', ()=>{
            const text = null;
            expect(()=> createTodo(text)).toThrowError(`Error: The todo text must be between 3 and 100 characters long.`);

        });         
        it('should throw an error when text is not alphanumeric', ()=>{
            const text = 'A not valid text with special characters |@#%&';
            expect(()=> createTodo(text)).toThrowError(`Error: The todo text can only contain letters, numbers, and spaces.`);

        });
        it('should throw an error when text contains a prohibited word', ()=>{
            const text = 'A not valid text with prohibited and forbidden words';
            expect(()=> createTodo(text)).toThrowError(`Error: The todo text cannot include the prohibited word`);

        });
                
    });
});
function createTodo(text: string): any {
    if(!text || text.length < 3 || text.length > 100) {
        throw new Error(`Error: The todo text must be between 3 and 100 characters long.`)
    }
    const regex = /^[a-zA-Z0-9 ]+$/;
    const textMatchValidCharacters = text.match(regex);
    if(!textMatchValidCharacters) {
        throw new Error(`Error: The todo text can only contain letters, numbers, and spaces.`)
    }
    const forbiddenWords = ['prohibited', 'forbidden', 'banned'];
    const textContainsForbbidenWords = (word: string): boolean => text.includes(word);
    if (forbiddenWords.some(textContainsForbbidenWords) ) {
            throw new Error(`Error: The todo text cannot include the prohibited word`)
    }
    
    return {
        id: uuid(),
        text,
        completed:false

    }
}



