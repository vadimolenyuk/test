import HTTP from "@/http"
import i18n from "@/i18n"
import notify from "@/utils/Notification"
import {
    FIAT_WALLET_CREATE_REQUEST,
    FIAT_WALLET_CREATE_SUCCESS,
    FIAT_WALLET_CREATE_ERROR,

    FIAT_WALLET_LIST_REQUEST,
    FIAT_WALLET_LIST_SUCCESS,
    FIAT_WALLET_LIST_ERROR,

    FIAT_WALLET_PAY_REQUEST,
    FIAT_WALLET_PAY_SUCCESS,
    FIAT_WALLET_PAY_ERROR,

    FIAT_WALLET_DEPOSIT_REQUEST,
    FIAT_WALLET_DEPOSIT_SUCCESS,
    FIAT_WALLET_DEPOSIT_ERROR,

    FIAT_WALLET_DELETE_REQUEST,
    FIAT_WALLET_DELETE_SUCCESS,
    FIAT_WALLET_DELETE_ERROR
} from "../actions/fiatwallet"

const state = {
    Status: "",
    List: null,
    DepositOrderID: null
}

const getters = {
    IS_FIAT_WALLETS_LOADED: state => {
        if (state.List && state.List.length > 0)
            return true
        else
            return false
    }
}

const actions = {
    [FIAT_WALLET_CREATE_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(FIAT_WALLET_CREATE_REQUEST)
            HTTP({
                url: "fiataccounts",
                method: "post",
                data: payload
            })
                .then(response => {
                    resolve(response)
                    if (response && response.status === 201)
                        commit(FIAT_WALLET_CREATE_SUCCESS, response.data)
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(FIAT_WALLET_CREATE_ERROR, error)
                })
        })
    },
    [FIAT_WALLET_LIST_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(FIAT_WALLET_LIST_REQUEST)
            HTTP({
                url: "fiataccounts",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(FIAT_WALLET_LIST_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(FIAT_WALLET_LIST_ERROR, error)
                })
        })
    },
    [FIAT_WALLET_DELETE_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(FIAT_WALLET_DELETE_REQUEST)
            HTTP({
                url: "fiataccounts/"+payload,
                method: "delete"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(FIAT_WALLET_DELETE_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(FIAT_WALLET_DELETE_ERROR, error)
                })
        })
    },
    [FIAT_WALLET_PAY_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(FIAT_WALLET_PAY_REQUEST)
            HTTP({
                url: "payfiat",
                data: payload,
                method: "post"
            })
                .then(response => {
                    resolve(response)
                    if (response) {
                        commit(FIAT_WALLET_PAY_SUCCESS)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(FIAT_WALLET_PAY_ERROR, error)
                })
        })
    },
    [FIAT_WALLET_DEPOSIT_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(FIAT_WALLET_DEPOSIT_REQUEST)
            HTTP({
                url: "deposit/createorder",
                method: "post",
                data: {
                    "Amount": payload.Amount,
                    "FiatAccountId": payload.WalletId
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.Id)
                        commit(FIAT_WALLET_DEPOSIT_SUCCESS, response.data)
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(FIAT_WALLET_DEPOSIT_ERROR, error)
                })
        })
    }
}

const mutations = {
    [FIAT_WALLET_CREATE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [FIAT_WALLET_CREATE_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [FIAT_WALLET_CREATE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [FIAT_WALLET_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [FIAT_WALLET_LIST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload)
            state.List = payload
    },
    [FIAT_WALLET_LIST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [FIAT_WALLET_DELETE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [FIAT_WALLET_DELETE_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [FIAT_WALLET_DELETE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [FIAT_WALLET_PAY_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [FIAT_WALLET_PAY_SUCCESS]: (state) => {
        state.Status = "success"
        notify("is-success", i18n.t("Message.Order.FiatWallet.PaySuccess"))
    },
    [FIAT_WALLET_PAY_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },

    [FIAT_WALLET_DEPOSIT_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [FIAT_WALLET_DEPOSIT_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload && payload.Id) {
            state.DepositOrderID = payload.Id
        }
    },
    [FIAT_WALLET_DEPOSIT_ERROR]: (state, payload) => {
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