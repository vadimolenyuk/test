import HTTP from "@/http"
import {
    KYC_GET_SELFIEWITHID_REQUEST,
    KYC_GET_SELFIEWITHID_SUCCESS,
    KYC_SAVE_SELFIEWITHID_REQUEST,
    KYC_SAVE_SELFIEWITHID_SUCCESS,

    KYC_GET_PROOFOFRESIDENCE_REQUEST,
    KYC_GET_PROOFOFRESIDENCE_SUCCESS,
    KYC_SAVE_PROOFOFRESIDENCE_REQUEST,
    KYC_SAVE_PROOFOFRESIDENCE_SUCCESS,

    KYC_GET_CERTIFICATE_REQUEST,
    KYC_GET_CERTIFICATE_SUCCESS,
    KYC_SAVE_CERTIFICATE_REQUEST,
    KYC_SAVE_CERTIFICATE_SUCCESS,

    KYC_CHECK_REQUEST,
    KYC_CHECK_ERROR,
    KYC_CHECK_SUCCESS,

    KYC_GET_ERROR,
    KYC_SAVE_ERROR
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    SelfieWithID: {
        Id: null,
        Url: null
    },
    ProofOfResidence: {
        Id: null,
        Url: null
    },
    InvestorCertificate: {
        Id: null,
        Url: null
    }
}

const actions = {
    [KYC_GET_SELFIEWITHID_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_SELFIEWITHID_REQUEST)
            HTTP({
                url: "identitycard/selfie",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response.data)
                        commit(KYC_GET_SELFIEWITHID_SUCCESS, response.data)
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
    [KYC_SAVE_SELFIEWITHID_REQUEST]: ({ commit }, payload) => {
        var HttpMethod = (state.SelfieWithID.Id) ? "put" : "post"
        var FData = new FormData()
        FData.append("file", payload)

        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_SELFIEWITHID_REQUEST)
            HTTP({
                url: "identitycard/selfie",
                headers: { "Content-Type": "multipart/form-data" },
                data: FData,
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_SELFIEWITHID_SUCCESS, response.data)
                    }
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_SAVE_ERROR, error)
                })
        })
    },
    [KYC_GET_PROOFOFRESIDENCE_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_PROOFOFRESIDENCE_REQUEST)
            HTTP({
                url: "useraddress/image",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response.data)
                        commit(KYC_GET_PROOFOFRESIDENCE_SUCCESS, response.data)
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
    [KYC_SAVE_PROOFOFRESIDENCE_REQUEST]: ({ commit }, payload) => {
        var HttpMethod = (state.ProofOfResidence.Id) ? "put" : "post"
        var FData = new FormData()
        FData.append("file", payload)

        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_PROOFOFRESIDENCE_REQUEST)
            HTTP({
                url: "useraddress/image",
                headers: { "Content-Type": "multipart/form-data" },
                data: FData,
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_PROOFOFRESIDENCE_SUCCESS, response.data)
                    }
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_SAVE_ERROR, error)
                })
        })
    },
    [KYC_GET_CERTIFICATE_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_CERTIFICATE_REQUEST)
            HTTP({
                url: "investorcertificate/image",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response.data)
                        commit(KYC_GET_CERTIFICATE_SUCCESS, response.data)
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
    [KYC_SAVE_CERTIFICATE_REQUEST]: ({ commit }, payload) => {
        var HttpMethod = (state.InvestorCertificate.Id) ? "put" : "post"
        var FData = new FormData()
        FData.append("file", payload)

        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_CERTIFICATE_REQUEST)
            HTTP({
                url: "investorcertificate/image",
                headers: { "Content-Type": "multipart/form-data" },
                data: FData,
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_CERTIFICATE_SUCCESS, response.data)
                    }
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_SAVE_ERROR, error)
                })
        })
    },
    [KYC_CHECK_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_CHECK_REQUEST)
            let URL = ""
            if (process.env.VUE_APP_FEATURE_KYC_PROVIDER === "identitymind")
                URL = "kyc/approve"
            else if (process.env.VUE_APP_FEATURE_KYC_PROVIDER === "synapse")
                URL = "kyc/approve/synapse"
            HTTP({
                url: process.env.VUE_APP_API_AUTH2_URL + URL,
                method: "post"
            })
                .then(response => {
                    if (response && response.status && response.status === 200) {
                        resolve(response.data)
                        commit(KYC_CHECK_SUCCESS, response.data)
                    }
                    else if (response) {
                        resolve(response)
                    }
                    else {
                        Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                    } 
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_CHECK_ERROR, error)
                })
        })
    }
}

const mutations = {
    [KYC_GET_SELFIEWITHID_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_SELFIEWITHID_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.SelfieWithID.Url = payload.Url
        state.SelfieWithID.Id = payload.Id
    },
    [KYC_SAVE_SELFIEWITHID_REQUEST]: (state) => state.Status = "saving",
    [KYC_SAVE_SELFIEWITHID_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.SelfieWithID.Id = payload.Id
        state.SelfieWithID.Url = payload.Url
        Helpers.notify("is-success", i18n.t("Message.KYC.General.SaveSuccess"))
    },
    [KYC_GET_PROOFOFRESIDENCE_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_PROOFOFRESIDENCE_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.ProofOfResidence.Url = payload.Url
        state.ProofOfResidence.Id = payload.Id
    },
    [KYC_SAVE_PROOFOFRESIDENCE_REQUEST]: (state) => state.Status = "saving",
    [KYC_SAVE_PROOFOFRESIDENCE_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.ProofOfResidence.Id = payload.Id
        state.ProofOfResidence.Url = payload.Url
        Helpers.notify("is-success", i18n.t("Message.KYC.General.SaveSuccess"))
    },
    [KYC_GET_CERTIFICATE_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_CERTIFICATE_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.InvestorCertificate.Url = payload.Url
        state.InvestorCertificate.Id = payload.Id
    },
    [KYC_SAVE_CERTIFICATE_REQUEST]: (state) => state.Status = "saving",
    [KYC_SAVE_CERTIFICATE_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.InvestorCertificate.Id = payload.Id
        state.InvestorCertificate.Url = payload.Url
        Helpers.notify("is-success", i18n.t("Message.KYC.General.SaveSuccess"))
    },

    [KYC_CHECK_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [KYC_CHECK_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload.Message)
            Helpers.notify("is-info", i18n.t("Message.KYC.General.CompleteMessage") + " " + payload.Message)
        else
            Helpers.notify("is-success", i18n.t("Message.KYC.General.Complete"))
    },
    [KYC_CHECK_ERROR]: (state, payload) => {
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