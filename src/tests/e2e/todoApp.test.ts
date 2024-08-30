import { first } from "cypress/types/lodash";

describe('TodoList App', () => {
  const todoText = 'Irrelevant task';
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should display the correct title', () => {
    cy.contains('h1', 'TODOLIST APP');
  });

  xit('should be able to add a new todo', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();
    cy.contains('.todo-list-item', todoText).should('exist');

    cy.get('.todo-delete-button').click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  xit('should be able to delete a todo', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();
    cy.contains('.todo-list-item', todoText).should('exist');

    cy.get('.todo-delete-button').click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  xit('should be able to mark a todo as complete', () => {
    cy.get('.todo-input').type(todoText);
    cy.get('.add-todo-button').click();

    cy.get('.todo-mark-button').click();

    cy.get('.todo-mark-button').should('contain', 'Mark as Incomplete');

    cy.get('.todo-delete-button').click();
    cy.contains('.todo-list-item', todoText).should('not.exist');
  })

  xit('should be able to filter by status', () => {
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

  xit('should be able to update a todo', () => {
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


});

