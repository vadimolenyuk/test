import HTTP from "@/http"
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_ERROR,

    LOGIN_TOKEN_RECEIVE,
    LOGIN_TOKEN_SET,

    LOGIN_SUCCESS,
    LOGIN_ERROR,
    
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_ERROR
} from "../actions/login"
import { SESSION_REQUEST } from "../actions/session"
import { SESSION_LOGOUT } from "../actions/session"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    Token: window.$cookies.get("AuthToken") || ""
}

const getters = {
    IS_AUTHENTICATED: state => !!state.Token
}

const actions = {
    [LOGIN_REQUEST]: ({ commit }) => {
        try {
            commit(LOGIN_REQUEST)
            Helpers.redirectToAuthApp("login", window.location.origin + "/login")
        } 
        catch (error) {
            commit(LOGIN_REQUEST_ERROR, error)
        }
    },
    [LOGIN_TOKEN_RECEIVE]: ({ commit, dispatch }, payload) => {
        return new Promise((resolve, reject) => {
            commit(LOGIN_TOKEN_RECEIVE)
            if (payload && payload.AuthToken && payload.AuthToken.startsWith("Bearer ") && payload.ExpirationDate) {
                commit(LOGIN_TOKEN_SET, payload)
                dispatch(SESSION_REQUEST)
                    .then((response) => {
                        resolve(response)
                        commit(LOGIN_SUCCESS)
                    })
                    .catch(error => {
                        reject(error)
                        commit(LOGIN_ERROR, error)
                        dispatch(LOGOUT_REQUEST)
                    })
            }
        })
    },
    [LOGOUT_REQUEST]: ({ commit }) => {
        return new Promise(() => {
            try {
                commit(SESSION_LOGOUT)
                commit(LOGOUT_REQUEST)
                Helpers.redirectToAuthApp("logout", window.location.origin)
            } 
            catch (error) {
                commit(LOGOUT_REQUEST_ERROR, error)
            }
        })
    }
}

const mutations = {
    [LOGIN_REQUEST]: (state) => {
        state.Status = "auth request"
    },
    [LOGIN_REQUEST_ERROR]: (state) => {
        state.Status = "request error"
        Helpers.notify("is-danger", i18n.t("Message.SSO.LoginRequestError"))
    },

    [LOGIN_TOKEN_RECEIVE]: (state) => {
        state.Status = "token received"
    },
    [LOGIN_TOKEN_SET]: (state, payload) => {
        if (payload && payload.AuthToken && payload.AuthToken.startsWith("Bearer ") && payload.ExpirationDate) {
            state.Token = payload.AuthToken
            window.$cookies.set("AuthToken", payload.AuthToken, new Date(payload.ExpirationDate).toString())
            HTTP.defaults.headers.common["Authorization"] = payload.AuthToken
            state.Status = "success set token"
        }
    },

    [LOGIN_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [LOGIN_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            Helpers.notify("is-danger", payload.response.data.error)
        else
            Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [LOGOUT_REQUEST]: (state) => {
        state.Status = ""
        state.Token = ""
        window.$cookies.remove("AuthToken")
        delete HTTP.defaults.headers.common["Authorization"]
    },
    [LOGOUT_REQUEST_ERROR]: (state) => {
        state.Status = "request error"
        Helpers.notify("is-danger", i18n.t("Message.SSO.LoginRequestError"))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}