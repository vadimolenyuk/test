import Vue from "vue"
import HTTP from "@/http"
import router from "@/router"
import { LOGOUT_REQUEST } from "./actions/login"

import Vuex from "vuex"
import Login from "./modules/login"
import Session from "./modules/session"
import Verify from "./modules/verify"
import Password from "./modules/password"
import Country from "./modules/country"
import Language from "./modules/language"
import KYC from "./modules/kyc"
import KYCpersonal from "./modules/kyc-personal"
import KYCaddress from "./modules/kyc-address"
import KYCidentitydoc from "./modules/kyc-identitydoc"
import KYCwebcam from "./modules/kyc-webcam"
import KYCother from "./modules/kyc-other"
import KYCSSN from "./modules/kyc-ssn"
import AppDB from "./modules/appdb"
import AppDBSet from "./modules/appdb-set"

Vue.use(Vuex)

let store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Login,
        Session,
        Verify,
        Password,
        Country,
        Language,
        KYC,
        KYCpersonal,
        KYCaddress,
        KYCidentitydoc,
        KYCwebcam,
        KYCother,
        KYCSSN,
        AppDB,
        AppDBSet
    }
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
            store.dispatch(LOGOUT_REQUEST)
            router.push({ name: "Login" })
        }
        throw error
    })
})