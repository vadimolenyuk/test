import HTTP from "@/http"
import {
    KYC_CHANGE_ADDRESSCOUNTRY,
    KYC_CHANGE_REGION,
    KYC_CHANGE_ZIPCODE,
    KYC_CHANGE_CITY,
    KYC_CHANGE_STREET,

    KYC_GET_ADDRESS_REQUEST,
    KYC_GET_ADDRESS_SUCCESS,
    KYC_SAVE_ADDRESS_REQUEST,

    KYC_GET_ERROR,
    KYC_SAVE_ERROR,
    KYC_SAVE_SUCCESS
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    Id: null,
    Country: null,
    Region: null,
    ZipCode: null,
    City: null,
    Street: null
}

const getters = {
    KYC_ADDRESS_COMPLETE: state => {
        let count = 0
        for (let i in state) {
            if (i === "Status" || i === "Id") 
                continue
            if (!state.hasOwnProperty(i) || 
                (state.hasOwnProperty(i) && (state[i] === null || state[i] === undefined || state[i] === ""))
            ) {
                count++
            }
        }
        return count === 0
    }
}

const actions = {
    [KYC_GET_ADDRESS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_ADDRESS_REQUEST)
            HTTP({
                url: "useraddress",
                method: "get"
            })
                .then(response => {
                    if (response && response.data) {
                        resolve(response.data)
                        commit(KYC_GET_ADDRESS_SUCCESS, response.data)
                    }
                    else if (response)
                        resolve(response)
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_GET_ERROR, error)
                })
        })
    },
    [KYC_SAVE_ADDRESS_REQUEST]: ({ commit }) => {
        let HttpMethod = (state.Id) ? "put" : "post"
        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_ADDRESS_REQUEST)
            HTTP({
                url: "useraddress",
                data: {
                    Id: state.Id,
                    Country: state.Country,
                    Region: state.Region,
                    ZipCode: state.ZipCode,
                    City: state.City,
                    Street: state.Street
                },
                method: HttpMethod
            })
                .then(response => {
                    if (response && response.data && response.data.Id) {
                        resolve(response)
                        commit(KYC_SAVE_SUCCESS)
                    }
                    else Helpers.notify("is-danger", i18n.t("Message.Backend.NoData"))
                })
                .catch(error => {
                    reject(error)
                    commit(KYC_SAVE_ERROR, error)
                })
        })
    }
}

const mutations = {
    [KYC_CHANGE_ADDRESSCOUNTRY]: (state, payload) => state.Country = payload,
    [KYC_CHANGE_REGION]: (state, payload) => state.Region = payload,
    [KYC_CHANGE_ZIPCODE]: (state, payload) => state.ZipCode = payload,
    [KYC_CHANGE_CITY]: (state, payload) => state.City = payload,
    [KYC_CHANGE_STREET]: (state, payload) => state.Street = payload,

    [KYC_GET_ADDRESS_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_ADDRESS_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Id = payload.Id
        state.Country = payload.Country
        state.Region = payload.Region
        state.ZipCode = payload.ZipCode
        state.City = payload.City
        state.Street = payload.Street
    },
    [KYC_SAVE_ADDRESS_REQUEST]: (state) => state.Status = "saving"
}

export default {
    state,
    getters,
    actions,
    mutations
}