import HTTP from "@/http"
import i18n from "@/i18n"
import notify from "@/utils/Notification"
import {
    WALLET_CREATE_REQUEST,
    WALLET_CREATE_SUCCESS,
    WALLET_CREATE_ERROR,
    
    WALLET_LIST_REQUEST,
    WALLET_LIST_SUCCESS,
    WALLET_LIST_ERROR,
    
    WALLET_WITHDRAW_REQUEST,
    WALLET_WITHDRAW_SUCCESS,
    WALLET_WITHDRAW_ERROR,

    WALLET_DELETE_REQUEST,
    WALLET_DELETE_SUCCESS,
    WALLET_DELETE_ERROR,

    WALLETS_STAT_REQUEST,
    WALLETS_STAT_SUCCESS,
    WALLETS_STAT_ERROR,

    CHANGE_WALLET_PIN_REQUEST,
    CHANGE_WALLET_PIN_SUCCESS,
    CHANGE_WALLET_PIN_ERROR,
    
    RESET_WALLET_PIN_REQUEST,
    RESET_WALLET_PIN_SUCCESS,
    RESET_WALLET_PIN_ERROR
} from "../actions/wallet"

const state = {
    Status: "",
    List: null,
    Stat: {
        Total: 0,
        Currencies: []
    }
}

const getters = {
    IS_WALLETS_LOADED: state => {
        if (state.List && state.List.length > 0)
            return true
        else
            return false
    }
}

const actions = {
    [WALLET_CREATE_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(WALLET_CREATE_REQUEST)
            HTTP({
                url: "wallets",
                method: "post",
                data: payload
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status === 201)
                        commit(WALLET_CREATE_SUCCESS, response.data)
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(WALLET_CREATE_ERROR, error)
                })
        })
    },
    [WALLET_LIST_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(WALLET_LIST_REQUEST)
            HTTP({
                url: "wallets",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(WALLET_LIST_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(WALLET_LIST_ERROR, error)
                })
        })
    },
    [WALLET_WITHDRAW_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(WALLET_WITHDRAW_REQUEST)
            HTTP({
                url: "paycrypto",
                method: "post",
                data: payload
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(WALLET_WITHDRAW_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(WALLET_WITHDRAW_ERROR, error)
                })
        })
    },
    [WALLET_DELETE_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(WALLET_DELETE_REQUEST)
            HTTP({
                url: "wallets/"+payload,
                method: "delete"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(WALLET_DELETE_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(WALLET_DELETE_ERROR, error)
                })
        })
    },
    [WALLETS_STAT_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(WALLETS_STAT_REQUEST)
            HTTP({
                url: "WalletsStat",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(WALLETS_STAT_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(WALLETS_STAT_ERROR, error)
                })
        })
    },
    [CHANGE_WALLET_PIN_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(CHANGE_WALLET_PIN_REQUEST)
            HTTP({
                url: "Wallets/pinCode/" + payload,
                method: "post"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.expirationUtcDate) {
                        commit(CHANGE_WALLET_PIN_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(CHANGE_WALLET_PIN_ERROR, error)
                })
        })
    },
    [RESET_WALLET_PIN_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(RESET_WALLET_PIN_REQUEST)
            HTTP({
                url: "Wallets/recovery/" + payload.WalletId,
                method: "post",
                data: {
                    Password: payload.Pin,
                    PIN: payload.Code
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status && response.status === 200) {
                        commit(RESET_WALLET_PIN_SUCCESS)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(RESET_WALLET_PIN_ERROR, error)
                })
        })
    }
}

const mutations = {
    [WALLET_CREATE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [WALLET_CREATE_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [WALLET_CREATE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [WALLET_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [WALLET_LIST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload)
            state.List = payload
    },
    [WALLET_LIST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [WALLET_WITHDRAW_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [WALLET_WITHDRAW_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [WALLET_WITHDRAW_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [WALLET_DELETE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [WALLET_DELETE_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [WALLET_DELETE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [WALLETS_STAT_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [WALLETS_STAT_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload && payload[0] && payload[0].name) {
            state.Stat.Currencies = payload
            state.Stat.Total = 0
            state.Stat.Currencies.forEach(element => {
                state.Stat.Total += parseFloat(element.data)
            })
        }
    },
    [WALLETS_STAT_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [CHANGE_WALLET_PIN_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [CHANGE_WALLET_PIN_SUCCESS]: (state) => {
        state.Status = "success"
        // if (payload && payload.expirationUtcDate) {
        //     let Remaining = new Date(payload.expirationUtcDate)
        //     let TimeDiff = Math.round((new Date() - Remaining)/(1000*60*60*24))
        //     notify("is-info", TimeDiff.toString())
        // }
    },
    [CHANGE_WALLET_PIN_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [RESET_WALLET_PIN_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [RESET_WALLET_PIN_SUCCESS]: (state) => {
        state.Status = "success"
        notify("is-success", i18n.t("Message.Wallet.Reset.Success"))
    },
    [RESET_WALLET_PIN_ERROR]: (state, payload) => {
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