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
 * @param {String} subject - element to target
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
 * @name upload_file
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('upload_file', (selector, fileUrl, type = '') => {
    return cy.get(selector).then(subject => {
        return cy.fixture(fileUrl, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const el = subject[0]
                const nameSegments = fileUrl.split('/')
                const name = nameSegments[nameSegments.length - 1]
                const testFile = new File([blob], name, {type})
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(testFile)
                el.files = dataTransfer.files
                return subject
            })
    })
});



