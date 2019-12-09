<template>
    <button class="button" :class="cclass" @click="toKYC">
        {{ $t("Interface.Dashboard.DailyLimit.Verify") }}
    </button>
</template>

<script>
export default {
    name: "GoToKycButton",
    props: {
        cclass: {
            type: String,
            default: null
        }
    },
    computed: {
        AuthToken: {
            get() {
                return this.$store.state.Login.Token
            }
        }
    },
    methods: {
        toKYC() {
            // let From = window.location.protocol + "//" + window.location.host
            let AccountKycUrl = (process.env.NODE_ENV === "development") ? "http://localhost:8080/" : process.env.VUE_APP_KYCAPP_URL
            let ExpirationDate = new Date().setDate(new Date().getDate() + 7).toString()
            if (this.AuthToken && AccountKycUrl)
                window.location.href = `${AccountKycUrl}login?AppId=1&AuthToken=${this.AuthToken}&ExpirationDate=${ExpirationDate}`
        }
    }
}
</script>
