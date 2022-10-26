// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
  
  cy.get('input[name="firstName"]').type("Jose Henrique");
  cy.get('input[name="lastName"]').type("da Silva");
  cy.get('input[id="email"]').type("jhds@testmail.com");
  cy.get('textarea[id="open-text-area"]').type("Estou aprendendo sobre testes, pode me ajudar?", { delay: 0 });
  cy.get('button[type="submit"]').click();
  cy.get('.success').should('be.visible');

  })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
