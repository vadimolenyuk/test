<template>
    <component :is="layout">
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </component>
</template>

<script>
import Theme from "@/mixins/Theme"
import { LOGIN_REQUEST } from "@/store/actions/login"
import { APPDB_SET_ID } from "@/store/actions/appdb"

export default {
    name: "App",
    mixins: [Theme],
    computed: {
        layout() {
            return (this.$route.meta.layout || "empty") + "-layout"
        }
    },
    mounted() {
        if (
            window.location.search &&
            this.searchToObject() &&
            this.searchToObject().AppId
        ) 
            this.$store.dispatch(APPDB_SET_ID, this.searchToObject().AppId)
        
        if (
            !this.$store.getters.IS_AUTHENTICATED &&
            this.$route &&
            this.searchToObject() &&
            !this.searchToObject().AuthToken &&
            !this.searchToObject().ExpirationDate
        )
            this.$store.dispatch(LOGIN_REQUEST)
    },
    methods: {
        searchToObject: function() {
            var pairs = window.location.search.substring(1).split("&"),
                obj = {},
                pair,
                i

            for (i in pairs) {
                if (pairs[i] === "") continue

                pair = pairs[i].split("=")
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
            }

            return obj
        }
    }
}
</script>