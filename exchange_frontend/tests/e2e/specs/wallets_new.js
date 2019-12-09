describe("Fiat wallets", () => {
    // it("Deposit USD wallet", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "fiataccounts").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "FollowTheFrog/Payment").as("finishDeposit")

    //     cy.login()
    //     cy.wait(2000)
        
    //     cy.wait("@loadWallets").then(function() {
    //         cy.visit("/fiatwallets")
    //         cy.wait(500)
    //         cy.get("[data-cy=deposit]").click()
    //         cy.get("[data-cy=amount]").type("54")
    //         cy.get("[data-cy=submit]").click()
    //     })

    //     cy.wait(15000)
    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("input#firstName")
    //         .type("Test")
    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("input#lastName")
    //         .type("Local")
    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("div.customerbutton[value=Submit]")
    //         .click()
    //     cy.wait(2000)

    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("div#bank-5")
    //         .click()
    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("#bank-login-content > input#username")
    //         .type("Test")
    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("#bank-login-content > input#password")
    //         .type("Local")
    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("#bank-login-content #loginButtons #authenticationButton")
    //         .click()
    //     cy.wait(10000)

    //     cy.get("[name=cashflow_iframe]")
    //         .iframe()
    //         .find("div#account-0")
    //         .click()

    //     cy.wait("@finishDeposit").then(function(xhr) {
    //         expect(xhr.response.status === 200)
    //     })
    // })
    
    // it("Create new recovrable ETH wallet, then delete it", () => {
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
    //     cy.get(".modal-card-body [data-vv-name=WalletCurrency] ul.multiselect__content li:nth-child(2)").click()
    //     cy.get("[name=\"Pin\"]").type("123123aA")
    //     cy.get("[name=\"PinConfiramtion\"]").type("123123aA")
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