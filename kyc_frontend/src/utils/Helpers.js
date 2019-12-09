import { Toast } from "buefy/dist/components/toast"

const Helpers = {

    notify: function (type, message, duration, position) {
        Toast.open({
            duration: (duration) ? duration : 5000,
            message: (message && message.length) ? message : "",
            position: (position) ? position : "is-bottom",
            type: (type && type.length) ? type : "is-dark"
        })
    },

    redirectToAuthApp: function (mode, backURL) {
        if (mode) {
            let AuthApp = process.env.VUE_APP_AUTHAPP_URL
            let AppId = 7
            window.location.href = (backURL) ? `${AuthApp}?AppId=${AppId}&Mode=${mode}&Redirect=${backURL}` : `${AuthApp}?AppId=${AppId}&Mode=${mode}`
        }
    }
}

export default Helpers
