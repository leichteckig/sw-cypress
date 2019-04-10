describe('Account: register', function () {
    it('is able to register', function () {
        cy.visit('/account/register');

        cy.get('#personalSalutation').select('Mr.');

        cy.get('#personalFirstName').type('Test');
        cy.get('#personalLastName').type('User');

        cy.get('[name="birthdayDay"]').select('1');
        cy.get('[name="birthdayMonth"]').select('1');
        cy.get('[name="birthdayYear"]').select('1990');

        cy.get('#personalMail').type('example@example.com');
        cy.get('#personalPassword').type('admin');

        cy.get('#billingAddressAddressStreet').type('Example street 6');
        cy.get('#billingAddressAddressZipcode').type('48624');
        cy.get('#billingAddressAddressCity').type('Schoeppingen');
        cy.get('#billingAddressAddressCountry').select('Germany');

        cy.get('.register-submit button[type="submit"]').click();

        cy.url().should('not.include', '/register');
        cy.url().should('include', '/account');

        cy.get('.account-welcome h1').should((element) => {
            expect(element).to.contain('Welcome');
        });
    })
});