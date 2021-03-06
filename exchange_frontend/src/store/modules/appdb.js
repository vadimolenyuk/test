import { APPDB_GET_ID } from "../actions/appdb"

const state = [
    {
        "Id": "USA",
        "Settings": {
            "Logo": "/img/usa/logo.svg",
            "Favicon": "/img/usa/favicon.ico",
            "WebFont": "https://fonts.googleapis.com/css?family=Exo+2:300,400,500,600,700",
            "CSSC": [
                "is-bitcoinalley"
            ],
            "CSSCP": [
                // { "Name": "--color-text", "Value": "#8C857D" },
                // { "Name": "--color-text-dark", "Value": "#73695E" },
                // { "Name": "--color-text-darker", "Value": "#504941" },

                // { "Name": "--color-success", "Value": "#4caf50" },
                // { "Name": "--color-warning", "Value": "#ffc400" },
                // { "Name": "--color-danger", "Value": "#d32f2f" },
                // { "Name": "--color-info", "Value": "#1565c0" },

                // { "Name": "--color-theme-light", "Value": "#ece9e6" },
                // { "Name": "--color-theme", "Value": "#c2b4a4" },
                // { "Name": "--color-theme-dark", "Value": "#B2A08C" },
                // { "Name": "--color-theme-alt", "Value": "#aea090" },

                // { "Name": "--body-background-color", "Value": "#f8f8f8" },
                // { "Name": "--footer-background-color", "Value": "#eee9e6" },
                // { "Name": "--input-border-color", "Value": "#cfcfcf" },
                // { "Name": "--box-background-color", "Value": "#fcfcfc" },
                // { "Name": "--card-background-color", "Value": "#ffffff" },
                // { "Name": "--table-background-color", "Value": "#efefef" },

                // { "Name": "--border-radius", "Value": "4px" },
                // { "Name": "--shadow1", "Value": "3px 3px 10px 2px rgba(0, 0, 0, 0.1)" },
                { "Name": "--font-main", "Value": "'Exo 2'" }
            ]
        }
    },
    {
        "Id": "EU",
        "Settings": {
            "Logo": "/img/eu/logo.svg",
            "Favicon": "/img/eu/favicon.ico",
            "WebFont": "https://fonts.googleapis.com/css?family=Lato:300,400,500,600,700",
            "CSSC": [
                "is-gotocrypto"
            ],
            "CSSCP": [
                { "Name": "--color-text", "Value": "#928482" },
                { "Name": "--color-text-dark", "Value": "#694943" },
                { "Name": "--color-text-darker", "Value": "#382623" },

                // { "Name": "--color-success", "Value": "#4caf50" },
                // { "Name": "--color-warning", "Value": "#ffc400" },
                // { "Name": "--color-danger", "Value": "#d32f2f" },
                // { "Name": "--color-info", "Value": "#1565c0" },

                { "Name": "--color-theme-light", "Value": "#ffb870" },
                { "Name": "--color-theme", "Value": "#F29130" },
                { "Name": "--color-theme-dark", "Value": "#F56A20" },
                { "Name": "--color-theme-alt", "Value": "#ff6d00" },

                // { "Name": "--body-background-color", "Value": "#f8f8f8" },
                // { "Name": "--footer-background-color", "Value": "#eee9e6" },
                // { "Name": "--input-border-color", "Value": "#cfcfcf" },
                // { "Name": "--box-background-color", "Value": "#fcfcfc" },
                // { "Name": "--card-background-color", "Value": "#ffffff" },
                // { "Name": "--table-background-color", "Value": "#efefef" },

                { "Name": "--border-radius", "Value": "6px" },
                // { "Name": "--shadow1", "Value": "3px 3px 10px 2px rgba(0, 0, 0, 0.1)" },
                { "Name": "--font-main", "Value": "'Lato'" }
            ]
        }
    }
]

const actions = {
    [APPDB_GET_ID]: ({ commit }, ID) => {
        return new Promise((resolve) => {
            if (ID && typeof(ID) === "string") {
                commit(APPDB_GET_ID)
                let SearchObj = state.find(x => x.Id === ID)
                resolve(SearchObj)
            }
            else    
                return null
        })
    }
}

const mutations = {
    [APPDB_GET_ID]: () => {}
}

export default {
    state,
    actions,
    mutations
}