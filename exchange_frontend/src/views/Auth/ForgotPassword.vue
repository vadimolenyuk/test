<template>
    <div id="forgotpassword" class="column is-4 is-offset-4">
        <h3 class="title">
            {{ $t("Interface.ForgotPassword.Title") }}
        </h3>
        <h6 class="subtitle is-6">
            {{ $t("Interface.ForgotPassword.SubTitle") }}
        </h6>
        <div class="box">
            <forgot />
        </div>
        <p class="has-text-grey has-text-centered">
            <router-link :to="{ name: 'Register' }">
                {{ $t("Interface.Register.Title") }}
            </router-link> &nbsp;·&nbsp;
            <router-link :to="{ name: 'Login' }">
                {{ $t("Interface.Register.Already") }}
            </router-link>
        </p>
    </div>
</template>

<script>
import ForgotPassword from "@/components/Auth/ForgotPassword"

export default {
    name: "ForgotPasswordPage",
    components: {
        "forgot": ForgotPassword
    },
    metaInfo() {
        return {
            title: this.$t("Interface.ForgotPassword.Title")
        }
    }
}
</script>