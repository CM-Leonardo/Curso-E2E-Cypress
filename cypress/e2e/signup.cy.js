describe('Sign Up', () => {
  it('Successfully signs up using confirmation code sent via email.', () => {
    cy.fillSignupFormAndSubmit(user)

    cy.contains('h1', 'Your Notes', { timeout: 10000 }).should('be.visible')
    cy.contains('a', 'Create a new note').should('be.visible')
  })
})