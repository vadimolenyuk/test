import HTTP from "@/http"
import {
    KYC_GET_SCREENPLAY_REQUEST,
    KYC_GET_SCREENPLAY_SUCCESS,
    
    KYC_GET_VIDEO_REQUEST,
    KYC_GET_VIDEO_SUCCESS,
    KYC_SAVE_VIDEO_REQUEST,
    KYC_SAVE_VIDEO_SUCCESS,
    
    KYC_GET_ERROR,
    KYC_SAVE_ERROR
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    Id: null,
    Screenplay: null,
    Url: null
}

const actions = {
    [KYC_GET_SCREENPLAY_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_SCREENPLAY_REQUEST)
            HTTP({
                url: "screenplay",
                method: "get"
            })
                .then(response => {
                    resolve(response.data)
                    if (response && response.data) {
                        commit(KYC_GET_SCREENPLAY_SUCCESS, response.data)
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
    [KYC_GET_VIDEO_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_VIDEO_REQUEST)
            HTTP({
                url: "uservideo",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Url) {
                        resolve(response.data)
                        commit(KYC_GET_VIDEO_SUCCESS, response.data)
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
    [KYC_SAVE_VIDEO_REQUEST]: ({ commit }, payload) => {
        var HttpMethod = (state.Id) ? "put" : "post"
        var FData = new FormData()
        FData.append("UserVideo", payload)
        FData.append("Screenplay", JSON.stringify(state.Screenplay))

        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_VIDEO_REQUEST)
            HTTP({
                url: "uservideo",
                headers: { "Content-Type": "multipart/form-data" },
                data: FData,
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_VIDEO_SUCCESS, response.data)
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
    [KYC_GET_VIDEO_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_VIDEO_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Url = payload.Url
        state.Id = payload.Id
    },
    [KYC_SAVE_VIDEO_REQUEST]: (state) => state.Status = "saving",
    [KYC_SAVE_VIDEO_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Url = payload.Url
        state.Id = payload.Id
    },

    [KYC_GET_SCREENPLAY_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_SCREENPLAY_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Screenplay = payload
    }
}

export default {
    state,
    actions,
    mutations
}
