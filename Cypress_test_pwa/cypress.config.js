const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  projectId: "rwdmnz",
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  watchForFileChanges: false,

  env: {
    url_bs: 'https://priv:P3rz0nal!@pwa.bs.windtre.it/oa/auth/login',
    url_test: "http://pwa.dev.windtre.it/oa/auth/login",
    base_url_bs: "https://apigw.bs.windtre.it",
    base_url_test: "https://pre.windtre.it/ob/int/gw",
    base_url_prod: "https://apigw.windtre.it",
  },

  e2e: {
    experimentalStudio: true,
    // experimentalModifyObstructiveThirdPartyCode: true,
    // experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const store = {}
      on('task',{
          log (message) {
            console.log(message)
            return null
          },
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
        saveArrayBills(bills) {
          console.log('array bills salvato:' + bills)
          store['arrayBills'] = bills
          return null
        },
        loadArrayBills() {
          return store['arrayBills']
        },


      })
    },
    specPattern: ['cypress/e2e/pwa/pwa-bs/*.js','cypress/e2e/pwa/pwa-test/*.js', 'cypress/e2e/api/*.js','cypress/e2e/api_single_file/*.js']
  },
});
