const { defineConfig } = require("cypress");

{
  db = {
      userName: "minopica",
      password: "Minone@h3g",
      server: "testdbmino.database.windows.net",
      options: {
          "database": "testdb",
          "encrypt": true,
          "rowCollectionOnRequestCompletion" : true
      }
  }
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/*/*.js'
  },
});

