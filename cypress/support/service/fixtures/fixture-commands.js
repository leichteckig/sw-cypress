/**
 * Search for an existing entity using Shopware API at the given endpoint
 * @memberOf Cypress.Chainable#
 * @name removeFixtureByName
 * @function
 * @param {String} name - Name of the fixture to be deleted
 * @param {String} endpoint - API endpoint for the request
 */
Cypress.Commands.add("removeFixtureByName", (name, endpoint) => {
    return cy.searchViaAdminApi({
        endpoint: endpoint,
        data: {
            field: 'name',
            value: name
        }
    }).then((result) => {
        return cy.deleteViaAdminApi(endpoint, result.id)
    })
});
