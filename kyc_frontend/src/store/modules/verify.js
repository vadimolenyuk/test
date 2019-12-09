import HTTP from "@/http"
import {
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_ERROR
} from "../actions/verify"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: ""
}

const actions = {
    [VERIFY_EMAIL_REQUEST]: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            commit(VERIFY_EMAIL_REQUEST)
            HTTP({
                url: process.env.VUE_APP_API_AUTH2_URL + "user-email/send-confirmation",
                data: {
                    "ServiceName": (rootState.AppDBSet.ID === "1") ? "getcrypto24.com" : "kyc",
                    "UserEmail": rootState.Session.Email,
                    "RedirectUrl": `${window.location.origin}/kyc?Notification=EmailConfirmed`
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
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(VERIFY_EMAIL_ERROR, error)
                })
        })
    }
}

const mutations = {
    [VERIFY_EMAIL_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [VERIFY_EMAIL_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload)
            Helpers.notify("is-success", i18n.tc("Message.Verify.EmailConfirmationSent", 777, { email: payload }))
    },
    [VERIFY_EMAIL_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            Helpers.notify("is-danger", payload.response.data.error)
        else
            Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    }
}

export default {
    state,
    actions,
    mutations
}