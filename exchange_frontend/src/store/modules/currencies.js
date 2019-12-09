import HTTP from "@/http"
import {
    CURRENCIES_LIST_REQUEST,
    CURRENCIES_LIST_SUCCESS,
    CURRENCIES_LIST_ERROR,
    CURRENCIES_CURRENCY_DISABLE,
    CURRENCIES_ALL_ENABLE,
    CURRENCIES_LOCALORDER_RESTORE
} from "../actions/currencies"
import { ORDER_PRESELECT_CURRENCIES } from "../actions/order"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    List: null
}

const getters = {
    IS_CURRENCIES_LIST_LOADED: state => !!state.List
}

const actions = {
    [CURRENCIES_LIST_REQUEST]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(CURRENCIES_LIST_REQUEST)
            HTTP({
                url: "currencylist",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response.data) {
                        commit(CURRENCIES_LIST_SUCCESS, response.data)
                        dispatch(ORDER_PRESELECT_CURRENCIES, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    commit(CURRENCIES_LIST_ERROR, error.response)
                    reject(error)
                })
        })
    },
    [CURRENCIES_LOCALORDER_RESTORE]: ({ commit }) => {
        return new Promise(() => {
            var LocalOrder = JSON.parse(localStorage.getItem("Order"))
            commit(CURRENCIES_CURRENCY_DISABLE, LocalOrder.SellCurrency.Code)
            commit(CURRENCIES_CURRENCY_DISABLE, LocalOrder.BuyCurrency.Code)
            commit(CURRENCIES_LOCALORDER_RESTORE)
        })
    }
}

const mutations = {
    [CURRENCIES_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [CURRENCIES_LIST_SUCCESS]: (state, payload) => {
        state.Status = "success",
        state.List = payload
    },
    [CURRENCIES_LIST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload.data.error)
            notify("is-danger", payload.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [CURRENCIES_CURRENCY_DISABLE]: (state, Code) => {
        state.List.find(obj => obj.Code === Code).$isDisabled = true
    },
    [CURRENCIES_ALL_ENABLE]: (state) => {
        if (state.List)
            state.List.map(obj => obj.$isDisabled = false)
    },
    [CURRENCIES_LOCALORDER_RESTORE]: (state) => {
        state.Status = "restored"
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}