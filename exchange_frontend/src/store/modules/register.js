import HTTP from "@/http"
import router from "@/router"
import {
    REGISTER_REQUEST,
    REGISTER_ERROR,
    REGISTER_SUCCESS
} from "../actions/register"
import { LOGIN_REQUEST } from "../actions/login"
import notify from "@/utils/Notification"
import i18n from "@/i18n"

const state = {
    Status: ""
}

const getters = {
}

const actions = {
    [REGISTER_REQUEST]: ({ commit, dispatch, rootState }, user) => {
        return new Promise((resolve, reject) => {
            commit(REGISTER_REQUEST)
            HTTP({
                url: process.env.VUE_APP_API_AUTH_URL + "account/register",
                data: user,
                method: "post"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.Id) {
                        commit(REGISTER_SUCCESS, response.data)
                        let LoginObject = { Login: user.Email, Password: user.Password }
                        dispatch(LOGIN_REQUEST, LoginObject)
                            .then(() => {
                                if (!rootState.Session.IsPhoneVerified)
                                    router.push({ name: "Verify" })
                                else
                                    router.push({ name: "Dashboard" })
                            })
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(REGISTER_ERROR, error)
                })
        })
    }
}

const mutations = {
    [REGISTER_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [REGISTER_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [REGISTER_ERROR]: (state, payload) => {
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