# sw-cypress

This is a project dealing with the implementation of E2E tests for the [Shopware platform project](https://github.com/shopware/platform) using Cypress framework.

## Setup
Shopware platform itself is not shipped with this project. This way, you need a running environment with a shopware platform repository. For more details about the setup steps, please refer to Shopware platform's [getting started guide](https://docs.shopware.com/en/shopware-platform-dev-en/getting-started).

At first, clone this project in a folder you like. After that, you can just run the tests in a Docker container (see below).

## One thing to keep in mind

Please notice that these Cypress tests in `cypress/integration/administration` rely on a clean installation without any custom or demo data. You can quickly prepare such an environment using `./psh.phar init` in your Shopware platform installation instead of `./psh.phar install`.

## Install Cypress

The easiest way to install Cypress and all npm dependencies into your project folder is this docker helper:

```
docker run -ti --rm -v "$(pwd)":/cypress -v npm-root-cache:/root/.cache --workdir /cypress cypress/browsers:node11.13.0-chrome73 npm ci
```

You can also follow the [Cypress installation guide](https://docs.cypress.io/guides/getting-started/installing-cypress.html) for a manual installation. 

## Run tests in Docker

Now you can run your tests in a Docker container:

```
docker run -ti --rm -v "$(pwd)":/cypress -v npm-root-cache:/root/.cache --workdir /cypress cypress/browsers:node11.13.0-chrome73 ./node_modules/cypress/bin/cypress run
```

## Run tests on your machine (and watch them)

You can also run the tests on your machine and watch them running with `cypress run`.


## Run only Storefront-Tests

If you only want to run the Storefront-Tests simply add `--spec "cypress/integration/storefront/**/*"` to the `cypress open` command.

## Run tests against a remote URL

You can override the baseUrl to test a remote Shopware Installation by passing the `--config baseUrl=https://<remote-hostname>/` param.

## Further information

* [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html)
* [Shopware platform documentation](https://docs.shopware.com/en/shopware-platform-dev-en)
* [Shopware development template](https://github.com/shopware/development)
* [Shopware platform project](https://github.com/shopware/platform) 
