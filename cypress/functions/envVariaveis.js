import { faker } from '@faker-js/faker/locale/en'

const user = {
  password: Cypress.env('USER_PASSWORD'),
  email: `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`,
  serverID: Cypress.env('MAILOSAUR_SERVER_ID')
}

export {
  user
}