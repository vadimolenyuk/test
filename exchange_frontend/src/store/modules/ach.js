import HTTP from "@/http"
import {
    ACH_READY_REQUEST,
    ACH_READY_SUCCESS,
    ACH_READY_ERROR,

    ACH_BANKACCOUNTS_REQUEST,
    ACH_BANKACCOUNTS_SUCCESS,
    ACH_BANKACCOUNTS_ERROR,

    ACH_LINK_BANKACCOUNTS_REQUEST,
    ACH_LINK_BANKACCOUNTS_SUCCESS,
    ACH_LINK_BANKACCOUNTS_ERROR,
    
    ACH_DEPOSIT_REQUEST,
    ACH_DEPOSIT_SUCCESS,
    ACH_DEPOSIT_ERROR,

    ACH_WITHDRAW_REQUEST,
    ACH_WITHDRAW_SUCCESS,
    ACH_WITHDRAW_ERROR,

    ACH_GET_WIDGET_REQUEST,
    ACH_GET_WIDGET_SUCCESS,
    ACH_GET_WIDGET_ERROR
} from "../actions/ach"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    Ready: {
        ReadyForLinkAccount: false,
        ReadyForPayment: false
    },
    BankAccounts: []
}

const getters = {
    IS_ACH_READY: state => state.Ready,
    IS_ACH_DEPOSIT_READY: state => state.Ready && state.BankAccounts.length > 0
}

const actions = {
    [ACH_READY_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(ACH_READY_REQUEST)
            HTTP({
                url: "ach/ready/" + process.env.VUE_APP_FEATURE_ACH_PROVIDER,
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status && response.status === 200) {
                        commit(ACH_READY_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ACH_READY_ERROR, error.response)
                })
        })
    },
    [ACH_BANKACCOUNTS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(ACH_BANKACCOUNTS_REQUEST)
            HTTP({
                url: "ach/bankAccounts/" + process.env.VUE_APP_FEATURE_ACH_PROVIDER,
                method: "get",
                params: {
                    "achAccountId": state.AccountId
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status && response.status === 200 && response.data) {
                        commit(ACH_BANKACCOUNTS_SUCCESS, response.data.Items)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ACH_BANKACCOUNTS_ERROR, error.response)
                })
        })
    },
    [ACH_LINK_BANKACCOUNTS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(ACH_LINK_BANKACCOUNTS_REQUEST)
            HTTP({
                url: "ach/BankUI/" + process.env.VUE_APP_FEATURE_ACH_PROVIDER,
                method: "get",
                params: {
                    "SuccessUri": window.location.origin + "/fiatwallets",
                    "FailureUri": window.location.origin + "/fiatwallets"
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status && response.status === 200 && response.data) {
                        commit(ACH_LINK_BANKACCOUNTS_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ACH_LINK_BANKACCOUNTS_ERROR, error.response)
                })
        })
    },
    [ACH_DEPOSIT_REQUEST]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            commit(ACH_DEPOSIT_REQUEST)
            HTTP({
                url: "ach/Payment",
                method: "post",
                data: {
                    "AchProviders": Number(process.env.VUE_APP_FEATURE_ACH_PROVIDER),
                    "ProviderClientId": data.BankAccountId,
                    "Amount": Number(data.Amount),
                    "SameDay": data.SameDay,
                    "FiatAccountId": Number(data.WalletId),
                    "Direct": false
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status && response.status === 200) {
                        commit(ACH_DEPOSIT_SUCCESS)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ACH_DEPOSIT_ERROR, error.response)
                })
        })
    },
    [ACH_WITHDRAW_REQUEST]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            commit(ACH_WITHDRAW_REQUEST)
            HTTP({
                url: "ach/Payment",
                method: "post",
                data: {
                    "AchProviders": Number(process.env.VUE_APP_FEATURE_ACH_PROVIDER),
                    "ProviderClientId": data.BankAccountId,
                    "Amount": Number(data.Amount),
                    "FiatAccountId": Number(data.WalletId),
                    "SameDay": data.SameDay,
                    "Direct": true
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status && response.status === 200) {
                        commit(ACH_WITHDRAW_SUCCESS)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ACH_WITHDRAW_ERROR, error.response)
                })
        })
    },

    // Cashflow
    [ACH_GET_WIDGET_REQUEST]: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            commit(ACH_GET_WIDGET_REQUEST)
            HTTP({
                url: "FollowTheFrog/widgetScript",
                method: "post",
                data: {
                    "Display": 1,
                    "CustomerData": {
                        "EmailAddress": rootState.Session.Email
                    }
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(ACH_GET_WIDGET_SUCCESS)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ACH_GET_WIDGET_ERROR, error.response)
                })
        })
    }
}

const mutations = {
    [ACH_READY_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ACH_READY_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Ready = payload
    },
    [ACH_READY_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.data && payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [ACH_BANKACCOUNTS_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ACH_BANKACCOUNTS_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.BankAccounts = payload
    },
    [ACH_BANKACCOUNTS_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.data && payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [ACH_LINK_BANKACCOUNTS_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ACH_LINK_BANKACCOUNTS_SUCCESS]: (state, payload) => {
        state.Status = "success"
        window.location.href = payload
    },
    [ACH_LINK_BANKACCOUNTS_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.data && payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [ACH_DEPOSIT_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ACH_DEPOSIT_SUCCESS]: (state) => {
        state.Status = "success"
        notify("is-success", i18n.t("Message.ACH.DepositSuccess"), 10000)
    },
    [ACH_DEPOSIT_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.data && payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [ACH_WITHDRAW_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ACH_WITHDRAW_SUCCESS]: (state) => {
        state.Status = "success"
        notify("is-success", i18n.t("Message.ACH.WithdarwSuccess"), 10000)
    },
    [ACH_WITHDRAW_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.data && payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    // Cashflow
    [ACH_GET_WIDGET_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ACH_GET_WIDGET_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [ACH_GET_WIDGET_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.data && payload.data.error)
            notify("is-danger", payload.data.error)
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
