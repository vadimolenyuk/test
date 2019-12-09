import VeeValidate from "vee-validate"
import { parseNumber } from "libphonenumber-js"
import i18n from "@/i18n"

VeeValidate.Validator.extend("utf8", {
    getMessage: field => i18n.tc("Validation.UTF8", 777, { name: field }),
    validate(value) {
    // Basic Latin-1 Letter + Numbers Regular Expression
        return (/^[0-9A-z\u00C0-\u00ff\s'.,-/#!$%^&*;:{}=\-_`~()]+$/).test(value)
    }
})

VeeValidate.Validator.extend("bitcoin", {
    getMessage: field => i18n.tc("Validation.BTCaddress", 777, { name: field }),
    validate(value) {
    // Bitcoin Regular Expression
        return (/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/).test(value)
    }
})

VeeValidate.Validator.extend("ethereum", {
    getMessage: field => i18n.tc("Validation.ETHaddress", 777, { name: field }),
    validate(value) {
    // Ethereum Regular Expression
        return (/^0x[a-fA-F0-9]{40}$/).test(value)
    }
})

VeeValidate.Validator.extend("phone", {
    validate(value) {
        var result = false
        if (value != null && value.length > 6)
        //Проверка валидности номера телефона с помощью libphonenumber
            result = new parseNumber(value, { extended: true }).valid
        return result
    }
})

VeeValidate.Validator.extend("login", {
    getMessage: field => i18n.tc("Validation.Login", 777, { name: field }),
    validate(value) {
        var result = false
        //Это телефон
        if (value != null && (value.startsWith("+") && value.length > 6))
        //Проверка валидности номера телефона с помощью libphonenumber
            result = new parseNumber(value, { extended: true }).valid
        //Это email
        else if (value != null && (value.includes("@")))
        //Email Address Regular Expression That 99.99% Works
            result = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
        return result
    }
})

VeeValidate.Validator.extend("pin", {
    getMessage: field => i18n.tc("Validation.Pin", 777, { name: field }),
    validate(value) {
    // Минимум 6 символов, заглавные буквы и цифры
        return (/^((?=.*[A-Z])(?=.*[0-9]))(?=.{6,})/).test(value)
    }
})


VeeValidate.Validator.extend("exchnagelimit", {
    getMessage(field, params, data) {
        return (data && data.message)
    },
    validate(value, args) {
        return new Promise(resolve => {
            resolve({
                valid: (value <= args[0]),
                data: (value <= args[0]) ? undefined : { message: i18n.tc("Validation.ExchangeLimit", args[0], { amount: args[0] }) }
            })
        })
    }
})

VeeValidate.Validator.extend("withdrawlimit", {
    getMessage(field, params, data) {
        return (data && data.message)
    },
    validate(value, args) {
        return new Promise(resolve => {
            resolve({
                valid: (value <= args[0]),
                data: (value <= args[0]) ? undefined : { message: i18n.tc("Validation.WithdrawLimit", args[0], { amount: args[0] }) }
            })
        })
    }
})

VeeValidate.Validator.extend("required_currency", {
    getMessage: () => i18n.tc("Validation.SelectCurrency"),
    validate(value, args) {
        if  (args && args.Code && (typeof args.Code === "string"))
            return true
        else
            return false
    }
})


export default VeeValidate