import HTTP from "@/http"
import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_TOKEN_PASSWORD_REQUEST,
    RESET_TOKEN_PASSWORD_SUCCESS,
    RESET_TOKEN_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR
} from "../actions/password"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    Token: null,
    UserID: null
}

const getters = {
    IS_RESET_PASSWORD_READY: state => !!state.Token
}

const actions = {
    [CHANGE_PASSWORD_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(CHANGE_PASSWORD_REQUEST)
            HTTP({
                url: process.env.VUE_APP_API_AUTH_URL + "account/changepassword",
                data: payload,
                method: "post"
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response.data)
                        commit(CHANGE_PASSWORD_SUCCESS)
                    }
                    else if (response)
                        resolve(response)
                    else notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(CHANGE_PASSWORD_ERROR, error)
                })
        })
    },

    [FORGOT_PASSWORD_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(FORGOT_PASSWORD_REQUEST)
            HTTP({
                url: "user-password/reset-code",
                data: {
                    "EmailOrPhone": payload
                },
                method: "post"
            })
                .then(response => {
                    if (response && response.data && response.data.UserUid) {
                        resolve(response.data)
                        commit(FORGOT_PASSWORD_SUCCESS, response.data)
                    }
                    else if (response)
                        resolve(response)
                    else notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(FORGOT_PASSWORD_ERROR, error)
                })
        })
    },
    [RESET_TOKEN_PASSWORD_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(RESET_TOKEN_PASSWORD_REQUEST)
            HTTP({
                url: "user-password/reset-token",
                data: {
                    "UserUid": state.UserID,
                    "Code": payload
                },
                method: "post"
            })
                .then(response => {
                    if (response && response.data && response.data.ResetToken) {
                        resolve(response.data)
                        commit(RESET_TOKEN_PASSWORD_SUCCESS, response.data)
                    }
                    else if (response)
                        resolve(response)
                    else notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(RESET_TOKEN_PASSWORD_ERROR, error)
                })
        })
    },
    [RESET_PASSWORD_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(RESET_PASSWORD_REQUEST)
            HTTP({
                url: "user-password/reset-token",
                data: {
                    "ResetToken": state.Token,
                    "NewPassword": payload
                },
                method: "patch"
            })
                .then(response => {
                    if (response && response.data) {
                        resolve(response.data)
                        commit(RESET_PASSWORD_SUCCESS)
                    }
                    else if (response)
                        resolve(response)
                    else notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(RESET_PASSWORD_ERROR, error)
                })
        })
    }
}

const mutations = {
    [CHANGE_PASSWORD_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [CHANGE_PASSWORD_SUCCESS]: (state) => {
        state.Status = "success"
        notify("is-success", i18n.t("Message.Password.ChangeSuccess"))
    },
    [CHANGE_PASSWORD_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [FORGOT_PASSWORD_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [FORGOT_PASSWORD_SUCCESS]: (state, payload) => {
        if (payload && payload.UserUid) {
            state.Status = "success"
            state.UserID = payload.UserUid
        }
        if (payload && payload.Message)
            notify("is-warning", payload.Message)
    },
    [FORGOT_PASSWORD_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [RESET_TOKEN_PASSWORD_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [RESET_TOKEN_PASSWORD_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload && payload.ResetToken) {
            state.Token = payload.ResetToken
        }
    },
    [RESET_TOKEN_PASSWORD_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [RESET_PASSWORD_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [RESET_PASSWORD_SUCCESS]: (state) => {
        state.Status = "success"
        notify("is-success", i18n.t("Message.Password.ChangeSuccess"))
    },
    [RESET_PASSWORD_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}