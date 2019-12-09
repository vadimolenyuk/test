import Vue from "vue"
import HTTP from "@/http"
import router from "@/router"
import { LOGIN_LOGOUT } from "./actions/login"

import Vuex from "vuex"
import Login from "./modules/login"
import Session from "./modules/session"
import Register from "./modules/register"
import Verify from "./modules/verify"
import Password from "./modules/password"
import Currencies from "./modules/currencies"
import CurrenciesRestore from "./plugins/currencies-restore"
const CurrenciesRestorePlugin = CurrenciesRestore()
import Order from "./modules/order"
import Wallet from "./modules/wallet"
import FiatWallet from "./modules/fiatwallet"
import Rate from "./modules/rate"
import Bridgepay from "./modules/bridgepay"
import ACH from "./modules/ach"
import Language from "./modules/language"
import Tier from "./modules/tier"
import AppDB from "./modules/appdb"

Vue.use(Vuex)

let store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Login,
        Session,
        Register,
        Verify,
        Password,
        Currencies,
        Order,
        Wallet,
        FiatWallet,
        Rate,
        Bridgepay,
        Language,
        Tier,
        AppDB,
        ACH
    },
    plugins: [CurrenciesRestorePlugin]
})
export default store

//Auth routine
if (store.state.Login.Token)
    HTTP.defaults.headers.common["Authorization"] = store.state.Login.Token

if (store.state.Language.CurrentLanguage && store.state.Language.CurrentLanguage.code) 
    HTTP.defaults.headers.common["Accept-Language"] = store.state.Language.CurrentLanguage.code.substr(0, 2)
else
    HTTP.defaults.headers.common["Accept-Language"] = "en-US"
//Unauthorized routine
HTTP.interceptors.response.use(undefined, function (error) {
    return new Promise(function () {
        if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
            // if you ever get an unauthorized, logout the user
            store.dispatch(LOGIN_LOGOUT)
            router.push({ name: "Login" })
        }
        throw error
    })
})