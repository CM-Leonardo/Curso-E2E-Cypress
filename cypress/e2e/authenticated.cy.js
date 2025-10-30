import { faker } from '@faker-js/faker/locale/en'

describe('Scenarios where authentication is a pre-condition', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.loginSession()
  })

  it('Successfully create, read, update and delete a note.', () => {
    const note = {
      description: faker.lorem.words(5),
      updateDescription: faker.lorem.words(5)
    }

    cy.creatNote(note)
    cy.wait('@getNotes')

    cy.updateNote(note)
    cy.wait('@getNotes')

    cy.deleteNote(note)
    cy.wait('@getNotes')
  })

  it.skip('Successfully submits the settings form', () => { //teste skipado - pagina de cadastro de cartão fora do ar
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()
    cy.wait('@paymentRequest')
      .its('state')
      .should('be.equal', 'Complete')
  })

  it('Successfully logs out', () => {
    //para exucutar o teste com um viewPort diferente, rode => 
    // npx cypress open --config "viewportWidth=767,viewportHeight=480"

    cy.visit('/')
    cy.wait('@getNotes')
    cy.logout()
  })
})