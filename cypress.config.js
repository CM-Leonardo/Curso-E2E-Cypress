const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "jkf32g",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://notes-serverless-app.com/',
    env: {
      viewportWidthBreakpoint: 768,
    },
  },
})
