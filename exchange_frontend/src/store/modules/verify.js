import HTTP from "@/http"
import {
    VERIFY_REQUEST,
    VERIFY_REQUEST_ERROR,
    VERIFY_REQUEST_SUCCESS,
    VERIFY_CHECK,
    VERIFY_CHECK_ERROR,
    VERIFY_CHECK_SUCCESS,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_ERROR
} from "../actions/verify"
import { SESSION_PHONE_VERIFIED } from "../actions/session"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: ""
}

const actions = {
    [VERIFY_REQUEST]: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            commit(VERIFY_REQUEST)
            HTTP({
                url: process.env.VUE_APP_API_AUTH_URL + "phone/requestverification",
                data: { Phone: rootState.Session.Phone },
                method: "post"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.Message) {
                        commit(VERIFY_REQUEST_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(VERIFY_REQUEST_ERROR, error)
                })
        })
    },
    [VERIFY_CHECK]: ({ commit, rootState }, code) => {
        return new Promise((resolve, reject) => {
            commit(VERIFY_CHECK)
            HTTP({
                url: process.env.VUE_APP_API_AUTH_URL + "phone/verify",
                data: { Phone: rootState.Session.Phone, Text: code },
                method: "post"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.Message) {
                        commit(VERIFY_CHECK_SUCCESS, response.data)
                        commit(SESSION_PHONE_VERIFIED, true)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(VERIFY_CHECK_ERROR, error)
                })
        })
    },
    [VERIFY_EMAIL_REQUEST]: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            commit(VERIFY_EMAIL_REQUEST)
            HTTP({
                url: "user-email/send-confirmation",
                data: {
                    "ServiceName": "getcrypto24.com",
                    "UserEmail": rootState.Session.Email,
                    "RedirectUrl": `${window.location.origin}/dashboard?Notification=EmailConfirmed`
                },
                method: "post"
            })
                .then(response => {
                    if (response && response.data) {
                        resolve(response.data)
                        commit(VERIFY_EMAIL_SUCCESS, rootState.Session.Email)
                    }
                    else if (response)
                        resolve(response)
                    else notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(VERIFY_EMAIL_ERROR, error)
                })
        })
    }
}

const mutations = {
    [VERIFY_REQUEST]: (state) => {
        state.Status = "loading-request"
    },
    [VERIFY_REQUEST_SUCCESS]: (state, payload) => {
        state.Status = "success-request"
        if (payload.Message)
            notify("is-warning", payload.Message)
    },
    [VERIFY_REQUEST_ERROR]: (state, payload) => {
        state.Status = "error-request"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [VERIFY_CHECK]: (state) => {
        state.Status = "loading-check"
    },
    [VERIFY_CHECK_SUCCESS]: (state, payload) => {
        state.Status = "success-check"
        if (payload.Message)
            notify("is-success", payload.Message)
    },
    [VERIFY_CHECK_ERROR]: (state, payload) => {
        state.Status = "error-check"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [VERIFY_EMAIL_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [VERIFY_EMAIL_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload)
            notify("is-success", i18n.tc("Message.Verify.EmailConfirmationSent", 777, { email: payload }))
    },
    [VERIFY_EMAIL_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    }
}

export default {
    state,
    actions,
    mutations
}