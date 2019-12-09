import { ToastProgrammatic as Toast } from "buefy"

export default function (type, message, duration) {
    Toast.open({
        duration: (duration) ? duration : 5000,
        message: (message && message.length) ? message : "",
        position: "is-bottom",
        type: (type && type.length) ? type : "is-dark"
    })
}