# sw-cypress

This is a project dealing with the implementation of E2E tests for the [Shopware platform project](https://github.com/shopware/platform) using Cypress framework.

## Setup
Shopware platform itself is not shipped with this project. This way, you need a running environment with a shopware platform repository. For more details about the setup steps, please refer to Shopware platform's [getting started guide](https://docs.shopware.com/en/shopware-platform-dev-en/getting-started).

At first, clone this project in a folder you like. After that, you just need to follow the usual steps for [Cypress installation](https://docs.cypress.io/guides/getting-started/installing-cypress.html).

## One thing to keep in mind

Please notice that these Cypress tests rely on a clean installation without any custom or demo data. You can quickly prepare such an environment using `./psh.phar init` in your Shopware platform installation instead of `./psh.phar install`.

## Further information

* [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html)
* [Shopware platform documentation](https://docs.shopware.com/en/shopware-platform-dev-en)
* [Shopware development template](https://github.com/shopware/development)
* [Shopware platform project](https://github.com/shopware/platform) 
