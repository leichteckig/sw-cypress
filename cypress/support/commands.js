// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name login
 * @function
 * @param {Object} userType - The type of the user logging in
 */
Cypress.Commands.add("login", (userType) => {
    cy.server();
    cy.route('api/v1/*').as('getApi');
    const types = {
        admin: {
            name: 'admin',
            pass: 'shopware'
        }
    };

    const user = types[userType];

    cy.visit('localhost:8000/admin');

    cy.contains('Username');
    cy.contains('Password');

    cy.get('input[name="sw-field--authStore-username"]')
        .type(user.name)
        .should('have.value', user.name);
    cy.get('input[name="sw-field--authStore-password"]')
        .type(user.pass)
        .should('have.value', user.pass);
    cy.get('.sw-login-login').submit();

    cy.wait('@getApi');

    cy.contains('Dashboard');
});

/**
 * Types in an input element and checks if the content was correctly typed
 * @memberOf Cypress.Chainable#
 * @name typeAndCheck
 * @function
 * @param {String} value - The value to type
 */
Cypress.Commands.add('typeAndCheck', {
    prevSubject: 'element'
}, (subject, value) => {
    cy.wrap(subject).type(value).invoke('val').should('eq', value)
});

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name uploadFile
 * @function
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
    return cy.get(selector).then(subject => {
        return cy.fixture(fileUrl, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const el = subject[0];
                const nameSegments = fileUrl.split('/');
                const name = nameSegments[nameSegments.length - 1];
                const testFile = new File([blob], name, {type});
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(testFile);
                el.files = dataTransfer.files;
                return subject
            })
    })
});

/**
 * Types in an swSelect field and checks if the content was correctly typed
 * @memberOf Cypress.Chainable#
 * @name typeSwSelectAndCheck
 * @function
 * @param {String} value - Desired value of the element
 * @param {Object} options - Options concerning swSelect usage
 */
Cypress.Commands.add('typeSwSelectAndCheck', {
    prevSubject: 'element'
}, (subject, value, options) => {
    const inputCssSelector = (options.isMulti) ? '.sw-select__input' : '.sw-select__input-single';

    cy.wrap(subject).should('be.visible');

    if (options.clearField && options.isMulti) {
        cy.get(`${subject.selector} .sw-label__dismiss`).click();
        cy.get(`${subject.selector} ${'.sw-label'}`).should('not.exist');
    }

    if (!options.isMulti) {
        // open results list
        cy.wrap(subject).click();
        cy.get('.sw-select__results').should('be.visible');
    }

    // type in the search term if available
    if (options.searchTerm) {
        cy.get(`${subject.selector} ${inputCssSelector}`).typeAndCheck(options.searchTerm);
        cy.get(`${subject.selector} .sw-select__indicators .sw-loader`).should('not.exist');
        cy.get('.sw-select__results').should('be.visible');
        cy.get('.sw-select-option--0 .sw-select-option__result-item-text').contains(value);
    }

    // select the first result
    cy.get(`${subject.selector} ${inputCssSelector}`).type('{enter}');

    if (!options.isMulti) {
        // expect the placeholder for an empty select field not be shown and search for the value
        cy.get(`${subject.selector} .sw-select__placeholder`).should('not.exist');
        cy.get(`${subject.selector} .sw-select__single-selection`).contains(value);

        return this;
    }

    // in multi selects we can check if the value is a selected item
    cy.get(`${subject.selector} .sw-select__selection-item`).contains(value);

    // close search results
    cy.get(`${subject.selector} ${inputCssSelector}`).type('{esc}');
    return this;
});

/**
 * Wait for a notification to appear and check its message
 * @memberOf Cypress.Chainable#
 * @name awaitAndCheckNotification
 * @function
 * @param {String} message - The message to look for
 * @param {Object}  [options={}] - Options concerning the notification
 */
Cypress.Commands.add('awaitAndCheckNotification', (message, options = {
    position: 0,
    collapse: true
}) => {
    const notification = `.sw-notifications__notification--${options.position}`;

    cy.get(`${notification} .sw-alert__message`).should('be.visible').contains(message);

    if (options.collapse) {
        cy.get(`${notification} .sw-alert__close`).click().should('not.exist');
    }
});
