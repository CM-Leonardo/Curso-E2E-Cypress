describe('Creat, read, upadate and delete', () => {
    it('Successfully create, read, update and delete a note.', () => {

        cy.intercept('GET', '**/notes').as('getNotes')
        cy.intercept('GET', '**/notes/**').as('getNote')
        cy.loginSession()
        cy.visit('/notes/new')
    })
})