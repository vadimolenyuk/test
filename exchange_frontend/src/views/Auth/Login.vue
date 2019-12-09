<template>
    <div id="login" class="column is-4 is-offset-4">
        <h3 class="title">
            {{ $t("Interface.Login.Title") }}
        </h3>
        <div class="box">
            <login />
        </div>
        <p class="has-text-grey has-text-centered">
            <router-link :to="{ name: 'Register' }">
                {{ $t("Interface.Register.Title") }}
            </router-link>
            &nbsp;·&nbsp;
            <router-link :to="{ name: 'ForgotPassword' }">
                Forgot Password?
            </router-link>
             <a href="http://localhost:8080/sso?AppId=1&Mode=login&Redirect=http://localhost:8081">SSO</a>
        </p>
    </div>
</template>

<script>
import Login from "@/components/Auth/Login"

export default {
    name: "LoginPage",
    components: {
        "login": Login
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Login.Title")
        }
    }
}
</script>