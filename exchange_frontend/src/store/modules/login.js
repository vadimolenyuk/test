import HTTP from "@/http"
// eslint-disable-next-line no-unused-vars
import VueCookies from "vue-cookies"
import {
    LOGIN_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_LOGOUT,
    LOGIN_SET_TOKEN,
    SSO_SET_LOGIN_INCOMING
} from "../actions/login"
import { SESSION_REQUEST } from "../actions/session"
import { SESSION_LOGOUT } from "../actions/session"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    Token: window.$cookies.get("AuthToken") || ""
}

const getters = {
    IS_AUTHENTICATED: state => !!state.Token
}

const actions = {
    [LOGIN_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(LOGIN_REQUEST)
            HTTP({
                url: process.env.VUE_APP_API_AUTH_URL + "account/login",
                data: user,
                method: "post"
            })
                .then(response => {
                    if (response && response.data && response.data.AccessToken) {
                        let ExpireDate = new Date()
                        ExpireDate = (user.Remember) ? ExpireDate.setDate(ExpireDate.getDate() + 7).toString() : new Date(response.data.TokenExpirationDate).toString()
                        window.$cookies.set("AuthToken", "Bearer " + response.data.AccessToken, ExpireDate)
                        HTTP.defaults.headers.common["Authorization"] = "Bearer " + response.data.AccessToken
                        dispatch(SESSION_REQUEST)
                            .then(() => {
                                resolve(response)
                                commit(LOGIN_SUCCESS, response.data)
                            })
                            .catch(error => {
                                reject(error)
                                commit(LOGIN_ERROR, error)
                            })
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(LOGIN_ERROR, error)
                    window.$cookies.remove("AuthToken")
                    delete HTTP.defaults.headers.common["Authorization"]
                })
        })
    },
    [LOGIN_LOGOUT]: ({ commit }) => {
        return new Promise(() => {
            commit(LOGIN_LOGOUT)
            commit(SESSION_LOGOUT)
            window.$cookies.remove("AuthToken")
        })
    },
    [SSO_SET_LOGIN_INCOMING]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            if (payload && payload.startsWith("Bearer ")) {
                resolve(payload)
                commit(LOGIN_SET_TOKEN, payload)
            }
            else {
                reject(payload)
                commit(LOGIN_ERROR)
            }
                
        })
    }
}

const mutations = {
    [LOGIN_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [LOGIN_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Token = "Bearer " + payload.AccessToken
    },
    [LOGIN_ERROR]: (state, payload) => {
        state.Status = "error"
        state.Token = ""
        window.$cookies.remove("AuthToken")
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [LOGIN_LOGOUT]: (state) => {
        state.Status = ""
        state.Token = ""
        let Port = (location.port !== "") ? ":" + location.port : ""
        let Secondleveldomain = location.hostname.split(".").slice(-2).join(".")
        window.location.href = (Secondleveldomain && Secondleveldomain !== "") ? location.protocol + "//" + Secondleveldomain + Port : "/"
    },
    [LOGIN_SET_TOKEN]: (state, payload) => {
        if (payload && payload.startsWith("Bearer ")) {
            state.Token = payload
            window.$cookies.set("AuthToken", payload, new Date().setDate(new Date().getDate() + 1).toString())
            HTTP.defaults.headers.common["Authorization"] = payload
            state.Status = "success set token"
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}