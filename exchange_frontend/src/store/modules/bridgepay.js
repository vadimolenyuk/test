import HTTP from "@/http"
import {
    BRIDGEPAY_TOKEN_REQUEST,
    BRIDGEPAY_TOKEN_SUCCESS,
    BRIDGEPAY_TOKEN_ERROR
} from "../actions/bridgepay"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    Token: null
}

const actions = {
    [BRIDGEPAY_TOKEN_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(BRIDGEPAY_TOKEN_REQUEST)
            HTTP({
                url: "bridgepay/purchasetoken/",
                method: "get",
                params: payload
            })
                .then(response => {
                    resolve(response)
                    if (response.data) {
                        commit(BRIDGEPAY_TOKEN_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(BRIDGEPAY_TOKEN_ERROR, error.response)
                })
        })
    }
}

const mutations = {
    [BRIDGEPAY_TOKEN_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [BRIDGEPAY_TOKEN_SUCCESS]: (state, payload) => {
        state.Status = "success",
        state.Token = payload
    },
    [BRIDGEPAY_TOKEN_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    }
}

export default {
    state,
    actions,
    mutations
}