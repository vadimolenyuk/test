<template>
    <div id="register" class="column is-4 is-offset-4">
        <h3 class="title">
            {{ $t("Interface.Register.Title") }}
        </h3>
        <div class="box">
            <register />
        </div>
        <p class="has-text-grey has-text-centered">
            <router-link :to="{ name: 'Login' }">
                {{ $t("Interface.Register.Already") }}
            </router-link>
            <!-- &nbsp;·&nbsp;<a href="http://localhost:8080/sso?AppId=1&Mode=register&Redirect=http://localhost:8081">SSO</a> -->
        </p>
    </div>
</template>

<script>
import Register from "@/components/Auth/Register"

export default {
    name: "RegisterPage",
    components: {
        "register": Register
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Register.Title")
        }
    }
}
</script>