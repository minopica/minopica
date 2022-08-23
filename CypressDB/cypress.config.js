const { defineConfig } = require("cypress");
const sqlServer = require('cypress-sql-server');

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
      tasks = sqlServer.loadDBPlugin(db);
      on('task', tasks);
    },
    specPattern: 'cypress/e2e/*/*.js',
  },
});

