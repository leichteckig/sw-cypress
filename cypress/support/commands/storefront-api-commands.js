/**
 * Get the sales channel Id via Admin API
 * @memberOf Cypress.Chainable#
 * @name getSalesChannelId
 * @function
 */
Cypress.Commands.add('getSalesChannelId', () => {
    return cy.authenticate().then((result) => {
        const parameters = {
            data: {
                headers: {
                    Accept: 'application/vnd.api+json',
                    Authorization: `Bearer ${result.access}`,
                    'Content-Type': 'application/json'
                },
                field: 'name',
                value: Cypress.config('salesChannelName')
            },
            endpoint: 'sales-channel'
        };

        return cy.searchViaAdminApi(parameters).then((data) => {
            return data.attributes.accessKey;
        });
    });
});

/**
 * Do Storefront Api Requests
 * @memberOf Cypress.Chainable#
 * @name storefrontApiRequest
 * @function
 * @param {string} HTTP-Method
 * @param {string} endpoint name
 * @param {Object} header
 * @param {Object} body
 */
Cypress.Commands.add('storefrontApiRequest', (method, endpoint, header = {}, body = {}) => {
    return cy.getSalesChannelId().then((salesChannelAccessKey) => {
        const requestConfig = {
            headers: {
                'x-sw-access-key': salesChannelAccessKey,
                ...header
            },
            body: {
                ...body
            },
            method: method,
            url: `/storefront-api/v1/${endpoint}`,
        };

        return cy.request(requestConfig).then((result) => {
            return result.body.data;
        });
    })
});

/**
 * Returns random product with id, name and url to view product
 * @memberOf Cypress.Chainable#
 * @name getRandomProductInformationForCheckout
 * @function
 */
Cypress.Commands.add('getRandomProductInformationForCheckout', () => {
    return cy.storefrontApiRequest('GET', 'product').then((result) => {
        return {
            id: result[0].id,
            name: result[0].name,
            net: result[0].price.net,
            gross: result[0].price.gross,
            listingPrice: result[0].calculatedListingPrice.unitPrice,
            url: `/detail/${result[0].id}`
        }
    })
});
