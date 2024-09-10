import { v4 as uuid } from 'uuid';

export type Todo = {
    readonly id: string;
    readonly text: string;
    completed: boolean;
};

export function createTodo(text: string): any {
    ensureThatHasValidLength(text);
    ensureThatContainsOnlyAlphanumeric(text);
    ensureThatNotContainsForbbidenWords(text);

    return {
        id: uuid(),
        text,
        completed: false
    };
}

function ensureThatNotContainsForbbidenWords(text: string) {
    const forbiddenWords = ['prohibited', 'forbidden', 'banned'];
    const textContainsForbbidenWords = (word: string): boolean => text.includes(word);
    if (forbiddenWords.some(textContainsForbbidenWords)) {
        throw new Error(`Error: The todo text cannot include the prohibited word`);
    }
}

function ensureThatContainsOnlyAlphanumeric(text: string) {
    const regex = /^[a-zA-Z0-9 ]+$/;
    const textMatchValidCharacters = text.match(regex);
    if (!textMatchValidCharacters) {
        throw new Error(`Error: The todo text can only contain letters, numbers, and spaces.`);
    }
}

function ensureThatHasValidLength(text: string) {
    if (!text || text.length < 3 || text.length > 100) {
        throw new Error(`Error: The todo text must be between 3 and 100 characters long.`);
    }
}

