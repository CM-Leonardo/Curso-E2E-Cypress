/// <reference path="../support/commands.d.ts" />
describe('Login', () => {
  it('Successful when logging in with valid credentials.', () => {

    cy.login()
    cy.contains('a', 'Create a new note').should('be.visible')
  })
})