import HTTP from "@/http"
import {
    ORDER_CHANGE_SELLCURRENCY,
    ORDER_CHANGE_SELLAMOUNT,
    ORDER_CHANGE_BUYCURRENCY,
    ORDER_CHANGE_BUYAMOUNT,
    ORDER_CHANGE_DIRECTION,
    ORDER_CHANGE_ADDRESS,
    ORDER_CLEAR,
    ORDER_CALCULATE_REQUEST,
    ORDER_CALCULATE_SUCCESS,
    ORDER_CALCULATE_ERROR,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_ERROR,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_ERROR,
    ORDER_DAILYLIMIT_REQUEST,
    ORDER_DAILYLIMIT_SUCCESS,
    ORDER_DAILYLIMIT_ERROR,
    ORDER_TX_REQUEST,
    ORDER_TX_SUCCESS,
    ORDER_TX_ERROR,
    ORDER_PRESELECT_CURRENCIES
} from "../actions/order"
import { CURRENCIES_CURRENCY_DISABLE } from "../actions/currencies"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    SellCurrency: null,
    SellAmount: null,
    BuyCurrency: null,
    BuyAmount: null,
    Direction: false, //true - SellToBuy, false - BuyToSell
    Address: null,
    DailyLimit: {
        USD: {
            Limit: 0,
            Used: 0
        },
        BTC: {
            Limit: 0,
            Used: 0
        },
        ETH: {
            Limit: 0,
            Used: 0
        }
    }
}

const getters = {}

const actions = {
    [ORDER_CALCULATE_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(ORDER_CALCULATE_REQUEST)
            HTTP({
                url: "price",
                method: "post",
                data: {
                    SellCurrency: state.SellCurrency.Code,
                    SellAmount: state.SellAmount,
                    BuyCurrency: state.BuyCurrency.Code,
                    BuyAmount: state.BuyAmount,
                    Direction: state.Direction
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        if (state.Direction)
                            commit(ORDER_CHANGE_BUYAMOUNT, response.data)
                        else
                            commit(ORDER_CHANGE_SELLAMOUNT, response.data)
                        commit(ORDER_CALCULATE_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ORDER_CALCULATE_ERROR, error)
                })
        })
    },
    [ORDER_CREATE_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(ORDER_CREATE_REQUEST)
            HTTP({
                url: "orders",
                method: "post",
                data: {
                    From: state.SellCurrency.Code,
                    Price: state.SellAmount,
                    To: state.BuyCurrency.Code,
                    Address: state.Address
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.ProcessingOrderId) {
                        commit(ORDER_CREATE_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ORDER_CREATE_ERROR, error)
                })
        })
    },
    [ORDER_LIST_REQUEST]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            commit(ORDER_LIST_REQUEST)
            HTTP({
                url: "orders",
                method: "get",
                params: data
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.Items) {
                        commit(ORDER_LIST_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ORDER_LIST_ERROR, error)
                })
        })
    },
    [ORDER_DAILYLIMIT_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(ORDER_DAILYLIMIT_REQUEST)
            HTTP({
                url: "userslimit",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.usd.limit) {
                        commit(ORDER_DAILYLIMIT_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ORDER_DAILYLIMIT_ERROR, error)
                })
        })
    },
    [ORDER_TX_REQUEST]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit(ORDER_TX_REQUEST)
            HTTP({
                url: "transaction/hash",
                method: "get",
                params: {
                    id: payload
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.length > 0) {
                        commit(ORDER_TX_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(ORDER_TX_ERROR, error)
                })
        })
    },
    [ORDER_PRESELECT_CURRENCIES]: ({ commit }, payload) => {
        return new Promise(() => {
            commit(ORDER_PRESELECT_CURRENCIES, payload)
            commit(CURRENCIES_CURRENCY_DISABLE, "USD")
            commit(CURRENCIES_CURRENCY_DISABLE, "BTC")
        })
    }
}

const mutations = {
    [ORDER_CHANGE_SELLCURRENCY]: (state, payload) => {
        state.Status = "changed"
        state.SellCurrency = payload
    },
    [ORDER_CHANGE_SELLAMOUNT]: (state, payload) => {
        state.Status = "changed"
        state.SellAmount = payload
    },
    [ORDER_CHANGE_BUYCURRENCY]: (state, payload) => {
        state.Status = "changed"
        state.BuyCurrency = payload
    },
    [ORDER_CHANGE_BUYAMOUNT]: (state, payload) => {
        state.Status = "changed"
        state.BuyAmount = payload
    },
    [ORDER_CHANGE_DIRECTION]: (state, payload) => {
        state.Status = "changed"
        state.Direction = payload
    },
    [ORDER_CHANGE_ADDRESS]: (state, payload) => {
        state.Status = "changed"
        state.Address = payload
    },
    [ORDER_CLEAR]: (state) => {
        state.Status = "cleared"
        state.SellCurrency = null
        state.SellAmount = null
        state.BuyCurrency = null
        state.BuyAmount = null
        state.Direction = false
        state.Address = null
    },

    [ORDER_CALCULATE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ORDER_CALCULATE_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [ORDER_CALCULATE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [ORDER_CREATE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ORDER_CREATE_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [ORDER_CREATE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [ORDER_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ORDER_LIST_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [ORDER_LIST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [ORDER_DAILYLIMIT_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ORDER_DAILYLIMIT_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.DailyLimit.USD.Limit = parseFloat(payload.usd.limit)
        state.DailyLimit.USD.Used = parseFloat(payload.usd.used)
        state.DailyLimit.BTC.Limit = parseFloat(payload.btc.limit)
        state.DailyLimit.BTC.Used = parseFloat(payload.btc.used)
        state.DailyLimit.ETH.Limit = parseFloat(payload.eth.limit)
        state.DailyLimit.ETH.Used = parseFloat(payload.eth.used)
    },
    [ORDER_DAILYLIMIT_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [ORDER_TX_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [ORDER_TX_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [ORDER_TX_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [ORDER_PRESELECT_CURRENCIES]: (state, payload) => {
        state.Status = "preselected"
        state.SellCurrency = payload.find(obj => obj.Code === "USD")
        state.BuyCurrency = payload.find(obj => obj.Code === "BTC")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}