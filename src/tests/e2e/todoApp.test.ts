import { first } from "cypress/types/lodash";

describe('TodoList App', () => {
  const todoText = 'Irrelevant task';
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should display the correct title', () => {
    cy.contains('h1', 'TODOLIST APP');
  });

  it('should be able to add a new todo', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();
    cy.contains('.todo-list-item', todoText).should('exist');

    cy.get('.todo-delete-button').click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  it('should be able to delete a todo', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();
    cy.contains('.todo-list-item', todoText).should('exist');

    cy.get('.todo-delete-button').click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  it('should be able to mark a todo as complete', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();

    cy.get('.todo-mark-button').click();

    cy.get('.todo-mark-button').should('contain', 'Mark as Incomplete');

    cy.get('.todo-delete-button').click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  it('should be able to filter by status', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();
    cy.get('.todo-mark-button').click();
    cy.get('.todo-input').type(todoText + 2);
    cy.get('.add-todo-button').click();

    cy.get('.all-filter').click();
    cy.get('.todo-list-item').should('have.length', 2);

    cy.get('.completed-filter').click();
    cy.get('.todo-list-item').should('have.length', 1);

    cy.get('.incomplete-filter').click();
    cy.get('.todo-list-item').should('have.length', 1);


    cy.get('.todo-delete-button').first().click();
    cy.get('.todo-delete-button').first().click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  it('should be able to update a todo', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();

    cy.get('.edit-todo-button').click();
    cy.get('.todo-edit-input').should('have.value', todoText);
    cy.get('.todo-delete-button').first().click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
    
  })

  xit('should be able to update a todo, miguel version', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();

    cy.get('.edit-todo-button').click();
    cy.get('.todo-edit-input').clear().type('updated');
    cy.get('.todo-edit-input').click();

    cy.get('.todo-list-item').should('contain','updated');

    cy.get('.todo-delete-button').first().click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
    
  })
  it('should be not able to add a todo with invalid length', ()=> {
    cy.get('.todo-input').type('a')
    cy.get('.add-todo-button').click()

    cy.on('window:alert', (str)=>{
      expect(str).to.equal('Error: The todo text must be between 3 and 100 characters long.')
    })
    cy.get('.todo-list-item').should('not.exist')
  })
  it('should be not able to add a todo with text is not alphanumeric', ()=> {
    cy.get('.todo-input').type('A not valid text with special characters |@#%&')
    cy.get('.add-todo-button').click()

    cy.on('window:alert', (str)=>{
      expect(str).to.equal('Error: The todo text can only contain letters, numbers, and spaces.')
    })
    cy.get('.todo-list-item').should('not.exist')
  })
  it('should be not able to add a todo with text contains a prohibited word', ()=> {
    cy.get('.todo-input').type('A not valid text with prohibited and forbidden words')
    cy.get('.add-todo-button').click()

    cy.on('window:alert', (str)=>{
      expect(str).to.contains('Error: The todo text cannot include the prohibited word')
    })
    cy.get('.todo-list-item').should('not.exist')
  })
  it('should be not able to add a todo with text contains a prohibited word', ()=> {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();
    cy.contains('.todo-list-item', todoText).should('exist');
    
    cy.get('.edit-todo-button').click()
    cy.get('.todo-edit-input').clear().type('s')
    cy.get('.todo-update-button').click()

    cy.on('window:alert', (str)=>{
      expect(str).to.contains('Error: The todo text must be between 3 and 100 characters long.')
    })
    cy.get('.todo-list-item').should('contain',todoText)
    cy.get('.todo-delete-button').click()
  })  
});

