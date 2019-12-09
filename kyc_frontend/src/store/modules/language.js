import HTTP from "@/http"
// eslint-disable-next-line no-unused-vars
import VueCookies from "vue-cookies"
import i18n from "@/i18n"
import {
    LANGUAGE_SET
} from "../actions/language"

const state = {
    Languages: [
        {
            code: "en-US",
            name: "English"
        },
        {
            code: "es-ES",
            name: "Español"
        },
        {
            code: "de-DE",
            name: "Deutsch"
        },
        {
            code: "it-IT",
            name: "L'italiano"
        },
        {
            code: "fr-FR",
            name: "Français"
        }
    ],
    CurrentLanguage: window.$cookies.get("Language") || {
        code: "en-US",
        name: "English"
    }
}

const getters = {
    CURRENT_LANGUAGE: state => state.CurrentLanguage
}

const mutations = {
    [LANGUAGE_SET]: (state, payload) => {
        state.CurrentLanguage = payload
        i18n.locale = payload.code.substr(0, 2)
        HTTP.defaults.headers.common["Accept-Language"] = payload.code.substr(0, 2)

        let ExpireDate = new Date()
        ExpireDate.setDate(ExpireDate.getDate() + 30)
        window.$cookies.set("Language", payload, ExpireDate)
    }
}

export default {
    state,
    getters,
    mutations
}