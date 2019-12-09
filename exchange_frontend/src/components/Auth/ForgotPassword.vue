<template>
    <div class="forgotpassword">
        <form @submit.prevent="reset">
            <b-field :label="$t('Interface.Login.Username')" :message="errors.first('Login')" :type="{ 'is-danger': errors.has('Login'), 'is-success': fields.Login && fields.Login.valid }">
                <b-input v-model="Login" v-validate="'required|login'" name="Login" type="text" />
            </b-field>
            <button type="submit" class="button is-theme is-fullwidth">
                {{ $t("Interface.Buttons.Submit") }}
            </button>
        </form>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import { FORGOT_PASSWORD_REQUEST, RESET_TOKEN_PASSWORD_REQUEST } from "@/store/actions/password"

export default {
    name: "ForgotPassword",
    mixins: [LoadingState],
    data() {
        return {
            Login: null
        }
    },
    methods: {
        reset() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(FORGOT_PASSWORD_REQUEST, this.Login)
                        .then(() => {
                            this.$buefy.dialog.prompt({
                                type: "is-theme",
                                title: "Enter reset code",
                                inputAttrs: {
                                    maxlength: 5,
                                    name: "Code"
                                },
                                onConfirm: (value) => {
                                    this.switchLoading()
                                    this.$store.dispatch(RESET_TOKEN_PASSWORD_REQUEST, value)
                                        .then(() => this.$router.push({ name: "ResetPassword" }))
                                }
                            })
                        })
                        .finally(() => this.switchLoading())
                }
            })
        }
    }
}
</script>