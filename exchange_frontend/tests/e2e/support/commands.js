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
Cypress.Commands.add("login", () => {
    cy.server()
    cy.route("POST", Cypress.env("BACKEND_AUTH") + "account/login").as("postLogin")

    cy.visit("/")
    cy.get("a[href=\"/login\"]")
        .first()
        .click()

    cy.fixture("user").then(User => {
        cy.get("[name=\"Login\"]").type(User.Login)
        cy.get("[name=\"Password\"]").type(User.Password)
    })

    cy.get("button[type=\"Submit\"]").click()

    cy.wait("@postLogin").then(function(xhr) {
        expect(xhr.response.body.UserId)
        expect(cy.get("#dashboard").should("be.visible"))
    })
})

Cypress.Commands.add("register", (email, phone, password) => {
    cy.get("[name=\"Login\"]").type(email)
    cy.get("[name=\"Phone\"]").clear()
    cy.get("[name=\"Phone\"]").type(phone)
    cy.get("[name=\"Password\"]").type(password)
    cy.get("[name=\"PasswordConfirmation\"]").type(password)
    cy.get("input[type=checkbox]").click({ multiple: true, force: true })
    cy.get("button[type=\"Submit\"]").click()
})

Cypress.Commands.add("logout", () => {
    expect(cy.get("#dashboard").should("be.visible"))
    cy.get(".navbar-burger").click()
    cy.get("#usernav").click()
    cy.get("#logout").click()
})

Cypress.Commands.add("changepwd", (oldpwd, newpwd) => {
    cy.get("[name=\"OldPassword\"]").type(oldpwd)
    cy.get("[name=\"Password\"]").type(newpwd)
    cy.get("[name=\"PasswordConfirmation\"]").type(newpwd)
    cy.get(".modal-card-foot > button[type=\"Submit\"]").click()
})

Cypress.Commands.add("iframe", { prevSubject: "element" }, iframe => {
    const iframeDoc = iframe[0].contentDocument

    return new Cypress.Promise(resolve => {
        const resolveWithBody = () => {
            resolve(iframe.contents().find("body"))
        }
        if ("complete" === iframeDoc.readyState) {
            resolveWithBody()
        }
        iframe.on("load", () => {
            resolveWithBody()
        })
    })
})
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
