import HTTP from "@/http"
import {
    TIER_LIST_REQUEST,
    TIER_LIST_SUCCESS,
    TIER_LIST_ERROR
} from "../actions/tier"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: "",
    List: []
}

const getters = {
    IS_TIERS_LOADED: state => !!state.List
}

const actions = {
    [TIER_LIST_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(TIER_LIST_REQUEST)
            HTTP({
                url: "tiers",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.length > 0 && response.data[0].Name) {
                        commit(TIER_LIST_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(TIER_LIST_ERROR, error)
                })
        })
    }
}

const mutations = {
    [TIER_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [TIER_LIST_SUCCESS]: (state, payload) => {
        state.List = payload
        state.Status = "success"
    },
    [TIER_LIST_ERROR]: (state, payload) => {
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