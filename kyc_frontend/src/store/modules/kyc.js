import {
    KYC_GET_ERROR,
    KYC_SAVE_ERROR,
    KYC_SAVE_SUCCESS
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: ""
}

const mutations = {
    [KYC_GET_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            Helpers.notify("is-danger", payload.response.data.error)
        else
            Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [KYC_SAVE_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.error)
            Helpers.notify("is-danger", payload.response.data.error)
        else
            Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [KYC_SAVE_SUCCESS]: (state) => {
        state.Status = "success"
        Helpers.notify("is-success", i18n.t("Message.KYC.General.SaveSuccess"))
    }
}

export default {
    state,
    mutations
}