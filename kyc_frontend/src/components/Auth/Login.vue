<template>
    <div class="login">
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import { LOGIN_TOKEN_RECEIVE, LOGOUT_REQUEST } from "@/store/actions/login"

export default {
    name: "Login",
    data () {
        return {
            IsLoading: true
        }
    },
    mounted() {
        if (
            this.$route && 
            this.$route.query && 
            this.$route.query.AuthToken &&
            this.$route.query.ExpirationDate 
        ) {
            this.$store.dispatch(LOGIN_TOKEN_RECEIVE, {
                "AuthToken": this.$route.query.AuthToken,
                "ExpirationDate": this.$route.query.ExpirationDate
            })
                .then(() => this.$router.push({ name: "KYC" }))
                .catch(() => this.$store.dispatch(LOGOUT_REQUEST))
        }
    },
    methods: {

    }
}
</script>