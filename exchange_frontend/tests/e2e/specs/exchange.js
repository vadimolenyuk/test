describe("Exchange orders", () => {
    // it("Exchange BTC for ETH (external addresses)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.get("#swap-btn").click()
    //     })

    //     cy.get("[data-vv-name=BuyCurrency] input.multiselect__input")
    //         .type("eth", { force: true })
    //         .type("{enter}")

    //     cy.wait(500)
    //     cy.get("input[name=SellAmount]").type(0.05)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.wait(500)
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet] ul.multiselect__content li:nth-last-child(3)").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet] ul.multiselect__content li:nth-last-child(3)").click()
    //     cy.get(".modal-card-body input[name=Address]").type("0xE7b5EBa0c2a0Ca9cC4517409c0D63DcD6680e032")

    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.wait(500)
    //     cy.get(".orderdetails-qr").should("be.visible")
    // })

    // it("Exchange ETH for BTC (external addresses)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.get("[data-vv-name=SellCurrency] input.multiselect__input")
    //             .type("eth", { force: true })
    //             .type("{enter}")
    //     })

    //     cy.wait(500)
    //     cy.get("input[name=SellAmount]").type(0.05)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.wait(500)
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet] ul.multiselect__content li:nth-last-child(3)").click()
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet] ul.multiselect__content li:nth-last-child(3)").click()
    //     cy.get(".modal-card-body input[name=Address]").type("17A16QmavnUfCW11DAApiJxp7ARnxN5pGX")

    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.wait(500)
    //     cy.get(".orderdetails-qr").should("be.visible")
    // })

    // it("Exchange BTC for USD (app wallet to external wallet)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "payfiat").as("payWalletFiat")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.wait(1000)
    //     })

    //     cy.get("input[name=SellAmount]").type(50)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.wait(500)
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(2000)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet] ul.multiselect__content li:nth-last-child(3)").click()
    //     cy.get(".modal-card-body input[name=Address]").type("17A16QmavnUfCW11DAApiJxp7ARnxN5pGX")

    //     cy.get(".modal-card-foot > button[data-cy=submit-fiatwalletpay]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.get(".modal-card-body input[type=password]").type("123123aA")
    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()        

    //     cy.wait("@payWalletFiat").then(function(xhr) {
    //         expect(xhr.response.status === 200)
    //     })

    //     cy.wait(1000)
    //     cy.get("#order-list").should("be.visible")
    // })

    // it("Exchange ETH for USD (app wallet to app wallet)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "payfiat").as("payWalletFiat")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.get("[data-vv-name=SellCurrency] input.multiselect__input")
    //             .type("us", { force: true })
    //             .type("{enter}")
    //         cy.get("[data-vv-name=BuyCurrency] input.multiselect__input")
    //             .type("eth", { force: true })
    //             .type("{enter}")
    //     })

    //     cy.get("input[name=SellAmount]").type(50)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.wait(500)
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet]").click()
    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=BuyWallet] ul.multiselect__content li:nth-last-child(3)").click()
    //     cy.get(".modal-card-body input[name=Address]").type("0xE7b5EBa0c2a0Ca9cC4517409c0D63DcD6680e032")

    //     cy.get(".modal-card-foot > button[data-cy=submit-fiatwalletpay]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.get(".modal-card-body input[type=password]").type("123123aA")
    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()        

    //     cy.wait("@payWalletFiat").then(function(xhr) {
    //         expect(xhr.response.status === 200)
    //     })

    //     cy.wait(1000)
    //     cy.get("#order-list").should("be.visible")
    // })

    // it("Exchange USD for BTC (app wallet to app wallet)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "paycrypto").as("payCrypto")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.get("#swap-btn").click()
    //     })

    //     cy.get("input[name=SellAmount]").type(0.05)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.wait(500)
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet]").click()
    //     cy.wait(1000)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet] ul.multiselect__content li:nth-child(1)").click()

    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.get(".modal-card-body input[type=password]").type("123123aA")
    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()
    // })

    // it("Exchange USD for ETH (app wallet to app wallet)", () => {
    //     cy.server()
    //     cy.route("GET", Cypress.env("BACKEND") + "userslimit").as("loadLimits")
    //     cy.route("GET", Cypress.env("BACKEND") + "wallets").as("loadWallets")
    //     cy.route("POST", Cypress.env("BACKEND") + "price").as("calculateOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "orders").as("createOrder")
    //     cy.route("POST", Cypress.env("BACKEND") + "paycrypto").as("payCrypto")

    //     cy.login()

    //     cy.wait("@loadLimits").then(function() {
    //         cy.get("#swap-btn").click()
    //         cy.get("[data-vv-name=SellCurrency] input.multiselect__input")
    //             .type("eth", { force: true })
    //             .type("{enter}")
    //     })

    //     cy.get("input[name=SellAmount]").type(0.5)
    //     cy.wait("@calculateOrder").then(function() {
    //         cy.wait(500)
    //         cy.get("input[name=BuyAmount]")
    //             .invoke("val")
    //             .should("not.be.empty")
    //     })

    //     cy.wait("@loadWallets").then(function() {
    //         cy.get("#submitbtn").click()
    //     })

    //     cy.wait(500)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet]").click()
    //     cy.wait(1000)
    //     cy.get(".modal-card-body [data-vv-name=SellWallet] ul.multiselect__content li:nth-child(1)").click()

    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()

    //     cy.wait("@createOrder").then(function(xhr) {
    //         expect(xhr.response.body.Address)
    //     })

    //     cy.get(".modal-card-body input[type=password]").type("123123aA")
    //     cy.get(".modal-card-foot > button[data-cy=submit]").click()
    // })
})
