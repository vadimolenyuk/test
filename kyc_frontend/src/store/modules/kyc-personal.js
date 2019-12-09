import HTTP from "@/http"
import {
    KYC_CHANGE_FIRSTNAME,
    KYC_CHANGE_MIDDLENAME,
    KYC_CHANGE_LASTNAME,
    KYC_CHANGE_GENDER,
    KYC_CHANGE_BIRTHDATE,
    KYC_CHANGE_BIRTHPLACE,

    KYC_GET_PERSONAL_REQUEST,
    KYC_GET_PERSONAL_SUCCESS,
    KYC_SAVE_PERSONAL_REQUEST,

    KYC_GET_ERROR,
    KYC_SAVE_ERROR,
    KYC_SAVE_SUCCESS
} from "../actions/kyc"
import Helpers from "@/utils/Helpers"
import i18n from "@/i18n"

const state = {
    Status: "",
    Id: null,
    FirstName: null,
    MiddleName: null,
    LastName: null,
    Gender: null,
    BirthDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
    BirthPlace: null
}

const getters = {
    KYC_PERSONAL_COMPLETE: state => {
        let count = 0
        for (let i in state) {
            if (i === "Status" || i === "Id" || i === "MiddleName") 
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
    [KYC_GET_PERSONAL_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(KYC_GET_PERSONAL_REQUEST)
            HTTP({
                url: "person",
                method: "get"
            })
                .then(response => {
                    if (response && response.data) {
                        resolve(response.data)
                        commit(KYC_GET_PERSONAL_SUCCESS, response.data)
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
    [KYC_SAVE_PERSONAL_REQUEST]: ({ commit }) => {
        let HttpMethod = (state.Id) ? "put" : "post"
        return new Promise((resolve, reject) => {
            commit(KYC_SAVE_PERSONAL_REQUEST)
            HTTP({
                url: "person",
                data: {
                    Id: state.Id,
                    FirstName: state.FirstName,
                    MiddleName: state.MiddleName,
                    LastName: state.LastName,
                    Gender: (state.Gender === "true"),
                    BirthDate: state.BirthDate.toLocaleDateString("en-US"),
                    BirthPlace: state.BirthPlace
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
    [KYC_CHANGE_FIRSTNAME]: (state, payload) => state.FirstName = payload,
    [KYC_CHANGE_MIDDLENAME]: (state, payload) => state.MiddleName = payload,
    [KYC_CHANGE_LASTNAME]: (state, payload) => state.LastName = payload,
    [KYC_CHANGE_GENDER]: (state, payload) => state.Gender = payload,
    [KYC_CHANGE_BIRTHDATE]: (state, payload) => state.BirthDate = payload,
    [KYC_CHANGE_BIRTHPLACE]: (state, payload) => state.BirthPlace = payload,

    [KYC_GET_PERSONAL_REQUEST]: (state) => state.Status = "getting",
    [KYC_GET_PERSONAL_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Id = payload.Id
        state.FirstName = payload.FirstName
        state.MiddleName = payload.MiddleName
        state.LastName = payload.LastName
        state.Gender = payload.Gender.toString()
        state.BirthDate = new Date(payload.BirthDate)
        state.BirthPlace = payload.BirthPlace
    },
    [KYC_SAVE_PERSONAL_REQUEST]: (state) => state.Status = "saving"
}

export default {
    state,
    getters,
    actions,
    mutations
}