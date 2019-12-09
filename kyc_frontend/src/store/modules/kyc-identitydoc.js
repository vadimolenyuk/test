import HTTP from "@/http"
import {
    KYC_CHANGE_IDENTITYCOUNTRY,
    KYC_CHANGE_NUMBER,
    KYC_CHANGE_AUTHORITY,
    KYC_CHANGE_DATEOFISSUE,
    KYC_CHANGE_DATEOFEXPIRE,
    KYC_CHANGE_IDNAME,

    KYC_GET_IDENTITY_REQUEST,
    KYC_GET_IDENTITY_SUCCESS,
    KYC_SAVE_IDENTITY_REQUEST,

    KYC_GET_IDDOC_REQUEST,
    KYC_GET_IDDOC_REQUEST_BACK,
    KYC_GET_IDDOC_SUCCESS,
    KYC_GET_IDDOC_BACK_SUCCESS,
    KYC_SAVE_IDDOC_REQUEST,
    KYC_SAVE_IDDOC_REQUEST_BACK,
    KYC_SAVE_IDDOC_SUCCESS,
    KYC_SAVE_IDDOC_BACK_SUCCESS,

    KYC_GET_ERROR,
    KYC_SAVE_ERROR,
    KYC_SAVE_SUCCESS
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    Id: null,
    Country: null,
    Number: null,
    Authority: null,
    DateOfIssue: new Date(),
    DateOfExpiry: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
    Doc: {
        Id: null,
        Url: null
    },
    DocBack: {
        Id: null,
        Url: null
    },
    Name: null
}

const getters = {
    KYC_IDENTITY_COMPLETE: state => {
        let count = 0
        for (let i in state) {
            if (i === "Status" || i === "Id")
                continue
            if (!state.hasOwnProperty(i) || (state.hasOwnProperty(i) && (state[i] === null || state[i] === undefined || state[i] === ""))) {
                count++
            }
        }
        return count === 0
    }
}

const actions = {
    [KYC_GET_IDENTITY_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_IDENTITY_REQUEST)
            HTTP({
                url: "identitycard",
                method: "get"
            })
                .then(response => {
                    if (response && response.data) {
                        resolve(response.data)
                        commit(KYC_GET_IDENTITY_SUCCESS, response.data)
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
    [KYC_SAVE_IDENTITY_REQUEST]: ({ commit }) => {
        let HttpMethod = (state.Id) ? "put" : "post"
        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_IDENTITY_REQUEST)
            HTTP({
                url: "identitycard",
                data: {
                    Id: state.Id,
                    Country: state.Country,
                    Number: state.Number,
                    Authority: state.Authority,
                    DateOfIssue: state.DateOfIssue.toLocaleDateString("en-US"),
                    DateOfExpiry: state.DateOfExpiry.toLocaleDateString("en-US"),
                    Name: state.Name
                },
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
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
    },
    [KYC_GET_IDDOC_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_IDDOC_REQUEST)
            HTTP({
                url: "identitycard/image",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response.data)
                        commit(KYC_GET_IDDOC_SUCCESS, response.data)
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
    [KYC_GET_IDDOC_REQUEST_BACK]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_IDDOC_REQUEST)
            HTTP({
                url: "identitycard/imageback",
                method: "get"
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response.data)
                        commit(KYC_GET_IDDOC_BACK_SUCCESS, response.data)
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
    [KYC_SAVE_IDDOC_REQUEST]: ({ commit }, payload) => {
        var HttpMethod = (state.Doc.Id) ? "put" : "post"
        var FData = new FormData()
        FData.append("file", payload)

        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_IDDOC_REQUEST)
            HTTP({
                url: "identitycard/image",
                headers: { "Content-Type": "multipart/form-data" },
                data: FData,
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_IDDOC_SUCCESS, response.data)
                    }
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_SAVE_ERROR, error)
                })
        })
    },
    [KYC_SAVE_IDDOC_REQUEST_BACK]: ({ commit }, payload) => {
        var HttpMethod = (state.DocBack.Id) ? "put" : "post"
        var FData = new FormData()
        FData.append("file", payload)

        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_IDDOC_REQUEST)
            HTTP({
                url: "identitycard/imageback",
                headers: { "Content-Type": "multipart/form-data" },
                data: FData,
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_IDDOC_BACK_SUCCESS, response.data)
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
    [KYC_CHANGE_IDENTITYCOUNTRY]: (state, payload) => state.Country = payload,
    [KYC_CHANGE_NUMBER]: (state, payload) => state.Number = payload,
    [KYC_CHANGE_AUTHORITY]: (state, payload) => state.Authority = payload,
    [KYC_CHANGE_DATEOFISSUE]: (state, payload) => state.DateOfIssue = payload,
    [KYC_CHANGE_DATEOFEXPIRE]: (state, payload) => state.DateOfExpiry = payload,
    [KYC_CHANGE_IDNAME]: (state, payload) => state.Name = payload,

    [KYC_GET_IDENTITY_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_IDENTITY_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Id = payload.Id
        state.Country = payload.Country
        state.Number = payload.Number
        state.Authority = payload.Authority
        state.DateOfIssue = new Date(payload.DateOfIssue)
        state.DateOfExpiry = new Date(payload.DateOfExpiry)
        state.Name = payload.Name
    },
    [KYC_SAVE_IDENTITY_REQUEST]: (state) => state.Status = "saving",
    [KYC_GET_IDDOC_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_IDDOC_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Doc.Url = payload.Url
        state.Doc.Id = payload.Id
    },
    [KYC_GET_IDDOC_BACK_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.DocBack.Url = payload.Url
        state.DocBack.Id = payload.Id
    },
    [KYC_SAVE_IDDOC_REQUEST]: (state) => state.Status = "saving",
    [KYC_SAVE_IDDOC_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Doc.Id = payload.Id
        state.Doc.Url = payload.Url
        Helpers.notify("is-success", i18n.t("Message.KYC.General.SaveSuccess"))
    },
    [KYC_SAVE_IDDOC_BACK_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.DocBack.Id = payload.Id
        state.DocBack.Url = payload.Url
        Helpers.notify("is-success", i18n.t("Message.KYC.General.SaveSuccess"))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
