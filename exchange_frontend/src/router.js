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
            meta: { layout: "auth" },
            component: () =>
                import("./views/404.vue")
        },
        {
            path: "/login",
            name: "Login",
            meta: { layout: "auth", guest: true },
            component: () =>
                import("./views/Auth/Login.vue")
        },
        {
            path: "/sso",
            name: "SSO",
            meta: { layout: "auth", guest: true },
            component: () =>
                import("./views/Auth/SSO.vue")
        },
        {
            path: "/register",
            name: "Register",
            meta: { layout: "auth", guest: true },
            component: () => import("./views/Auth/Register.vue")
        },
        {
            path: "/verify",
            name: "Verify",
            meta: { layout: "auth", guest: false },
            component: () => import("./views/Auth/Verify.vue")
        },
        {
            path: "/forgotpassword",
            name: "ForgotPassword",
            meta: { layout: "auth", guest: true },
            component: () =>
                import( "./views/Auth/ForgotPassword.vue")
        },
        {
            path: "/resetpassword",
            name: "ResetPassword",
            meta: { layout: "auth", guest: true },
            component: () =>
                import( "./views/Auth/ResetPassword.vue")
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            meta: { layout: "default", guest: false },
            component: () => import("./views/Dashboard.vue")
        },
        {
            path: "/orders",
            name: "Orders",
            meta: { layout: "default", guest: false },
            component: () => import("./views/Orders.vue")
        },
        {
            path: "/wallets",
            name: "Wallets",
            meta: { layout: "default", guest: false },
            component: () => import("./views/Wallets.vue")
        },
        {
            path: "/fiatwallets",
            name: "FiatWallets",
            meta: { layout: "default", guest: false },
            component: () => import("./views/FiatWallets.vue")
        },
        {
            path: "/levels",
            name: "Tiers",
            meta: { layout: "default", guest: false },
            component: () => import("./views/Tiers.vue")
        },
        {
            path: "/",
            name: "Index",
            meta: { layout: "guest", guest: true },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ "./views/Guest/Index.vue")
        },
        {
            path: "/about",
            name: "About",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/About.vue")
        },
        {
            path: "/terms",
            name: "Terms",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/Terms.vue")
        },
        {
            path: "/fee-schedule",
            name: "FeeSchedule",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/FeeSchedule.vue")
        },
        {
            path: "/privacy-policy",
            name: "PrivacyPolicy",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/PrivacyPolicy.vue")
        },
        {
            path: "/faq",
            name: "Faq",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/Faq.vue")
        },
        {
            path: "/legal",
            name: "Legal",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/Legal.vue")
        },
        {
            path: "/whybitcoin",
            name: "WhyBitcoin",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/WhyBitcoin.vue")
        },
        {
            path: "/secure",
            name: "Secure",
            meta: { layout: "guest" },
            component: () =>
                import("./views/Guest/Secure.vue")
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to && to.query && to.query.Lang && (to.query.Lang.length === 2 || to.query.Lang.length === 5)) {
        store.commit(LANGUAGE_SET, { code: to.query.Lang })
    }

    if (to.matched.some(record => record.meta.guest)) {
        if (!store.getters.IS_AUTHENTICATED) {
            next()
            return
        }
        else {
            if (store.getters.IS_SESSION_READY) {
                next({
                    name: "Dashboard"
                })
            }
            else {
                store.dispatch(SESSION_REQUEST)
                    .then(() => {
                        next({
                            name: "Dashboard"
                        })
                    })
            }
        }
    }
    else if (to.matched.some(record => record.meta.guest === false)) {
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
        else {
            next({
                name: "Login",
                params: { nextUrl: to.fullPath }
            })
        }
    }
    else {
        next()
        return
    }
})

router.afterEach((to) => {
    document.querySelectorAll("link[rel=canonical]").forEach(e => e.parentNode.removeChild(e))
    let head = document.getElementsByTagName("head")[0]
    let link = document.createElement("link")
    link.rel = "canonical"
    link.href = "https://" + window.location.hostname + to.path
    head.appendChild(link)
})

export default router
