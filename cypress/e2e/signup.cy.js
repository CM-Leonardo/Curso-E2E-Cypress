/// <reference path="../support/commands.d.ts" />
import { faker } from '@faker-js/faker/locale/en'

describe('Sign Up', () => {
  const user = {
    password: Cypress.env('USER_PASSWORD'),
    email: `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`,
    serverID: Cypress.env('MAILOSAUR_SERVER_ID')
  }

  it('Successfully signs up using confirmation code sent via email.', () => {
    cy.fillSignupFormAndSubmit(user)
    cy.contains('h1', 'Your Notes', { timeout: 10000 }).should('be.visible')
    cy.contains('a', 'Create a new note').should('be.visible')
  })
})