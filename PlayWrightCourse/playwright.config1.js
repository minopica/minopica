// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  // number of retry for a FAILED test
  retries: 1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  // numero di workers
  workers: 2,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  projects: [
    {
      name: 'safari',
      use: {
        browserName : 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        //viewport: {width:720, height:720}
        //...devices['iPhone 11 Pro Max']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName : 'chromium',
        headless: false,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        permissions: ['geolocation'],
        ignoreHTTPSErrors: true,
        //...devices['Pixel 4a (5G)']
    
      }
    },

  ]
  
  
  
}
module.exports = config;
