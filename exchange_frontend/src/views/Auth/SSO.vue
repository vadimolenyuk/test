<template>
    <b-loading :is-full-page="true" :active.sync="IsLoading" />
</template>

<script>
import Helpers from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import { SSO_SET_LOGIN_INCOMING } from "@/store/actions/login"

export default {
    name: "SsoPage",
    mixins: [LoadingState],
    mounted() {
        this.switchLoading()
        if (
            // Проверка источника запроса на вхождение в список разрешённых адресов
            document.referrer && 
            document.referrer.startsWith("http") &&
            Helpers.checkAllowedURL (document.referrer) &&
            // Проверка существования обязательных параметров AppId и Mode
            this.$route && 
            this.$route.query &&
            this.$route.query.AuthToken && 
            this.$route.query.AuthToken.startsWith("Bearer ")
        ) {
            this.$store.dispatch(SSO_SET_LOGIN_INCOMING, this.$route.query.AuthToken)
                .then(() => {
                    this.$router.push({ name: "Dashboard" })
                })
                .catch(() => Helpers.redirectToExternalApp(document.referrer))
        }
        else 
            Helpers.redirectToExternalApp(document.referrer)
    }
}
</script>