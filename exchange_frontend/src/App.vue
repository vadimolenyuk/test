<template>
    <component :is="layout">
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </component>
</template>

<script>
import Theme from "@/mixins/Theme"
import { CURRENCIES_LIST_REQUEST } from "@/store/actions/currencies"

export default {
    name: "App",
    mixins: [Theme],
    metaInfo: {
        title: "Index",
        titleTemplate: "%s — " + process.env.VUE_APP_TITLE
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || "auth") + "-layout"
        }
    },
    created() {
        this.$store.dispatch(CURRENCIES_LIST_REQUEST)
    }
}
</script>