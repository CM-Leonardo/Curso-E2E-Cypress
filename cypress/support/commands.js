Cypress.Commands.add('fillSignupFormAndSubmit', data => {
  cy.visit('/signup')

  cy.get('#email').type(data.email)
  cy.get('#password').type(data.password, { log: false })
  cy.get('#confirmPassword').type(data.password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

  cy.mailosaurGetMessage(data.serverID, {
    sentTo: data.email
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)
  })
})

Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/login')
  cy.get('#email').type(username)
  cy.get('#password').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes')
  cy.contains('h1', 'Your Notes').should('be.visible')
})

Cypress.Commands.add('loginSession', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.login(username, password)
  cy.session(username, login)
})

Cypress.Commands.add('creatNote', (note) => {
  cy.get('#content')
    .as('contentField')
    .type(note.description)
  cy.contains('button', 'Create').click()

  cy.contains('.list-group-item', note.description)
    .should('be.visible')
})

Cypress.Commands.add('readNote', (note) => {
  cy.contains('.list-group-item', note.description).click()
  cy.get('@contentField').should('contain.text', note.description)
})

Cypress.Commands.add('updateNote', (note) => {
  cy.get('@contentField')
    .clear()
    .type(note.updateDescription)
  cy.get('#file').selectFile('cypress/fixtures/example.json')
  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', note.description).should('not.exist')
  cy.contains('.list-group-item', note.updateDescription).should('be.visible')
    .click()
})

Cypress.Commands.add('deleteNote', (note) => {
  cy.contains('button', 'Delete')
    .should('be.visible')
    .click()

  cy.get('.list-group-item')
    .its('length')
    .should('be.at.least', 1)
  cy.contains('.list-group-item', note.updateDescription)
    .should('not.exist')
})

