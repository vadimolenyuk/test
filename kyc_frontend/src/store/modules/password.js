import HTTP from "@/http"
import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from "../actions/password"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: ""
}

const actions = {
    [CHANGE_PASSWORD_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(CHANGE_PASSWORD_REQUEST)
            HTTP({
                url: "account/changepassword",
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
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(CHANGE_PASSWORD_ERROR, error)
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
        Helpers.notify("is-success", i18n.t("Message.Password.ChangeSuccess"))
    },
    [CHANGE_PASSWORD_ERROR]: (state, payload) => {
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