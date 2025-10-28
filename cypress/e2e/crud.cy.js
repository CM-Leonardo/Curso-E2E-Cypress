import { faker } from '@faker-js/faker/locale/en'

describe('Creat, read, upadate and delete', () => {
  const note = {
    description: faker.lorem.words(5),
    updateDescription: faker.lorem.words(5)
  }

  it('Successfully create, read, update and delete a note.', () => {
    cy.loginSession()
    cy.visit('/notes/new')

    cy.creatNote(note)
    cy.readNote(note)
    cy.updateNote(note)
    cy.deleteNote(note)
  })
})