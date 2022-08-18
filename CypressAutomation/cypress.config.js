const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 30000,
  projectId: "rwdmnz",
  //projectId: "2iw7j1",
  reporter: "spec",
  //reporter: "mochawesome",
  // reporterOptions: {
  //   reportDir: 'cypress/results',
  //   overwrite: false,
  //   html: false,
  //   json: true
  // },
  
  env: {
    url: 'https://rahulshettyacademy.com',
  },

  retries: {
    runMode: 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //specPattern: 'cypress/integration/examples/*.js'
    specPattern: 'cypress/integration/test_mino/*.js'
  },
});
