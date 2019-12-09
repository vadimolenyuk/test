import { 
    APPDB_SET_ID,
    APPDB_SET_SUCCESS,
    APPDB_SET_ERROR,
    APPDB_UNSET_ID
} from "../actions/appdb"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    ID: (window.$cookies.isKey("AppID")) ? window.$cookies.get("AppID").ID : null
}

const getters = {
    IS_APPID_SET: state => !!state.ID
}

const actions = {
    [APPDB_SET_ID]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            if (payload) {
                resolve(payload)
                commit(APPDB_SET_SUCCESS, payload)
            }
            else {
                reject(payload)
                commit(APPDB_SET_ERROR)
            }
        })
    }
}


const mutations = {
    [APPDB_SET_ID]: () => {
        state.Status = "setting"
    },
    [APPDB_SET_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.ID = payload
        window.$cookies.set("AppID", JSON.stringify(state), new Date().setDate(new Date().getHours() + 8).toString())
    },
    [APPDB_SET_ERROR]: () => {
        state.Status = "error"
        Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
    },
    [APPDB_UNSET_ID]: (state) => {
        state.Status = "clear"
        state.ID = null
        window.$cookies.remove("AppID")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}