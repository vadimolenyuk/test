<template>
    <div id="resetpassword" class="column is-4 is-offset-4">
        <h3 class="title">
            {{ $t("Interface.ResetPassword.Title") }}
        </h3>
        <h6 class="subtitle is-6">
            {{ $t("Interface.ResetPassword.SubTitle") }}
        </h6>
        <div class="box">
            <reset />
        </div>
    </div>
</template>

<script>
import ResetPassword from "@/components/Auth/ResetPassword"

export default {
    name: "ResetPasswordPage",
    components: {
        "reset": ResetPassword
    },
    metaInfo() {
        return {
            title: this.$t("Interface.ResetPassword.Title")
        }
    }
}
</script>