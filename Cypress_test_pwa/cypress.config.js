const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  projectId: "rwdmnz",
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  watchForFileChanges: false,

  env: {
    url_bs: 'https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login',
    url_test: "http://pwa.dev.windtre.it/oa/auth/login"
  },

  e2e: {
    experimentalStudio: true,
    // experimentalModifyObstructiveThirdPartyCode: true,
    // experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const store = {}
      on('task',{
        saveToken(jwt) {
          console.log('token saveToken jwt:' + jwt)
          store['token'] = jwt
          return null
        },
        loadToken() {
          return store['token']
        },
        saveChallengeToken(jwt) {
          console.log('token saveChallengeToken jwt:' + jwt)
          store['challengeToken'] = jwt
          return null
        },
        loadChallengeToken() {
          return store['challengeToken']
        },
        saveCodiceCliente(code) {
          console.log('codice cliente salvato:' + code)
          store['codice_cliente'] = code
          return null
        },
        loadCodiceCliente() {
          return store['codice_cliente']
        },
        saveLineId(linea) {
          console.log('lineId salvato:' + linea)
          store['lineId'] = linea
          return null
        },
        loadLineId() {
          return store['lineId']
        },
        saveContractId(contratto) {
          console.log('contractId salvato:' + contratto)
          store['contractId'] = contratto
          return null
        },
        loadContractId() {
          return store['contractId']
        },
        saveArrayContracts(contratti) {
          console.log('array contratti salvato:' + contratti)
          store['arrayContracts'] = contratti
          return null
        },
        loadArrayContracts() {
          return store['arrayContracts']
        },

      })
    },
    specPattern: 'cypress/e2e/pwa/*.js'
  },
});
