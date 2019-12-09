/* eslint-disable no-unused-vars */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"

//Layout & Styles
import DefaultLayout from "./layouts/Default.vue"
import EmptyLayout from "./layouts/Empty.vue"
Vue.component("default-layout", DefaultLayout)
Vue.component("empty-layout", EmptyLayout)
import "./styles.scss"

//Vendors
import Buefy from "buefy"
import VeeValidateExtend from "./utils/VeeValidateExtend"
import VueCookies from "vue-cookies"
import i18n from "./i18n"
Vue.use(Buefy)
Vue.use(VeeValidateExtend)
Vue.use(VueCookies)

navigator.serviceWorker.getRegistrations().then(
    function(registrations) {
        for (let registration of registrations) {  
            registration.unregister()
        }
    }
)

Vue.prototype.$ThemeLogoUrl = null

Vue.config.productionTip = false
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app")
