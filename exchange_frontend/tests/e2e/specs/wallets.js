describe("Fiat wallets", () => {
    // it("Create new BTC wallet, then delete it", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "wallets").as("createWallet")
    //     cy.route("DELETE", Cypress.env("BACKEND") + "wallets/*").as("deleteWallet")

    //     cy.login()
    //     cy.wait(2000)
        
    //     // CREATE
        
    //     cy.wait("@loadWallets").then(function() {
    //         cy.visit("/wallets")
    //         cy.get("[data-cy=newwallet]").click()
    //     })

    //     cy.get("[name=\"Name\"]").type("TestWallet")
    //     cy.get(".modal-card-body [data-vv-name=WalletCurrency]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=WalletCurrency] ul.multiselect__content li:nth-child(1)").click()
    //     cy.get("[name=\"Pin\"]").type("123123aA")
    //     cy.get("[name=\"PinConfiramtion\"]").type("123123aA")
    //     cy.get("input[type=checkbox]").click({ multiple: true, force: true })
    //     cy.get("button[data-cy=submit]").click()

    //     cy.wait("@createWallet").then(function(xhr) {
    //         expect(xhr.response.status === 204)
    //     })

    //     // DELETE

    //     cy.get(".walletlist > div:nth-last-child(1) a[data-cy=delete]").click()
    //     cy.wait(500)
    //     cy.get("button.is-danger").click()

    //     cy.wait("@deleteWallet").then(function(xhr) {
    //         expect(xhr.response.status === 200)
    //     })
    // })
})
