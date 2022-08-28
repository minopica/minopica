const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  projectId: "rwdmnz",
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/pwa/*.js'
  },
});
