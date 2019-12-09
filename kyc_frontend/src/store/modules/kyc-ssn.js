import HTTP from "@/http"
import {
    KYC_CHANGE_SSN,

    KYC_GET_SSN_REQUEST,
    KYC_GET_SSN_SUCCESS,
    KYC_SAVE_SSN_REQUEST,

    KYC_GET_ERROR,
    KYC_SAVE_ERROR,
    KYC_SAVE_SUCCESS
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    New: true,
    SSN: null
}

const actions = {
    [KYC_GET_SSN_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_SSN_REQUEST)
            HTTP({
                url: "ssn",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Number) {
                        resolve(response.data)
                        commit(KYC_GET_SSN_SUCCESS, response.data.Number)
                    }
                    else if (response)
                        resolve(response)
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_GET_ERROR, error)
                })
        })
    },
    [KYC_SAVE_SSN_REQUEST]: ({ commit }) => {
        let HttpMethod = (!state.New) ? "put" : "post"
        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_SSN_REQUEST)
            HTTP({
                url: "ssn",
                data: {
                    Number: state.SSN
                },
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Number && response.data.Number === state.SSN) {
                        resolve(response)
                        commit(KYC_SAVE_SUCCESS)
                    }
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_SAVE_ERROR, error)
                })
        })
    }
}

const mutations = {
    [KYC_CHANGE_SSN]: (state, payload) => state.SSN = payload,

    [KYC_GET_SSN_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_SSN_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.SSN = payload
        state.New = false
    },
    [KYC_SAVE_SSN_REQUEST]: (state) => state.Status = "saving"
}

export default {
    state,
    actions,
    mutations
}