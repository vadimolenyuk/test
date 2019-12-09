import { APPDB_GET_ID } from "../actions/appdb"

const state = [
    {
        "Id": "1",
        "Name": "Bitcoin Alley",
        "URL": process.env.VUE_APP_GETCRYPTO24_URL,
        "AuthURL": process.env.VUE_APP_GETCRYPTO24_URL,
        "Settings": {
            "CSSC": [
                "is-getcrypto"
            ],
            "CSSCP": [
                { "Name": "--color-text", "Value": "#8C857D" },
                { "Name": "--color-text-dark", "Value": "#73695E" },
                { "Name": "--color-text-darker", "Value": "#504941" },

                { "Name": "--color-success", "Value": "#4caf50" },
                { "Name": "--color-warning", "Value": "#ffc400" },
                { "Name": "--color-danger", "Value": "#d32f2f" },
                { "Name": "--color-info", "Value": "#1565c0" },

                { "Name": "--color-theme-light", "Value": "#ece9e6" },
                { "Name": "--color-theme", "Value": "#c2b4a4" },
                { "Name": "--color-theme-dark", "Value": "#B2A08C" },
                { "Name": "--color-theme-darker", "Value": "#B2A08C" },
                { "Name": "--color-theme-darkest", "Value": "#B2A08C" },
                { "Name": "--color-theme-alt", "Value": "#aea090" },

                { "Name": "--body-background-color", "Value": "#f8f8f8" },
                { "Name": "--footer-background-color", "Value": "#eee9e6" },
                { "Name": "--input-border-color", "Value": "#cfcfcf" },
                { "Name": "--box-background-color", "Value": "#fcfcfc" },
                { "Name": "--card-background-color", "Value": "#ffffff" },
                { "Name": "--table-background-color", "Value": "#efefef" },

                { "Name": "--border-radius", "Value": "4px" },
                { "Name": "--shadow1", "Value": "3px 3px 10px 2px rgba(0, 0, 0, 0.1)" },
                { "Name": "--font-main", "Value": "'Exo 2'" }
            ],
            "Logo": process.env.VUE_APP_GETCRYPTO24_URL + "img/usa/logo.svg",
            "Favicon": process.env.VUE_APP_GETCRYPTO24_URL + "favicon.ico",
            "WebFont": "https://fonts.googleapis.com/css?family=Exo+2:300,400,500,600,700"
        }
    },
    {
        "Id": "2",
        "Name": "GoToCrowd",
        "URL": process.env.VUE_APP_GOTOCROWD_URL,
        "AuthURL": process.env.VUE_APP_GOTOCROWD_URL + "auth/token",
        "Settings": {
            "CSSCP": [
                { "Name": "--color-text", "Value": "#352e5c" },
                { "Name": "--color-text-dark", "Value": "#4f4f4f" },
                { "Name": "--color-text-darker", "Value": "#828282" },

                { "Name": "--color-theme-light", "Value": "#ece9e6" },
                { "Name": "--color-theme", "Value": "#405ba0" },
                { "Name": "--color-theme-dark", "Value": "#405ba0" },
                { "Name": "--color-theme-darker", "Value": "#405ba0" },
                { "Name": "--color-theme-darkest", "Value": "#405ba0" },
                { "Name": "--color-theme-alt", "Value": "#405ba0" },

                { "Name": "--body-background-color", "Value": "#f8f8f8" },
                { "Name": "--footer-background-color", "Value": "#f8f8f8" },
                { "Name": "--input-border-color", "Value": "#e0e0e0" },
                { "Name": "--box-background-color", "Value": "#ffffff" },
                { "Name": "--card-background-color", "Value": "#ffffff" },
                { "Name": "--table-background-color", "Value": "#ffffff" },

                { "Name": "--border-radius", "Value": "24px" },
                { "Name": "--shadow1", "Value": "none" },
                { "Name": "--font-main", "Value": "'Montserrat'" }
            ],
            "Logo": process.env.VUE_APP_GOTOCROWD_URL + "icon/logo.png",
            "Favicon": process.env.VUE_APP_GOTOCROWD_URL + "favicon.ico",
            "WebFont": "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700"
        }
    },
    {
        "Id": "3",
        "Name": "GetCrypto24 Admin App",
        "URL": process.env.VUE_APP_GETCRYPTO24_ADMIN_URL,
        "AuthURL": process.env.VUE_APP_GETCRYPTO24_ADMIN_URL + "sso",
        "Settings": {
            "CSSC": [
                "is-getcrypto"
            ],
            "CSSCP": [
                { "Name": "--color-text", "Value": "#8C857D" },
                { "Name": "--color-text-dark", "Value": "#73695E" },
                { "Name": "--color-text-darker", "Value": "#504941" },

                { "Name": "--color-success", "Value": "#4caf50" },
                { "Name": "--color-warning", "Value": "#ffc400" },
                { "Name": "--color-danger", "Value": "#d32f2f" },
                { "Name": "--color-info", "Value": "#1565c0" },

                { "Name": "--color-theme-light", "Value": "#ece9e6" },
                { "Name": "--color-theme", "Value": "#c2b4a4" },
                { "Name": "--color-theme-dark", "Value": "#B2A08C" },
                { "Name": "--color-theme-darker", "Value": "#B2A08C" },
                { "Name": "--color-theme-darkest", "Value": "#B2A08C" },
                { "Name": "--color-theme-alt", "Value": "#aea090" },

                { "Name": "--body-background-color", "Value": "#f8f8f8" },
                { "Name": "--footer-background-color", "Value": "#eee9e6" },
                { "Name": "--input-border-color", "Value": "#cfcfcf" },
                { "Name": "--box-background-color", "Value": "#fcfcfc" },
                { "Name": "--card-background-color", "Value": "#ffffff" },
                { "Name": "--table-background-color", "Value": "#efefef" },

                { "Name": "--border-radius", "Value": "4px" },
                { "Name": "--shadow1", "Value": "3px 3px 10px 2px rgba(0, 0, 0, 0.1)" },
                { "Name": "--font-main", "Value": "'Exo 2'" }
            ],
            "Logo": process.env.VUE_APP_GETCRYPTO24_URL + "img/logo.svg",
            "Favicon": process.env.VUE_APP_GETCRYPTO24_URL + "favicon.ico",
            "WebFont": "https://fonts.googleapis.com/css?family=Exo+2:300,400,500,600,700"
        }
    },
    {   "Id": "4",
        "Name": "User's Admin",
        "URL": process.env.VUE_APP_AUTH_ADMIN_URL,
        "AuthURL": process.env.VUE_APP_AUTH_ADMIN_URL + "sso"
    },
    {   "Id": "5",
        "Name": "Merchant's Admin",
        "URL": process.env.VUE_APP_MERCHANT_ADMIN_URL,
        "AuthURL": process.env.VUE_APP_MERCHANT_ADMIN_URL + "sso"
    },
    {   "Id": "6",
        "Name": "Merchant's Admin (Weedpay)",
        "URL": process.env.VUE_APP_MERCHANT_WEEDPAY_ADMIN_URL,
        "AuthURL": process.env.VUE_APP_MERCHANT_WEEDPAY_ADMIN_URL + "sso"
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