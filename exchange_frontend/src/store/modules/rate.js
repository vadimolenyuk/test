
import i18n from "@/i18n"
import HTTP from "@/http"
import notify from "@/utils/Notification"
import {
    RATE_REQUEST,
    RATE_SUCCESS,
    RATE_ERROR
} from "../actions/rate"

const state = {
    Status: "",
    Rates: {
        "BTCUSD": 0,
        "BTCEUR": 0,
        "ETHUSD": 0,
        "ETHEUR": 0
    }
}

const getters = {
    GET_RATE: state => CurrencyPair => {
        if (state.Rates && CurrencyPair && state.Rates[CurrencyPair])
            return state.Rates[CurrencyPair]
        else return 0
    }
}

const actions = {
    [RATE_REQUEST]: ({ commit }, { SellCurrency, BuyCurrency }) => {
        return new Promise((resolve, reject) => {
            commit(RATE_REQUEST)
            HTTP({
                url: "price",
                method: "post",
                data: {
                    SellCurrency: SellCurrency,
                    SellAmount: 1,
                    BuyCurrency: BuyCurrency,
                    BuyAmount: null,
                    Direction: true
                }
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data) {
                        commit(RATE_SUCCESS, { 
                            SellCurrency: SellCurrency, 
                            BuyCurrency: BuyCurrency, 
                            Rate: response.data
                        })
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(RATE_ERROR, error)
                })
        })
    }
}

const mutations = {
    [RATE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [RATE_SUCCESS]: (state, payload) => {
        if (payload && payload.SellCurrency && payload.BuyCurrency && payload.Rate && payload.Rate > 0) {
            let CurrencyPair = String(payload.SellCurrency) + String(payload.BuyCurrency)
            state.Rates[CurrencyPair] = payload.Rate.toFixed(2)
        }
        state.Status = "success"
    },
    [RATE_ERROR]: (state, payload) => {
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