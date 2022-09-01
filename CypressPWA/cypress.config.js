const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  projectId: "rwdmnz",
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  watchForFileChanges: false,
  //experimentalModifyObstructiveThirdPartyCode: true,

  env: {
    url_bs: 'https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login',
    url_test: "http://pwa.dev.windtre.it/oa/auth/login"
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/pwa/*.js'
  },
});
