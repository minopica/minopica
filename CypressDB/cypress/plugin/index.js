const sqlServer = require('cypress-sql-server');
const dbConfig = require('../../cypress.config.json')

module.exports = (on, config) => {
  tasks = sqlServer.loadDBPlugin(dbConfig.db);
  on('task', tasks);
}