describe('Login', () => {
  it('Successful when logging in with valid credentials.', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.login()
    cy.wait('@getNotes')

    cy.contains('a', 'Create a new note').should('be.visible')
  })
})