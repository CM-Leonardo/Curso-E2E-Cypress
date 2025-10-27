import { user } from '../functions/envVariaveis'
import { fillSignupFormAndSubmit } from '../functions/commands'

describe('Sign Up', () => {

  it.only('Successfully signs up using confirmation code sent via email (Usando função)', () => {
        fillSignupFormAndSubmit(user)

        cy.contains('h1', 'Your Notes', { timeout: 10000 }).should('be.visible')
        cy.contains('a', 'Create a new note').should('be.visible')
  })
 
  it('Successfully signs up using confirmation code sent via email (Usando Commands)', () => {
        cy.fillSignupFormAndSubmit(user)

        cy.contains('h1', 'Your Notes', { timeout: 10000 }).should('be.visible')
        cy.contains('a', 'Create a new note').should('be.visible')
  })
})