import "./registerServiceWorker"
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

//Layout & Styles
import Default from "./layouts/Default.vue"
import Auth from "./layouts/Auth.vue"
import Guest from "./layouts/Guest.vue"
Vue.component("default-layout", Default)
Vue.component("auth-layout", Auth)
Vue.component("guest-layout", Guest)
import "buefy/dist/buefy.css"
import "./styles.scss"

//Vendors
import Buefy from "buefy"
import VeeValidateExtend from "./utils/VeeValidateExtend"
import VueCookies from "vue-cookies"
import VueQriously from "vue-qriously"
import VueMeta from "vue-meta"
import i18n from "./i18n"
Vue.use(Buefy)
Vue.use(VeeValidateExtend)
Vue.use(VueCookies)
Vue.use(VueQriously)
Vue.use(VueMeta)

Vue.config.productionTip = false
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app")