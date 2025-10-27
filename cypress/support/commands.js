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