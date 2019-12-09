import HTTP from "@/http"
import Helpers from "@/utils/Helpers"
import {
    COUNTRIES_REQUEST,
    COUNTRIES_ERROR,
    COUNTRIES_SUCCESS,
    STATES_REQUEST,
    STATES_ERROR,
    STATES_SUCCESS
} from "../actions/country"
import i18n from "@/i18n"

const state = {
    ListCountries: null,
    ListStates: null
}

const getters = {
    IS_COUNTRIES_LOADED: state => !!state.ListCountries,
    IS_STATES_LOADED: state => !!state.ListCountries
}

const actions = {
    [COUNTRIES_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(COUNTRIES_REQUEST)
            HTTP({
                url: "country",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data[0].code && response.data[0].name) {
                        commit(COUNTRIES_SUCCESS, response.data)
                    }
                    else
                        Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(COUNTRIES_ERROR, error)
                })
        })
    },
    [STATES_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(STATES_REQUEST)
            HTTP({
                url: "usstate",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data[0].code && response.data[0].name) {
                        commit(STATES_SUCCESS, response.data)
                    }
                    else
                        Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(STATES_ERROR, error)
                })
        })
    }
}

const mutations = {
    [COUNTRIES_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [COUNTRIES_SUCCESS]: (state, payload) => {
        state.Status = "success"

        // Move USA to the first place
        let USA = {
            name: "United States", 
            code: "us"
        }
        if (payload.some(e => e.code === "us")) { // If USA object exist
            let USAPlace = payload.findIndex(e => e.code === "us") // Find USA object index
            payload.splice(USAPlace, 1) // Delete USA object
            payload.unshift(USA) // Put USA object to the start
            state.ListCountries = payload
        }
        else
            state.ListCountries = payload
    },
    [COUNTRIES_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            Helpers.notify("is-danger", payload.response.data.error)
        else
            Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [STATES_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [STATES_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.ListStates = payload
    },
    [STATES_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            Helpers.notify("is-danger", payload.response.data.error)
        else
            Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}