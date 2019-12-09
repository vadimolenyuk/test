import Vue from "vue"
import VueI18n from "vue-i18n"
// eslint-disable-next-line no-unused-vars
import VueCookies from "vue-cookies"

Vue.use(VueI18n)

function loadLocaleMessages () {
    const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })
    return messages
}

let LangCode = (window.$cookies.isKey("Language") && window.$cookies.get("Language").code) ? window.$cookies.get("Language").code.substr(0, 2) : process.env.VUE_APP_I18N_LOCALE

export default new VueI18n({
    locale: LangCode || "en",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
    messages: loadLocaleMessages()
})
