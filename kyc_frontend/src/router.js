import Vue from "vue"
import Router from "vue-router"
import store from "./store"
import { SESSION_REQUEST } from "@/store/actions/session"
import { LANGUAGE_SET } from "@/store/actions/language"

Vue.use(Router)

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "*",
            meta: { layout: "empty" },
            component: () =>
                import("./views/404.vue")
        },
        {
            path: "/",
            name: "KYC",
            meta: { layout: "default", auth: true },
            component: () =>
                import( "./views/KYC.vue")
        },
        {
            path: "/login",
            name: "Login",
            meta: { layout: "empty", auth: false },
            component: () =>
                import( "./views/Auth/Login.vue")
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to && to.query && to.query.Lang && (to.query.Lang.length === 2 || to.query.Lang.length === 5)) {
        store.commit(LANGUAGE_SET, { code: to.query.Lang })
    }

    if (to.matched.some(record => record.meta.auth)) {
        if (store.getters.IS_AUTHENTICATED) {
            if (store.getters.IS_SESSION_READY) {
                next()
                return
            }
            else {
                store.dispatch(SESSION_REQUEST)
                    .then(() => {
                        next()
                        return
                    })
            }
        }
    }
    else if (to.matched.some(record => record.meta.auth === false)) {
        if (!store.getters.IS_AUTHENTICATED) {
            next()
            return
        }
        else {
            if (store.getters.IS_SESSION_READY) {
                next({
                    name: "KYC"
                })
            }
            else {
                store.dispatch(SESSION_REQUEST)
                    .then(() => {
                        next({
                            name: "KYC"
                        })
                    })
            }
        }
    }
    else {
        next()
        return
    }
})

export default router