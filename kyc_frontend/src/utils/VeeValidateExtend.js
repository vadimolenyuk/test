import VeeValidate from "vee-validate"

VeeValidate.Validator.extend("utf8", {
    validate(value) {
        // Basic Latin-1 Letter + Numbers Regular Expression
        return (/^[0-9A-z\u00C0-\u00ff\s'.,-/#!$%^&*;:{}=\-_`~()]+$/).test(value)
    }
})

export default VeeValidate