import HTTP from "@/http"
import {
    SESSION_REQUEST,
    SESSION_ERROR,
    SESSION_SUCCESS,
    SESSION_PHONE_VERIFIED,
    SESSION_LOGOUT
} from "../actions/session"
import notify from "@/utils/Notification"
import { LOGIN_LOGOUT } from "../actions/login"
import i18n from "@/i18n"

const state = {
    Status: "",
    Id: null,
    Name: null,
    Email: null,
    Phone: null,
    DenyAccess: false,
    IsPhoneVerified: false,
    IsEmailConfirmed: false,
    DateTime: null
}

const getters = {
    IS_SESSION_READY: state => !!state.Id && !!state.Email && !!state.Phone && !!state.Name,
    IS_EMAIL_CONFIRMED: state => state.IsEmailConfirmed,
    IS_PHONE_VERIFIED: state => state.IsPhoneVerified
}

const actions = {
    [SESSION_REQUEST]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(SESSION_REQUEST)
            HTTP({
                url: process.env.VUE_APP_API_AUTH_URL + "profile",
                method: "get"
            })
                .then(response => {
                    resolve(response)
                    if (response && response.data && response.data.Id) {
                        commit(SESSION_SUCCESS, response.data)
                    }
                    else
                        notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(SESSION_ERROR, error)
                    dispatch(LOGIN_LOGOUT)
                })
        })
    }
}

const mutations = {
    [SESSION_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [SESSION_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Id = payload.Id
        state.Name = payload.Name
        state.Email = payload.Email
        state.Phone = payload.Phone
        state.DenyAccess = payload.DenyAccess
        state.IsEmailConfirmed = payload.IsEmailConfirmed
        state.IsPhoneVerified = payload.IsPhoneVerified
        state.DateTime = payload.DateTime
        // Для контактной формы Zendesk
        window.ZendeskName = payload.Name
        window.ZendeskEmail = payload.Email
    },
    [SESSION_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            notify("is-danger", payload.response.data.error)
        else
            notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [SESSION_LOGOUT]: (state) => {
        state.Status = ""
        state.Id = null
        state.Name = null
        state.Email = null
        state.Phone = null
        state.DenyAccess = false
        state.IsPhoneVerified = false
        state.IsEmailConfirmed = false
        state.DateTime = null
    },
    [SESSION_PHONE_VERIFIED]: (state, payload) => {
        state.IsPhoneVerified = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}