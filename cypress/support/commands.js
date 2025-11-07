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

Cypress.Commands.add('logout', () => {
  if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
    cy.get('.navbar-toggle.collapsed')
      .should('be.visible')
      .click()
  }
  cy.contains('.nav a', 'Logout').click()
  cy.get('#email').should('be.visible')
  cy.url().should('include', '/login')
})

Cypress.Commands.add('createNote', (note) => {
  cy.visit('/notes/new')

  //preenche o campo de teste e clica em criar
  cy.get('#content').type(note.description)
  cy.contains('button', 'Create').click()

  //valida criação
  cy.contains('.list-group-item', note.description).should('be.visible')
})

Cypress.Commands.add('editNote', (note) => {
  cy.intercept('GET', '**/notes/**').as('getNote')

  //busca e clica na nota criada
  cy.contains('.list-group-item', note.description).click()
  cy.wait('@getNote')

  //limpa o campo, escreve uma nova nota, anexa o arquivo e salva
  cy.get('#content')
    .clear()
    .type(note.updateDescription)
  cy.get('#file').selectFile('cypress/fixtures/example.json')
  cy.contains('button', 'Save').click()

  //valida a alteração da nota
  cy.contains('.list-group-item', note.updateDescription).should('be.visible')
  cy.contains('.list-group-item', note.description).should('not.exist')
})

Cypress.Commands.add('deleteNote', (note) => {
  //acessa a nota alterada
  cy.contains('.list-group-item', note.updateDescription).click()

  //busca e clica o botão deletar
  cy.contains('button', 'Delete')
    .should('be.visible')
    .click()

  // valida a exclusão da nota
  cy.get('.list-group-item')
    .its('length')
    .should('be.at.least', 1)
  cy.contains('.list-group-item', note.updateDescription)
    .should('not.exist')
})

Cypress.Commands.add('fillSettingsFormAndSubmit', () => {
  cy.visit('/settings')
  cy.get('#storage').type('1')
  cy.get('#name').type('Mary Doe')
  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242')
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271')
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123')
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345')
  cy.contains('button', 'Purchase').click()
})

