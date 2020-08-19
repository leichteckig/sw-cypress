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
                value: Cypress.env('salesChannelName')
            },
            endpoint: 'sales-channel'
        };

        return cy.searchViaAdminApi(parameters).then((data) => {
            console.log('sales channel data', data)
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
                'SW-Access-Key': salesChannelAccessKey,
                ...header
            },
            body: {
                ...body
            },
            method: method,
            url: `/sales-channel-api/v3/${endpoint}?response=true`,
        };

        return cy.request(requestConfig).then((result) => {
            console.log('requestConfig', requestConfig)
            console.log('result', result)
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
    var sample = require('lodash.sample');
    return cy.storefrontApiRequest('GET', 'product').then((result) => {
       // const randomProduct = sample(result);
       const randomProduct = Cypress._.sample(result);
        console.log(randomProduct)

        return {
            id: randomProduct.id,
            name: randomProduct.name,
            listingPrice: randomProduct.calculatedListingPrice.unitPrice,
            url: `/detail/${randomProduct.id}`
        }
    })
});
