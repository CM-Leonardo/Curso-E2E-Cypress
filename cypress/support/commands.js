Cypress.Commands.add('fillSignupFormAndSubmit', data => {
  cy.visit('/signup')

  cy.get('#email').type(data.emailRandom)
  cy.get('#password').type(data.password, { log: false })
  cy.get('#confirmPassword').type(data.password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

  cy.mailosaurGetMessage(data.serverID, {
    sentTo: data.emailRandom
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